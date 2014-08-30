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
    /// 用户锁定记录
    /// </summary>
    public partial class UserLockLog : Entity<UserLockLog>
    {
        /// <summary>
        /// 验证操作
        /// </summary>
        /// <param name="validater"></param>
        /// <param name="database"></param>
        protected override void ValidateAction(Validater validater, IDatabase database)
        {
            validater.AddCondition(User != null, "用户锁定记录对应的用户不能为空！");
            validater.AddCondition(StartTime != null, "用户锁定开始时间不能为空！");
            validater.AddCondition(!string.IsNullOrEmpty(Operator), "用户锁定操作者不能为空！");
            validater.AddCondition(OperateDateTime != null, "用户锁定时间不能为空！");
        }
    }

    /// <summary>
    /// 用户锁定记录的业务扩展
    /// </summary>
    public static class UserLockLogBusinessExtension
    {
    }
    /// <summary>
    /// 用户锁定记录的查询扩展
    /// </summary>
    public static class UserLockLogQueryExtension
    {
        /// <summary>
        /// 取得有效的锁定
        /// </summary>
        /// <param name="query">数据查询</param>
        /// <param name="user">锁定对应的用户</param>
        /// <returns>如果当前该用户没有有效的锁定记录，即没有被锁定，则返回空</returns>
        public static UserLockLog GetActiveLockLog(this IQueryable<UserLockLog> query, User user)
        {
            if (query == null)
                throw new ArgumentNullException("query");

            return query
                .FirstOrDefault(ull => ull.User == user && ull.StartTime <= DateTime.Now && (ull.EndTime == null || ull.EndTime >= DateTime.Now));
        }
        /// <summary>
        /// 取得用户的锁定记录
        /// </summary>
        /// <param name="query"></param>
        /// <param name="user"></param>
        /// <returns></returns>
        public static IList<UserLockLog> GetUserLockLog(this IQueryable<UserLockLog> query, User user)
        {
            if (query == null)
                throw new ArgumentNullException("query");

            return query.Where(ull => ull.User == user).ToList();
        }
    }
    /// <summary>
    /// 用户锁定记录的权限扩展
    /// </summary>
    public static class UserLockLogPermissionExtension
    {
        ///// <summary>
        ///// 判断一个用户是否被有效锁定
        ///// </summary>
        ///// <param name="user"></param>
        ///// <param name="database"></param>
        ///// <returns></returns>
        //public static bool IsUserActiveLocked(this User user, IDatabase database)
        //{
        //    return database.UserLockLogs.GetActiveLockLog(user) != null;
        //}
    }
}
