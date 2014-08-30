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
    /// 经费下拨查询条件扩展
    /// </summary>
    public static class FundDescendQueryInformationExtension
    {
        /// <summary>
        /// 取得经费下拨查询条件
        /// </summary>
        /// <param name="request"></param>
        /// <param name="user"></param>
        /// <returns></returns>
        public static FundDescendQueryInformation GetFundDescendQueryInformation(this HttpRequest request, User user)
        {
            var fundDescendQueryInformation = new FundDescendQueryInformation();

            fundDescendQueryInformation.Start = request.GetQueryInformation_Start();
            fundDescendQueryInformation.Limit = request.GetQueryInformation_Limit();
            fundDescendQueryInformation.SortInfo = request.GetQueryCondition_SortInfo();

            fundDescendQueryInformation.FundDescendTime = request.GetDateRange("DescendDateTime");
            fundDescendQueryInformation.DescendAmount = request.GetMoneyRange("DescendAmount");
            fundDescendQueryInformation.States = request.GetEnumList<FundDescendState>("FundDescendState");
            fundDescendQueryInformation.IsExpertDescend = request.GetBoolean("IsExpertDescend");
            fundDescendQueryInformation.IsHorizontal_DescendProject = request.GetBoolean("IsHorizontal");
            fundDescendQueryInformation.IsBorrow_UnCompleteReturn = request.GetBoolean("IsBorrow_UnCompleteReturn");
            fundDescendQueryInformation.ProjectName = request.GetString("ProjectName");

            var isStatistic = request.GetBoolean("IsStatistic");
            fundDescendQueryInformation.ProjectQueryInformation = isStatistic.HasValue && isStatistic.Value ? request.GetProjectQueryInformation(user) : null;
            fundDescendQueryInformation.FinanceTime = request.GetDateRange("FinanceDateTime");

            return fundDescendQueryInformation;
        }
    }
}
