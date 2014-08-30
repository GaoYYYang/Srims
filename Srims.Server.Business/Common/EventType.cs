using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Srims.Server.Business.Common
{
    /// <summary>
    /// 事件类型
    /// </summary>
    public enum EventType
    {
        /// <summary>
        /// 未知
        /// </summary>
        Unknown = 0,
        /// <summary>
        /// 项目立项审核
        /// </summary>
        ProjectStartCensor = 1,
        /// <summary>
        /// 项目结项审核
        /// </summary>
        ProjectEndCensor = 2,
        /// <summary>
        /// 催缴项目文档
        /// </summary>
        ProjectDoucmentRequire = 3,
        /// <summary>
        /// 项目文档审核
        /// </summary>
        ProjectDocumentCensor = 4,
        /// <summary>
        /// 经费下拨审核
        /// </summary>
        FundDescendCensor = 5,
        /// <summary>
        /// 经费分配
        /// </summary>
        FundAllocation = 6,
        /// <summary>
        /// 经费分配审核
        /// </summary>
        FundAllocationCensor = 7,
        /// <summary>
        /// 专家编辑
        /// </summary>
        ExpertEditCensor = 8,
    }
}
