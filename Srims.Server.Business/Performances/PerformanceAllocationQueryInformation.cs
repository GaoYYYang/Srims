using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

using MIS.Common;
using MIS.Common.Query;
using Srims.Server.Business.Performances;

namespace Srims.Server.UI.Performances
{
    /// <summary>
    /// 绩效分配查询条件
    /// </summary>
    public class PerformanceAllocationQueryInformation : QueryInformation
    {
        /// <summary>
        /// 取得或设置是否横向项目
        /// </summary>
        public bool? IsHorizontal { get; set; }
        /// <summary>
        /// 取得或设置绩效分配的状态
        /// </summary>
        public PerformanceAllocationState[] States { get; set; }
        /// <summary>
        /// <summary>
        /// 项目名称
        /// </summary>
        public string ProjectName;
        /// <summary>
        /// 项目编号
        /// </summary>
        public string ProjectNumber;
        /// <summary>
        /// 项目类型
        /// </summary>
        public string TypeName;
        /// <summary>
        /// 
        /// </summary>
        public string PrincipalName;
        /// <summary>
        /// 
        /// </summary>
        public bool? CanAllocate;
        /// <summary>
        /// 
        /// </summary>
        public string ProjectType;
        /// <summary>
        /// 取得或设置绩效单位的排序方式
        /// </summary>
        public SortInfo SortInfo { get; set; }
    }
}
