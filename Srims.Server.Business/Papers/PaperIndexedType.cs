using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Srims.Server.Business.Papers
{
    /// <summary>
    /// 论文收录
    /// </summary>
    public enum PaperIndexedType
    {
        /// <summary>
        /// 未知
        /// </summary>
        Unknown = 0,
        /// <summary>
        /// SCI
        /// </summary>
        SCI = 1,
        /// <summary>
        /// SCI光盘
        /// </summary>
        SCICD = 2,
        /// <summary>
        /// SCI网络
        /// </summary>
        SCINetWork = 3,
        /// <summary>
        /// EI
        /// </summary>
        EI = 4,
        /// <summary>
        /// EI核心
        /// </summary>
        EICore = 5,
        /// <summary>
        /// EI网络
        /// </summary>
        EINetWork = 6,
        /// <summary>
        /// ISTP
        /// </summary>
        ISTP = 7,
        /// <summary>
        /// 社会科学引用索引
        /// </summary>
        SSCI = 8,
        /// <summary>
        /// 文科
        /// </summary>
        ISTP_S = 9,
    }
}
