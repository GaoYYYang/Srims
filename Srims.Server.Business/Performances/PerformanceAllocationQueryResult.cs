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
    public class PerformanceAllocationQueryResult : QueryResult<PerformanceAllocation>
    {
        private long _OverheadExpensesExpertSum;

        /// <summary>
        /// 取得课题组间接费用总和
        /// </summary>
        public long OverheadExpensesExpertSum
        {
            get { return _OverheadExpensesExpertSum; }
        }

        /// <summary>
        /// 构造函数
        /// </summary>
        /// <param name="projectList">结果项目列表</param>
        /// <param name="total">满足条件的结果总数</param>
        /// <param name="fundSum">满足条件的项目的经费总额</param>
        /// <param name="fundReceivedSum">满足条件的项目的已到经费总额</param>
        public PerformanceAllocationQueryResult(IList<PerformanceAllocation> performanceAllocationList, int total, long overheadExpensesExpertSum)
            : base(performanceAllocationList, total)
        {
            this._OverheadExpensesExpertSum = overheadExpensesExpertSum;
        }
    }
}