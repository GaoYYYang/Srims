using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Srims.Server.Business.Patents
{
    /// <summary>
    /// 专利法律状态
    /// </summary>
    public enum PatentLawState
    {
        /// <summary>
        /// 未知
        /// </summary>
        Unknown = 0,
        /// <summary>
        /// PCT阶段
        /// </summary>
        PCT = 1,
        /// <summary>
        /// 驳回
        /// </summary>
        Reject = 2,
        /// <summary>
        /// 撤回
        /// </summary>
        Cancel = 3,
        /// <summary>
        /// 公开
        /// </summary>
        Publish = 4,
        /// <summary>
        /// 实审
        /// </summary>
        Censor = 5,
        /// <summary>
        /// 视为撤回
        /// </summary>
        TreatCancel = 6,
        /// <summary>
        /// 受理
        /// </summary>
        AcceptCase = 7,
        /// <summary>
        /// 授权
        /// </summary>
        Accredit = 8,
        /// <summary>
        /// 专利权放弃
        /// </summary>
        Abandon = 9,
        /// <summary>
        /// 专利权恢复
        /// </summary>
        Resume = 10,
        /// <summary>
        /// 专利权终止
        /// </summary>
        End = 11,
    }
}
