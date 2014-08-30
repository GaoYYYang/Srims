using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Services;
using System.ComponentModel;

using Srims.Server.UI;
using Srims.Server.UI.Stamps;
using Srims.Server.UI.HttpExtension;
using Srims.Server.UI.MISExtension;
using Srims.Server.Business.Stamps;
using System.Transactions;
using Srims.Server.Business.Common;

namespace Srims.WebSite.Service.Stamps
{
    [WebService(Namespace = "http://srims.ouc.edu.cn/")]
    [WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
    [ToolboxItem(false)]
    public class StuffWebService : WebServiceBase
    {

        [WebMethod]
        public void GetByStampID()
        {
            var stampID = Request.GetInt("StampApplicationID").HasValue ? Request.GetInt("StampApplicationID").Value : 0;

            Response.WriteXmlHead();
            Database
                .Stuffs
                .GetStampStuffs(stampID)
                .Show(Response, User, Database, StuffExtension.ShowStuff);
        }
        [WebMethod]
        public void GetStuffTypes()
        {
            Response.WriteXmlHead();
            Database
               .Stuffs
               .GetStuffType()
               .Show(Response);
        }
        [WebMethod]
        public void Save()
        {
            var oldStampStuff = Request.GetOldStuff(Database, User);
            var stampStuff = Request.GetStuff(Database, User);
            using (TransactionScope ts = new TransactionScope())
            {
                var description = stampStuff.IsNew ? "添加" : "编辑";
                description += string.Format("盖章材料\n  对应的材料名称为：{0}。", stampStuff.StuffName)
                    + Log.GetEditOperationDescription(oldStampStuff, stampStuff, Stuff.GetDescriptionItems(), stampStuff.IsNew);
                Log.Write(User.Name, stampStuff.IsNew ? (int)LogType.NewStampStuff : (int)LogType.EditStampStuff, description, Request.UserHostAddress, stampStuff.IsNew ? "新建盖章材料" : "编辑盖章材料", Database);

                stampStuff.Save(Database);
                ts.Complete();
            }
            Response.WriteXmlHead();
            stampStuff.ShowInList(Response, User, Database, StuffExtension.ShowStuff);
        }
        [WebMethod]
        public void Delete()
        {

            var stampStuff = Request.GetEntity<Stuff>(Database.Stuffs, "stuffID");

            if (stampStuff != null)
                using (TransactionScope ts = new TransactionScope())
                {
                    var description = string.Format("删除盖章材料：{0}，\n对应的文印申请的ID为：{1}", stampStuff.StuffName, stampStuff.StampApplicationID);
                    Log.Write(User.Name, (int)LogType.DeleteStampStuff, description, Request.UserHostAddress, "删除盖章材料", Database);


                    stampStuff.Delete(Database);
                    HttpPostedFileExtension.Delete(HttpContext.Current, stampStuff.StuffDocument, Database);
                    ts.Complete();
                }
        }
        [WebMethod]
        public void UpLoadDocument()
        {
            var postedFiles = Request.GetHttpFiles();
            if (postedFiles.Count == 0)
                return;

            var guid = postedFiles[0].Save(HttpContext.Current, Database);

            Response.Write("<html><body>{ success: true, guid: '" + guid.ToString() + "' }</body></html>");
        }
    }
}
