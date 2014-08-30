using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace MIS.Common.Query
{
    /// <summary>
    /// 排序方向
    /// </summary>
    public enum SortDirection
    {
        /// <summary>
        /// 未知
        /// </summary>
        Unknown,
        /// <summary>
        /// 正向，从小到大
        /// </summary>
        ASC,
        /// <summary>
        /// 反向，从大到小
        /// </summary>
        DESC,
    }
}
