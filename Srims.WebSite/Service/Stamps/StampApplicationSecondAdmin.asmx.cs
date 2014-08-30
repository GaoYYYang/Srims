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
    public class StampApplicationSecondAdminWebService : WebServiceBase
    {
        [WebMethod]
        public void Query()
        {
            Response.WriteXmlHead();
            if (Request.GetInt("StampApplicationTypeID").HasValue)
                Database
                    .StampApplicationSecondAdmins
                    .Query(Request.GetInt("StampApplicationTypeID").Value, User)
                    .Show(Response, User, Database);
        }

        [WebMethod]
        public void Save()
        {
            var oldStampApplicationSecondAdmin = Request.GetOldStampApplicationSecondAdmin(Database, User);
            var stampApplicationSecondAdmin = Request.GetStampApplicationSecondAdmin(Database, User);
            using (TransactionScope ts = new TransactionScope())
            {
                var description = stampApplicationSecondAdmin.IsNew ? "新建" : "编辑";
                description += string.Format("为文印申请{0}添加文印申请二级审核权限\n ：{1}。\n", stampApplicationSecondAdmin.StampApplicationType.Name, stampApplicationSecondAdmin.User.Name) ;
                Log.Write(User.Name, stampApplicationSecondAdmin.IsNew ? (int)LogType.AddStamp : (int)LogType.EditStamp, description, Request.UserHostAddress, stampApplicationSecondAdmin.IsNew ? "新建文印申请二级审核权限" : "编辑文印申请二级审核权限", Database);

                stampApplicationSecondAdmin.Save(Database);
                ts.Complete();
            }
        }
        [WebMethod]
        public void Delete()
        {
            var stampApplicationSecondAdmin = Request.GetEntity<StampApplicationSecondAdmin>(Database.StampApplicationSecondAdmins, "ID");

            if (stampApplicationSecondAdmin != null)
                using (TransactionScope ts = new TransactionScope())
                {
                    var description = string.Format("删除文印申请{0}二级审核权限\n对应的为：{1}。", stampApplicationSecondAdmin.StampApplicationType.Name, stampApplicationSecondAdmin.User.Name);
                    Log.Write(User.Name, (int)LogType.DeleteStamp, description, Request.UserHostAddress, "删除文印申请二级审核权限", Database);

                    stampApplicationSecondAdmin.Delete(Database);
                    ts.Complete();
                }
        }
    }
}
