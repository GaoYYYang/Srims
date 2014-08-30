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
    /// 用户登录记录
    /// </summary>
    public partial class UserLoginLog : Entity<UserLoginLog>
    {
        /// <summary>
        /// 激活，更新最后活动时间
        /// </summary>
        /// <param name="database">数据库</param>
        public void Active(IDatabase database)
        {
            this._LastActiveTime = DateTime.Now;
            this.Save(database);
        }

        /// <summary>
        /// 退出登录
        /// </summary>
        /// <param name="database">数据库</param>
        public void Logout(IDatabase database)
        {
            this._IsLogout = true;
            this.Save(database);
        }

        /// <summary>
        /// 根据登陆用户及其IP构造新的登陆日志
        /// </summary>
        /// <param name="user">登陆用户</param>
        /// <param name="loginIP">登陆用户的IP</param>
        /// <returns></returns>
        public static UserLoginLog New(User user, string loginIP)
        {
            var userLoginLog = new UserLoginLog();

            userLoginLog.LoginTime = DateTime.Now;
            userLoginLog.LastActiveTime = userLoginLog.LoginTime;
            userLoginLog.LoingIP = loginIP;
            userLoginLog.Token = Guid.NewGuid();
            userLoginLog.User = user;

            return userLoginLog;
        }
    }

    /// <summary>
    /// 用户登录记录的业务扩展
    /// </summary>
    public static class UserLoginLogBusinessExtension
    {
    }
    /// <summary>
    /// 用户登录记录的查询扩展
    /// </summary>
    public static class UserLoginLogQueryExtension
    {
        /// <summary>
        /// 令牌的过期时间，单位是分钟
        /// </summary>
        public const int TOKEN_EXPIRE_TIME = 2;

        /// <summary>
        /// 根据令牌取得活动的用户登录
        /// </summary>
        /// <param name="query">登陆日志查询</param>
        /// <param name="token">身份令牌</param>
        /// <param name="loginIP">登陆的IP</param>
        /// <returns>该次登陆的日志</returns>
        public static UserLoginLog GetActiveUserLoginLog(this IQueryable<UserLoginLog> query, Guid token, String loginIP)
        {
            return query
                .SingleOrDefault(ull => ull.Token == token
                    && ull.IsLogout == false
                    && ull.LoingIP == loginIP
                    && ull.LastActiveTime >= DateTime.Now.AddMinutes(-1 * TOKEN_EXPIRE_TIME));
        }
        /// <summary>
        /// 根据用户取得活动的用户登录
        /// </summary>
        /// <param name="query">登陆日志查询</param>
        /// <param name="user">用户</param>
        /// <returns></returns>
        public static IList<UserLoginLog> GetActiveUesrLoginLog(this IQueryable<UserLoginLog> query, User user)
        {
            return query
                .Where(ull => ull.User == user && !ull.IsLogout && ull.LastActiveTime >= DateTime.Now.AddMinutes(-1 * TOKEN_EXPIRE_TIME))
                .ToList();
        }
        /// <summary>
        /// 取得用户的所有登陆日志
        /// </summary>
        /// <param name="query"></param>
        /// <param name="user"></param>
        /// <returns></returns>
        public static IList<UserLoginLog> GetUserLoginLog(this IQueryable<UserLoginLog> query, User user)
        {
            return query.Where(ull => ull.User == user).ToList();
        }
        /// <summary>
        /// 取得当前在线用户
        /// </summary>
        /// <param name="query"></param>
        /// <returns></returns>
        public static QueryResult<User> GetActiveUsers(this IQueryable<UserLoginLog> query)
        {
            var users = query.Where(ull => !ull.IsLogout && ull.LastActiveTime >= DateTime.Now.AddMinutes(-1 * TOKEN_EXPIRE_TIME)).Select(ull => ull.User).ToList();
            return new QueryResult<User>(users, users.Count());
        }
    }
    /// <summary>
    /// 用户登录记录的权限扩展
    /// </summary>
    public static class UserLoginLogPermissionExtension
    {
    }
}
