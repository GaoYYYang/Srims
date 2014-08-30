using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Srims.Server.Business.Experts
{
    /// <summary>
    /// 专家信息历史属性值类型
    /// </summary>
    public enum ExpertInfoHistoryPropertyValueType
    {
        /// <summary>
        /// 为止
        /// </summary>
        Unknown = 0,
        /// <summary>
        /// 字符串
        /// </summary>
        Text = 1,
        /// <summary>
        /// 整数
        /// </summary>
        Int = 2,
        /// <summary>
        /// 日期
        /// </summary>
        DateTime = 3,
        /// <summary>
        /// Guid
        /// </summary>
        Guid = 4,
        /// <summary>
        /// 长文本
        /// </summary>
        LongText = 5,
        /// <summary>
        /// 外键
        /// </summary>
        Entity = 6,
        /// <summary>
        /// 布尔值
        /// </summary>
        Boolean = 8
    }
}
