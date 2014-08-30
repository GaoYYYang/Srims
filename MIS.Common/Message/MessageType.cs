using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace MIS.Common.Message
{
    /// <summary>
    /// 信息类型
    /// </summary>
    public enum MesssageType
    {
        /// <summary>
        /// 细节
        /// </summary>
        Detail,
        /// <summary>
        /// 消息
        /// </summary>
        Information,
        /// <summary>
        /// 警告
        /// </summary>
        Warning,
        /// <summary>
        /// 错误
        /// </summary>
        Error
    }
}
