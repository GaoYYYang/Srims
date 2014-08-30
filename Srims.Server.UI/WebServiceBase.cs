using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Web.Services;

using Srims.Server.Business.Users;
using Srims.Server.DataAccess;
using System.Web;

namespace Srims.Server.UI
{
    /// <summary>
    /// WebService基类
    /// </summary>
    public class WebServiceBase : System.Web.Services.WebService
    {
        private Database _Database = Database.New();

        /// <summary>
        /// 取得数据库访问
        /// </summary>
        protected Database Database
        {
            get
            {
                if (!HttpContext.Current.Items.Contains("Database"))
                    HttpContext.Current.Items.Add("Database", _Database);

                return _Database;
            }
        }

        /// <summary>
        /// 取得当前用户的IP
        /// </summary>
        protected String UserIP
        {
            get { return Context.Request.UserHostAddress; }
        }
        /// <summary>
        /// 取得该次登陆令牌
        /// </summary>
        /// <returns></returns>
        protected Guid? GetToken()
        {
            string token;

            token = Context.Request["token"];
            if (token != null)
                return new Guid(token);

            token = Context.Request["ys-token"];
            if (token != null)
                return new Guid(token.Replace("s%3A", string.Empty));

            return null;

        }
        /// <summary>
        /// 取得当前用户登陆记录
        /// </summary>
        /// <returns>如果当前用户未登陆，返回空</returns>
        protected UserLoginLog GetUserLoginLog()
        {
            var token = GetToken();
            if (!token.HasValue)
                return null;

            return Database
                .UserLoginLogs
                .GetActiveUserLoginLog(token.Value, UserIP);
        }

        /// <summary>
        /// 取得当前登陆的用户，如果当前用户未登陆，返回空
        /// </summary>
        protected new User User
        {
            get
            {
                var userLoginLog = GetUserLoginLog();
                return userLoginLog == null ? null : userLoginLog.User;
            }
        }

        /// <summary>
        /// 取得当前的Http请求
        /// </summary>
        protected HttpRequest Request
        {
            get { return Context.Request; }
        }
        /// <summary>
        /// 取得当前的Http相应
        /// </summary>
        protected HttpResponse Response
        {
            get { return Context.Response; }
        }
    }
}
