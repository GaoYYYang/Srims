using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Services;
using System.ComponentModel;

using Srims.Server.Business;
using Srims.Server.Business.Stamps;
using Srims.Server.Business.Users;

using Srims.Server.UI;
using Srims.Server.UI.Stamps;
using Srims.Server.UI.HttpExtension;
using Srims.Server.UI.MISExtension;
using Srims.Server.Business.Common;
using System.Transactions;

namespace Srims.WebSite.Service.Stamps
{
    [WebService(Namespace = "http://srims.ouc.edu.cn/")]
    [WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
    [ToolboxItem(false)]
    public class StuffStampWebService : WebServiceBase
    {
        [WebMethod]
        public void GetByStampStuffID()
        {
            var stampStuffID = Request.GetInt("StuffID").HasValue ? Request.GetInt("StuffID").Value : 0;

            Response.WriteXmlHead();
            Database
                .StuffStamps
                .GetStuffStampsByStuff(stampStuffID)
                .Show(Response, User, Database, StuffStampExtension.ShowStuffStamp);
        }
        [WebMethod]
        public void GetStampTypes()
        {
            Response.WriteXmlHead();
            Database
               .StuffStamps
               .GetStampType()
               .Show(Response);
        }
        [WebMethod]
        public void Save()
        {
            var oldStampType = Request.GetOldStuffStamp(Database, User);
            var stampType = Request.GetStuffStamp(Database, User);
            using (TransactionScope ts = new TransactionScope())
            {
                var description = stampType.IsNew ? "新建" : "编辑";
                description += string.Format("章型\n  对应的盖章材料的名称为：{0}，对应的章型为：{1}。\n", stampType.Stuff.StuffName, stampType.Stamp.Type)
                    + Log.GetEditOperationDescription(oldStampType, stampType, StuffStamp.GetDescriptionItems(), stampType.IsNew);
                Log.Write(User.Name, stampType.IsNew ? (int)LogType.NewStampType : (int)LogType.EditStampType, description, Request.UserHostAddress, stampType.IsNew ? "新建材料章型" : "编辑材料章型", Database);

                stampType.Save(Database);
                ts.Complete();
            }
        }
        [WebMethod]
        public void Delete()
        {
            var stampType = Request.GetEntity<StuffStamp>(Database.StuffStamps, "StuffStampID");

            if (stampType != null)
                using (TransactionScope ts = new TransactionScope())
                {
                    var description = string.Format("删除材料章型，对应的盖章材料的ID为：{0}，对应图章的ID为：{1}。", stampType.StuffID, stampType.StampID);
                    Log.Write(User.Name, (int)LogType.DeleteStampType, description, Request.UserHostAddress, "删除材料章型", Database);

                    stampType.Delete(Database);
                    ts.Complete();
                }
        }
    }
}
