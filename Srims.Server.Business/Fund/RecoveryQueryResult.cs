using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

using MIS.Common.Query;

namespace Srims.Server.Business.Fund
{
    /// <summary>
    /// 追缴单查询列表
    /// </summary>
    public class RecoveryQueryResult : QueryResult<Recovery>
    {
        private long _PerformanceSum;
        private long _OverheadExpensesSum;
        private long _OverheadExpensesMiddleSum;
        /// <summary>
        /// 取得课题组间接费用差总和
        /// </summary>
        public long PerformanceSum
        {
            get { return _PerformanceSum; }
        }
        /// <summary>
        /// 取得学校间接费用差的总和
        /// </summary>
        public long OverheadExpensesSum
        {
            get { return _OverheadExpensesSum; }
        }
        /// <summary>
        /// 取得二级单位间接费用差的总和
        /// </summary>
        public long OverheadExpensesMiddleSum
        {
            get { return _OverheadExpensesMiddleSum; }
        }
        public RecoveryQueryResult(IList<Recovery> recoverylist, int total, long? performanceSum, long? overheadExpensesSum, long? overheadExpensesMiddleSum)
            : base(recoverylist, total)
        {
            this._PerformanceSum = performanceSum == null ? 0 : performanceSum.Value;
            this._OverheadExpensesSum = overheadExpensesSum == null ? 0 : overheadExpensesSum.Value;
            this._OverheadExpensesMiddleSum = overheadExpensesMiddleSum == null ? 0 : overheadExpensesMiddleSum.Value;
        }
    }


}
