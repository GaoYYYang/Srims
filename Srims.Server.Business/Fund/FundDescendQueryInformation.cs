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
    /// 项目下拨查询信息
    /// </summary>
    public class FundDescendQueryInformation : QueryInformation
    {
        /// <summary>
        /// 取得或设置下拨状态
        /// </summary>
        public FundDescendState[] States { get; set; }
        /// <summary>
        /// 取得或设置下拨时间
        /// </summary>
        public Range<DateTime> FundDescendTime { get; set; }
        /// <summary>
        /// 下拨金额
        /// </summary>
        public Range<long> DescendAmount { get; set; }
        /// <summary>
        /// 取得或设置是否是专家下拨
        /// </summary>
        public bool? IsExpertDescend { get; set; }
        /// <summary>
        /// 判断下拨项目的横纵向
        /// </summary>
        public bool? IsHorizontal_DescendProject { get; set; }
        /// <summary>
        /// 项目名称
        /// </summary>
        public string ProjectName { get; set; }
        /// <summary>
        /// 未还清的借款
        /// </summary>
        public bool? IsBorrow_UnCompleteReturn { get; set; }
        /// <summary>
        /// 取得或设置查询的排序方式
        /// </summary>
        public SortInfo SortInfo { get; set; }

        /// <summary>
        /// 取得或设置下拨对应的项目信息（仅用于统计）
        /// </summary>
        public ProjectQueryInformation ProjectQueryInformation { get; set; }
        /// <summary>
        /// 取得或设置到账时间（仅用于统计）
        /// </summary>
        public Range<DateTime> FinanceTime { get; set; }
    }
}
