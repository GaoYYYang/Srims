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

namespace Srims.Server.Business.Projects
{
    /// <summary>
    /// 项目质量负责人
    /// </summary>
    public partial class ProjectQualityPrincipal : Entity<ProjectQualityPrincipal>
    {
        /// <summary>
        /// 验证操作
        /// </summary>
        /// <param name="validater"></param>
        /// <param name="database"></param>
        protected override void ValidateAction(Validater validater, IDatabase database)
        {
            validater.AddCondition(_Expert.Entity != null, "对应专家不能为空");
            validater.AddCondition(_Project.Entity != null, "对应项目不能为空");
        }
    }

    /// <summary>
    /// 项目质量负责人的业务扩展
    /// </summary>
    public static class ProjectQualityPrincipalBusinessExtension
    {
    }
    /// <summary>
    /// 项目质量负责人的查询扩展
    /// </summary>
    public static class ProjectQualityPrincipalQueryExtension
    {
    }
    /// <summary>
    /// 项目质量负责人的权限扩展
    /// </summary>
    public static class ProjectQualityPrincipalPermissionExtension
    {
    }
}
