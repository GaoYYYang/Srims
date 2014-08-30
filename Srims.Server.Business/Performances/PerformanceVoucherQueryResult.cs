using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

using MIS.Common.Query;

namespace Srims.Server.Business.Performances
{
    /// <summary>
    /// 查询结果
    /// </summary>
    public class PerformanceVoucherQueryResult : QueryResult<PerformanceVoucher>
    {

        private long _OverheadExpensesExpertSum;
        private long _PerformanceSum;
        /// <summary>
        /// 取得课题组间接费用和绩效
        /// </summary>
        public long OverheadExpensesExpertSum
        {
            get { return _OverheadExpensesExpertSum; }
        }
        /// <summary>
        /// 取得绩效
        /// </summary>
        public long PerformanceSum
        {
            get { return _PerformanceSum; }
        }
        /// <summary>
        /// 构造函数
        /// </summary>
        /// <param name="projectList">结果项目列表</param>
        /// <param name="total">满足条件的结果总数</param>
        /// <param name="fundSum">满足条件的项目的经费总额</param>
        /// <param name="fundReceivedSum">满足条件的项目的已到经费总额</param>
        public PerformanceVoucherQueryResult(IList<PerformanceVoucher> performanceVoucherList, int total, long overheadExpensesExpertSum, long performanceSum)
            : base(performanceVoucherList, total)
        {
            this._OverheadExpensesExpertSum = overheadExpensesExpertSum;
            this._PerformanceSum = performanceSum;
        }
    }
}
