using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Transactions;
using System.Web;
using System.Web.Services;
using System.Web.Services.Protocols;
using System.Xml.Linq;

using Srims.Server.Business.Awards;
using Srims.Server.Business.Users;
using Srims.Server.Business.Common;

using Srims.Server.UI;
using Srims.Server.UI.Awards;
using Srims.Server.UI.HttpExtension;
using Srims.Server.UI.MISExtension;
using Srims.Server.UI.Users;

using Srims.Server.DataExchange;
using Srims.Server.DataExchange.AwardImport;

namespace Srims.WebSite.Service.Awards
{
    [WebService(Namespace = "http://srims.ouc.edu.cn/")]
    [WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
    [ToolboxItem(false)]
    public class AwardService : WebServiceBase
    {
        [WebMethod]
        public void Query()
        {
            Response.WriteXmlHead();
            Database
                .Awards
                .Query(Request.GetAwardQueryInformation(), User, Database)
                .Show(Response, User, Database);
        }
        [WebMethod]
        public void GetAttendTypeItems()
        {
            Response.WriteXmlHead();
            Database
                .Awards
                .GetAttendTypes()
                .Show(Response);
        }
        [WebMethod]
        public void GetById()
        {
            var award = Request.GetEntity<Award>(Database.Awards, "AwardID");

            Response.WriteXmlHead();
            List<Award> listAward = new List<Award>();
            listAward.Add(award);
            listAward.Show(Response, User, Database);
        }
        [WebMethod]
        public void GetClassItems()
        {
            Response.WriteXmlHead();
            Database
                .Awards
                .GetClasses()
                .Show(Response);
        }
        [WebMethod]
        public void GetClassificationItems()
        {
            Response.WriteXmlHead();
            Database
                .Awards
                .GetClassification()
                .Show(Response);
        }
        [WebMethod]
        public void GetRankItems()
        {
            Response.WriteXmlHead();
            Database
                .Awards
                .GetRanks()
                .Show(Response);
        }
        [WebMethod]
        public void GetAuthorUnitItems()
        {
            Response.WriteXmlHead();
            Database
                .Awards
                .GetAuthorUnit()
                .Show(Response);
        }
        [WebMethod]
        public void DeleteAward()
        {
            var award = Request.GetEntity<Award>(Database.Awards, "AwardID");
            int id = award.ID;
            award.FirstWinner = null;
            foreach (AwardWinner aw in Database.AwardWinners)
                if (aw.AwardID == id) aw.Delete(Database);

            if (award != null)
            {
                using (TransactionScope ts = new TransactionScope())
                {
                    var description = string.Format("删除奖励：{0}。 ", award.Name);
                    Log.Write(User.Name, (int)LogType.AwardDelete, description, Request.UserHostAddress, "删除奖励", Database);
                    award.Delete(Database);
                    ts.Complete();
                }
            }
        }
        [WebMethod]
        public void SaveAward()
        {
            var oldAward = Request.GetOldEntity(Database);
            var award = Request.GetAward(Database);
            using (TransactionScope ts = new TransactionScope())
            {
                var description = award.IsNew ? "添加" : "编辑";
                description += string.Format("奖励\n 奖励的名称为：{0}。\n", award.Name)
                    + Log.GetEditOperationDescription(oldAward, award, Award.GetDescriptionItems(), award.IsNew);
                Log.Write(User.Name, award.IsNew ? (int)LogType.AwardAdd : (int)LogType.AwardEdit, description, Request.UserHostAddress, award.IsNew ? "添加奖励" : "编辑奖励", Database);

                award.Save(Database);

                Response.WriteXmlHead();
                award.ShowInList(Response, User, Database, AwardShowExtension.ShowAward);
                ts.Complete();
            }
        }
        [WebMethod]
        public void SearchAwardName()
        {
            string keyWord = Request.GetString("Query");

            Response.WriteXmlHead();
            Database
                .Awards
                .SearchAwardName(keyWord)
                .Show(Response);
        }

        [WebMethod]
        public void Import()
        {
            var postedFiles = Request.GetHttpFiles();
            string logName = Context.ImportAward(postedFiles[0], Request, User);

            Response.Write("<html><body>{ success: true, LogDocumentName: '" + logName + "' }</body></html>");
        }
    }
}
