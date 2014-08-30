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
    /// 项目资助领域
    /// </summary>
    public partial class ProjectSupportField : Entity<ProjectSupportField>
    {
        /// <summary>
        /// 项目资助领域的名称
        /// </summary>
        /// <returns></returns>
        public override string ToString()
        {
            return this.Name;
        }
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

            list.Add(new LogDescriptionItem { Name = "ProjectTypeID", Title = "对应类别" });
            list.Add(new LogDescriptionItem { Name = "Name", Title = "资助领域名称" });
            list.Add(new LogDescriptionItem { Name = "IsAvailable", Title = "是否有效" });

            return list.ToArray();
        }
        /// <summary>
        /// 构造函数
        /// </summary>
        public ProjectSupportField()
        {
            _IsAvailable = true;
        }
        /// <summary>
        /// 取得所有资助子领域
        /// </summary>
        /// <param name="query"></param>
        /// <returns></returns>
        public IList<ProjectSupportSubField> GetProjectSupportSubFields(IQueryable<ProjectSupportSubField> query)
        {
            return query.Where(pssf => pssf.ProjectSupportFieldID == _ID && pssf.IsAvailable).ToList();
        }
        /// <summary>
        ///验证操作
        /// </summary>
        /// <param name="validater"></param>
        /// <param name="database"></param>
        protected override void ValidateAction(Validater validater, IDatabase database)
        {
            validater.AddCondition(!String.IsNullOrEmpty(_Name), "资助领域名称不能为空。");
            validater.AddCondition(_ProjectType.Entity != null, "项目资助领域对应的项目类别不能为空。");
        }
        /// <summary>
        /// 删除操作
        /// </summary>
        /// <param name="database"></param>
        protected override void DeleteAction(IDatabase database)
        {
            using (TransactionScope ts = new TransactionScope())
            {
                foreach (var pssf in GetProjectSupportSubFields(database.ProjectSupportSubFields))
                    pssf.Delete(database);
                this.IsAvailable = false;
                this.Save(database);
                ts.Complete();
            }
        }
    }

    /// <summary>
    /// 项目资助领域的业务扩展
    /// </summary>
    public static class ProjectSupportFieldBusinessExtension
    {
    }
    /// <summary>
    /// 项目资助领域的查询扩展
    /// </summary>
    public static class ProjectSupportFieldQueryExtension
    {
        /// <summary>
        /// 根据项目类型ID取得项目资助领域
        /// </summary>
        /// <param name="query"></param>
        /// <param name="projectTypeID"></param>
        /// <returns></returns>
        public static IList<ProjectSupportField> Get(this IQueryable<ProjectSupportField> query, int projectTypeID)
        {
            return query
                .Where(psf => psf.ProjectTypeID == projectTypeID && psf.IsAvailable)
                .ToList();
        }
        /// <summary>
        /// 根据名称取得项目的自主领域
        /// </summary>
        /// <param name="query"></param>
        /// <param name="supportCategoryName"></param>
        /// <param name="typeId"></param>
        /// <returns></returns>
        public static ProjectSupportField GetByName(this IQueryable<ProjectSupportField> query, string supportFieldName, int typeId)
        {
            if (string.IsNullOrEmpty(supportFieldName))
                return null;

            return query.SingleOrDefault(q => q.Name == supportFieldName
                && q.ProjectTypeID == typeId);
        }
    }
    /// <summary>
    /// 项目资助领域的权限扩展
    /// </summary>
    public static class ProjectSupportFieldPermissionExtension
    {
        /// <summary>
        /// 是否有编辑权限
        /// </summary>
        /// <param name="user"></param>
        /// <param name="database"></param>
        /// <returns></returns>
        public static bool HasPermission_EditSupportField(this User user, IDatabase database)
        {
            return user.HasPermission(PermissionItem.ManageType, database);
        }
        /// <summary>
        /// 能够编辑
        /// </summary>
        /// <param name="user"></param>
        /// <param name="database"></param>
        /// <param name="pst"></param>
        /// <returns></returns>
        public static bool CanEditSupportField(this User user, IDatabase database, ProjectSupportField pst)
        {
            return user.HasPermission_EditSupportField(database) && pst.IsAvailable;
        }
        /// <summary>
        /// 是否有删除权限
        /// </summary>
        /// <param name="user"></param>
        /// <param name="database"></param>
        /// <returns></returns>
        public static bool HasPermission_DeleteSupportField(this User user, IDatabase database)
        {
            return user.HasPermission(PermissionItem.ManageType, database);
        }
        /// <summary>
        ///  能够删除
        /// </summary>
        /// <param name="user"></param>
        /// <param name="database"></param>
        /// <param name="pst"></param>
        /// <returns></returns>
        public static bool CanDeleteSupportField(this User user, IDatabase database, ProjectSupportField pst)
        {
            return user.HasPermission_DeleteSupportField(database) && pst.IsAvailable;
        }
        /// <summary>
        /// 是否有管理资助子领域权限
        /// </summary>
        /// <param name="user"></param>
        /// <param name="database"></param>
        /// <returns></returns>
        public static bool HasPermission_ManageSubSupportField(this User user, IDatabase database)
        {
            return user.HasPermission(PermissionItem.ManageType, database);
        }
        /// <summary>
        ///  能够管理资助子领域
        /// </summary>
        /// <param name="user"></param>
        /// <param name="database"></param>
        /// <param name="pst"></param>
        /// <returns></returns>
        public static bool CanManageSubSupportField(this User user, IDatabase database, ProjectSupportField pst)
        {
            return user.HasPermission_ManageSubSupportField(database) && pst.IsAvailable;
        }
    }
}
