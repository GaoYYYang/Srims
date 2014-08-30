using System;
using System.Collections;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Linq;
using System.Web;
using System.Web.Services;
using System.Web.Services.Protocols;
using System.Xml.Linq;
using System.Transactions;

using Srims.Server.Business;
using Srims.Server.Business.Bases;
using Srims.Server.Business.Users;
using Srims.Server.Business.Common;

using Srims.Server.UI;
using Srims.Server.UI.Bases;
using Srims.Server.UI.Projects;
using Srims.Server.UI.HttpExtension;
using Srims.Server.UI.MISExtension;

namespace Srims.WebSite.Service.Bases
{
    [WebService(Namespace = "http://srims.ouc.edu.cn/")]
    [WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
    [ToolboxItem(false)]
    public class BaseSevice : WebServiceBase
    {
        [WebMethod]
        public void Query()
        {
            Response.WriteXmlHead();
            Database
                .Bases
                .Query(Request.GetBaseQueryInformation(), User, Database)
                .Show(Response, User, Database, BaseExtension.ShowBase);
        }
        [WebMethod]
        public void GetForShow()
        {
            Response.WriteXmlHead();

            Database
                .Bases
                .ToList()
                .Show(Response, BaseExtension.ShowBaseForDropdownList);
        }
        [WebMethod]
        public void Save()
        {
            if (!User.HasPermission(PermissionItem.ManageBase, Database))
                throw new HasNoPermissionException();

            var oldBase = Request.GetOldEntity(Database);
            Base currentBase = Request.GetBase(Database);
            using (TransactionScope ts = new TransactionScope())
            {
                var description = currentBase.IsNew ? "添加" : "编辑";
                description += string.Format("基地\n   对应的基地名称为：{0}。", currentBase.Name)
                    + Log.GetEditOperationDescription(oldBase, currentBase, Base.GetDescriptionItems(), currentBase.IsNew);
                Log.Write(User.Name, currentBase.IsNew ? (int)LogType.BaseAdd : (int)LogType.BaseEdit, description, Request.UserHostAddress, currentBase.IsNew ? "添加基地" : "编辑基地", Database);

                currentBase.Save(Database);
                ts.Complete();
            }

            returnBase(currentBase);

        }
        [WebMethod]
        public void Delete()
        {
            Base currentBase = Request.GetEntity(Database.Bases, "BaseId");
            if (!User.HasPermission_Delete(currentBase, Database))
                throw new HasNoPermissionException();

            using (TransactionScope ts = new TransactionScope())
            {

                var description = string.Format("删除基地：{0}。", currentBase.Name);
                Log.Write(User.Name, (int)LogType.BaseDelete, description, Request.UserHostAddress, "删除基地", Database);

                currentBase.Delete(Database);
                ts.Complete();
            }
        }
        [WebMethod]
        public void GetProjects()
        {
            Base currentBase = Request.GetEntity(Database.Bases, "BaseId");

            currentBase
                .GetProject(Database.Projects)
                .Show(Response, User, Database, ProjectShowExtension.ShowForBase);
        }
        private void returnBase(Base currentBase)
        {
            Response.WriteXmlHead();
            List<Base> listBase = new List<Base>();
            listBase.Add(currentBase);
            listBase.Show(Response, User, Database, BaseExtension.ShowBase);
        }
    }
}
