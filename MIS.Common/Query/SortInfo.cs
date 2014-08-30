using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace MIS.Common.Query
{
    /// <summary>
    /// 查询的排序信息
    /// </summary>
    public class SortInfo
    {
        /// <summary>
        /// 设置获取的排序字段
        /// </summary>
        public string Field { get; set; }
        /// <summary>
        /// 设置或取得查询的方向
        /// </summary>
        public SortDirection Direction { get; set; }
    }
}
