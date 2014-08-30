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
    /// 权限_用户
    /// </summary>
    public partial class UserPermission : Entity<UserPermission>
    {
        /// <summary>
        /// 验证操作
        /// </summary>
        /// <param name="validater"></param>
        /// <param name="database"></param>
        protected override void ValidateAction(Validater validater, IDatabase database)
        {
            validater.AddCondition(User != null, "对应用户不能为空");
            validater.AddCondition(Permission != null, "对应权限不能为空");
        }
        /// <summary>
        /// 删除操作
        /// </summary>
        /// <param name="database"></param>
        protected override void DeleteAction(IDatabase database)
        {
            Permission permission = this.Permission;
            base.DeleteAction(database);
            permission.Delete(database);
        }
    }

    /// <summary>
    /// 权限_用户的业务扩展
    /// </summary>
    public static class UserPermissionBusinessExtension
    {
    }
    /// <summary>
    /// 权限_用户的查询扩展
    /// </summary>
    public static class UserPermissionQueryExtension
    {
        /// <summary>
        /// 取得用户所有userPermission记录
        /// </summary>
        /// <param name="user"></param>
        /// <param name="query"></param>
        /// <returns></returns>
        public static IList<UserPermission> GetAllUserPermission(this User user, IQueryable<UserPermission> query)
        {
            return query.Where(pu => pu.UserID == user.ID).ToList();
        }
        /// <summary>
        /// 取得用户对应的非学院相关的userPermission记录
        /// </summary>
        /// <param name="user"></param>
        /// <param name="query"></param>
        /// <returns></returns>
        public static IList<UserPermission> GetUserPermissions(this User user, IQueryable<UserPermission> query)
        {
            return query.Where(pu => pu.UserID == user.ID && pu.Permission.PermissionOperation != PermissionOperation.College && pu.Permission.EndDateTime == null).ToList();
        }
        /// <summary>
        /// 取得用户对应的学院相关的userPermission记录
        /// </summary>
        /// <param name="user"></param>
        /// <param name="query"></param>
        /// <returns></returns>
        public static IList<UserPermission> GetCollegeRelatedUserPermissions(this User user, IQueryable<UserPermission> query)
        {
            return query.Where(pu => pu.UserID == user.ID && pu.Permission.PermissionOperation == PermissionOperation.College).ToList();
        }
        /// <summary>
        /// 取得用户临时权限记录
        /// </summary>
        /// <param name="user"></param>
        /// <param name="query"></param>
        /// <returns></returns>
        public static IList<UserPermission> GetTemporaryUserPermissions(this User user, IQueryable<UserPermission> query)
        {
            return query.Where(pu => pu.UserID == user.ID && pu.Permission.EndDateTime != null).ToList();
        }
        /// <summary>
        /// 取得用户所有权限
        /// </summary>
        /// <param name="user"></param>
        /// <param name="query"></param>
        /// <returns></returns>
        public static IList<Permission> GetAllPermissions(this User user, IQueryable<UserPermission> query)
        {
            return query.Where(pu => pu.UserID == user.ID).Select(pu => pu.Permission).ToList();
        }
        /// <summary>
        /// 取得用户非college相关权限
        /// </summary>
        /// <param name="user"></param>
        /// <param name="query"></param>
        /// <returns></returns>
        public static IList<Permission> GetPermissions(this User user, IQueryable<UserPermission> query)
        {
            return query.Where(pu => pu.UserID == user.ID && pu.Permission.PermissionOperation != PermissionOperation.College && pu.Permission.EndDateTime == null)
                .Select(pu => pu.Permission).ToList();
        }
        /// <summary>
        /// 取得用户college相关权限
        /// </summary>
        /// <param name="user"></param>
        /// <param name="query"></param>
        /// <returns></returns>
        public static IList<Permission> GetCollegeRelatedPermissions(this User user, IQueryable<UserPermission> query)
        {
            return query.Where(pu => pu.UserID == user.ID && pu.Permission.PermissionOperation == PermissionOperation.College).Select(pu => pu.Permission).ToList();
        }
        /// <summary>
        /// 存储权限
        /// </summary>
        /// <param name="user"></param>
        /// <param name="permissionList"></param>
        /// <param name="database"></param>
        public static void SetPermissionList(this User user, List<Permission> permissionList, IDatabase database)
        {
            var permissions = user.GetPermissions(database.UserPermissions);
            var userPermissions = user.GetUserPermissions(database.UserPermissions);
            foreach (var userPermission in userPermissions)
                userPermission.Delete(database);
            foreach (var permission in permissions)
                permission.Delete(database);

            if (permissionList.Count() > 0)
                foreach (var permission in permissionList)
                {
                    permission.Save(database);
                    var userPermission = new UserPermission();
                    userPermission.Permission = permission;
                    userPermission.User = user;
                    userPermission.Save(database);
                }
        }
        /// <summary>
        /// 存储学院相关权限
        /// </summary>
        /// <param name="user"></param>
        /// <param name="permissionList"></param>
        /// <param name="database"></param>
        public static void SetCollegeRelatedPermisssionList(this User user, List<Permission> permissionList, IDatabase database)
        {
            var permissions = user.GetCollegeRelatedPermissions(database.UserPermissions);
            var userPermissions = user.GetCollegeRelatedUserPermissions(database.UserPermissions);

            foreach (var userPermission in userPermissions)
                userPermission.Delete(database);
            foreach (var permission in permissions)
                permission.Delete(database);

            if (permissionList.Count() > 0)
                foreach (var permission in permissionList)
                {
                    permission.Save(database);
                    var userPermission = new UserPermission();
                    userPermission.Permission = permission;
                    userPermission.User = user;
                    userPermission.Save(database);
                }
        }
        /// <summary>
        /// 存储临时授权权限
        /// </summary>
        /// <param name="user"></param>
        /// <param name="permissionList"></param>
        /// <param name="database"></param>
        public static void SetTemporayAuthorizationPermissionList(this User user, List<Permission> permissionList, IDatabase database)
        {
            if (permissionList.Count() > 0)
                foreach (var permission in permissionList)
                {
                    permission.Save(database);
                    var userPermission = new UserPermission();
                    userPermission.Permission = permission;
                    userPermission.User = user;
                    userPermission.Save(database);
                }
        }
        /// <summary>
        /// 清除用户的所有权限
        /// </summary>
        /// <param name="user"></param>
        /// <param name="database"></param>
        public static void ClearUserPermissions(this User user, IDatabase database)
        {
            var permissions = user.GetAllPermissions(database.UserPermissions);
            var userPermissions = user.GetAllUserPermission(database.UserPermissions);

            foreach (var userPermission in userPermissions)
                userPermission.Delete(database);
            foreach (var permission in permissions)
                permission.Delete(database);
        }
    }
    /// <summary>
    /// 权限_用户的权限扩展
    /// </summary>
    public static class UserPermissionPermissionExtension
    {
    }
}
