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

using Srims.Server.DataAccess;

using MIS.Common;

namespace Srims.Server.DataExchange.TypeImport
{
    /// <summary>
    /// 项目资助领域导入
    /// </summary>
    public static class ProjectSupportFiledImporter
    {
        /// <summary>
        /// 项目资助领域导入
        /// </summary>
        /// <param name="httpContext"></param>
        /// <param name="postedFile"></param>
        /// <param name="request"></param>
        /// <param name="user"></param>
        public static string ImportProjectsupportField(this HttpContext httpContext, HttpPostedFile postedFile, HttpRequest request, User user)
        {
            IDatabase database = Database.New();
            string logName = "ProjectSupportFieldImportLog" + DateTime.Now.ToLongDateString().ToString() + Guid.NewGuid().ToString();
            var writer = httpContext.GetLogWriter(logName);

            string fileName = "SupportField";
            DataSet ds = postedFile.GetDataFromUploadFile(httpContext, fileName);

            StringBuilder importLog = new StringBuilder();

            int importProjectSupportFieldCount = 0;
            int importProjectSupportSubFieldCount = 0;
            int updateProjectSupportFieldCount = 0;
            int updateProjectSupportSubFieldCount = 0;

            bool isSupportFieldNew = true;
            bool isSupportSubFieldNew = true;

            foreach (DataRow row in ds.Tables[fileName].Rows)
            {
                string rankName = row[0].ToString().Trim();
                string typeName = row[1].ToString().Trim();
                string supportFieldName = row[2].ToString().Trim();
                string supportSubFieldName = row[3].ToString().Trim();
                try
                {

                    ProjectRank projectRank = database.ProjectRanks.GetByName(rankName);
                    if (projectRank == null)
                    {
                        importLog.AppendFormat("项目等级：{0}未找到，导入失败", rankName);
                        continue;
                    }

                    ProjectType projectType = database.ProjectTypes.GetByName(typeName, projectRank.ID, SubjectNature.Liberal);
                    if (projectType == null)
                    {
                        importLog.AppendFormat("项目类型：{0}未找到， 导入失败", typeName);
                        continue;
                    }

                    //导入项目资助领域
                    isSupportFieldNew = false;
                    ProjectSupportField projectSupportField = database.ProjectSupportFields.GetByName(supportFieldName, projectType.ID);
                    if (projectSupportField == null)
                    {
                        projectSupportField = new ProjectSupportField();
                        isSupportFieldNew = true;
                    }

                    projectSupportField.IsAvailable = projectSupportField.IsNew ? true : projectSupportField.IsAvailable;
                    projectSupportField.Name = supportFieldName;
                    projectSupportField.ProjectType = projectType;

                    projectSupportField.Save(database);
                    if (isSupportFieldNew)
                        importProjectSupportFieldCount++;
                    else
                        updateProjectSupportFieldCount++;

                    if (string.IsNullOrEmpty(supportSubFieldName))
                        continue;

                    isSupportSubFieldNew = false;
                    ProjectSupportSubField projectsupportSubfield = database.ProjectSupportSubFields.GetByName(supportSubFieldName, projectSupportField.ID);
                    if (projectsupportSubfield == null)
                    {
                        projectsupportSubfield = new ProjectSupportSubField();
                        isSupportSubFieldNew = true;
                    }

                    projectsupportSubfield.IsAvailable = projectsupportSubfield.IsNew ? true : projectsupportSubfield.IsAvailable;
                    projectsupportSubfield.Name = supportSubFieldName;
                    projectsupportSubfield.ProjectSupportField = projectSupportField;

                    projectsupportSubfield.Save(database);
                    if (isSupportSubFieldNew)
                        importProjectSupportSubFieldCount++;
                    else
                        updateProjectSupportSubFieldCount++;
                }
                catch (Exception e)
                {
                    writer.WriteLine(string.Format("导入项目资助领域发生错误，资助领域名称为{0}，子领域名称为：{1}，错误信息为：{2}\n", supportFieldName, supportSubFieldName, e.Message));
                }
            }

            importLog.AppendFormat("共导入项目资助领域{0}条，资助子领域{1}条；更新项目资助领域{2}条，项目资助子领域{3}条\n", importProjectSupportFieldCount, importProjectSupportSubFieldCount, updateProjectSupportFieldCount, updateProjectSupportSubFieldCount);

            writer.WriteLine(importLog.ToString());

            httpContext.DeleteFile(postedFile.FileName);
            writer.Close();

            return logName;
        }
    }
}
