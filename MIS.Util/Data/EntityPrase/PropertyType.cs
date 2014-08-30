using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace MIS.Util.Data.EntityPrase
{
    /// <summary>
    /// 生成属性的方式
    /// </summary>
    public enum PropertyType
    {
        /// <summary>
        /// 未知
        /// </summary>
        Unknown = 0,
        /// <summary>
        /// 只有Get
        /// </summary>
        Get = 1,
        /// <summary>
        /// 只有Set
        /// </summary>
        Set = 2,
        /// <summary>
        /// Set和Get
        /// </summary>
        Both = 3,
        /// <summary>
        /// 忽略
        /// </summary>
        None = 4
    }
}
