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
using Srims.Server.Business.Stamps;
using System.Transactions;
using Srims.Server.Business.Users;
using Srims.Server.Business.Common;

namespace Srims.WebSite.Service.Stamps
{
    [WebService(Namespace = "http://srims.ouc.edu.cn/")]
    [WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
    [ToolboxItem(false)]
    public class StampWebService : WebServiceBase
    {
        [WebMethod]
        public void Query()
        {
            Response.WriteXmlHead();
            List<Stamp> stamps = Database.Stamps.Where(s => !s.IsDelete).ToList();
            stamps.Show(Response, User, Database, StampExtension.Show);
        }

        [WebMethod]
        public void Search()
        {
            Response.WriteXmlHead();
            int stuffId = Request.GetInt("stuffID").Value;
            List<Stamp> stamps = Database.Stamps.Where(s => !s.IsDelete).ToList();
            stamps.Show(Response, User, Database, stuffId);
        }

        [WebMethod]
        public void Save()
        {
            var oldStamp = Request.GetOldStamp(Database, User);
            var stamp = Request.GetStamp(Database, User);
            using (TransactionScope ts = new TransactionScope())
            {
                var description = stamp.IsNew ? "新建" : "编辑";
                description += string.Format("图章信息\n  对应的图章章型为：{0}，持有者为：{1}。\n", stamp.Type, stamp.Owner.Name)
                    + Log.GetEditOperationDescription(oldStamp, stamp, Stamp.GetDescriptionItems(), stamp.IsNew);
                Log.Write(User.Name, stamp.IsNew ? (int)LogType.AddStamp : (int)LogType.EditStamp, description, Request.UserHostAddress, stamp.IsNew ? "新建印章" : "编辑印章", Database);

                stamp.Save(Database);
                ts.Complete();
            }
        }
        [WebMethod]
        public void Delete()
        {
            var stamp = Request.GetEntity<Stamp>(Database.Stamps, "StampID");

            if (stamp != null)
                using (TransactionScope ts = new TransactionScope())
                {
                    var description = string.Format("删除印章\n对应的章型为：{0}，\n对应拥有者为：{1}。", stamp.Type, stamp.Owner.Name);
                    Log.Write(User.Name, (int)LogType.DeleteStamp, description, Request.UserHostAddress, "删除印章", Database);

                    stamp.Delete(Database);
                    ts.Complete();
                }
        }
    }
}
