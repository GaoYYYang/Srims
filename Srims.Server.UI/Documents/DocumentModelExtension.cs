using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Web;

using Srims.Server.Business;
using Srims.Server.Business.Documents;
using Srims.Server.Business.Users;

using Srims.Server.UI;
using Srims.Server.UI.HttpExtension;
using Srims.Server.UI.MISExtension;

namespace Srims.Server.UI.Documents
{
    /// <summary>
    /// 文档模型
    /// </summary>
    public static class DocumentModelExtension
    {
        /// <summary>
        /// 显示项目类型文档模板
        /// </summary>
        /// <param name="documentModel"></param>
        /// <param name="response"></param>
        /// <param name="user"></param>
        /// <param name="database"></param>
        public static void ShowDocumentModel(this  DocumentModel documentModel, HttpResponse response, User user, IDatabase database)
        {
            response.WriteTagWithValue("Name", documentModel.Name);
            response.WriteTagWithValue("ProjectType", documentModel.ProjectType.Name);
            response.WriteTagWithValue("Resource", documentModel.Resource);

            response.WriteTagWithValue("HasPermission_Edit", user.HasPermission_Edit(documentModel, database));
            response.WriteTagWithValue("HasPermission_Delete", user.HasPermission_Delete(documentModel, database));
            response.WriteTagWithValue("HasPermission_Show", user.HasPermission_Show(documentModel, database));

            response.WriteTagWithValue("CanEdit", user.CanEdit(documentModel, database));
            response.WriteTagWithValue("CanDelete", user.CanDelete(documentModel, database));
            response.WriteTagWithValue("CanShow", user.CanShow(documentModel, database));
        }
        /// <summary>
        /// 取得项目类型文档模板
        /// </summary>
        /// <param name="request"></param>
        /// <param name="database"></param>
        /// <returns></returns>
        public static DocumentModel Get(this HttpRequest request, IDatabase database)
        {
            DocumentModel documentModel = new DocumentModel();
            documentModel.Name = request.GetString("DocumentType");
            documentModel.ProjectType = request.GetEntity(database.ProjectTypes, "ProjectTypeId");

            return documentModel;
        }
    }
}
