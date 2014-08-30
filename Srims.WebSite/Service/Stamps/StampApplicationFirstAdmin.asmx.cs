using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Services;
using System.ComponentModel;

using Srims.Server.UI;
using Srims.Server.UI.HttpExtension;
using Srims.Server.UI.MISExtension;

using Srims.Server.UI.Stamps;
using Srims.Server.Business;
using Srims.Server.Business.Stamps;
using System.Transactions;
using Srims.Server.Business.Users;
using Srims.Server.Business.Common;

namespace Srims.WebSite.Service.Stamps
{
    [WebService(Namespace = "http://srims.ouc.edu.cn/")]
    [WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
    [ToolboxItem(false)]
    public class StampApplicationFirstAdminWebService : WebServiceBase
    {
        [WebMethod]
        public void Query()
        {
            Response.WriteXmlHead();
            if (Request.GetInt("StampApplicationTypeID").HasValue)
                Database
                    .StampApplicationFirstAdmins
                    .Query(Request.GetInt("StampApplicationTypeID").Value, User)
                    .Show(Response, User, Database);
        }

        [WebMethod]
        public void Save()
        {
            var oldStampApplicationFirstAdmin = Request.GetOldStampApplicationFirstAdmin(Database, User);
            var stampApplicationFirstAdmin = Request.GetStampApplicationFirstAdmin(Database, User);
            using (TransactionScope ts = new TransactionScope())
            {
                var description = stampApplicationFirstAdmin.IsNew ? "新建" : "编辑";
                description += string.Format("为文印申请{0}添加文印申请一级审核权限\n ：{1}。\n", stampApplicationFirstAdmin.StampApplicationType.Name, stampApplicationFirstAdmin.User.Name);
                Log.Write(User.Name, stampApplicationFirstAdmin.IsNew ? (int)LogType.AddStamp : (int)LogType.EditStamp, description, Request.UserHostAddress, stampApplicationFirstAdmin.IsNew ? "新建文印申请一级审核权限" : "编辑文印申请一级审核权限", Database);

                stampApplicationFirstAdmin.Save(Database);
                ts.Complete();
            }
        }
        [WebMethod]
        public void Delete()
        {
            var stampApplicationFirstAdmin = Request.GetEntity<StampApplicationFirstAdmin>(Database.StampApplicationFirstAdmins, "ID");

            if (stampApplicationFirstAdmin != null)
                using (TransactionScope ts = new TransactionScope())
                {
                    var description = string.Format("删除文印申请{0}一级审核权限\n对应的为：{1}。", stampApplicationFirstAdmin.StampApplicationType.Name, stampApplicationFirstAdmin.User.Name);
                    Log.Write(User.Name, (int)LogType.DeleteStamp, description, Request.UserHostAddress, "删除文印申请一级审核权限", Database);

                    stampApplicationFirstAdmin.Delete(Database);
                    ts.Complete();
                }
        }
    }
}
