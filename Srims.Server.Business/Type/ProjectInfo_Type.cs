using System;
using System.Collections.Generic;
using System.Data.Linq;
using System.Linq;
using System.Text;

using MIS.Common;
using MIS.Common.Validate;
using MIS.Common.Query;

using Srims.Server.Business.Projects;
using Srims.Server.Business.Type;

namespace Srims.Server.Business.Type
{
    /// <summary>
    /// 项目信息—分类
    /// </summary>
    public partial class ProjectInfo_Type : Entity<ProjectInfo_Type>
    {
        /// <summary>
        /// 
        /// </summary>
        /// <returns></returns>
        public override string ToString()
        {
            return "ID：" + this.ID +
                "、对应的项目级别：" + this.Rank.Name +
                "、对应的资助类型：" + this.SupportCategory.Name +
                "、对应的资助领域名称：" + this.SupportField.Name +
                "、对应的资助子领域名称：" + this.SupportSubField.Name +
                "、对应的项目类别：" + this.Type.Name + "。";
        }
        /// <summary>
        /// 验证操作
        /// </summary>
        /// <param name="validater">验证器</param>
        /// <param name="database">数据库</param>
        protected override void ValidateAction(Validater validater, IDatabase database)
        {
            validater.AddCondition(Project != null, "对应的项目名称不能为空！");
            validater.AddCondition(Rank != null, "项目等级名称不能为空！");
            validater.AddCondition(Type != null, "项目类别名称不能为空！");
        }
    }
    /// <summary>
    /// 项目信息—分类的业务扩展
    /// </summary>
    public static class ProjectInfo_TypeBusinessExtension
    {
    }
    /// <summary>
    /// 项目信息—分类的查询扩展
    /// </summary>
    public static class ProjectInfo_TypeQueryExtension
    {
    }
    /// <summary>
    /// 项目信息—分类的权限扩展
    /// </summary>
    public static class ProjectInfo_TypePermissionExtension
    {
    }
}
