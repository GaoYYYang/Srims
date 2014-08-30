using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Web;

using Srims.Server.Business.Common;

using Srims.Server.UI.HttpExtension;
using Srims.Server.UI.MISExtension;

namespace Srims.Server.UI.Common
{
    /// <summary>
    /// 日志查询相关扩展
    /// </summary>
    public static class LogQueryInformationExtension
    {
        /// <summary>
        /// 日志查询条件扩展
        /// </summary>
        /// <param name="request"></param>
        /// <returns></returns>
        public static LogQueryInformation GetLogQueryInformation(this HttpRequest request)
        {
            var logQueryInformation = new LogQueryInformation();
            logQueryInformation.Start = request.GetQueryInformation_Start();
            logQueryInformation.Limit = request.GetQueryInformation_Limit();

            logQueryInformation.User = request.GetString("User");
            logQueryInformation.WriteTime = request.GetDateRange("DateTime");
            logQueryInformation.Action = request.GetList<string>("Action");

            return logQueryInformation;
        }
    }
}
