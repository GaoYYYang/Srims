using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using MIS.Common.Query;
using MIS.Common;

namespace Srims.Server.Business.Performances
{
    /// <summary>
    /// 绩效查询条件
    /// </summary>
    public class PerformanceQueryInformation : QueryInformation
    {
        /// <summary>
        /// 取得或设置是作废
        /// </summary>
        public bool? IsCanceled { get; set; }
        /// <summary>
        /// 取得或设置不作废
        /// </summary>
        public bool? IsCanceled2 { get; set; }
        /// <summary>
        /// 取得或设置已分配完成
        /// </summary>
        public bool? IsAllocated { get; set; }
        /// <summary>
        /// 取得或设置未分配完成
        /// </summary>
        public bool? IsAllocated2 { get; set; }
        /// <summary>
        /// <summary>
        /// 项目名称
        /// </summary>
        public string ProjectName;
        /// <summary>
        /// 项目类型
        /// </summary>
        public string TypeName;
        /// <summary>
        /// 项目负责人名称
        /// </summary>
        public string PrincipalName;
        /// <summary>
        /// 项目编号
        /// </summary>
        public string ProjectNumber;
        /// <summary>
        /// 已到绩效
        /// </summary>
        public string ArrivedPerformance;
        /// <summary>
        /// 分配绩效
        /// </summary>
        public string AllocatedPerformance;

        /// <summary>
        /// 取得或设置项目的开始日期
        /// </summary>
        public Range<DateTime> StartDate { get; set; }

        /// <summary>
        /// 取得或设置项目的分配日期
        /// </summary>
        public Range<DateTime> AllocationDate { get; set; }
        /// <summary>
        /// 取得或设置项目的调整日期
        /// </summary>
        public Range<DateTime> AdjustDate { get; set; }

        /// <summary>
        /// 取得或设置绩效单位的排序方式
        /// </summary>
        public SortInfo SortInfo { get; set; }
    }
}
