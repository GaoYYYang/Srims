using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Web;
using System.Data;

using Srims.Server.Business;
using Srims.Server.Business.Patents;
using Srims.Server.Business.Users;
using Srims.Server.Business.Common;

using Srims.Server.DataAccess;

namespace Srims.Server.DataExchange.PatentImport
{
    /// <summary>
    /// 专利导入
    /// </summary>
    public static class PatentImport
    {
        /// <summary>
        /// 论文导入
        /// </summary>
        /// <param name="httpContext"></param>
        /// <param name="postedFile"></param>
        /// <param name="request"></param>
        /// <param name="user"></param>
        public static string ImportPatent(this HttpContext httpContext, HttpPostedFile postedFile, HttpRequest request, User user)
        {
            IDatabase database = Database.New();
            string logName = "PatentImportLog" + DateTime.Now.ToLongDateString().ToString() + Guid.NewGuid().ToString();
            var writer = httpContext.GetLogWriter(logName);

            string fileName = "Patent";
            DataSet ds = postedFile.GetDataFromUploadFile(httpContext, fileName);

            StringBuilder importLog = new StringBuilder();
            StringBuilder patentImportLog = new StringBuilder();
            StringBuilder patentImportId = new StringBuilder();
            StringBuilder patentUpdateLog = new StringBuilder();

            StringBuilder patentAgencyImportLog = new StringBuilder();
            StringBuilder patentAgencyUpdateLog = new StringBuilder();
            StringBuilder patentAgencyImportId = new StringBuilder();

            StringBuilder expertMatchString = new StringBuilder();

            int importPatentCount = 0;
            int updatePatentCount = 0;

            int impportPatentAgencyCount = 0;
            int updatePatentAgencyCount = 0;

            foreach (DataRow row in ds.Tables[fileName].Rows)
            {
                #region 取字段的值
                string college = row[0].ToString().Trim();
                string censorYear = row[1].ToString().Trim();
                string principalName = row[2].ToString().Trim();
                string country = row[3].ToString().Trim();
                string type = row[4].ToString().Trim();
                string patentName = row[5].ToString().Trim();
                string number = row[6].ToString().Trim();
                string category = row[7].ToString().Trim();
                string mainCategoryNumber = row[8].ToString().Trim();
                string allCateforyNunber = row[9].ToString().Trim();
                string applicationDateTime = row[10].ToString().Trim();
                string authorDateTime = row[11].ToString().Trim();
                string lawstate = row[12].ToString().Trim();
                string lawstateTime = row[13].ToString().Trim();
                string agentName = row[14].ToString().Trim();
                string agencyName = row[15].ToString().Trim();
                string agencyContract = row[16].ToString().Trim();
                string allInventer = row[17].ToString().Trim();
                string introductin = row[18].ToString().Trim();
                string lastFeeTime = row[19].ToString().Trim();
                string remark = row[20].ToString().Trim();

                #endregion

                database = Database.New();

                Object oldPatent = new Object();
                Object oldPatentAgency = new Object();

                bool isNewPatent = false;
                bool isNewPatentAgency = false;

                try
                {
                    #region 导入专利代理机构
                    PatentAgency patentAgency = null;
                    if (!string.IsNullOrEmpty(agencyName))
                    {
                        patentAgency = database.PatentAgencys.SingleOrDefault(q => q.Name == agencyName);
                        if (patentAgency == null)
                        {
                            isNewPatentAgency = true;
                            patentAgency = new PatentAgency();
                        }
                        else
                            oldPatentAgency = patentAgency.Clone();

                        patentAgency.Name = agencyName;

                        if (!string.IsNullOrEmpty(agencyContract))
                            patentAgency.Contract = agencyContract;

                        patentAgency.Save(database);

                        if (isNewPatentAgency)
                        {
                            impportPatentAgencyCount++;
                            patentAgencyImportLog.AppendFormat("添加专利代理机构，机构名称为：{0}\n", patentAgency.Name);
                            patentAgencyImportId.AppendFormat("{0},", patentAgency.ID);
                        }
                        else
                        {
                            var description = Log.GetEditOperationDescription(oldPatentAgency, patentAgency, PatentAgency.GetpatentAgencyDescriptionItems(), false);

                            if (!string.IsNullOrEmpty(description.Trim()))
                            {
                                updatePatentAgencyCount++;
                                patentAgencyUpdateLog.AppendFormat("编辑专利代理机构：{0}，编辑详细信息为：{1}", patentAgency.Name, description);
                            }
                        }
                    }
                    #endregion

                    #region 导入专利基本信息

                    Patent patent = database.Patents.SingleOrDefault(q => q.Number == number);
                    if (patent == null)
                    {
                        isNewPatent = true;
                        patent = new Patent();
                    }
                    else
                        oldPatent = patent.Clone();

                    if (!string.IsNullOrEmpty(college))
                        patent.College = college.GetCollege(database);

                    patent.Agency = patentAgency;

                    if (!string.IsNullOrEmpty(allCateforyNunber))
                        patent.AllCategoryNumber = allCateforyNunber;

                    if (!string.IsNullOrEmpty(applicationDateTime))
                        patent.ApplicationDateTime = Convert.ToDateTime(applicationDateTime);

                    if (!string.IsNullOrEmpty(authorDateTime))
                        patent.AuthorizeDateTime = Convert.ToDateTime(authorDateTime);

                    if (!string.IsNullOrEmpty(category))
                        patent.Category = category;

                    if (!string.IsNullOrEmpty(country))
                        patent.Country = country;

                    if (!string.IsNullOrEmpty(introductin))
                        patent.Introduction = introductin;

                    if (!string.IsNullOrEmpty(lawstate))
                        patent.LawState = lawstate.GetPatentLawState();

                    if (!string.IsNullOrEmpty(lawstateTime))
                        patent.LawStateTime = Convert.ToDateTime(lawstateTime);

                    patent.Level = PatentLevel.TheFirstResponsibleUnion;

                    if (!string.IsNullOrEmpty(mainCategoryNumber))
                        patent.MainCategoryNumber = mainCategoryNumber;

                    if (!string.IsNullOrEmpty(patentName))
                        patent.Name = patentName;

                    if (!string.IsNullOrEmpty(number))
                        patent.Number = number;

                    if (!string.IsNullOrEmpty(remark))
                        patent.Remark = remark + "\n" + lastFeeTime;

                    if (!string.IsNullOrEmpty(type))
                        patent.Type = type.GetPatentType();

                    if (!string.IsNullOrEmpty(agentName))
                        patent.Agent = agentName;

                    patent.Save(database);

                    if (isNewPatent)
                    {
                        importPatentCount++;
                        patentImportId.AppendFormat("{0},", patent.ID);
                    }
                    else
                    {
                        var description = Log.GetEditOperationDescription(oldPatent, patent, Patent.GetPatentDescriptionItems(), false);

                        if (!string.IsNullOrEmpty(description.Trim()))
                        {
                            updatePatentCount++;
                            patentUpdateLog.AppendFormat("编辑专利：{0}，编辑详细信息为：{1}", patent.Number, description);
                        }
                    }
                    #endregion

                    #region 导入专利人
                    int order = 1;
                    string[] patentInventers = allInventer.Split(new char[] { '；' }, StringSplitOptions.RemoveEmptyEntries);

                    if (patentInventers.Length > 0)
                    {
                        if (!isNewPatent)
                        {
                            var oldPatentInventers = database.PatentInventers.GetByPatentID(patent.ID);
                            foreach (var oldPatentInventer in oldPatentInventers)
                                oldPatentInventer.Delete(database);
                        }

                        foreach (var inventer in patentInventers)
                        {
                            PatentInventer patentInventer = new PatentInventer();

                            patentInventer.Name = inventer.Trim();
                            patentInventer.Order = order++;
                            patentInventer.IsPrincipal = inventer.Trim() == principalName.Trim();
                            patentInventer.Patent = patent;

                            if (!string.IsNullOrEmpty(inventer))
                                patentInventer.Expert = inventer.GetExpert(patent.CollegeID, database, expertMatchString, patent.Name);

                            patentInventer.Save(database);
                        }
                    }
                    #endregion
                }

                catch (Exception e)
                {
                    writer.WriteLine(string.Format("导入专利发生错误，专利号为{0}，错误信息为：{1}", number, e.Message));
                }
            }

            importLog.AppendFormat("共导入专利{0}条，更新专利{1}条，；导入专利代理机构{2}条，更新专利代理机构{3}条\n", importPatentCount, updatePatentCount, impportPatentAgencyCount, updatePatentAgencyCount);
            importLog.AppendFormat("导入专利代理机构信息为：\n{0}", patentAgencyImportLog);
            importLog.AppendFormat("更新专利代理机构信息为：\n{0}", patentAgencyUpdateLog);
            importLog.AppendFormat("更新专利详细信息为：\n{0}", patentUpdateLog);
            importLog.AppendFormat("导入专利id信息为：\n{0}", patentImportId);
            importLog.AppendFormat("导入专利id信息为：\n{0}", patentAgencyImportId);

            Log.Write(user.Name, (int)LogType.paperImport, importLog.ToString(), "导入专利", database);
            writer.WriteLine(importLog.ToString());

            httpContext.DeleteFile(postedFile.FileName);
            writer.Close();
            return logName;
        }
    }
}
