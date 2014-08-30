using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Web;

using Srims.Server.Business;
using Srims.Server.Business.Experts;
using Srims.Server.Business.Users;

using Srims.Server.UI;
using Srims.Server.UI.MISExtension;
using Srims.Server.UI.HttpExtension;

namespace Srims.Server.UI.Users
{
    /// <summary>
    /// 用户登录记录扩展
    /// </summary>
    public static class UserLoginLogExtension
    {
        /// <summary>
        /// 显示用户登陆记录
        /// </summary>
        /// <param name="userLogin"></param>
        /// <param name="response"></param>
        /// <param name="database"></param>
        public static void Show(this UserLoginLog userLogin, HttpResponse response, IDatabase database)
        {
            response.WriteTagBegin("UserLoginLog");

            response.WriteTagWithValue("Token", userLogin.Token);

            response.WriteTagBegin("User");
            userLogin.User.ShowUser(response, database);
            response.WriteTagEnd("User");

            response.WriteTagEnd("UserLoginLog");
        }
    }
}
