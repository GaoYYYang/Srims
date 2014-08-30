using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Srims.Server.Business.Fund
{
    /// <summary>
    /// 经费下拨状态
    /// </summary>
    public enum FundDescendState
    {
        /// <summary>
        /// 未知状态
        /// </summary>
        Unknown = 0,
        /// <summary>
        /// 等待审核
        /// </summary>
        WaitingCensor = 2,
        /// <summary>
        /// 审核驳回
        /// </summary>
        Reject = 3,
        /// <summary>
        /// 审核通过
        /// </summary>
        Passed = 4,
        /// <summary>
        /// 分配完成
        /// </summary>
        AllocationCompleted = 5,
        /// <summary>
        /// 删除
        /// </summary>
        Delete = 6,
    }
}
