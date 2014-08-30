using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Web;
using System.Web.Services;

using Srims.Server.Business.Papers;

using Srims.Server.UI;
using Srims.Server.UI.HttpExtension;
using Srims.Server.UI.Papers;
using Srims.Server.Business.Common;

namespace Srims.WebSite.Service.Papers
{
    /// <summary>
    /// Summary description for LiberalArtsPaperAuthor
    /// </summary>
    [WebService(Namespace = "http://tempuri.org/")]
    [WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
    [System.ComponentModel.ToolboxItem(false)]
    // To allow this Web Service to be called from script, using ASP.NET AJAX, uncomment the following line. 
    // [System.Web.Script.Services.ScriptService]
    public class LiberalArtsPaperAuthorWebService : WebServiceBase
    {

        [WebMethod]
        public void GetByPaperID()
        {
            var paperID = Request.GetInt("PaperID").HasValue ? Request.GetInt("PaperID").Value : 0;

            Response.WriteXmlHead();
            Database
                .LiberalArtsPaperAuthors
                .GetByPaperID(paperID)
                .Show(Response);
        }
        [WebMethod]
        public void Delete()
        {
            var paperAuthor = Request.GetEntity<LiberalArtsPaperAuthor>(Database.LiberalArtsPaperAuthors, "liberalArtsPaperAuthorID");

            if (paperAuthor != null)
            {
                var description = string.Format("删除论文：{0}(ID:{1}) 的作者；\n删除的作者名称为：{2}，位次为：{3}", paperAuthor.LiberalArtsPaper.ResultsName, paperAuthor.LiberalArtsPaper.ID, paperAuthor.Name, paperAuthor.Order);
               
                paperAuthor.Delete(Database);
            }
        }
        [WebMethod]
        public void Save()
        {
            //var oldPaperAuthor = Request.GetOldLiberalArtsPaperAuthor(Database);
            var paperAuthor = Request.GetLiberalArtsPaperAuthor(Database);
            var description = "";
            paperAuthor.Save(Database);
            if (paperAuthor.IsNew)
                description = string.Format("对论文‘{0}’添加作者：{1}。\n", paperAuthor.LiberalArtsPaper.ResultsName, paperAuthor.Name);

            else
                description = string.Format("对ID为：{0}的作者做如下修改：\n", paperAuthor.ID)+ string.Format("\n此作者对应的论文为：{0}，ID为：{1}", paperAuthor.LiberalArtsPaper.ResultsName, paperAuthor.LiberalArtsPaper.ID);

           
          
        }
    }
}
