using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Web;

using Srims.Server.Business;
using Srims.Server.Business.Documents;
using Srims.Server.Business.Users;

using Srims.Server.UI;
using Srims.Server.UI.MISExtension;
using Srims.Server.UI.HttpExtension;

namespace Srims.Server.UI.Documents
{
    /// <summary>
    /// 文档的显示扩展
    /// </summary>
    public static class DocumentExtension
    {
        /// <summary>
        /// 文档的显示扩展
        /// </summary>
        /// <param name="document"></param>
        /// <param name="response"></param>
        /// <param name="user"></param>
        /// <param name="database"></param>
        public static void ShowDocument(Document document, HttpResponse response, User user, IDatabase database)
        {
            response.WriteTagWithValue("ID", document.ID);
            response.WriteTagWithValue("Author", document.Author);
            response.WriteTagWithValue("Censor", document.Censor);
            response.WriteTagWithValue("CensorDateTime", document.CensorDateTime);
            response.WriteTagWithValue("Deadline", document.Deadline);
            response.WriteTagWithValue("DocumentResource", document.DocumentResource);
            response.WriteTagWithValue("IsRequire", document.IsRequire);
            response.WriteTagWithValue("Name", document.Name);
            response.WriteTagWithValue("State", document.State);
            response.WriteTagWithValue("SubmitDateTime", document.SubmitDateTime);
            response.WriteTagWithValue("ProjectName", document.Project.Name);
            response.WriteTagWithValue("ProjectIsHorizontal", document.Project.Type.Rank.IsHorizontal);
            response.WriteTagWithValue("ProjectID", document.Project.ID);

            response.WriteTagWithValue("HasPermission_Delete", user.HasPermission_Delete(document, database));
            response.WriteTagWithValue("CanDelete", user.CanDelete(document, database));
        }
        /// <summary>
        /// 文档列表的显示扩展
        /// </summary>
        /// <param name="documentList"></param>
        /// <param name="response"></param>
        /// <param name="database"></param>
        /// <param name="user"></param>
        public static void Show(this IList<Document> documentList, HttpResponse response, IDatabase database, User user)
        {
            ShowDelegateWithUserAndDatabase<Document> showDelegate = new ShowDelegateWithUserAndDatabase<Document>(ShowDocument);
            documentList.Show<Document>(response, user, database, showDelegate);
        }
        /// <summary>
        /// 取得催缴文档列表
        /// </summary>
        /// <param name="request"></param>
        /// <param name="database"></param>
        /// <returns></returns>
        public static IList<Document> GetRequireDocuments(this HttpRequest request, IDatabase database)
        {
            var documentNames = request.GetList<string>("DocumentNames");
            List<Document> documentList = new List<Document>();

            foreach (var documentName in documentNames)
            {
                Document document = new Document();
                document.Deadline = request.GetDateTime("deadLine");
                document.IsRequire = request.GetBoolean("IsRequire").Value;
                document.Name = documentName;
                document.Project = request.GetEntity(database.Projects, "ProjectId");

                documentList.Add(document);
            }

            return documentList;
        }
        /// <summary>
        /// 取得文档
        /// </summary>
        /// <param name="request"></param>
        /// <param name="database"></param>
        /// <param name="user"></param>
        /// <returns></returns>
        public static Document GetDocument(this HttpRequest request, IDatabase database, User user)
        {
            var document = new Document();

            document.Name = request.GetString("DocumentName");
            document.Project = database.Projects.GetByID(request.GetInt("ProjectId").Value);

            return document;
        }
        /// <summary>
        /// 根据documentId取得文档
        /// </summary>
        /// <param name="request"></param>
        /// <param name="database"></param>
        /// <returns></returns>
        public static Document GetDocumentById(this HttpRequest request, IDatabase database)
        {
            var document = request.GetEntity(database.Documents, "DocumentId");
            return document;
        }
    }
}
