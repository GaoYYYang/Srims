using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Srims.Server.Business.Patents
{
    /// <summary>
    /// 专利类型
    /// </summary>
    public enum PatentType
    {
        /// <summary>
        /// 未知类型
        /// </summary>
        Unknown = 0,
        /// <summary>
        /// 发明专利
        /// </summary>
        Invention = 1,
        /// <summary>
        /// 实用新型
        /// </summary>
        Application = 2,
        /// <summary>
        /// 外观设计
        /// </summary>
        Design = 3,

    }
}
