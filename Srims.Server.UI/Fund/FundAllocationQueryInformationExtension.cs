using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Web;

using Srims.Server.Business.Fund;
using Srims.Server.Business.Users;

using Srims.Server.UI.HttpExtension;
using Srims.Server.UI.MISExtension;
using Srims.Server.UI.Projects;

namespace Srims.Server.UI.Fund
{
    /// <summary>
    /// 经费分配查询条件相关扩展
    /// </summary>
    public static class FundAllocationQueryInformationExtension
    {
        /// <summary>
        /// 取得经费分配查询条件
        /// </summary>
        /// <param name="request"></param>
        /// <param name="user"></param>
        /// <returns></returns>
        public static FundAllocationQueryInformation GetFundAllocationQueryInformation(this HttpRequest request, User user)
        {
            var fundAllocationQueryInformation = new FundAllocationQueryInformation();

            fundAllocationQueryInformation.Start = request.GetQueryInformation_Start();
            fundAllocationQueryInformation.Limit = request.GetQueryInformation_Limit();
            fundAllocationQueryInformation.SortInfo = request.GetQueryCondition_SortInfo();

            fundAllocationQueryInformation.FundAmount = request.GetMoneyRange("FundAmount");
            fundAllocationQueryInformation.States = request.GetEnumList<FundAllocationState>("FundAllocationState");
            fundAllocationQueryInformation.IsHorizontal = request.GetBoolean("IsHorizontal");
            fundAllocationQueryInformation.ProjectName = request.GetString("ProjectName");

            var isStatistic = request.GetBoolean("IsStatistic");
            //统计查询条件

            return fundAllocationQueryInformation;
        }
    }
}
