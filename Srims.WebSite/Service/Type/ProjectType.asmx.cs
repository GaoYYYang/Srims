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
using Srims.Server.UI.Users;
using Srims.Server.UI.MISExtension;
using Srims.Server.Business.Common;
using System.Transactions;

namespace Srims.WebSite.Service.Type
{
    [WebService(Namespace = "http://srims.ouc.edu.cn/")]
    [WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
    [ToolboxItem(false)]
    public class ProjectTypeService : WebServiceBase
    {
        [WebMethod]
        public void GetForQuery()
        {
            Response.WriteXmlHead();
            Database
                .ProjectTypes
                .GetForQuery(Request.GetInt("ProjectRankID").Value, User)
                .Show(Response);
        }
        [WebMethod]
        public void GetForEdit()
        {
            Response.WriteXmlHead();
            Database
                .ProjectTypes
                .GetForEdit(Request.GetInt("ProjectRankID").Value, User)
                .Show(Response);
        }

        [WebMethod]
        public void GetHorizontalTypesForEdit()
        {
            var horizontalRankId = Database.ProjectRanks.Single(q => q.IsHorizontal && q.IsAvailable).ID;
            Response.WriteXmlHead();
            Database
                .ProjectTypes
                .GetForEdit(horizontalRankId, User)
                .Show(Response);
        }
        [WebMethod]
        public void Query()
        {
            Response.WriteXmlHead();
            Database
                .ProjectTypes
                .Query(Request.GetProjectTypeQueryInformation(), User)
                .ShowQueryResult(Response, User, Database);
        }
        [WebMethod]
        public void GetByRankId()
        {
            var rankId = Request.GetInt("projectRankId").Value;

            Response.WriteXmlHead();

            Database
                .ProjectTypes
                .Get(rankId)
                .Show(Response, ProjectTypeExtension.ShowProjectType);
        }
        [WebMethod]
        public void Save()
        {
            var oldProjectType = Request.GetOldProjectType(Database, User);
            var projectType = Request.GetProjectType(Database, User);
            using (TransactionScope ts = new TransactionScope())
            {
                var description = projectType.IsNew ? "添加" : "编辑";
                description += string.Format("项目类别\n   对应的项目类别名称为：{0}。", projectType.Name)
                    + Log.GetEditOperationDescription(oldProjectType, projectType, ProjectType.GetDescriptionItems(), projectType.IsNew)
                    + "\n附注：此处记录的管理费率的值是数据库中存储的值，该值除以100以后才是前台显示的值。";
                Log.Write(User.Name, projectType.IsNew ? (int)LogType.ProjectTypeNew : (int)LogType.ProjectTypeEdit, description, Request.UserHostAddress, projectType.IsNew ? "添加项目类别" : "编辑项目类别", Database);

                projectType.Save(Database);
                Response.WriteXmlHead();
                projectType.ShowInList(Response, User, Database, ProjectTypeExtension.ShowProjectType);
                ts.Complete();
            }

        }
        [WebMethod]
        public void Delete()
        {
            var projectType = Request.GetEntity<ProjectType>(Database.ProjectTypes, "projectTypeID");

            if (projectType != null)
            {
                using (TransactionScope ts = new TransactionScope())
                {
                    var description = string.Format("删除项目类别：{0}。 ", projectType.Name);
                    Log.Write(User.Name, (int)LogType.ProjectTypeDelete, description, Request.UserHostAddress, "删除项目类别", Database);

                    projectType.Delete(Database);
                    ts.Complete();
                }
            }
        }
    }
}
