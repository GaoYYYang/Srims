using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

using Srims.Server.Business.Fund;
using Srims.Server.UI.HttpExtension;
using Srims.Server.UI.MISExtension;
using System.Web;
namespace Srims.Server.UI.Fund
{
    /// <summary>
    /// 经费查询信息扩展
    /// </summary>
    public static class FinanceQueryInformationExtension
    {
        /// <summary>
        /// 获得经费查询信息
        /// </summary>
        /// <param name="request"></param>
        /// <returns></returns>
        public static FinanceQueryInformation GetFinanceQueryInformation(this HttpRequest request)
        {
            var financeQueryInformation = new FinanceQueryInformation();

            financeQueryInformation.Start = request.GetQueryInformation_Start();
            financeQueryInformation.Limit = request.GetQueryInformation_Limit();
            financeQueryInformation.SortInfo = request.GetQueryCondition_SortInfo();
            financeQueryInformation.Amount = request.GetMoneyRange("Amount");
            financeQueryInformation.IsDescendAll = request.GetBoolean("IsDescendAll");
            financeQueryInformation.IsInvoiced= request.GetBoolean("IsInvoiced");
            financeQueryInformation.ReceivedDate = request.GetDateRange("ReceivedDate");
            financeQueryInformation.VoucherNumber = request.GetString("VoucherNumber");
            financeQueryInformation.Abstract = request.GetString("FinanceAbstract");

            return financeQueryInformation;
        }
    }
}
