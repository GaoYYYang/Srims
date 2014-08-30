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
    public class PerformanceQueryResult : QueryResult<Performance>
    {
        private long _OverheadExpensesInSum;
        private long _ReceivedPerformance;
        private long _OverheadExpensesMiddleSum;
        private long _DescendPerformance;
        /// <summary>
        /// 取得学校间接费用总和
        /// </summary>
        public long OverheadExpensesInSum
        {
            get { return _OverheadExpensesInSum; }
        }
        /// <summary>
        /// 取得已到课题组间接费用和绩效的总和
        /// </summary>
        public long ReceivedPerformance
        {
            get { return _ReceivedPerformance; }
        }
        /// <summary>
        /// 取得已下拨经费的总和
        /// </summary>
        public long DescendPerformance
        {
            get { return _DescendPerformance; }
        }
        /// <summary>
        /// 取得二级单位间接综合
        /// </summary>
        public long OverheadExpensesMiddleSum
        {
            get { return _OverheadExpensesMiddleSum; }
        }
        /// <summary>
        /// 构造函数
        /// </summary>
        /// <param name="projectList">结果项目列表</param>
        /// <param name="total">满足条件的结果总数</param>
        /// <param name="fundSum">满足条件的项目的经费总额</param>
        /// <param name="fundReceivedSum">满足条件的项目的已到经费总额</param>
        public PerformanceQueryResult(IList<Performance> performanceList, int total, long overheadExpensesInSum, long overheadExpensesMiddleSum, long receivedPerformance, long descendPerformance)
            : base(performanceList, total)
        {
            this._OverheadExpensesInSum = overheadExpensesInSum;
            this._OverheadExpensesMiddleSum = overheadExpensesMiddleSum;
            this._ReceivedPerformance = receivedPerformance;
            this._DescendPerformance = descendPerformance;
        }
    }
}