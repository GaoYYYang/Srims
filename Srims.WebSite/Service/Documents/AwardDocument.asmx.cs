using System;
using System.Collections;
using System.ComponentModel;
using System.Data;
using System.Linq;
using System.Web;
using System.Web.Services;
using System.Web.Services.Protocols;
using System.Xml.Linq;
using System.Transactions;

using Srims.Server.Business;
using Srims.Server.Business.Documents;
using Srims.Server.Business.Common;
using Srims.Server.Business.Users;
using Srims.Server.Business.Awards;

using Srims.Server.UI;
using Srims.Server.UI.Documents;
using Srims.Server.UI.HttpExtension;
using Srims.Server.UI.MISExtension;

namespace Srims.WebSite.Service.Documents
{
    [WebService(Namespace = "http://srims.ouc.edu.cn/")]
    [WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
    [ToolboxItem(false)]
    public class AwardDocumentWebService : WebServiceBase
    {

        [WebMethod]
        public void GetByAwardID()
        {
            var award = Request.GetEntity(Database.Awards, "AwardId");

            if (!User.HasPermission_ShowAward(award, Database))
                throw new HasNoPermissionException();

            Response.WriteXmlHead();
            Database
                .AwardDocuments
                .GetByAward(award.ID)
                .Show(Response, User, Database, AwardDoucmentExtension.Show);
        }
        [WebMethod]
        public void UpLoad()
        {
            var postedFiles = Request.GetHttpFiles();

            for (int iFile = 0; iFile < postedFiles.Count; iFile++)
            {
                var guid = postedFiles[iFile].Save(HttpContext.Current, Database);

                AwardDocument awardDocument = Request.GetAwardDocument(Database);
                awardDocument.Resource = guid;

                using (TransactionScope ts = new TransactionScope())
                {
                    var description = string.Format("上传了奖励：{0}的文档。\n", awardDocument.Award.Name) +
                        Log.GetEditOperationDescription(new AwardDocument(), awardDocument, AwardDocument.GetDescriptionItems(), true);
                    Log.Write(User.Name, (int)LogType.AwardDocumentSubmit, description, Request.UserHostAddress, "上传奖励文档", Database);

                    awardDocument.Upload(User, Database);
                    ts.Complete();
                }
            }
            Response.Write("<html><body>{ success: true}</body></html>");
            Response.End();
        }
        [WebMethod]
        public void Delete()
        {
            Guid guid = Request.GetGuid("guid").Value;

            AwardDocument awardDocument = Database.AwardDocuments.GetByGuid(guid);

            if (!User.CanDelete(awardDocument, Database))
                throw new HasNoPermissionException();
            using (TransactionScope ts = new TransactionScope())
            {
                var description = string.Format("删除奖励：{0}的文档。\n 删除的文档名称为：{1}", awardDocument.Award.Name, awardDocument.Name);
                Log.Write(User.Name, (int)LogType.AwardDocumentDelete, description, Request.UserHostAddress, "删除奖励文档", Database);

                awardDocument.Delete(Database);
                HttpPostedFileExtension.Delete(HttpContext.Current, guid, Database);
                ts.Complete();
            }
        }
        [WebMethod]
        public void CensorPass()
        {
            AwardDocument awardDocument = Request.GetEntity(Database.AwardDocuments, "AwardDocumentId");
            using (TransactionScope ts = new TransactionScope())
            {
                var description = string.Format("奖励：{0}的文档审核通过。\n审核通过的文档为：", awardDocument.Award.Name, awardDocument.Name);
                Log.Write(User.Name, (int)LogType.AwardDocumentCensorPass, description, Request.UserHostAddress, "奖励文档审核通过", Database);

                awardDocument.CensorPass(User, Database);
                ts.Complete();
            }
        }
        [WebMethod]
        public void CensorReject()
        {
            AwardDocument awardDocument = Request.GetEntity(Database.AwardDocuments, "AwardDocumentId");
            string remark = Request.GetString("Remark");
            using (TransactionScope ts = new TransactionScope())
            {
                var description = string.Format("奖励：{0}的文档审核驳回。\n审核驳回的文档为：", awardDocument.Award.Name, awardDocument.Name);
                Log.Write(User.Name, (int)LogType.AwardDocumentCensorReject, description, Request.UserHostAddress, "奖励文档审核驳回", Database);

                awardDocument.CensorReject(remark, User, Database);
                ts.Complete();
            }
        }
        [WebMethod]
        public void GetWaitingCensorCount()
        {
            Response.WriteXmlHead();
            Database
                .AwardDocuments
                .GetWaitingCensorCount()
                .Show(Response);
        }
        [WebMethod]
        public void GetWaitingCensor()
        {
            Response.WriteXmlHead();
            Database
                .AwardDocuments
                .GetWaitingCensor()
                .Show(Response, User, Database, AwardDoucmentExtension.Show);

        }

    }
}
