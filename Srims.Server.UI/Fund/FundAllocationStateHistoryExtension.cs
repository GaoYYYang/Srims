using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Web;

using Srims.Server.Business;
using Srims.Server.Business.Fund;
using Srims.Server.Business.Users;

using Srims.Server.UI.HttpExtension;
using Srims.Server.UI.MISExtension;
using Srims.Server.UI.Projects;

namespace Srims.Server.UI.Fund
{
    /// <summary>
    /// 经费分配状态历史的相关扩展
    /// </summary>
    public static class FundAllocationStateHistoryExtension
    {
        /// <summary>
        /// 经费分配状态的显示扩展
        /// </summary>
        /// <param name="fundAllocationStateHistory"></param>
        /// <param name="response"></param>
        public static void Show(this FundAllocationStateHistory fundAllocationStateHistory, HttpResponse response)
        {
            response.WriteTagWithValue("DateTime", fundAllocationStateHistory.DateTime);
            response.WriteTagWithValue("Operator", fundAllocationStateHistory.Operator);
            response.WriteTagWithValue("Remark", fundAllocationStateHistory.Remark);
            response.WriteTagWithValue("State", fundAllocationStateHistory.State);
        }

        /// <summary>
        /// 取得经费分配状态历史（经费分配数据纠错时使用）
        /// </summary>
        /// <param name="request"></param>
        /// <param name="user"></param>
        /// <param name="fundAllocation"></param>
        /// <param name="database"></param>
        /// <returns></returns>
        public static FundAllocationStateHistory GetCorrectFundAllocationHistory(this HttpRequest request, User user, FundAllocation fundAllocation, IDatabase database)
        {
            FundAllocationStateHistory fundAllocationStateHistory = database.FundAllocationStateHistories.GetPassedFundAllocation(fundAllocation.ID);
            if (fundAllocationStateHistory == null)
                fundAllocationStateHistory = new FundAllocationStateHistory();

            fundAllocationStateHistory.DateTime = request.GetDateTime("FundAllocationDateTime").Value;
            fundAllocationStateHistory.Remark = "经费分配纠正";
            fundAllocationStateHistory.State = FundAllocationState.Passed;
            fundAllocationStateHistory.Operator = user.Name;

            return fundAllocationStateHistory;
        }
    }
}
