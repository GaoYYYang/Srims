using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Web;
using System.Data;
using System.IO;

using Srims.Server.Business;
using Srims.Server.Business.Projects;
using Srims.Server.Business.Experts;
using Srims.Server.Business.Users;
using Srims.Server.Business.Common;
using Srims.Server.Business.Fund;
using Srims.Server.Business.Type;

using MIS.Common;

using Srims.Server.DataAccess;

namespace Srims.Server.DataExchange.ProjectImport
{
    /// <summary>
    /// 项目导入
    /// </summary>
    public static class ProjectImport
    {
        /// <summary>
        /// 项目导入
        /// </summary>
        /// <param name="httpContext"></param>
        /// <param name="postedFile"></param>
        /// <param name="request"></param>
        /// <param name="user"></param>
        public static string ImportProject(this HttpContext httpContext, HttpPostedFile postedFile, HttpRequest request, User user)
        {
            IDatabase database = Database.New();
            string logName = "ProjectImportLog" + DateTime.Now.ToLongDateString().ToString() + Guid.NewGuid().ToString();
            var writer = httpContext.GetLogWriter(logName);

            string fileName = "Project";
            DataSet ds = postedFile.GetDataFromUploadFile(httpContext, fileName);

            StringBuilder importLog = new StringBuilder();
            StringBuilder projectImportLog = new StringBuilder();
            StringBuilder projectImportId = new StringBuilder();


            StringBuilder expertMatchString = new StringBuilder();
            StringBuilder projectTypeString = new StringBuilder();
            StringBuilder baseMatchString = new StringBuilder();
            StringBuilder subjectMatchString = new StringBuilder();


            int importProjectCount = 0;//导入项目个数

            foreach (DataRow row in ds.Tables[fileName].Rows)
            {
                string name = row[0].ToString().Trim();
                string number = row[1].ToString().Trim();
                string isSecret = row[2].ToString().Trim();
                string principal = row[3].ToString().Trim();
                string principalDelegate = row[4].ToString().Trim();
                string memberString = row[5].ToString().Trim();
                string fundMembers = row[6].ToString().Trim();
                string level = row[7].ToString().Trim();
                string state = row[8].ToString().Trim();
                string researchType = row[9].ToString().Trim();
                string corperateType = row[10].ToString().Trim();
                string startTime = row[11].ToString().Trim();
                string endTime = row[12].ToString().Trim();
                string subjectFirstLevel = row[13].ToString().Trim();
                string subjectSecondLevel = row[14].ToString().Trim();
                string baseName = row[15].ToString().Trim();
                string rank = row[16].ToString().Trim();
                string type = row[17].ToString().Trim();
                string supportCategory = row[18].ToString().Trim();
                string supportField = row[19].ToString().Trim();
                string supportSubField = row[20].ToString().Trim();
                string fundContract = row[21].ToString().Trim();
                string fundTotal = row[22].ToString().Trim();
                string fundIn = row[23].ToString().Trim();
                string fundOut = row[24].ToString().Trim();
                string fundFrom = row[25].ToString().Trim();
                string fundUnit = row[26].ToString().Trim();
                string fundUnitAddress = row[27].ToString().Trim();
                string unit = row[28].ToString().Trim();
                string unitAddress = row[29].ToString().Trim();
                string remark = row[30].ToString().Trim();

                database = Database.New();
                Project project = new Project();
                try
                {
                    //保存项目的基本信息
                    project.Name = name;
                    project.Number = number;

                    project.Principal = principal.GetExpert(project.Name, expertMatchString, database, true);
                    if (project.Principal == null)
                        continue;

                    project.PrincipalDelegate = principalDelegate.GetExpert(project.Name, expertMatchString, database, false);
                    project.Level = level.GetProjectLevel();

                    project.ResearchType = researchType;
                    researchType.AddNoticeText(NoticeTextType.ProjectResearchType, database);

                    project.CooperationType = corperateType;
                    corperateType.AddNoticeText(NoticeTextType.ProjectCooperationType, database);

                    project.StartDate = Convert.ToDateTime(startTime);
                    project.EndDate = Convert.ToDateTime(endTime);


                    project.FirstLevelSubject = subjectFirstLevel.GetSubjectFirstLevel(project.Name, subjectMatchString, database);
                    project.SecondLevelSubject = subjectSecondLevel.GetsubjectSecondLevel(project.Name, project.FirstLevelSubject, subjectMatchString, database);

                    //目前所有项目的所属基地为空
                    project.Base = baseName.GetBase(project.Name, baseMatchString, database);
                    project.Remark = remark;

                    project.CreateDate = DateTime.Now;
                    project.Creator = "系统";

                    project.IsSecret = isSecret.GetBoolean();
                    project.CorporationPlace = unitAddress;
                    project.TaskComingFrom = unit;

                    project.Save(database);

                    //保存项目状态信息
                    ProjectStateHistory projectStateHistory = new ProjectStateHistory();
                    projectStateHistory.State = state.GetProjectState();
                    projectStateHistory.Project = project;
                    projectStateHistory.DateTime = DateTime.Now;
                    projectStateHistory.Operator = "系统";
                    projectStateHistory.Remark = "该项目是文科项目，为系统导入数据";

                    projectStateHistory.Save(database);
                    project.CurrentState = projectStateHistory;
                    project.Save(database);

                    ProjectInfo_Type projectInfo_Type = new ProjectInfo_Type();
                    projectInfo_Type.Project = project;
                    projectInfo_Type.Rank = rank.GetProjectRank(rank == "横向", database, projectTypeString);//导入时修改
                    projectInfo_Type.Type = type.GetProjectType(SubjectNature.Liberal, projectInfo_Type.Rank, database, projectTypeString);
                    projectInfo_Type.SupportCategory = supportCategory.GetProjectSupportCategory(projectInfo_Type.Type, database, projectTypeString);
                    projectInfo_Type.SupportField = supportField.GetProjectSupportField(projectInfo_Type.Type, database, projectTypeString);
                    projectInfo_Type.SupportSubField = supportSubField.GetProjectSupportSubField(projectInfo_Type.SupportField, database, projectTypeString);

                    projectInfo_Type.Save(database);
                    project.Type = projectInfo_Type;

                    if (project.Type.Type.IsHorizontalType)
                        if (project.StartDate.HasValue)
                            project.Number = project.StartDate.Value.Year.GetHorizontalProjectNumber(database);

                    project.Save(database);

                    //保存项目经费信息
                    ProjectInfo_Fund projectInfo_fund = new ProjectInfo_Fund();
                    projectInfo_fund.FundContract = fundContract.ToMoney().HasValue ? fundContract.ToMoney().Value : 0;
                    projectInfo_fund.FundTotal = fundTotal.ToMoney().HasValue ? fundTotal.ToMoney().Value : 0;
                    projectInfo_fund.FundPlanOut = fundOut.ToMoney().HasValue ? fundOut.ToMoney().Value : 0;
                    projectInfo_fund.FundFrom = fundFrom;
                    projectInfo_fund.FundFromUnit = fundUnit;
                    projectInfo_fund.FundFromUnitAddress = fundUnitAddress;

                    projectInfo_fund.Project = project;
                    projectInfo_fund.BorrowAmount = 0;

                    projectInfo_fund.Save(database);
                    project.Fund = projectInfo_fund;
                    project.Save(database);

                    //保存项目成员信息
                    if (!string.IsNullOrEmpty(memberString))
                    {
                        var order = 2;
                        var members = memberString.Split(new char[] { '，' }, StringSplitOptions.RemoveEmptyEntries);
                        foreach (var member in members)
                        {
                            ProjectMember projectMember = new ProjectMember();

                            projectMember.Order = order++;
                            projectMember.Project = project;
                            projectMember.Expert = member.GetExpert(project.Name, expertMatchString, database, false);
                            if (projectMember.Expert == null)
                                continue;

                            projectMember.Save(database);
                        }

                    }


                    importProjectCount++;
                }
                catch (Exception e)
                {
                    writer.WriteLine(string.Format("导入项目发生错误，项目名称为{0}，错误信息为：{1}", name, e.Message));
                }
                projectImportId.AppendFormat("{0},", project.ID);

            }

            projectImportLog.AppendFormat("共导入项目{0}个， 导入项目Id为:\n{1}\n", importProjectCount, projectImportId.ToString());
            projectImportLog.AppendFormat("项目成员匹配情况如下：\n{0}\n", expertMatchString.ToString());
            projectImportLog.AppendFormat("类别不匹配情况如下：\n{0}\n", projectTypeString.ToString());
            projectImportLog.AppendFormat("基地匹配情况如下：\n{0}\n", baseMatchString.ToString());
            projectImportLog.AppendFormat("学科匹配情况如下：\n{0}\n", subjectMatchString.ToString());


            writer.WriteLine(projectImportLog.ToString());

            httpContext.DeleteFile(postedFile.FileName);
            writer.Close();

            return logName;
        }
    }
}
