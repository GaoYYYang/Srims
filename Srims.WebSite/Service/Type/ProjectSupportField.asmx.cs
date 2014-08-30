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

using Srims.Server.DataExchange.TypeImport;
using System.Transactions;

namespace Srims.WebSite.Service.Type
{
    [WebService(Namespace = "http://srims.ouc.edu.cn/")]
    [WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
    [ToolboxItem(false)]
    public class ProjectSupportFieldService : WebServiceBase
    {
        [WebMethod]
        public void Query()
        {
            Response.WriteXmlHead();
            Database
                .ProjectSupportFields
                .Get(Request.GetInt("ProjectTypeID").Value)
                .Show(Response, User, Database);
        }
        [WebMethod]
        public void Save()
        {
            var oldProjectSupportField = Request.GetOldProjectSupportField(Database, User);
            var projectSupportField = Request.GetProjectSupportField(Database, User);
            using (TransactionScope ts = new TransactionScope())
            {
                var description = projectSupportField.IsNew ? "添加" : "编辑";
                description += string.Format("项目资助领域\n   对应的项目资助领域名称为：{0}。", projectSupportField.Name)
                    + Log.GetEditOperationDescription(oldProjectSupportField, projectSupportField, ProjectSupportField.GetDescriptionItems(), projectSupportField.IsNew);
                Log.Write(User.Name, projectSupportField.IsNew ? (int)LogType.ProjectSupportFieldNew : (int)LogType.ProjectSupportFieldEdit, description, Request.UserHostAddress, projectSupportField.IsNew ? "添加项目资助领域" : "编辑项目资助领域", Database);
                projectSupportField.Save(Database);
                ts.Complete();
            }

        }
        [WebMethod]
        public void Delete()
        {
            var projectSupportField = Request.GetEntity<ProjectSupportField>(Database.ProjectSupportFields, "projectSupportFieldID");

            if (projectSupportField != null)
            {
                using (TransactionScope ts = new TransactionScope())
                {
                    var description = string.Format("删除项目资助领域：{0}。 ", projectSupportField.Name);
                    Log.Write(User.Name, (int)LogType.ProjectSupportFiedDelete, description, Request.UserHostAddress, "删除项目资助领域", Database);
                    projectSupportField.Delete(Database);
                    ts.Complete();
                }
            }
        }
        [WebMethod]
        public void Import()
        {
            var postedFiles = Request.GetHttpFiles();
            string logName = Context.ImportProjectsupportField(postedFiles[0], Request, User);

            Response.Write("<html><body>{ success: true, LogDocumentName: '" + logName + "' }</body></html>");
        }
    }
}
