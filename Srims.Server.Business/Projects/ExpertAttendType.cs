using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Srims.Server.Business.Projects
{
    /// <summary>
    /// 项目专家的参与方式
    /// </summary>
    public enum ExpertAttendType
    {
        /// <summary>
        /// 未知
        /// </summary>
        Unknown = 0,
        /// <summary>
        /// 项目负责任人
        /// </summary>
        Principal = 1,
        /// <summary>
        /// 为项目成员
        /// </summary>
        Participate = 2,
        /// <summary>
        /// 被委托负责人
        /// </summary>
        Delegate = 3,
    }
}
