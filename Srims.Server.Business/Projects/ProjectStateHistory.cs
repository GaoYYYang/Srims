using System;
using System.Collections.Generic;
using System.Data.Linq;
using System.Linq;
using System.Text;

using MIS.Common;
using MIS.Common.Validate;
using MIS.Common.Query;

using Srims.Server.Business.Projects;
using Srims.Server.Business.Users;

namespace Srims.Server.Business.Projects
{
    /// <summary>
    /// 项目状态历史
    /// </summary>
    public partial class ProjectStateHistory : Entity<ProjectStateHistory>
    {
        /// <summary>
        /// 项目状态历史的字符串表示
        /// </summary>
        /// <returns>状态名称</returns>
        public override string ToString()
        {
            return _State.ToString();
        }
        /// <summary>
        /// 验证操作
        /// </summary>
        /// <param name="validater"></param>
        /// <param name="database"></param>
        protected override void ValidateAction(Validater validater, IDatabase database)
        {
            validater.AddCondition(_Project.Entity != null, "对应的项目不能为空");
            validater.AddCondition(!string.IsNullOrEmpty(_Operator), "操作人不能为空");
            validater.AddCondition(_DateTime != null, "操作时间不能为空");
        }
    }

    /// <summary>
    /// 项目状态历史的业务扩展
    /// </summary>
    public static class ProjectStateHistoryBusinessExtension
    {
    }
    /// <summary>
    /// 项目状态历史的查询扩展
    /// </summary>
    public static class ProjectStateHistoryQueryExtension
    {
        /// <summary>
        /// 查找项目的状态历史
        /// </summary>
        /// <param name="query"></param>
        /// <param name="project"></param>
        /// <returns></returns>
        public static IList<ProjectStateHistory> GetByProject(this IQueryable<ProjectStateHistory> query, Project project)
        {
            return query
                .Where(q => q.ProjectID == project.ID)
                .OrderBy(q => q.DateTime)
                .ToList();
        }
    }
    /// <summary>
    /// 项目状态历史的权限扩展
    /// </summary>
    public static class ProjectStateHistoryPermissionExtension
    {
        /// <summary>
        /// 判断项目的状态历史能否被查看
        /// </summary>
        /// <param name="user"></param>
        /// <param name="project"></param>
        /// <param name="database"></param>
        /// <returns></returns>
        public static bool CanShowProjectStateHistory(this User user, Project project, IDatabase database)
        {
            return user.CanShow(project, database);
        }
    }
}
