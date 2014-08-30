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
    /// 通知查询相关扩展
    /// </summary>
    public static class AnnouncementQueryInformationExtension
    {
        /// <summary>
        /// 通知查询条件扩展
        /// </summary>
        /// <param name="request"></param>
        /// <returns></returns>
        public static AnnouncementQueryInformation GetAnnouncementQueryInformation(this HttpRequest request)
        {
            var announcementQueryInformation = new AnnouncementQueryInformation();

            announcementQueryInformation.Start = request.GetQueryInformation_Start();
            announcementQueryInformation.Limit = request.GetQueryInformation_Limit();
            announcementQueryInformation.SortInfo = request.GetQueryCondition_SortInfo();

            announcementQueryInformation.UserName = request.GetString("UserName");
            announcementQueryInformation.DateTime = request.GetDateRange("DateTime");
            announcementQueryInformation.AnnouncementStates = request.GetEnumList<AnnouncementState>("State");

            return announcementQueryInformation;
        }
    }
}
