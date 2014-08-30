using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Web;

using MIS.Common.Query;

using Srims.Server.Business;
using Srims.Server.Business.Common;
using Srims.Server.Business.Users;

using Srims.Server.UI.HttpExtension;
using Srims.Server.UI.MISExtension;

namespace Srims.Server.UI.Common
{
    /// <summary>
    /// 日志的显示扩展
    /// </summary>
    public static class LogExtension
    {
        /// <summary>
        /// 显示日志
        /// </summary>
        /// <param name="log">要显示的日志</param>
        /// <param name="response">输出</param>
        public static void ShowLog(Log log, HttpResponse response)
        {
            response.WriteTagWithValue("ID", log.ID);
            response.WriteTagWithValue("User", log.User);
            response.WriteTagWithValue("DataTime", log.DateTime.ToString());//2009年7月20日10:43:36
            response.WriteTagWithValue("Action", log.Action);
            response.WriteTagWithValue("Description", log.Description);
            response.WriteTagWithValue("UserIP", log.UserIP);
        }
        /// <summary>
        /// 显示日志查询结果
        /// </summary>
        /// <param name="logResult">日志结果</param>
        /// <param name="response">输出</param>
        public static void Show(this QueryResult<Log> logResult, HttpResponse response)
        {
            ShowDelegate<Log> showDelegate = new ShowDelegate<Log>(ShowLog);
            logResult.Show<Log>(response, showDelegate);
        }




    }
}
