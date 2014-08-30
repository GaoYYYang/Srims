using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Srims.Server.Business.Patents
{
    /// <summary>
    /// 专利级别
    /// </summary>
    public enum PatentLevel
    {
        /// <summary>
        /// 未识别
        /// </summary>
        Unknown = 0,
        /// <summary>
        /// 第一责任单位
        /// </summary>
        TheFirstResponsibleUnion = 1,
        /// <summary>
        /// 参加
        /// </summary>
        Join = 2
    }
}
