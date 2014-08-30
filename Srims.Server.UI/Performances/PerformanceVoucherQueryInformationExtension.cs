using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Web;
using Srims.Server.Business.Performances;
using Srims.Server.Business.Users;
using Srims.Server.UI.HttpExtension;
using Srims.Server.UI.MISExtension;
using Srims.Server.UI.Projects;

namespace Srims.Server.UI.Performances
{
    /// <summary>
    /// 绩效凭单查询信息显示扩展
    /// </summary>
    public static class PerformanceVoucherQueryInformationExtension
    {
        /// <summary>
        /// 获得绩效凭单查询信息
        /// </summary>
        /// <param name="request"></param>
        /// <param name="user"></param>
        /// <returns></returns>
        public static PerformanceVoucherQueryInformation GetPerformanceVoucherQueryInformantion(this HttpRequest request, User user)
        {
            var performanceVoucherQueryInformation = new PerformanceVoucherQueryInformation();

            performanceVoucherQueryInformation.Start = request.GetQueryInformation_Start();
            performanceVoucherQueryInformation.Limit = request.GetQueryInformation_Limit();
            performanceVoucherQueryInformation.SortInfo = request.GetQueryCondition_SortInfo();

            performanceVoucherQueryInformation.PerformanceAccountBookNumber = request.GetString("AccountBookNumber");
            performanceVoucherQueryInformation.ExpertNameOrNameSpell = request.GetString("ExpertName");
            performanceVoucherQueryInformation.ProjectNameOrNameSpell = request.GetString("ProjectName");
            performanceVoucherQueryInformation.VoucherNumber = request.GetString("VoucherNumber");
            performanceVoucherQueryInformation.FinanceAllocationDateTime = request.GetDateRange("AllocationDateTime");
            performanceVoucherQueryInformation.FinanceNumber = request.GetString("FinanceNumber");
            performanceVoucherQueryInformation.VoucherState = request.GetEnumList<PerformanceVoucherState>("VoucherState");
            performanceVoucherQueryInformation.IsHorizontal = request.GetBoolean("IsHorizontal");
            performanceVoucherQueryInformation.College = request.GetString("FundMemberCollegeName");

            var isStatistic = request.GetBoolean("IsStatistic");
            performanceVoucherQueryInformation.ProjectQueryInformation = isStatistic.HasValue && isStatistic.Value ? request.GetProjectQueryInformation(user) : null;
            performanceVoucherQueryInformation.PerformanceAllocationCensorPassDateTime = isStatistic.HasValue && isStatistic.Value ? request.GetDateRange("PerformanceAllocationCensorPassDateTime") : null;

            return performanceVoucherQueryInformation;
        }

    }
}
