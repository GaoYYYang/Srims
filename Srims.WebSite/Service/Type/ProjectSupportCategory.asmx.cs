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
    public class ProjectSupportCategoryService : WebServiceBase
    {
        [WebMethod]
        public void Query()
        {
            Response.WriteXmlHead();
            Database
                .ProjectSupportCategories
                .Get(Request.GetInt("ProjectTypeID").Value)
                .Show(Response, User, Database);
        }
        [WebMethod]
        public void Save()
        {
            var oldProjectSupportCategory = Request.GetOldEntity(Database, User);
            var projectSupportCategory = Request.GetProjectSupportCategory(Database, User);
            using (TransactionScope ts = new TransactionScope())
            {
                var description = projectSupportCategory.IsNew ? "添加" : "编辑";
                description += string.Format("项目资助类别\n   对应的项目资助类别名称为：{0}。", projectSupportCategory.Name)
                    + Log.GetEditOperationDescription(oldProjectSupportCategory, projectSupportCategory, ProjectSupportCategory.GetDescriptionItems(), projectSupportCategory.IsNew);
                Log.Write(User.Name, projectSupportCategory.IsNew ? (int)LogType.ProjectSupportCategoryNew : (int)LogType.ProjectSupportCategoryEdit, description, Request.UserHostAddress, projectSupportCategory.IsNew ? "添加项目资助类别" : "编辑项目资助类别", Database);
                projectSupportCategory.Save(Database);
                ts.Complete();
            }
        }
        [WebMethod]
        public void Delete()
        {
            var projectSupportCategory = Request.GetEntity<ProjectSupportCategory>(Database.ProjectSupportCategories, "projectSupportCategoryID");

            if (projectSupportCategory != null)
            {
                using (TransactionScope ts = new TransactionScope())
                {
                    var description = string.Format("删除项目资助类型：{0}。 ", projectSupportCategory.Name);
                    Log.Write(User.Name, (int)LogType.ProjectSupportCategoryDelete, description, Request.UserHostAddress, "删除项目资助类型", Database);
                    projectSupportCategory.Delete(Database);
                    ts.Complete();
                }
            }
        }
    }
}
