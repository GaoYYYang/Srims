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
    [WebService(Namespace = "http://srims.ouc.edu.cn/")]
    [WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
    [ToolboxItem(false)]

    public class PaperService : WebServiceBase
    {
        
        [WebMethod]
        public void Query()
        {
            Response.WriteXmlHead();
            Database
                .Papers
                .Query(Request.GetPaperQueryInformation(), User, Database)
                .Show(Response, User, Database);
        }
        [WebMethod]
        public void GetPaperColleges()
        {
            Response.WriteXmlHead();
            Database
              .Papers
              .GetPaperColleges()
              .Show(Response);
        }
        [WebMethod]
        public void GetLabs()
        {
            Response.WriteXmlHead();
            Database
                .Papers
                .GetLabs()
                .Show(Response);
        }
        [WebMethod]
        public void GetById()
        {
            var paper = Request.GetEntity<Paper>(Database.Papers, "paperID");

            Response.WriteXmlHead();
            List<Paper> listPaper = new List<Paper>();
            listPaper.Add(paper);
            listPaper.Show(User, Response, Database);
        }
        [WebMethod]
        public void Save()
        {
            var oldPaper = Request.GetOldPaper(Database);
            var paper = Request.GetPaper(Database);
            List<PaperIndexedType> indexedList = Request.GetIndexedTypeList();


            if (!User.CanEdit(paper, Database))
                throw new HasNoPermissionException();

            using (TransactionScope ts = new TransactionScope())
            {
                var description = (paper.IsNew ? "添加" : "编辑") + string.Format("论文\n 论文名称为：{0}。\n", paper.Name)
                    + Log.GetEditOperationDescription(oldPaper, paper, Paper.GetPaperDescriptionItems(), paper.IsNew);
                Log.Write(User.Name, paper.IsNew ? (int)LogType.PaperAdd : (int)LogType.PaperEdit, description, Request.UserHostAddress, paper.IsNew ? "添加论文" : "编辑论文", Database);
                paper.Save(Database);

                if (!paper.IsNew)
                    foreach (var indexed in paper.GetPaperIndexeds(Database.PaperIndexeds))
                    {
                        description = string.Format("删除论文：{0}的收录信息。\n ", paper.Name);
                        Log.Write(User.Name, (int)LogType.PaperIndexDelete, description, Request.UserHostAddress, "删除论文的收录信息", Database);
                        indexed.Delete(Database);
                    }
                if (indexedList != null && indexedList.Count > 0)
                    foreach (var indexedType in indexedList)
                    {
                        PaperIndexed indexed = new PaperIndexed();
                        indexed.Paper = paper;
                        indexed.Indexed = indexedType;
                        description = string.Format("添加论文：{0}的收录信息。\n", paper.Name)
                            + Log.GetEditOperationDescription(new PaperIndexed(), indexed, PaperIndexed.GetDescriptionItems(), indexed.IsNew);
                        Log.Write(User.Name, (int)LogType.PaperIndexAdd, description, Request.UserHostAddress, "添加论文收录信息", Database);

                        indexed.Save(Database);
                    }
                ts.Complete();
            }
            Response.WriteXmlHead();
            paper.ShowInList(Response, User, Database, PaperExtension.ShowPaper);
        }
        [WebMethod]
        public void Delete()
        {
            var paper = Request.GetEntity<Paper>(Database.Papers, "paperID");

            if (paper != null)
            {
                using (TransactionScope ts = new TransactionScope())
                {
                    Log.Write(User.Name, (int)LogType.PaperDelete, "删除  论文：" + paper.Name + "。", Request.UserHostAddress, "删除论文", Database);
                    paper.Delete(Database);
                    ts.Complete();
                }
            }
        }
        [WebMethod]
        public void Import()
        {
            var postedFiles = Request.GetHttpFiles();
            string logName = Context.ImportPaper(postedFiles[0], Request, User);

            Response.Write("<html><body>{ success: true, LogDocumentName: '" + logName + "' }</body></html>");
        }
    }
}
