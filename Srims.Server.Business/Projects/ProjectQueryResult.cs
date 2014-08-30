using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

using MIS.Common.Query;

namespace Srims.Server.Business.Projects
{
    /// <summary>
    /// 项目查询结果
    /// </summary>
    public class ProjectQueryResult : QueryResult<Project>
    {
        private long _FundSum;
        private long _ReceivedFundSum;

        /// <summary>
        /// 取得经费总和
        /// </summary>
        public long FundSum
        {
            get { return _FundSum; }
        }
        /// <summary>
        /// 取得已到经费的总和
        /// </summary>
        public long FundReceivedSum
        {
            get { return _ReceivedFundSum; }
        }
        /// <summary>
        /// 构造函数
        /// </summary>
        /// <param name="projectList">结果项目列表</param>
        /// <param name="total">满足条件的结果总数</param>
        /// <param name="fundSum">满足条件的项目的经费总额</param>
        /// <param name="fundReceivedSum">满足条件的项目的已到经费总额</param>
        public ProjectQueryResult(IList<Project> projectList, int total, long fundSum, long fundReceivedSum)
            : base(projectList, total)
        {
            this._FundSum = fundSum;
            this._ReceivedFundSum = fundReceivedSum;
        }
    }
}
