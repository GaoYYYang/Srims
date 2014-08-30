using System;
using System.Collections.Generic;
using System.Data.Linq;
using System.Linq;
using System.Text;

using MIS.Common;
using MIS.Common.Validate;
using MIS.Common.Query;

using Srims.Server.Business.Projects;
using Srims.Server.Business.Experts;
using Srims.Server.Business.Users;
using Srims.Server.Business.Common;

namespace Srims.Server.Business.Projects
{
    /// <summary>
    /// 项目成员
    /// </summary>
    public partial class ProjectMember : Entity<ProjectMember>
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
        /// 取得该实体的各个字段项
        /// </summary>
        /// <returns></returns>
        public static LogDescriptionItem[] GetAwardWinnerDescriptionItems()
        {
            List<LogDescriptionItem> list = new List<LogDescriptionItem>();

            list.Add(new LogDescriptionItem { Name = "ProjectID", Title = "对应项目的ID" });
            list.Add(new LogDescriptionItem { Name = "ExpertID", Title = "对应专家的ID" });
            list.Add(new LogDescriptionItem { Name = "TaskNo", Title = "子课题号" });
            list.Add(new LogDescriptionItem { Name = "Order", Title = "位次" });
            list.Add(new LogDescriptionItem { Name = "TaskName", Title = "子课题名称" });

            return list.ToArray();
        }
        /// <summary>
        /// 验证操作
        /// </summary>
        /// <param name="validater"></param>
        /// <param name="database"></param>
        protected override void ValidateAction(Validater validater, IDatabase database)
        {
            validater.AddCondition(Project != null, "对应的项目不能为空！");
            validater.AddCondition(Expert != null, "对应的专家不能为空！");
            validater.AddCondition(!string.IsNullOrEmpty(Order.ToString()), "位次不能为空");
        }
    }

    /// <summary>
    /// 项目成员的业务扩展
    /// </summary>
    public static class ProjectMemberBusinessExtension
    {
    }
    /// <summary>
    /// 项目成员的查询扩展
    /// </summary>
    public static class ProjectMemberQueryExtension
    {
        /// <summary>
        /// 取得项目成员
        /// </summary>
        /// <param name="query"></param>
        /// <param name="projectID"></param>
        /// <returns></returns>
        public static IList<ProjectMember> GetByProjectID(this IQueryable<ProjectMember> query, int projectID)
        {
            return query
                .Where(pm => pm.ProjectID == projectID)
                .OrderBy(pm => pm.Order)
                .ToList();
        }
    }
    /// <summary>
    /// 项目成员的权限扩展
    /// </summary>
    public static class ProjectMemberPermissionExtension
    {
        /// <summary>
        /// 用户是否具有查看项目成员的权限
        /// </summary>
        /// <param name="user"></param>
        /// <param name="project"></param>
        /// <param name="database"></param>
        /// <returns></returns>
        public static bool HasPermission_ShowProjectMember(this User user, Project project, IDatabase database)
        {
            return user.HasPermission_Show(project, database);
        }
        /// <summary>
        /// 用户成员能够被用户查看
        /// </summary>
        /// <param name="user"></param>
        /// <param name="project"></param>
        /// <param name="database"></param>
        /// <returns></returns>
        public static bool CanShowProjectMember(this User user, Project project, IDatabase database)
        {
            return user.CanShow(project, database);
        }
        /// <summary>
        /// 用户是否具有编辑项目成员的权限
        /// </summary>
        /// <param name="user"></param>
        /// <param name="project"></param>
        /// <param name="database"></param>
        /// <returns></returns>
        public static bool HasPermission_EditProjectMember(this User user, Project project, IDatabase database)
        {
            return user.HasPermission_Edit(project, database);
        }
        /// <summary>
        /// 用户能够编辑项目成员
        /// </summary>
        /// <param name="user"></param>
        /// <param name="project"></param>
        /// <param name="database"></param>
        /// <returns></returns>
        public static bool CanEditProjectMember(this User user, Project project, IDatabase database)
        {
            return user.CanEdit(project, database);
        }
    }
}
