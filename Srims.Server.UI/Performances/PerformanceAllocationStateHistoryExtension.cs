using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Web;

using Srims.Server.Business;
using Srims.Server.Business.Performances;
using Srims.Server.Business.Users;

using Srims.Server.UI.HttpExtension;
using Srims.Server.UI.MISExtension;
using Srims.Server.UI.Projects;

namespace Srims.Server.UI.Performances
{
    public static class PerformanceAllocationStateHistoryExtension
    {
        /// <summary>
        /// 绩效分配状态的显示扩展
        /// </summary>
        /// <param name="performanceStateHistory"></param>
        /// <param name="response"></param>
        public static void Show(this PerformanceAllocationStateHistory performanceStateHistory, HttpResponse response)
        {
            response.WriteTagWithValue("DateTime", performanceStateHistory.DateTime);
            response.WriteTagWithValue("Operator", performanceStateHistory.Operator);
            response.WriteTagWithValue("Remark", performanceStateHistory.Remark);
            response.WriteTagWithValue("State", performanceStateHistory.State);
        }

        /// <summary>
        /// 取得经费分配状态历史（经费分配数据纠错时使用）
        /// </summary>
        /// <param name="request"></param>
        /// <param name="user"></param>
        /// <param name="fundAllocation"></param>
        /// <param name="database"></param>
        /// <returns></returns>
        public static PerformanceAllocationStateHistory GetCorrectFundAllocationHistory(this HttpRequest request, User user, PerformanceAllocation performance, IDatabase database)
        {
            PerformanceAllocationStateHistory fundAllocationStateHistory = database.PerformanceAllocationStateHistories.GetPassedFundAllocation(performance.ID);
            if (fundAllocationStateHistory == null)
                fundAllocationStateHistory = new PerformanceAllocationStateHistory();

            fundAllocationStateHistory.DateTime = request.GetDateTime("FundAllocationDateTime").Value;
            fundAllocationStateHistory.Remark = "经费分配纠正";
            fundAllocationStateHistory.State = PerformanceAllocationState.Passed;
            fundAllocationStateHistory.Operator = user.Name;

            return fundAllocationStateHistory;
        }
    }
}
