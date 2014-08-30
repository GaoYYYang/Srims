using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Srims.Server.Business.Stamps
{
    /// <summary>
    /// 文印状态
    /// </summary>
    public enum StampState
    {
        /// <summary>
        /// 状态未知
        /// </summary>
        Unknown = 0,
        /// <summary>
        /// 未提交
        /// </summary>
        UnSubmit = 1,
        /// <summary>
        /// 提交
        /// </summary>
        Submit = 2,
        /// <summary>
        /// 初审通过
        /// </summary>
        CensorPass = 3,
        /// <summary>
        /// 初审驳回
        /// </summary>
        CensorReject = 4,
        /// <summary>
        /// 已盖章
        /// </summary>
        Stamp = 5,
        /// <summary>
        /// 部门审核通过
        /// </summary>
        DepartmentCensorPass = 6,
        /// <summary>
        /// 部门审核驳回
        /// </summary>
        DepartmentCensorReject = 7,
        /// <summary>
        /// 初审最终完成
        /// </summary>
        CensorPassComplete = 8,


    }
}
