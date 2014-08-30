using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

using MIS.Common.Query;
using MIS.Common;

namespace Srims.Server.Business.Common
{
    /// <summary>
    /// 通知查询信息
    /// </summary>
    public class AnnouncementQueryInformation : QueryInformation
    {
        /// <summary>
        /// 取得或设置通知发布人
        /// </summary>
        public string UserName { get; set; }
        /// <summary>
        /// 取得或设置通知的发布时间
        /// </summary>
        public Range<DateTime> DateTime { get; set; }
        /// <summary>
        /// 取得或设置通知状态
        /// </summary>
        public AnnouncementState[] AnnouncementStates { get; set; }
        /// <summary>
        /// 取得或设置通知的排序方式
        /// </summary>
        public SortInfo SortInfo { get; set; }
    }
}
