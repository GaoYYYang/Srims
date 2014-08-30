using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Srims.Server.Business.Projects
{
    /// <summary>
    /// 项目状态
    /// </summary>
    public enum ProjectState
    {
        /// <summary>
        /// 状态未知
        /// </summary>
        Unknown = 0,
        /// <summary>
        /// 等待专家提交立项信息
        /// </summary>
        WaitingStartInformation = 1,
        /// <summary>
        /// 等待立项审核
        /// </summary>
        WaitingStartCensor = 2,
        /// <summary>
        /// 项目在研
        /// </summary>
        ProjectProcessing = 4,
        /// <summary>
        /// 等待结项审核
        /// </summary>
        WaitingEndCensor = 5,
        /// <summary>
        /// 已结项
        /// </summary>
        ProjectEnd = 6,
        /// <summary>
        /// 已被删除
        /// </summary>
        Deleted = 7,
        /// <summary>
        /// 撤销
        /// </summary>
        WithDraw = 8,
        /// <summary>
        /// 终止
        /// </summary>
        Terminate = 9,
        /// <summary>
        /// 延期
        /// </summary>
        Defer = 10,
        /// <summary>
        /// 延期结题
        /// </summary>
        DeferEnd = 11


    }
}
