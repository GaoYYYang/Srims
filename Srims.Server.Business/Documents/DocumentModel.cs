using System;
using System.Collections.Generic;
using System.Data.Linq;
using System.Linq;
using System.Text;
using System.Transactions;

using MIS.Common;
using MIS.Common.Validate;
using MIS.Common.Query;

using Srims.Server.Business.Type;
using Srims.Server.Business.Users;
using Srims.Server.Business.Common;

namespace Srims.Server.Business.Documents
{
    /// <summary>
    /// 文档模型
    /// </summary>
    public partial class DocumentModel : Entity<DocumentModel>
    {
        /// <summary>
        /// 取得实体的各个字段项
        /// </summary>
        /// <returns></returns>
        public static LogDescriptionItem[] GetDescriptionItems()
        {
            List<LogDescriptionItem> list = new List<LogDescriptionItem>();

            list.Add(new LogDescriptionItem { Name = "ProjectTypeID", Title = "对应项目类型的ID" });
            list.Add(new LogDescriptionItem { Name = "Name", Title = "文档模板名称" });

            return list.ToArray();
        }
        /// <summary>
        /// 验证操作
        /// </summary>
        /// <param name="validater"></param>
        /// <param name="database"></param>
        protected override void ValidateAction(Validater validater, IDatabase database)
        {
            validater.AddCondition(_ProjectType.Entity != null, "对应项目类型不能为空");
            validater.AddCondition(!string.IsNullOrEmpty(_Name), "模板名称不能为空");
            validater.AddCondition(_Resource != null, "资源不能为空");
        }
        /// <summary>
        /// 保存操作
        /// </summary>
        /// <param name="database"></param>
        protected override void SaveAction(IDatabase database)
        {
            using (TransactionScope ts = new TransactionScope())
            {
                //当项目类型有想对应的模板时，删除原来的模板
                var oldDocumentModel = database.DocumentModels.GetByProjectTypeIdAndDocumentType(this.ProjectTypeID, this.Name);
                if (oldDocumentModel != null)
                    oldDocumentModel.Delete(database);

                base.SaveAction(database);

                ts.Complete();
            }
        }
    }

    /// <summary>
    /// 文档模型的业务扩展
    /// </summary>
    public static class DocumentModelBusinessExtension
    {
    }
    /// <summary>
    /// 文档模型的查询扩展
    /// </summary>
    public static class DocumentModelQueryExtension
    {
        /// <summary>
        /// 根据项目类型和文档类型取得文档模板
        /// </summary>
        /// <param name="query"></param>
        /// <param name="projectTypeID"></param>
        /// <param name="documentType"></param>
        /// <returns></returns>
        public static DocumentModel GetByProjectTypeIdAndDocumentType(this IQueryable<DocumentModel> query, int projectTypeID, string documentType)
        {
            return query.SingleOrDefault(q => q.ProjectTypeID == projectTypeID
                && q.Name.Trim() == documentType.Trim());
        }
        /// <summary>
        ///取得某一类型的文档模板
        /// </summary>
        /// <param name="query"></param>
        /// <param name="projectTypeId"></param>
        /// <returns></returns>
        public static List<DocumentModel> GetByProjectTypeId(this IQueryable<DocumentModel> query, int projectTypeId)
        {
            return query
                .Where(q => q.ProjectTypeID == projectTypeId)
                .ToList();
        }
        /// <summary>
        /// 根据guid取得文档模板
        /// </summary>
        /// <param name="query"></param>
        /// <param name="guid"></param>
        /// <returns></returns>
        public static DocumentModel GetByGuid(this IQueryable<DocumentModel> query, Guid guid)
        {
            return query.SingleOrDefault(q => q.Resource == guid);
        }
    }
    /// <summary>
    /// 文档模型的权限扩展
    /// </summary>
    public static class DocumentModelPermissionExtension
    {
        /// <summary>
        /// 判断用户是否具有编辑项目类型文档模板的权限
        /// </summary>
        /// <param name="user"></param>
        /// <param name="database"></param>
        /// <returns></returns>
        public static bool HasPermission_UploadDocumentModel(this User user, IDatabase database)
        {
            return user.HasPermission(PermissionItem.ManageType, database);
        }
        /// <summary>
        /// 判断用户是否具有编辑某一项目类型文档模板的权限
        /// </summary>
        /// <param name="user"></param>
        /// <param name="documentModel"></param>
        /// <param name="database"></param>
        /// <returns></returns>
        public static bool HasPermission_Edit(this User user, DocumentModel documentModel, IDatabase database)
        {
            return user.HasPermission(PermissionItem.ManageType, database);
        }
        /// <summary>
        /// 判断用户能够编辑某一项目类型文档模板
        /// </summary>
        /// <param name="user"></param>
        /// <param name="documentModel"></param>
        /// <param name="database"></param>
        /// <returns></returns>
        public static bool CanEdit(this User user, DocumentModel documentModel, IDatabase database)
        {
            return user.HasPermission_Edit(documentModel, database);
        }
        /// <summary>
        /// 判断用户是否具有删除某一项目类型文档模板的权限
        /// </summary>
        /// <param name="user"></param>
        /// <param name="documentModel"></param>
        /// <param name="database"></param>
        /// <returns></returns>
        public static bool HasPermission_Delete(this User user, DocumentModel documentModel, IDatabase database)
        {
            return user.HasPermission(PermissionItem.ManageType, database);
        }
        /// <summary>
        /// 判断用户能够删除某一项目类型文档模板
        /// </summary>
        /// <param name="user"></param>
        /// <param name="documentModel"></param>
        /// <param name="database"></param>
        /// <returns></returns>
        public static bool CanDelete(this User user, DocumentModel documentModel, IDatabase database)
        {
            return user.HasPermission_Delete(documentModel, database);
        }
        /// <summary>
        /// 判断用户是否具有察看某一项目类型文档模板的权限
        /// </summary>
        /// <param name="user"></param>
        /// <param name="documentModel"></param>
        /// <param name="database"></param>
        /// <returns></returns>
        public static bool HasPermission_Show(this User user, DocumentModel documentModel, IDatabase database)
        {
            return true;
        }
        /// <summary>
        /// 判断用户能够查看某一项目类型文档模板
        /// </summary>
        /// <param name="user"></param>
        /// <param name="documentModel"></param>
        /// <param name="database"></param>
        /// <returns></returns>
        public static bool CanShow(this User user, DocumentModel documentModel, IDatabase database)
        {
            return true;
        }
    }
}
