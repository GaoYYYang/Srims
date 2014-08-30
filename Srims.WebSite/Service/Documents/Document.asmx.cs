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

using Srims.Server.UI;
using Srims.Server.UI.Documents;
using Srims.Server.UI.HttpExtension;
using Srims.Server.UI.MISExtension;

namespace Srims.WebSite.Service.Documents
{
    [WebService(Namespace = "http://srims.ouc.edu.cn/")]
    [WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
    [ToolboxItem(false)]
    public class DocumentService : WebServiceBase
    {
        [WebMethod]
        public void GetByProjectID()
        {
            var projectID = Request.GetInt("ProjectID").Value;
            var project = Database.Projects.GetByID(projectID);

            if (!User.CanShowDocument(project, Database))
                throw new HasNoPermissionException();

            Response.WriteXmlHead();
            Database
                .Documents
                .GetByProjectID(projectID)
                .Show(Response, Database, User);
        }
        [WebMethod]
        public void GetDocumentNames()
        {
            Response.WriteXmlHead();
            Database
                .NoticeTexts
                .GetNoticeTextValue(NoticeTextType.DocumentName)
                .Show(Response);
        }
        //新建催缴文档记录
        [WebMethod]
        public void RequireDocument()
        {
            var documentList = Request.GetRequireDocuments(Database);

            foreach (var document in documentList)
            {
                using (TransactionScope ts = new TransactionScope())
                {
                    Log.Write(User.Name, (int)LogType.ProjectDocumentRequire, "新建项目" + document.Project.Name + "的催缴记录。", Request.UserHostAddress, "新建文档催缴记录", Database);
                    document.Require(User, Database);
                    ts.Complete();
                }
            }
        }
        [WebMethod]
        public void UpLoad()
        {
            var postedFiles = Request.GetHttpFiles();

            for (int iFile = 0; iFile < postedFiles.Count; iFile++)
            {
                Guid guid = postedFiles[iFile].Save(HttpContext.Current, Database);

                Document document = Request.GetDocument(Database, User);
                document.DocumentResource = guid;
                using (TransactionScope ts = new TransactionScope())
                {
                    var description = string.Format("上传了项目：{0}的文档。\n", document.Project.Name) +
                        Log.GetEditOperationDescription(new Document(), document, Document.GetDescriptionItems(), true);
                    Log.Write(User.Name, (int)LogType.ProjectDocumentSubmit, description, Request.UserHostAddress, "上传项目文档", Database);

                    document.Upload(User, Database);
                    ts.Complete();
                }
            }

            Response.Write("<html><body>{ success: true}</body></html>");
            Response.End();
        }
        [WebMethod]
        public void Delete()
        {
            Guid? guid = Request.GetGuid("guid");

            Document document;
            if (guid.HasValue)
            {
                document = Database.Documents.GetByGuid(guid.Value);

                if (!User.CanEditDocument(document.Project, Database))
                    throw new HasNoPermissionException();
                using (TransactionScope ts = new TransactionScope())
                {
                    var description = string.Format("删除项目：{0}的文档。\n 删除的文档名称为：{1}", document.Project.Name, document.Name);
                    Log.Write(User.Name, (int)LogType.ProjectDocumentDelete, description, Request.UserHostAddress, "删除文档", Database);

                    HttpPostedFileExtension.Delete(HttpContext.Current, guid.Value, Database);
                    ts.Complete();
                }
            }
            //删除催缴文档记录
            else
                document = Request.GetEntity(Database.Documents, "id");

            if (!User.CanEditDocument(document.Project, Database))
                throw new HasNoPermissionException();
            using (TransactionScope ts = new TransactionScope())
            {
                Log.Write(User.Name, (int)LogType.RequiredDocumentRecordDelete, "删除项目：" + document.Project.Name + "的催缴文档记录。", Request.UserHostAddress, "删除文档催缴记录", Database);
                document.Delete(Database);
                ts.Complete();
            }
        }
        [WebMethod]
        public void GetWaitingCensorDocuments()
        {
            bool isHorizontal = Request.GetBoolean("isHorizontal").Value;

            if (isHorizontal && !User.HasPermission_CensorHorizontalProjectDocuments(Database))
                throw new HasNoPermissionException();
            if (!isHorizontal && !User.HasPermission_CensorVerticalProjectDocuments(Database))
                throw new HasNoPermissionException();

            Response.WriteXmlHead();
            Database
                .Documents
                .GetWaitingCensorDocument(isHorizontal, User, Database)
                .Show(Response, Database, User);

        }
        [WebMethod]
        public void GetWaitingCensorDocumentsCountOfHorizonalProjects()
        {
            if (!User.HasPermission_CensorHorizontalProjectDocuments(Database))
                throw new HasNoPermissionException();

            Response.WriteXmlHead();
            Database
                .Documents
                .GetWaitingCensorDocument(true, User, Database)
                .Count()
                .Show(Response);
        }
        [WebMethod]
        public void GetWaitingCensorDocumentsCountOfVerticalProjects()
        {
            if (!User.HasPermission_CensorVerticalProjectDocuments(Database))
                throw new HasNoPermissionException();

            Response.WriteXmlHead();
            Database
                .Documents
                .GetWaitingCensorDocument(false, User, Database)
                .Count()
                .Show(Response);
        }
        //审核文档通过
        [WebMethod]
        public void CensorPass()
        {
            var document = Request.GetDocumentById(Database);
            using (TransactionScope ts = new TransactionScope())
            {
                var description = string.Format("项目：{0}的文档审核通过。\n审核通过的文档为：{1}", document.Project.Name, document.Name);
                Log.Write(User.Name, (int)LogType.ProjectDocumentCensorPass, description, Request.UserHostAddress, "项目文档审核通过", Database);

                document.CensorPass(User, Database);
                ts.Complete();
            }
        }
        //审核文档驳回
        [WebMethod]
        public void CensorReject()
        {
            var document = Request.GetDocumentById(Database);
            string remark = Request.GetString("Remark");

            var description = string.Format("项目：{0}的文档审核驳回。\n审核驳回的文档为：{1}", document.Project.Name, document.Name);
            Log.Write(User.Name, (int)LogType.ProjectDocumentCensorReject, description, Request.UserHostAddress, "项目文档审核驳回", Database);

            document.CensorReject(remark, User, Database);
        }
        [WebMethod]
        public void GetExpertUnSubmitDocument()
        {
            Response.WriteXmlHead();
            Database
                .Documents
                .GetExpertUnsubmitDocument(User)
                .Show(Response, Database, User);
        }
        [WebMethod]
        public void GetExpertUnSubmitDocumentCount()
        {
            Response.WriteXmlHead();
            Database
                .Documents
                .GetExpertUnsubmitDocument(User)
                .Count()
                .Show(Response);
        }
       

    }
}
