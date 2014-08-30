using System;
using System.Collections.Generic;
using System.Data.Linq;
using System.Linq;
using System.Text;

using MIS.Common;
using MIS.Common.Validate;
using MIS.Common.Query;

using Srims.Server.Business.Users;

namespace Srims.Server.Business.Users
{
    /// <summary>
    /// 权限_角色
    /// </summary>
    public partial class UserRolePermission : Entity<UserRolePermission>
    {
        /// <summary>
        /// 验证操作
        /// </summary>
        /// <param name="validater"></param>
        /// <param name="database"></param>
        protected override void ValidateAction(Validater validater, IDatabase database)
        {
            validater.AddCondition(UserRole != null, "对应用户不能为空");
            validater.AddCondition(Permission != null, "对应权限不能为空");
        }
    }

    /// <summary>
    /// 权限_角色的业务扩展
    /// </summary>
    public static class UserRolePermissionBusinessExtension
    {
    }
    /// <summary>
    /// 权限_角色的查询扩展
    /// </summary>
    public static class UserRolePermissionQueryExtension
    {
        /// <summary>
        /// 取得用户所有权限
        /// </summary>
        /// <param name="userRole"></param>
        /// <param name="query"></param>
        /// <returns></returns>
        public static IList<Permission> GetPermissions(this UserRole userRole, IQueryable<UserRolePermission> query)
        {
            return query.Where(pu => pu.UserRoleID == userRole.ID).Select(pu => pu.Permission).ToList();
        }
    }
    /// <summary>
    /// 权限_角色的权限扩展
    /// </summary>
    public static class UserRolePermissionPermissionExtension
    {
    }
}
