using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Web;

using Srims.Server.Business.Users;
using Srims.Server.Business;

using Srims.Server.UI;
using Srims.Server.UI.HttpExtension;
using Srims.Server.UI.MISExtension;

namespace Srims.Server.UI.Users
{
    /// <summary>
    /// 登录结果显示扩展
    /// </summary>
    public static class LoginResultExtension
    {
        /// <summary>
        /// 显示登陆结果
        /// </summary>
        /// <param name="loginResult"></param>
        /// <param name="response"></param>
        /// <param name="database"></param>
        public static void Show(this LoginResult loginResult, HttpResponse response, IDatabase database)
        {
            response.WriteTagBegin("LoginResult");

            response.WriteTagWithValue("State", loginResult.State);
            if (loginResult.State == LoginResultState.Succeed)
                loginResult.UserLoginLog.Show(response, database);

            response.WriteTagEnd("LoginResult");
        }
    }
}
