using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Web;

using Srims.Server.Business.Fund;
using Srims.Server.Business.Projects;
using Srims.Server.Business.Users;

using Srims.Server.UI.HttpExtension;
using Srims.Server.UI.MISExtension;
using Srims.Server.UI.Projects;

namespace Srims.Server.UI.Fund
{
    /// <summary>
    /// 凭单查询扩展
    /// </summary>
    public static class VoucherQueryInformationExtension
    {
        /// <summary>
        /// 获得凭单查询信息
        /// </summary>
        /// <param name="request"></param>
        /// <param name="user"></param>
        /// <returns></returns>
        public static VoucherQueryInformation GetVoucherQueryInformation(this HttpRequest request, User user)
        {
            var voucherQueryInformation = new VoucherQueryInformation();

            voucherQueryInformation.Start = request.GetQueryInformation_Start();
            voucherQueryInformation.Limit = request.GetQueryInformation_Limit();
            voucherQueryInformation.SortInfo = request.GetQueryCondition_SortInfo();

            voucherQueryInformation.AccountBookNumber = request.GetString("AccountBookNumber");
            voucherQueryInformation.ExpertNameOrNameSpell = request.GetString("ExpertName");
            voucherQueryInformation.ProjectNameOrNameSpell = request.GetString("ProjectName");
            voucherQueryInformation.VoucherNumber = request.GetString("VoucherNumber");
            voucherQueryInformation.FinanceAllocationDateTime = request.GetDateRange("AllocationDateTime");
            voucherQueryInformation.FinanceNumber = request.GetString("FinanceNumber");
            voucherQueryInformation.VoucherState = request.GetEnumList<VoucherState>("VoucherState");
            voucherQueryInformation.IsHorizontal = request.GetBoolean("IsHorizontal");
            voucherQueryInformation.College = request.GetString("FundMemberCollegeName");

            var isStatistic = request.GetBoolean("IsStatistic");
            voucherQueryInformation.ProjectQueryInformation = isStatistic.HasValue && isStatistic.Value ? request.GetProjectQueryInformation(user) : null;
            voucherQueryInformation.FundAllocationCensorPassDateTime = isStatistic.HasValue && isStatistic.Value ? request.GetDateRange("FundAllocationCensorPassDateTime") : null;

            return voucherQueryInformation;
        }
    }
}
