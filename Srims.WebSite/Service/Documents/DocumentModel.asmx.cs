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
    public class DocumentModelWebService : WebServiceBase
    {
        [WebMethod]
        public void GetByProjectType()
        {
            Response.WriteXmlHead();

            Database
                .DocumentModels
                .GetByProjectTypeId(Request.GetInt("ProjectTypeId").Value)
                .Show(Response, User, Database, DocumentModelExtension.ShowDocumentModel);
        }

        [WebMethod]
        public void UpLoadDocumentModels()
        {
            if (!User.HasPermission_UploadDocumentModel(Database))
                throw new HasNoPermissionException();

            var postedFiles = Request.GetHttpFiles();

            int documentTypeIndex = 0;
            for (int iFile = 0; iFile < postedFiles.Count; iFile++)
            {
                if (postedFiles[iFile].ContentLength == 0 || string.IsNullOrEmpty(postedFiles[iFile].FileName))
                    continue;

                var projectTypesId = Request.GetString("projectTypesID").Split(new char[] { ',' }, StringSplitOptions.RemoveEmptyEntries);
                var documentTypes = Request.GetString("documentTypes").Split(new char[] { ',' }, StringSplitOptions.RemoveEmptyEntries);

                foreach (var projectTypeId in projectTypesId)
                {
                    Guid guid = postedFiles[iFile].Save(HttpContext.Current, Database);

                    DocumentModel documentModel = new DocumentModel();

                    documentModel.Name = documentTypes[documentTypeIndex];
                    documentModel.ProjectType = Database.ProjectTypes.GetByID(Convert.ToInt32(projectTypeId));
                    documentModel.Resource = guid;

                    saveDocumentModel(documentModel);
                }
                documentTypeIndex++;
            }
            Response.Write("<html><body>{ success: true}</body></html>");
            Response.End();
        }
        [WebMethod]
        public void UpLoadDocumentModel()
        {
            var documentModel = Request.Get(Database);

            if (!User.HasPermission_Edit(documentModel, Database))
                throw new HasNoPermissionException();

            var postedFiles = Request.GetHttpFiles();
            for (int iFile = 0; iFile < postedFiles.Count; iFile++)
            {
                Guid guid = postedFiles[iFile].Save(HttpContext.Current, Database);
                documentModel.Resource = guid;

                saveDocumentModel(documentModel);
            }
            Response.Write("<html><body>{ success: true}</body></html>");
            Response.End();
        }
        private void saveDocumentModel(DocumentModel documentModel)
        {
            //删除原有模板

            DocumentModel oldDocumentModel = Database.DocumentModels.GetByProjectTypeIdAndDocumentType(documentModel.ProjectTypeID, documentModel.Name);
            if (oldDocumentModel != null)
                HttpPostedFileExtension.Delete(HttpContext.Current, oldDocumentModel.Resource, Database);

            using (TransactionScope ts = new TransactionScope())
            {
                var saveDescription = string.Format("上传项目类型：{0}的文档模板。\n", documentModel.ProjectType.Name)
                    + Log.GetEditOperationDescription(new DocumentModel(), documentModel, DocumentModel.GetDescriptionItems(), documentModel.IsNew);
                Log.Write(User.Name, (int)LogType.UpLoadDocumentModel, saveDescription, Request.UserHostAddress, "上传文档模板", Database);

                documentModel.Save(Database);

                ts.Complete();
            }
        }
        [WebMethod]
        public void DeleteDocumnetModel()
        {
            Guid guid = Request.GetGuid("guid").Value;

            DocumentModel documentModel = Database.DocumentModels.GetByGuid(guid);

            if (!User.CanDelete(Database))
                throw new HasNoPermissionException();
            using (TransactionScope ts = new TransactionScope())
            {
                var description = string.Format("删除项目类型：{0}的文档模板；\n删除的模板为：{1}", documentModel.ProjectType.Name, documentModel.Name);
                Log.Write(User.Name, (int)LogType.DeleteDocumentModel, description, Request.UserHostAddress, "删除文档模板", Database);
                documentModel.Delete(Database);

                HttpPostedFileExtension.Delete(HttpContext.Current, guid, Database);
                ts.Complete();
            }
        }
    }
}
