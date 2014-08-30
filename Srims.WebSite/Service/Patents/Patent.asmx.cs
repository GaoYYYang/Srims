using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Transactions;
using System.Web;
using System.Web.Services;

using Srims.Server.Business.Common;
using Srims.Server.Business.Patents;
using Srims.Server.Business.Users;

using Srims.Server.UI;
using Srims.Server.UI.HttpExtension;
using Srims.Server.UI.MISExtension;
using Srims.Server.UI.Patents;
using Srims.Server.UI.Users;

using Srims.Server.DataExchange;
using Srims.Server.DataExchange.PatentImport;

namespace Srims.WebSite.Service.Patents
{
    [WebService(Namespace = "http://srims.ouc.edu.cn/")]
    [WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
    [ToolboxItem(false)]
    public class PatentService : WebServiceBase
    {
        [WebMethod]
        public void Query()
        {
            Response.WriteXmlHead();
            Database.Patents
                .Query(Request.GetPatentQueryInformation(), User, Database)
                .Show(Response, User, Database);
        }
        [WebMethod]
        public void GetCategoryItems()
        {
            Response.WriteXmlHead();
            Database
                .Patents
                .GetCategorys()
                .Show(Response);
        }
        [WebMethod]
        public void GetCountryItems()
        {
            Response.WriteXmlHead();
            Database
                .Patents
                .GetCountrys()
                .Show(Response);
        }
        [WebMethod]
        public void GetById()
        {
            var patent = Request.GetEntity<Patent>(Database.Patents, "PatentID");

            Response.WriteXmlHead();
            List<Patent> listPatent = new List<Patent>();
            listPatent.Add(patent);
            listPatent.Show(User, Response, Database);
        }
        [WebMethod]
        public void DeletePatent()
        {
            var patent = Request.GetEntity<Patent>(Database.Patents, "PatentID");
            int id = patent.ID;
            foreach (PatentInventer inventer in Database.PatentInventers)
                if (inventer.PatentID == id) inventer.Delete(Database);

            if (patent != null)
            {
                using (TransactionScope ts = new TransactionScope())
                {
                    var description = string.Format("删除专利，专利名为：{0}，专利号为：{1}。\n", patent.Name, patent.Number);
                    Log.Write(User.Name, (int)LogType.PatentDelete, description, Request.UserHostAddress, "删除专利", Database);
                    patent.Delete(Database);
                    ts.Complete();
                }
            }
        }

        [WebMethod]
        public void SavePatent()
        {
            var oldPatent = Request.GetOldPatent(Database);
            var patent = Request.GetPatent(Database);
            using (TransactionScope ts = new TransactionScope())
            {
                var description = patent.IsNew ? "新建专利" : "编辑专利";
                description += string.Format("\n专利名为：{0}，专利号为：{1}。\n", patent.Name, patent.Number) + Log.GetEditOperationDescription(oldPatent, patent, Patent.GetPatentDescriptionItems(), patent.IsNew);
                Log.Write(User.Name, patent.IsNew ? (int)LogType.PatentAdd : (int)LogType.PatentEdit, description, Request.UserHostAddress, patent.IsNew ? "添加专利" : "编辑专利", Database);

                patent.Save(Database);

                Response.WriteXmlHead();
                patent.ShowInList(Response, User, Database, PatentShowExtension.ShowPatent);
                ts.Complete();
            }
        }
        [WebMethod]
        public void Import()
        {
            var postedFiles = Request.GetHttpFiles();
            string logName = Context.ImportPatent(postedFiles[0], Request, User);

            Response.Write("<html><body>{ success: true, LogDocumentName: '" + logName + "' }</body></html>");
        }
    }
}
