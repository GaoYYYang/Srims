using System;
using System.Collections;
using System.ComponentModel;
using System.Data;
using System.Linq;
using System.Web;
using System.Web.Services;
using System.Web.Services.Protocols;
using System.Xml.Linq;

using Srims.Server.Business.Type;

using Srims.Server.UI;
using Srims.Server.UI.Type;
using Srims.Server.UI.HttpExtension;
using Srims.Server.Business.Common;
using System.Transactions;

namespace Srims.WebSite.Service.Type
{
    [WebService(Namespace = "http://srims.ouc.edu.cn/")]
    [WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
    [ToolboxItem(false)]
    public class ProjectSupportSubFieldService : WebServiceBase
    {
        [WebMethod]
        public void Query()
        {
            Response.WriteXmlHead();
            Database
                .ProjectSupportSubFields
                .Get(Request.GetInt("ProjectSupportFieldID").Value)
                .Show(Response, User, Database);
        }
        [WebMethod]
        public void Save()
        {
            var oldProjectSupportSubField = Request.GetOldProjectSupportSubField(Database, User);
            var projectSupportSubField = Request.GetProjectSupportSubField(Database, User);
            using (TransactionScope ts = new TransactionScope())
            {
                var description = projectSupportSubField.IsNew ? "添加" : "编辑";
                description += string.Format("项目资助子领域\n   对应的项目资助子领域名称为：{0}。", projectSupportSubField.Name)
                    + Log.GetEditOperationDescription(oldProjectSupportSubField, projectSupportSubField, ProjectSupportSubField.GetDescriptionItems(), projectSupportSubField.IsNew);
                Log.Write(User.Name, projectSupportSubField.IsNew ? (int)LogType.ProjectSupportSubFieldNew : (int)LogType.ProjectSupportSubFieldEdit, description, Request.UserHostAddress, projectSupportSubField.IsNew ? "添加项目资助子领域" : "编辑项目资助子领域", Database);

                projectSupportSubField.Save(Database);
                ts.Complete();
            }
        }
        [WebMethod]
        public void Delete()
        {
            var projectSupportSubField = Request.GetEntity<ProjectSupportSubField>(Database.ProjectSupportSubFields, "projectSupportSubFieldID");

            if (projectSupportSubField != null)
            {
                using (TransactionScope ts = new TransactionScope())
                {
                    var description = string.Format("删除项目资助子领域：{0}。", projectSupportSubField.Name);
                    Log.Write(User.Name, (int)LogType.ProjectSupportSubFieldDelete, description, Request.UserHostAddress, "删除项目资助子领域", Database);
                    projectSupportSubField.Delete(Database);
                    ts.Complete();
                }
            }
        }
    }
}
