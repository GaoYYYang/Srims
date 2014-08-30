using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Web;

using Srims.Server.Business;
using Srims.Server.Business.Fund;
using Srims.Server.Business.Users;

using Srims.Server.UI;
using Srims.Server.UI.MISExtension;
using Srims.Server.UI.HttpExtension;

namespace Srims.Server.UI.Fund
{
    /// <summary>
    /// 经费到帐--经费下拨关联信息的相关扩展
    /// </summary>
    public static class FinanceFundDescendExtension
    {
        /// <summary>
        /// 经费到帐--经费下拨关联信息的的显示扩展
        /// </summary>
        /// <param name="financeFundDescend"></param>
        /// <param name="response"></param>
        /// <param name="user"></param>
        /// <param name="database"></param>
        public static void ShowFinanceFundDescend(this FinanceFundDescend financeFundDescend, HttpResponse response, User user, IDatabase database)
        {
            response.WriteTagWithValue("ID", financeFundDescend.ID);
            response.WriteTagWithValue("ProjectName", financeFundDescend.FundDescend.ProjectInfo_Fund.Project.Name);
            response.WriteTagWithValue("Amount", financeFundDescend.Amount);
            response.WriteTagWithValue("IsReturn", financeFundDescend.IsReturn);
            response.WriteTagWithValue("OperateDateTime", financeFundDescend.OperateDateTime);
            response.WriteTagWithValue("Operator", financeFundDescend.Operator);

            var finance = financeFundDescend.Finance;

            response.WriteTagWithValue("FinanceVoucherNumber", finance.VoucherNumber);
            response.WriteTagWithValue("FinanceAbstract", finance.Abstract);

            response.WriteTagWithValue("HasPermission_EditReturn", user.HasPermission_EditReturn(financeFundDescend));
            response.WriteTagWithValue("HasPermission_DeleteReturn", user.HasPermission_DeleteReturn(financeFundDescend));

            response.WriteTagWithValue("CanEditReturn", user.CanEditReturn(financeFundDescend));
            response.WriteTagWithValue("CanDeleteReturn", user.CanDeleteReturn(financeFundDescend));
        }
        /// <summary>
        /// 取得经费到帐--经费下拨关联信息
        /// </summary>
        /// <param name="request"></param>
        /// <param name="isReturn"></param>
        /// <param name="user"></param>
        /// <param name="database"></param>
        public static FinanceFundDescend GetFinanceFundDescend(this HttpRequest request, bool isReturn, User user, IDatabase database)
        {
            FinanceFundDescend financeFundDescend = request.GetEntity(database.FinanceFundDescends, "FinanceFundDescendId");
            if (financeFundDescend == null)
                financeFundDescend = new FinanceFundDescend();

            financeFundDescend.Finance = request.GetEntity(database.Finances, "FinanceId");
            financeFundDescend.IsReturn = isReturn;
            financeFundDescend.OperateDateTime = DateTime.Now;
            financeFundDescend.Operator = user.Name;

            return financeFundDescend;
        }
    }
}
