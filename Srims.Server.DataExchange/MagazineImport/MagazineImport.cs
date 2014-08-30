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
    /// 杂志导入
    /// </summary>
    public static class MagazineImport
    {
        /// <summary>
        /// 导入杂志
        /// </summary>
        /// <param name="httpContext"></param>
        /// <param name="postedFile"></param>
        /// <param name="request"></param>
        /// <param name="user"></param>
        public static string ImportMagazine(this HttpContext httpContext, HttpPostedFile postedFile, HttpRequest request, User user)
        {
            IDatabase database = Database.New();
            string logName = "MagazineImportLog" + DateTime.Now.ToLongDateString().ToString() + Guid.NewGuid().ToString();
            var writer = httpContext.GetLogWriter(logName);

            string fileName = "Magazine";
            DataSet ds = postedFile.GetDataFromUploadFile(httpContext, fileName);

            StringBuilder MagazineImportLog = new StringBuilder();
            StringBuilder MagazineImportId = new StringBuilder();
            StringBuilder MagazineUpdateLog = new StringBuilder();

            int importMagazineCount = 0;//导入杂志个数
            int updateMagazineCount = 0;//更新杂志个数（论文收录）

            foreach (DataRow row in ds.Tables[fileName].Rows)
            {
                database = Database.New();

                string magazineShortName = row[0].ToString().Trim();
                string magazineName = row[1].ToString().Trim();
                string ISSN = row[2].ToString().Trim();
                string subjectClass = row[3].ToString().Trim();
                string subjectRank = row[4].ToString().Trim();
                string language = row[5].ToString().Trim();
                string publishType = row[6].ToString().Trim();
                string publishCompany = row[7].ToString().Trim();
                string publishCompanyCity = row[8].ToString().Trim();
                string publishCompanyAddress = row[9].ToString().Trim();

                try
                {
                    if (!string.IsNullOrEmpty(ISSN))
                    {
                        //保存杂志基本信息
                        Magazine magazine = database.Magazines.SingleOrDefault(q => q.ISSN == ISSN);
                        if (magazine == null)
                            magazine = new Magazine();

                        bool magazineIsNew = magazine.IsNew;

                        if (!string.IsNullOrEmpty(magazineName))
                            magazine.FullName = magazineName;

                        magazine.IsDelete = magazine.IsNew ? false : magazine.IsDelete;

                        magazine.ISSN = ISSN;

                        if (!string.IsNullOrEmpty(language))
                            magazine.Language = language.GetLanguage();

                        if (!string.IsNullOrEmpty(publishCompany))
                            magazine.PublishCompany = publishCompany;

                        if (!string.IsNullOrEmpty(publishCompanyAddress))
                            magazine.PublishCompanyAddress = publishCompanyAddress;

                        if (!string.IsNullOrEmpty(publishCompanyCity))
                            magazine.PublishCompanyCity = publishCompanyCity;

                        if (!string.IsNullOrEmpty(publishType))
                            magazine.PublishType = publishType.GetPublishType();

                        if (!string.IsNullOrEmpty(magazineShortName))
                            magazine.ShortName = magazineShortName;

                        if (!string.IsNullOrEmpty(subjectRank))
                            magazine.SubjectRank = subjectRank;

                        magazine.Save(database);

                        if (magazineIsNew)
                        {
                            importMagazineCount++;
                            MagazineImportId.AppendFormat("{0}；", magazine.ID);
                        }
                        else
                        {
                            updateMagazineCount++;
                            MagazineUpdateLog.AppendFormat("更新杂志ISSN为：{0}。\n", magazine.ISSN);
                        }

                        //保存杂志的学科分类
                        MagazineSubjectClass magazineSubjectClass = database.MagazineSubjectClasses.SingleOrDefault(q => q.MagazineID == magazine.ID && q.SubjectClass == subjectClass);
                        if (magazineSubjectClass == null)
                            magazineSubjectClass = new MagazineSubjectClass();

                        if (!magazineSubjectClass.IsNew)
                            continue;

                        magazineSubjectClass.Magazine = magazine;
                        magazineSubjectClass.SubjectClass = subjectClass;

                        magazineSubjectClass.Save(database);
                    }
                }
                catch (Exception e)
                {
                    writer.WriteLine(string.Format("导入杂志发生错误，杂志ISSN为{0}，错误信息为：{1}", ISSN, e.Message));
                }
            }

            MagazineImportLog.AppendFormat("成功更新和导入杂志{0}篇：其中更新杂志{1}篇；添加杂志{2}篇。\n", importMagazineCount + updateMagazineCount, updateMagazineCount, importMagazineCount);
            MagazineImportLog.AppendFormat("添加杂志ID为：\n{0}\n", MagazineImportId.ToString());
            MagazineImportLog.AppendFormat("更新杂志详细信息为：\n{0}", MagazineUpdateLog.ToString());
            Log.Write(user.Name, (int)(LogType.MagazineImport), MagazineImportLog.ToString(), request.UserHostAddress, "杂志导入", database);

            writer.WriteLine("成功更新和导入杂志{0}篇：其中更新杂志{1}篇；添加杂志{2}篇。\n", importMagazineCount + updateMagazineCount, updateMagazineCount, importMagazineCount);
            writer.WriteLine();
            writer.WriteLine();
            writer.WriteLine("更新杂志详细信息为：\n{0}", MagazineUpdateLog.ToString());


            httpContext.DeleteFile(postedFile.FileName);
            writer.Close();

            return logName;
        }
    }
}
