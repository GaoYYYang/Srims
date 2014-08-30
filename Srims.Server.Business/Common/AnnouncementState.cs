using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Srims.Server.Business.Common
{
    /// <summary>
    /// 通知状态
    /// </summary>
    public enum AnnouncementState
    {
        /// <summary>
        /// 未知
        /// </summary>
        Unknown = 0,
        /// <summary>
        /// 正常
        /// </summary>
        Normal = 1,
        /// <summary>
        /// 置顶
        /// </summary>
        Top = 2,
        /// <summary>
        /// 过期
        /// </summary>
        Overdue = 3,
    }
}
