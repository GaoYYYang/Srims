using System;
using System.Collections.Generic;
using System.Data.Linq;
using System.Linq;
using System.Text;

using MIS.Common;
using MIS.Common.Validate;
using MIS.Common.Query;

using Srims.Server.Business.Fund;
using Srims.Server.Business.Users;
using Srims.Server.Business.Projects;
using Srims.Server.Business.Common;

namespace Srims.Server.Business.Fund
{
    /// <summary>
    /// 项目付款计划
    /// </summary>
    public partial class PayPlanItem : Entity<PayPlanItem>
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

            list.Add(new LogDescriptionItem { Name = "ProjectInfo_FundID", Title = "对应项目经费的ID" });
            list.Add(new LogDescriptionItem { Name = "DateTime", Title = "到款时间" });
            list.Add(new LogDescriptionItem { Name = "Amount", Title = "到款数额(单位：分)" });

            return list.ToArray();
        }
        /// <summary>
        /// 验证操作
        /// </summary>
        /// <param name="validater"></param>
        /// <param name="database"></param>
        protected override void ValidateAction(Validater validater, IDatabase database)
        {
            validater.AddCondition(ProjectInfo_Fund != null, "对应项目不能为空");
            validater.AddCondition(_DateTime != null, "到款日期不能为空");
            validater.AddCondition(_Amount > 0, "到款金额必须大于零");
        }
    }

    /// <summary>
    /// 项目付款计划的业务扩展
    /// </summary>
    public static class PayPlanItemBusinessExtension
    {
    }
    /// <summary>
    /// 项目付款计划的查询扩展
    /// </summary>
    public static class PayPlanItemQueryExtension
    {
        /// <summary>
        /// 取得项目的付款计划
        /// </summary>
        /// <param name="query"></param>
        /// <param name="project"></param>
        /// <returns></returns>
        public static IList<PayPlanItem> GetByProject(this IQueryable<PayPlanItem> query, Project project)
        {
            return query
                .Where(q => q.ProjectInfo_FundID == project.FundID)
                .ToList();
        }
    }
    /// <summary>
    /// 项目付款计划的权限扩展
    /// </summary>
    public static class PayPlanItemPermissionExtension
    {
        /// <summary>
        ///判断用户是否具有经费到帐计划权限
        /// </summary>
        /// <param name="user"></param>
        /// <param name="project"></param>
        /// <param name="database"></param>
        /// <returns></returns>
        public static bool HasPermission_EditProjectPayPlanItem(this User user, Project project, IDatabase database)
        {
            return user.HasPermission_Edit(project, database);
        }
        /// <summary>
        /// 判断用户是否能够编辑经费到帐信息
        /// </summary>
        /// <param name="user"></param>
        /// <param name="project"></param>
        /// <param name="database"></param>
        /// <returns></returns>
        public static bool CanEditProjectPayPlanItem(this User user, Project project, IDatabase database)
        {
            return user.CanEdit(project, database);
        }
        /// <summary>
        ///判断用户是否具有查看到帐计划权限
        /// </summary>
        /// <param name="user"></param>
        /// <param name="project"></param>
        /// <param name="database"></param>
        /// <returns></returns>
        public static bool HasPermission_ShowProjectPayPlanItem(this User user, Project project, IDatabase database)
        {
            return user.HasPermission_Show(project, database);
        }
        /// <summary>
        /// 判断用户能够查看项目到帐信息
        /// </summary>
        /// <param name="user"></param>
        /// <param name="project"></param>
        /// <param name="database"></param>
        /// <returns></returns>
        public static bool CanShowProjectPayPlanItem(this User user, Project project, IDatabase database)
        {
            return user.CanShow(project, database);
        }
    }
}
