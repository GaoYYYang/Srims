using System;
using System.Collections.Generic;
using System.Data.Linq;
using System.Linq;
using System.Text;

using MIS.Common;
using MIS.Common.Validate;
using MIS.Common.Query;

using Srims.Server.Business.Type;
using Srims.Server.Business.Users;
using System.Transactions;
using Srims.Server.Business.Common;

namespace Srims.Server.Business.Type
{
    /// <summary>
    /// 项目资助类别
    /// </summary>
    public partial class ProjectSupportCategory : Entity<ProjectSupportCategory>
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

            list.Add(new LogDescriptionItem { Name = "ProjectTypeID", Title = "对应类别的ID" });
            list.Add(new LogDescriptionItem { Name = "Name", Title = "资助类别名称" });
            list.Add(new LogDescriptionItem { Name = "IsGetOverheadExpense", Title = "是否收取管理费" });
            list.Add(new LogDescriptionItem { Name = "IsAvailable", Title = "是否有效" });

            return list.ToArray();
        }
        /// <summary>
        /// 构造函数
        /// </summary>
        public ProjectSupportCategory()
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
            validater.AddCondition(!String.IsNullOrEmpty(_Name), "资助类别名称不能为空。");
            validater.AddCondition(_ProjectType.Entity != null, "项目类别不能为空。");
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
    /// 项目资助类别的业务扩展
    /// </summary>
    public static class ProjectSupportCategoryBusinessExtension
    {
    }
    /// <summary>
    /// 项目资助类别的查询扩展
    /// </summary>
    public static class ProjectSupportCategoryQueryExtension
    {
        /// <summary>
        /// 根据项目类型ID取得有效资助类别
        /// </summary>
        /// <param name="query"></param>
        /// <param name="projectTypeID"></param>
        /// <returns></returns>
        public static IList<ProjectSupportCategory> Get(this IQueryable<ProjectSupportCategory> query, int projectTypeID)
        {
            return query
                .Where(psc => psc.ProjectTypeID == projectTypeID && psc.IsAvailable)
                .ToList();
        }
        /// <summary>
        /// 根据名称取得项目的自主类别
        /// </summary>
        /// <param name="query"></param>
        /// <param name="supportCategoryName"></param>
        /// <param name="typeId"></param>
        /// <returns></returns>
        public static ProjectSupportCategory GetByName(this IQueryable<ProjectSupportCategory> query, string supportCategoryName, int typeId)
        {
            if (string.IsNullOrEmpty(supportCategoryName))
                return null;

            return query.SingleOrDefault(q => q.Name == supportCategoryName
                && q.ProjectTypeID == typeId);
        }
    }
    /// <summary>
    /// 项目资助类别的权限扩展
    /// </summary>
    public static class ProjectSupportCategoryPermissionExtension
    {
        /// <summary>
        /// 是否有编辑权限
        /// </summary>
        /// <param name="user"></param>
        /// <param name="database"></param>
        /// <returns></returns>
        public static bool HasPermission_EditSupportCategory(this User user, IDatabase database)
        {
            return user.HasPermission(PermissionItem.ManageType, database);
        }
        /// <summary>
        /// 能够编辑
        /// </summary>
        /// <param name="user"></param>
        /// <param name="database"></param>
        /// <param name="psc"></param>
        /// <returns></returns>
        public static bool CanEditSupportCategory(this User user, IDatabase database, ProjectSupportCategory psc)
        {
            return user.HasPermission_EditSupportCategory(database) && psc.IsAvailable;
        }
        /// <summary>
        /// 是否有删除权限
        /// </summary>
        /// <param name="user"></param>
        /// <param name="database"></param>
        /// <returns></returns>
        public static bool HasPermission_DeleteSupportCategory(this User user, IDatabase database)
        {
            return user.HasPermission(PermissionItem.ManageType, database);
        }
        /// <summary>
        ///  能够删除
        /// </summary>
        /// <param name="user"></param>
        /// <param name="database"></param>
        /// <param name="psc"></param>
        /// <returns></returns>
        public static bool CanDeleteSupportCategory(this User user, IDatabase database, ProjectSupportCategory psc)
        {
            return user.HasPermission_DeleteSupportCategory(database) && psc.IsAvailable;
        }
    }
}
