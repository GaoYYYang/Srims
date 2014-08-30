using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using MIS.Common.Query;
using MIS.Common;

namespace Srims.Server.Business.Fund
{
    /// <summary>
    /// 经费查询信息
    /// </summary>
    public class FinanceQueryInformation : QueryInformation
    {
        /// <summary>
        /// 经费到帐流水号
        /// </summary>
        public string VoucherNumber { get; set; }
        /// <summary>
        /// 经费到帐日期
        /// </summary>
        public Range<DateTime> ReceivedDate { get; set; }
        /// <summary>
        /// 经费是否下拨完毕
        /// </summary>
        public bool? IsDescendAll { get; set; }
        /// <summary>
        /// 是否已开发票
        /// </summary>
        public bool? IsInvoiced { get; set; }
        /// <summary>
        /// 经费金额
        /// </summary>
        public Range<long> Amount { get; set; }
        /// <summary>
        /// 摘要
        /// </summary>
        public string Abstract { get; set; }
        /// <summary>
        /// 取得或设置查询的排序方式
        /// </summary>
        public SortInfo SortInfo { get; set; }
    }
}
