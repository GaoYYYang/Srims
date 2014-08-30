using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Srims.Server.Business.Fund
{
    /// <summary>
    /// 凭单的法律状态
    /// </summary>
    public enum VoucherState
    {
        /// <summary>
        /// 未知状态
        /// </summary>
        Unknown = 0,
        /// <summary>
        /// 未打印
        /// </summary>
        UnPrinted = 1,
        /// <summary>
        /// 已打印/未签收
        /// </summary>
        NotSignIn = 2,
        /// <summary>
        /// 签收/未分配
        /// </summary>
        SignIn = 3,
        /// <summary>
        /// 已分配
        /// </summary>
        Allocated = 4,
        /// <summary>
        /// 未审核
        /// </summary>
        WaitingCensor = 5,
        /// <summary>
        /// 作废
        /// </summary>
        Canceled = 6,
        /// <summary>
        /// 审核驳回
        /// </summary>
        Reject = 7,
    }
}
