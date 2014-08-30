using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

using MIS.Common.Query;
using Srims.Server.Business.Projects;
using MIS.Common;

namespace Srims.Server.Business.Fund
{
    /// <summary>
    /// 经费分配查询条件
    /// </summary>
    public class FundAllocationQueryInformation : QueryInformation
    {
        /// <summary>
        /// 取得或设置是否横向项目
        /// </summary>
        public bool? IsHorizontal { get; set; }
        /// <summary>
        /// 取得或设置经费分配的状态
        /// </summary>
        public FundAllocationState[] States { get; set; }
        /// <summary>
        /// 取得或设置查询的项目的名称或名称首字母
        /// </summary>
        public string ProjectName { get; set; }
        /// <summary>
        /// 取得分配数额数据段
        /// </summary>
        public Range<long> FundAmount { get; set; }
        /// <summary>
        /// 取得或设置查询的排序方式
        /// </summary>
        public SortInfo SortInfo { get; set; }
    }
}
