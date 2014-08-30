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
    public class StampApplicationTypeWebService : WebServiceBase
    {
        [WebMethod]
        public void Query()
        {
            Response.WriteXmlHead();
            Database
                .StampApplicationTypes
                .Query(Request.GetStampApplicationTypeQueryInformation(), User)
                .Show(Response, User, Database);
        }
 
        [WebMethod]
        public void Save()
        {
            var oldStampApplicationType = Request.GetOldStampApplicationType(Database, User);
            var stampApplicationType = Request.GetStampApplicationType(Database, User);
            using (TransactionScope ts = new TransactionScope())
            {
                var description = stampApplicationType.IsNew ? "新建" : "编辑";
                description += string.Format("文印申请类型信息\n ：{0}。\n", stampApplicationType.Name);
                Log.Write(User.Name, stampApplicationType.IsNew ? (int)LogType.AddStamp : (int)LogType.EditStamp, description, Request.UserHostAddress, stampApplicationType.IsNew ? "新建文印申请类型信息" : "编辑文印申请类型信息", Database);

                stampApplicationType.Save(Database);
                ts.Complete();
            }
        }
        [WebMethod]
        public void Delete()
        {
            var stampApplicationType = Request.GetEntity<StampApplicationType>(Database.StampApplicationTypes, "ID");

            if (stampApplicationType != null)
                using (TransactionScope ts = new TransactionScope())
                {
                    var description = string.Format("删除文印申请类型信息\n对应的章型为：{0}。", stampApplicationType.Name);
                    Log.Write(User.Name, (int)LogType.DeleteStamp, description, Request.UserHostAddress, "删除文印申请类型", Database);
                    var firstAdmins = Database.StampApplicationFirstAdmins.Where(c => c.StampApplicationType == stampApplicationType);
                    var secondAdmins = Database.StampApplicationSecondAdmins.Where(c => c.StampApplicationType == stampApplicationType);
                    foreach (var item in firstAdmins)
                        item.Delete(Database);
                    foreach (var item in secondAdmins)
                        item.Delete(Database);

                    stampApplicationType.Delete(Database);
                    ts.Complete();
                }
        }
    }
}
