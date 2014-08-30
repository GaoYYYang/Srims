using System;
using System.Collections.Generic;
using System.Data.Linq;
using System.Linq;
using System.Text;

using MIS.Common;
using MIS.Common.Validate;
using MIS.Common.Query;

namespace Srims.Server.Business.Users
{
    /// <summary>
    /// 用户角色
    /// </summary>
    public partial class UserRole : Entity<UserRole>
    {
        /// <summary>
        /// 重写ToString方法
        /// </summary>
        /// <returns></returns>
        public override string ToString()
        {
            return _Name;
        }
    }

    /// <summary>
    /// 用户角色的业务扩展
    /// </summary>
    public static class UserRoleBusinessExtension
    {
    }
    /// <summary>
    /// 用户角色的查询扩展
    /// </summary>
    public static class UserRoleQueryExtension
    {
        /// <summary>
        /// 取得所有用户角色
        /// </summary>
        /// <param name="query"></param>
        /// <param name="database"></param>
        /// <returns></returns>
        public static IList<UserRole> GetUserRoles(this IQueryable<UserRole> query, IDatabase database)
        {
            return query.ToList();
        }
        /// <summary>
        /// 根据类型取得用户角色
        /// </summary>
        /// <param name="query"></param>
        /// <param name="type"></param>
        /// <returns></returns>
        public static IList<UserRole> GetUserRoleByType(this IQueryable<UserRole> query, UserRoleType type)
        {
            return query.Where(ur => ur.Type.Equals(type)).ToList();
        }
    }
    /// <summary>
    /// 用户角色的权限扩展
    /// </summary>
    public static class UserRolePermissionExtension
    {
        /// <summary>
        /// 取得管理员角色
        /// </summary>
        /// <param name="query">用户角色查询</param>
        /// <param name="type"></param>
        /// <returns></returns>
        public static IList<UserRole> GetUserRulesByType(this IQueryable<UserRole> query, UserRoleType type)
        {
            return query
                .Where(ur => ur.Type == type)
                .ToList();
        }
    }
}
