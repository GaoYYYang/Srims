using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using MIS.Common.Query;

namespace Srims.Server.Business.Fund
{
    /// <summary>
    /// 经费查询结果
    /// </summary>
    public class FinanceQueryResult : QueryResult<Finance>
    {
        private long _SumFinanceTotal;
        private long _SumFinanceDescend;
        /// <summary>
        /// 经费总额
        /// </summary>
        public long SumFinanceTotal
        {
            get { return _SumFinanceTotal; }
        }
        /// <summary>
        /// 已到经费总额
        /// </summary>
        public long SumFinanceDescend
        {
            get { return _SumFinanceDescend; }
        }
        /// <summary>
        /// 构造函数
        /// </summary>
        /// <param name="financeList"></param>
        /// <param name="total"></param>
        /// <param name="sumFinanceTotal"></param>
        /// <param name="sumFinanceDescend"></param>
        public FinanceQueryResult(IList<Finance> financeList, int total, long sumFinanceTotal, long sumFinanceDescend)
            : base(financeList, total)
        {
            this._SumFinanceDescend = sumFinanceDescend;
            this._SumFinanceTotal = sumFinanceTotal;
        }
    }
}
