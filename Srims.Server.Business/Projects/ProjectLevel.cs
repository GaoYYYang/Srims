using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Srims.Server.Business.Projects
{
    /// <summary>
    /// 项目级别
    /// </summary>
    public enum ProjectLevel
    {
        /// <summary>
        /// 未识别
        /// </summary>
        Unknown = 0,
        /// <summary>
        /// 主持
        /// </summary>
        Perside = 1,
        /// <summary>
        /// 副主持
        /// </summary>
        SubPerside = 2,
        /// <summary>
        /// 参加
        /// </summary>
        Join = 3,
        /// <summary>
        /// 附加
        /// </summary>
        Addition = 4,
        /// <summary>
        /// 配套
        /// </summary>
        Coordinate=5
    }
}
