using System;
using System.Collections.Generic;
using System.Data.Linq;
using System.Linq;
using System.Text;

using MIS.Common;
using MIS.Common.Validate;
using MIS.Common.Query;

using Srims.Server.Business.Type;
using System.Transactions;
using Srims.Server.Business.Users;
using Srims.Server.Business.Common;

namespace Srims.Server.Business.Type
{
    /// <summary>
    /// 项目资助子领域
    /// </summary>
    public partial class ProjectSupportSubField : Entity<ProjectSupportSubField>
    {
        /// <summary>
        /// 复制一个同于自己的实体
        /// </summary>
        /// <returns></returns>
        public object Clone()
        {
            return this.MemberwiseClone();
        }
        /// <summary>
        /// 取得实体的各个字段项
        /// </summary>
        /// <returns></returns>
        public static LogDescriptionItem[] GetDescriptionItems()
        {
            List<LogDescriptionItem> list = new List<LogDescriptionItem>();

            list.Add(new LogDescriptionItem { Name = "ProjectSupportFieldID", Title = "对应资助领域的ID" });
            list.Add(new LogDescriptionItem { Name = "Name", Title = "资助子领域名称" });
            list.Add(new LogDescriptionItem { Name = "IsAvailable", Title = "是否有效" });

            return list.ToArray();
        }
        /// <summary>
        /// 构造函数
        /// </summary>
        public ProjectSupportSubField()
        {
            _IsAvailable = true;
        }

        /// <summary>
        /// 验证操作
        /// </summary>
        /// <param name="validater"></param>
        /// <param name="database"></param>
        protected override void ValidateAction(Validater validater, IDatabase database)
        {
            validater.AddCondition(!String.IsNullOrEmpty(_Name), "资助子领域名称不能为空。");
            validater.AddCondition(_ProjectSupportField.Entity != null, "资助领域不能为空。");
        }
        /// <summary>
        /// 删除操作
        /// </summary>
        /// <param name="database"></param>
        protected override void DeleteAction(IDatabase database)
        {
            using (TransactionScope ts = new TransactionScope())
            {
                this.IsAvailable = false;
                this.Save(database);
                ts.Complete();
            }
        }
    }

    /// <summary>
    /// 项目资助子领域的业务扩展
    /// </summary>
    public static class ProjectSupportSubFieldBusinessExtension
    {
    }
    /// <summary>
    /// 项目资助子领域的查询扩展
    /// </summary>
    public static class ProjectSupportSubFieldQueryExtension
    {
        /// <summary>
        /// 根据项目资助领域ID，取得项目的资助子领域
        /// </summary>
        /// <param name="query"></param>
        /// <param name="projectSupportFieldID"></param>
        /// <returns></returns>
        public static IList<ProjectSupportSubField> Get(this IQueryable<ProjectSupportSubField> query, int projectSupportFieldID)
        {
            return query
                .Where(pssf => pssf.ProjectSupportFieldID == projectSupportFieldID && pssf.IsAvailable)
                .ToList();
        }
        /// <summary>
        /// 根据名称取得项目的自主子领域
        /// </summary>
        /// <param name="query"></param>
        /// <param name="supportCategoryName"></param>
        /// <param name="typeId"></param>
        /// <returns></returns>
        public static ProjectSupportSubField GetByName(this IQueryable<ProjectSupportSubField> query, string supportSubFieldName, int supportFieldId)
        {
            if (string.IsNullOrEmpty(supportSubFieldName))
                return null;

            return query.SingleOrDefault(q => q.Name == supportSubFieldName
                && q.ProjectSupportFieldID == supportFieldId);
        }
    }
    /// <summary>
    /// 项目资助子领域的权限扩展
    /// </summary>
    public static class ProjectSupportSubFieldPermissionExtension
    {
        /// <summary>
        /// 是否有编辑权限
        /// </summary>
        /// <param name="user"></param>
        /// <param name="database"></param>
        /// <returns></returns>
        public static bool HasPermission_EditSupportSubField(this User user, IDatabase database)
        {
            return user.HasPermission(PermissionItem.ManageType, database);
        }
        /// <summary>
        ///  能够编辑
        /// </summary>
        /// <param name="user"></param>
        /// <param name="database"></param>
        /// <param name="pssf"></param>
        /// <returns></returns>
        public static bool CanEditSupportSubField(this User user, IDatabase database, ProjectSupportSubField pssf)
        {
            return user.HasPermission_EditSupportCategory(database) && pssf.IsAvailable;
        }
        /// <summary>
        /// 是否有删除权限
        /// </summary>
        /// <param name="user"></param>
        /// <param name="database"></param>
        /// <returns></returns>
        public static bool HasPermission_DeleteSupportSubField(this User user, IDatabase database)
        {
            return user.HasPermission(PermissionItem.ManageType, database);
        }
        /// <summary>
        /// 能够删除
        /// </summary>
        /// <param name="user"></param>
        /// <param name="database"></param>
        /// <param name="pssf"></param>
        /// <returns></returns>
        public static bool CanDeleteSupportSubField(this User user, IDatabase database, ProjectSupportSubField pssf)
        {
            return user.HasPermission_DeleteSupportCategory(database) && pssf.IsAvailable;
        }
    }
}
