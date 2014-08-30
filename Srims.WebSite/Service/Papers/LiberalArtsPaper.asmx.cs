using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Transactions;
using System.Web;
using System.Web.Services;

using Srims.Server.Business;
using Srims.Server.Business.Common;
using Srims.Server.Business.Papers;
using Srims.Server.Business.Users;

using Srims.Server.UI;
using Srims.Server.UI.HttpExtension;
using Srims.Server.UI.MISExtension;
using Srims.Server.UI.Papers;
using Srims.Server.UI.Users;

using Srims.Server.DataExchange;
using Srims.Server.DataExchange.PaperImport;

namespace Srims.WebSite.Service.Papers
{
    /// <summary>
    /// Summary description for LiberalArtsPaper
    /// </summary>
    [WebService(Namespace = "http://tempuri.org/")]
    [WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
    [System.ComponentModel.ToolboxItem(false)]
    // To allow this Web Service to be called from script, using ASP.NET AJAX, uncomment the following line. 
    // [System.Web.Script.Services.ScriptService]
    public class LiberalArtsPaperService : WebServiceBase
    {
        [WebMethod]
        public void GetByPaperId()
        {
            var paper = Request.GetEntity<LiberalArtsPaper>(Database.LiberalArtsPapers, "paperID");

            Response.WriteXmlHead();
            List<LiberalArtsPaper> listPaper = new List<LiberalArtsPaper>();
            listPaper.Add(paper);
            listPaper.Show(User, Response, Database);
        }
        [WebMethod]
        public void Save()
        {
            var oldPaper = Request.GetOldLiberalArtsPaper(Database);
            var paper = Request.GetLiberalArtsPaper(Database);



            if (!User.CanEdit2(paper, Database))
                throw new HasNoPermissionException();

            using (TransactionScope ts = new TransactionScope())
            {
                var description = (paper.IsNew ? "添加" : "编辑") + string.Format("论文\n 论文名称为：{0}。\n", paper.ResultsName)
                    ;
                Log.Write(User.Name, paper.IsNew ? (int)LogType.PaperAdd : (int)LogType.PaperEdit, description, Request.UserHostAddress, paper.IsNew ? "添加论文" : "编辑论文", Database);
                paper.Save(Database);
                ts.Complete();
            }
            Response.WriteXmlHead();
            paper.ShowInList(Response, User, Database, LiberalArtsPaperExtension.ShowPaper);
        }

        [WebMethod]
        public void Query()
        {
            Response.WriteXmlHead();
            Database
                .LiberalArtsPapers
                .Query(Request.GetLiberalArtsPaperQueryInformation(), User, Database)
                .Show(Response, User, Database);
        }
        [WebMethod]
        public void Delete()
        {
            var paper = Request.GetEntity<LiberalArtsPaper>(Database.LiberalArtsPapers, "paperID");

            if (paper != null)
            {
                using (TransactionScope ts = new TransactionScope())
                {
                    Log.Write(User.Name, (int)LogType.PaperDelete, "删除  论文：" + paper.ResultsName + "。", Request.UserHostAddress, "删除论文", Database);
                    paper.Delete(Database);
                    ts.Complete();
                }
            }
        }
        [WebMethod]
        public void Import()
        {
            var postedFiles = Request.GetHttpFiles();
            string logName = Context.ImportLiberalArtsPaper(postedFiles[0], Request, User);

            Response.Write("<html><body>{ success: true, LogDocumentName: '" + logName + "' }</body></html>");
        }
    }
}
