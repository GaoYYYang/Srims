using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Web;
using System.Data;
using System.IO;

using Srims.Server.Business;
using Srims.Server.Business.Papers;
using Srims.Server.Business.Users;
using Srims.Server.Business.Common;

using Srims.Server.DataExchange;
using Srims.Server.DataExchange.PaperImport;

using Srims.Server.DataAccess;

namespace Srims.Server.DataExchange.MagazineImport
{
    /// <summary>
    /// 导入杂志年度信息
    /// </summary>
    public static class MagazineInformationImport
    {
        /// <summary>
        /// 导入杂志年度信息
        /// </summary>
        /// <param name="httpContext"></param>
        /// <param name="postedFile"></param>
        /// <param name="request"></param>
        /// <param name="user"></param>
        /// <param name="year"></param>
        /// <returns></returns>
        public static string ImportMagazineInformation(this HttpContext httpContext, HttpPostedFile postedFile, HttpRequest request, User user, int year)
        {
            IDatabase database = Database.New();
            string logName = "MagazineInformationImportLog" + DateTime.Now.ToLongDateString().ToString() + Guid.NewGuid().ToString();
            var writer = httpContext.GetLogWriter(logName);

            string fileName = "MagazineInformation";
            DataSet ds = postedFile.GetDataFromUploadFile(httpContext, fileName);

            StringBuilder magazineInformationLog = new StringBuilder();
            StringBuilder MagazineInformationImportLog = new StringBuilder();
            StringBuilder MagazineInformationUpdateLog = new StringBuilder();
            StringBuilder MagazineInformationImportId = new StringBuilder();
            StringBuilder NoFoundMagazineISSN = new StringBuilder();

            int importMagazineInformationCount = 0;//导入杂志信息个数
            int updateMagazineInformationCount = 0;//更新杂志信息个数
            int notImportMagazineInformationCount = 0;

            foreach (DataRow row in ds.Tables[fileName].Rows)
            {
                database = Database.New();
                bool isNew = false;
                Object oldMagazineInformation = new Object();

                string ISSN = row[0].ToString().Trim();
                string citeFrequencyString = row[1].ToString().Trim();
                string influenceFactorString = row[2].ToString().Trim();
                string instantExponentString = row[3].ToString().Trim();
                string paperCountString = row[4].ToString().Trim();
                string citeHalfLife = row[5].ToString().Trim();
                string SubAirerString = row[6].ToString().Trim();

                try
                {
                    //转化期刊的年度信息
                    int? citeFrequency = string.IsNullOrEmpty(citeFrequencyString) ? null : new Nullable<Int32>(Convert.ToInt32(citeFrequencyString));
                    int? influenceFactor = influenceFactorString.ToInFluenceFactor();
                    int? instantExponent = instantExponentString.ToInstantExpnoent();
                    int? paperCount = string.IsNullOrEmpty(paperCountString) ? null : new Nullable<Int32>(Convert.ToInt32(paperCountString));
                    int? subAirer = string.IsNullOrEmpty(SubAirerString) ? null : new Nullable<Int32>(Convert.ToInt32(SubAirerString));


                    //如果对应的杂志不存在，则不保存杂志的年度信息
                    Magazine magazine = database.Magazines.SingleOrDefault(q => !q.IsDelete && q.ISSN == ISSN);
                    if (magazine == null)
                    {
                        NoFoundMagazineISSN.AppendFormat("{0}；", ISSN);
                        notImportMagazineInformationCount++;
                        continue;
                    }

                    MagazineInformation magazineInformation = database.MagazineInformations.SingleOrDefault(q => !(q.Magazine.IsDelete) && q.Magazine.ISSN == ISSN && q.Year == year);
                    if (magazineInformation == null)
                    {
                        isNew = true;
                        magazineInformation = new MagazineInformation();
                    }
                    else
                        oldMagazineInformation = magazineInformation.Clone();

                    magazineInformation.Year = year;
                    magazineInformation.Magazine = magazine;

                    if (citeFrequency.HasValue)
                        magazineInformation.CiteFrequency = citeFrequency;

                    if (influenceFactor.HasValue)
                        magazineInformation.InfluenceFactor = influenceFactor;

                    if (instantExponent.HasValue)
                        magazineInformation.InstantExponent = instantExponent;

                    if (paperCount.HasValue)
                        magazineInformation.PaperCount = paperCount;

                    //杂志的期刊分区取最小的那个
                    if (subAirer.HasValue)
                    {
                        if (magazineInformation.SubAirer.HasValue && magazineInformation.SubAirer.Value > subAirer.Value)
                            magazineInformation.SubAirer = subAirer;

                        if (!magazineInformation.SubAirer.HasValue)
                            magazineInformation.SubAirer = subAirer;
                    }

                    if (!string.IsNullOrEmpty(citeHalfLife))
                        magazineInformation.CiteHalfLife = citeHalfLife;

                    magazineInformation.Save(database);

                    //记录导入日志
                    if (isNew)
                    {
                        importMagazineInformationCount++;
                        MagazineInformationImportLog.AppendFormat("成功导入杂志年度信息，杂志的ISSN为：{0}，年度为{1}\n", magazineInformation.Magazine.ISSN, year);
                        MagazineInformationImportId.AppendFormat("{0}；", magazineInformation.ID);
                    }

                    //记录更新日志
                    if (!isNew)
                    {
                        var description = Log.GetEditOperationDescription(oldMagazineInformation, magazineInformation, MagazineInformation.GetMagazineInformationDescriptionItems(), false);

                        if (!string.IsNullOrEmpty(description.Trim()))
                        {
                            updateMagazineInformationCount++;
                            MagazineInformationUpdateLog.AppendFormat("编辑杂志详细信息，杂志的ISSN为：{0}，年度为：{1}编辑详细信息为：{2}", magazineInformation.Magazine.ISSN, year, description);
                        }
                    }


                    //更新这篇发表在这篇杂志上的论文的杂志冗余信息（影响影子和期刊分区）
                    var papers = database.Papers.Where(q => q.Magazine == magazine && q.PublishDateYear.HasValue && q.PublishDateYear.Value == year).ToList();
                    foreach (var paper in papers)
                    {
                        paper.InfluenceFactor = magazineInformation.InfluenceFactor;
                        paper.SubAirer = magazineInformation.SubAirer;
                        paper.Save(database);
                    }
                }
                catch (Exception e)
                {
                    writer.WriteLine(string.Format("导入杂志信息发生错误，杂志ISSN为{0}，错误信息为：{1}", ISSN, e.Message));
                }
            }

            magazineInformationLog.AppendFormat("根据ISSN号查询杂志，因查询不到对应的杂志，导入失败{0}条，ISSN为：{1}。\n", notImportMagazineInformationCount, NoFoundMagazineISSN.ToString());
            magazineInformationLog.AppendFormat("成功导入杂志信息{0}条,导入的详细信息为：\n{1}", importMagazineInformationCount, MagazineInformationImportLog.ToString());
            magazineInformationLog.AppendFormat("添加杂志信息ID为：\n{0}\n", MagazineInformationImportId.ToString());
            magazineInformationLog.AppendFormat("成功更新杂志信息{0}条，更新的详细信息为：\n{1}", updateMagazineInformationCount, MagazineInformationUpdateLog.ToString());
            Log.Write(user.Name, (int)(LogType.MagazineInformationImport), MagazineInformationImportLog.ToString(), request.UserHostAddress, "杂志年度信息导入", database);

            writer.WriteLine(magazineInformationLog.ToString());
            writer.WriteLine();
            writer.WriteLine();

            httpContext.DeleteFile(postedFile.FileName);
            writer.Close();

            return logName;
        }
    }
}

