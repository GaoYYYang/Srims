using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Web;

using Srims.Server.Business;
using Srims.Server.Business.Users;

using Srims.Server.UI;
using Srims.Server.UI.HttpExtension;

namespace Srims.Server.UI.Users
{
    /// <summary>
    /// 用户锁定日志扩展
    /// </summary>
    public static class UserLockLogExtension
    {
        /// <summary>
        /// 取得用户锁定日志
        /// </summary>
        /// <param name="request"></param>
        /// <param name="database"></param>
        /// <returns></returns>
        public static UserLockLog GetUserLockLog(this HttpRequest request, IDatabase database)
        {
            UserLockLog userLockLog = new UserLockLog();

            userLockLog.User = request.GetEntity(database.Users, "userID");
            userLockLog.StartTime = request.GetDateTime("lockStartDate").Value;
            userLockLog.OperateDateTime = DateTime.Now;
            if (request.GetDateTime("lockEndDate") != null)
                userLockLog.EndTime = request.GetDateTime("lockEndDate");
            if (!string.IsNullOrEmpty(request.GetString("lockReason")))
                userLockLog.Reason = request.GetString("lockReason");

            return userLockLog;
        }
    }
}
