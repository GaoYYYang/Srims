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
    [WebService(Namespace = "http://srims.ouc.edu.cn/")]
    [WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
    [ToolboxItem(false)]

    public class PaperAuthorWebService : WebServiceBase
    {
        [WebMethod]
        public void GetByPaperID()
        {
            var paperID = Request.GetInt("PaperID").HasValue ? Request.GetInt("PaperID").Value : 0;

            Response.WriteXmlHead();
            Database
                .PaperAuthors
                .GetByPaperID(paperID)
                .Show(Response);
        }
        [WebMethod]
        public void Delete()
        {
            var paperAuthor = Request.GetEntity<PaperAuthor>(Database.PaperAuthors, "paperAuthorID");

            if (paperAuthor != null)
            {
                var description = string.Format("删除论文：{0}(ID:{1}) 的作者；\n删除的作者名称为：{2}，位次为：{3}", paperAuthor.Paper.Name, paperAuthor.Paper.ID, paperAuthor.Name, paperAuthor.Order);
                Log.Write(User.Name, (int)LogType.PaperAuthorDelete, description, Request.UserHostAddress, "删除论文作者", Database);

                paperAuthor.Delete(Database);
            }
        }
        [WebMethod]
        public void Save()
        {
            var oldPaperAuthor = Request.GetOldPaperAuthor(Database);
            var paperAuthor = Request.GetPaperAuthor(Database);
            var description = "";
            if (paperAuthor.IsNew)
                description = string.Format("对论文‘{0}’添加作者：{1}。\n", paperAuthor.Paper.Name, paperAuthor.Name)
                    + Log.GetEditOperationDescription(oldPaperAuthor, paperAuthor, PaperAuthor.GetPaperAuthorDescriptionItems(), paperAuthor.IsNew);
            else
                description = string.Format("对ID为：{0}的作者做如下修改：\n", paperAuthor.ID)
                   + Log.GetEditOperationDescription(oldPaperAuthor, paperAuthor, PaperAuthor.GetPaperAuthorDescriptionItems(), paperAuthor.IsNew)
                   + string.Format("\n此作者对应的论文为：{0}，ID为：{1}", paperAuthor.Paper.Name, paperAuthor.Paper.ID);

            Log.Write(User.Name, paperAuthor.IsNew ? (int)LogType.PaperAuthorAdd : (int)LogType.PaperAuthorEdit, description, Request.UserHostAddress, paperAuthor.IsNew ? "添加论文作者" : "编辑论文作者", Database);

            paperAuthor.Save(Database);
        }
    }
}
