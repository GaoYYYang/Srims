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
using Srims.Server.Business.Projects;

namespace Srims.Server.UI.Fund
{
    /// <summary>
    /// 经费下拨的相关扩展
    /// </summary>
    public static class FundDescendExtension
    {
        /// <summary>
        /// 经费下拨的显示扩展
        /// </summary>
        /// <param name="fundDescend"></param>
        /// <param name="response"></param>
        /// <param name="user"></param>
        /// <param name="database"></param>
        public static void ShowFundDescend(this FundDescend fundDescend, HttpResponse response, User user, IDatabase database)
        {
            response.WriteTagWithValue("ID", fundDescend.ID);
            response.WriteTagWithValue("Amount", fundDescend.Amount);
            response.WriteTagWithValue("State", fundDescend.CurrentState.State);
            response.WriteTagWithValue("DescendDateTime", fundDescend.DescendDateTime);
            response.WriteTagWithValue("Operator", fundDescend.Operator);
            response.WriteTagWithValue("ProjectName", fundDescend.ProjectInfo_Fund.Project.Name);
            response.WriteTagWithValue("ProjectPrincipalName", fundDescend.ProjectInfo_Fund.Project.Principal.Name);
            response.WriteTagWithValue("ProjectID", fundDescend.ProjectInfo_Fund.Project.ID);
            response.WriteTagWithValue("ReceivedAmount", fundDescend.ReceivedAmount);

            var financeFundDescend = fundDescend.GetSingleFinanceFundDescend(database.FinanceFundDescends);
            if (financeFundDescend != null)
            {
                var finance = financeFundDescend.Finance;

                response.WriteTagWithValue("FinanceVoucherNumber", finance.VoucherNumber);
                response.WriteTagWithValue("FinanceAbstract", finance.Abstract);
            }

            response.WriteTagWithValue("HasPermission_Edit", user.HasPermission_Edit(fundDescend, database));
            response.WriteTagWithValue("HasPermission_Censor", user.HasPermission_Censor(fundDescend, database));
            response.WriteTagWithValue("HasPermission_Delete", user.HasPermission_Delete(fundDescend, database));
            response.WriteTagWithValue("HasPermission_ShowAlloction", user.HasPermission_ShowAlloction(fundDescend, database));

            response.WriteTagWithValue("CanEdit", user.CanEdit(fundDescend, database));
            response.WriteTagWithValue("CanDelete", user.CanDelete(fundDescend, database));
            response.WriteTagWithValue("CanCensorPass", user.CanCensorPass(fundDescend, database));
            response.WriteTagWithValue("CanCensorReject", user.CanCensorReject(fundDescend, database));
            response.WriteTagWithValue("CanShowAllocation", user.CanShowAllocation(fundDescend, database));
        }
        /// <summary>
        /// 取得经费下拨
        /// </summary>
        /// <param name="request"></param>
        /// <param name="user"></param>
        /// <param name="database"></param>
        /// <returns></returns>
        public static FundDescend GetFundDescend(this HttpRequest request, User user, IDatabase database)
        {
            FundDescend fundDescend = request.GetEntity(database.FundDescends, "FundDescendId");
            if (fundDescend == null)
                fundDescend = new FundDescend();
            fundDescend.Amount = request.GetMoney("Amount").Value;
            fundDescend.DescendDateTime = DateTime.Now;
            fundDescend.Operator = user.Name;
            fundDescend.ProjectInfo_Fund = request.GetEntity<Project>(database.Projects, "ProjectId").Fund;
            fundDescend.CurrentState = getFundDescendCurrentState(request, fundDescend, user);

            return fundDescend;
        }

        private static FundDescendStateHistory getFundDescendCurrentState(HttpRequest request, FundDescend fundDescend, User user)
        {
            FundDescendStateHistory fundDescendStateHistory = fundDescend.CurrentState;

            if (fundDescend.IsNew)
            {
                fundDescendStateHistory = new FundDescendStateHistory();
                fundDescendStateHistory.FundDescend = fundDescend;
            }

            fundDescendStateHistory.DateTime = DateTime.Now;
            fundDescendStateHistory.Operator = user.Name;
            fundDescendStateHistory.State = user.IsExpert ? FundDescendState.WaitingCensor : FundDescendState.Passed;

            return fundDescendStateHistory;
        }
        /// <summary>
        /// 取得新建的空实体或者编辑之前的旧实体
        /// </summary>
        /// <param name="request"></param>
        /// <param name="database"></param>
        /// <returns></returns>
        public static Object GetOldFundDescend(this HttpRequest request, IDatabase database)
        {
            FundDescend fundDescend = request.GetEntity(database.FundDescends, "FundDescendId");
            if (fundDescend == null)
                fundDescend = new FundDescend();
            return fundDescend.Clone();
        }
    }
}
