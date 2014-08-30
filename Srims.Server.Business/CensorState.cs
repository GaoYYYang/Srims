using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Srims.Server.Business
{
    /// <summary>
    /// 审核状态
    /// </summary>
    public enum CensorState
    {
        /// <summary>
        /// 未知状态
        /// </summary>
        Unknown = 0,
        /// <summary>
        /// 未提交
        /// </summary>
        UnSubmited = 1,
        /// <summary>
        /// 等待审核
        /// </summary>
        WaitingCensor = 2,
        /// <summary>
        /// 驳回
        /// </summary>
        Reject = 3,
        /// <summary>
        /// 审核通过
        /// </summary>
        Passed = 4,
        /// <summary>
        /// 已作废
        /// </summary>
        Canceled = 5
    }
}
