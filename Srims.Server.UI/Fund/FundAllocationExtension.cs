using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Text;
using System.Web;

using Srims.Server.Business;
using Srims.Server.Business.Fund;
using Srims.Server.Business.Users;

using Srims.Server.UI;
using Srims.Server.UI.HttpExtension;
using Srims.Server.UI.MISExtension;

namespace Srims.Server.UI.Fund
{
    /// <summary>
    /// 经费分配的显示扩展
    /// </summary>
    public static class FundAllocationExtension
    {
        /// <summary>
        /// 经费分配的显示扩展
        /// </summary>
        /// <param name="fundAllocation"></param>
        /// <param name="response"></param>
        /// <param name="user"></param>
        /// <param name="database"></param>
        public static void ShowFundAllocation(this FundAllocation fundAllocation, HttpResponse response, User user, IDatabase database)
        {
            response.WriteTagWithValue("ID", fundAllocation.ID);

            var allocationDateTime = fundAllocation.GetAllocationDateTime(database.FundAllocationStateHistories);
            response.WriteTagWithValue("AllocationDateTime", allocationDateTime);

            response.WriteTagWithValue("AllocationTotal", fundAllocation.FundDescend.Amount);
            response.WriteTagWithValue("AllocationIn", fundAllocation.AllocationIn);
            response.WriteTagWithValue("AllocationOut", fundAllocation.AllocationOut);
            response.WriteTagWithValue("AllocationWantOut", fundAllocation.AllocationWantOut == null ? 0 : fundAllocation.AllocationWantOut.Value);
            response.WriteTagWithValue("AllocationHardware", fundAllocation.AllocationHardware);
            response.WriteTagWithValue("PerformanceTotal", fundAllocation.OverheadPerformancePay);
            response.WriteTagWithValue("PerformancePay", fundAllocation.PerformancePay);
            response.WriteTagWithValue("OverheadExpensesIn", fundAllocation.OverheadExpensesIn);
            response.WriteTagWithValue("OverheadExpensesOut", fundAllocation.OverheadExpensesOut);
            response.WriteTagWithValue("OverheadPerformancePay", fundAllocation.OverheadPerformancePay);
            response.WriteTagWithValue("OverheadExpenses", fundAllocation.OverheadExpensesIn + fundAllocation.OverheadExpensesMiddle+fundAllocation.OverheadExpensesExpert);//fundAllocation.OverheadExpensesOut +

            response.WriteTagWithValue("OverheadExpensesExpert", fundAllocation.OverheadExpensesExpert);
            response.WriteTagWithValue("OverheadExpensesMiddle", fundAllocation.OverheadExpensesMiddle);

            response.WriteTagWithValue("FundDescendID", fundAllocation.FundDescendID);

            var currentState = fundAllocation.CurrentState;
            response.WriteTagWithValue("DateTime", currentState == null ? string.Empty : currentState.DateTime.ToString());
            response.WriteTagWithValue("Operator", currentState == null ? string.Empty : currentState.Operator);
            response.WriteTagWithValue("Remark", currentState == null ? string.Empty : currentState.Remark);
            response.WriteTagWithValue("CurrentState", currentState == null ? string.Empty : currentState.State.ToString());

            //project
            var project = fundAllocation.FundDescend.ProjectInfo_Fund.Project;

            response.WriteTagWithValue("ProjectID", project.ID);
            response.WriteTagWithValue("ProjectNumber", project.Number);
            response.WriteTagWithValue("ProjectName", project.Name);
            response.WriteTagWithValue("ProjectPricinpalName", project.Principal.Name);
            response.WriteTagWithValue("ProjectTypeName", project.Type.Type.Name);
            response.WriteTagWithValue("IsHorizontal", project.Type.Rank.IsHorizontal);
            response.WriteTagWithValue("FundPlanOut", fundAllocation.FundDescend.ProjectInfo_Fund.FundPlanOut);
            response.WriteTagWithValue("FundAlreadyOut", fundAllocation.FundDescend.ProjectInfo_Fund.FundAlreadyOut);
     
            //finance
            var finance = fundAllocation.FundDescend.GetFinance(database.FinanceFundDescends);
            response.WriteTagWithValue("FinanceID", finance != null ? (finance.ID).ToString() : string.Empty);
            response.WriteTagWithValue("FinanceAmount", finance == null ? string.Empty : finance.Amount.ToString());
            response.WriteTagWithValue("FinanceReceivedDate", finance == null ? string.Empty : finance.ReceivedDate.ToString("yyyy/MM/dd", CultureInfo.InvariantCulture));
            response.WriteTagWithValue("FinanceVoucherNumber", finance == null ? string.Empty : finance.VoucherNumber);
            response.WriteTagWithValue("FinanceAbstract", finance == null ? string.Empty : finance.Abstract);
            response.WriteTagWithValue("IsBorrow", finance == null);

            //permission
            response.WriteTagWithValue("HasPermission_Allocation", user.HasPermission_Allocation(fundAllocation, database));
            response.WriteTagWithValue("HasPermission_Canel", user.HasPermission_Canel(fundAllocation, database));
            response.WriteTagWithValue("HasPermission_Censor", user.HasPermission_Censor(fundAllocation, database));
            response.WriteTagWithValue("HasPermission_Submit", user.HasPermission_Submit(fundAllocation, database));
            response.WriteTagWithValue("HasPermission_UndoSubmit", user.HasPermission_UndoSubmit(fundAllocation, database));
            response.WriteTagWithValue("HasPermission_Correct", user.HasPermission_Correct(fundAllocation, database));

            //can
            response.WriteTagWithValue("CanAllocation", user.CanAllocation(fundAllocation, database));
            response.WriteTagWithValue("CanCancel", user.CanCancel(fundAllocation, database));
            response.WriteTagWithValue("CanCensorPass", user.CanCensorPass(fundAllocation, database));
            response.WriteTagWithValue("CanCensorReject", user.CanCensorReject(fundAllocation, database));
            response.WriteTagWithValue("CanSubmit", user.CanSubmit(fundAllocation, database));
            response.WriteTagWithValue("CanUndoSubmit", user.CanUndoSubmit(fundAllocation, database));
            response.WriteTagWithValue("CanCorrect", user.CanCorrect(fundAllocation, database));
            response.WriteTagWithValue("CanAllocationPerformancePay", user.CanAllocationPerformancePay(fundAllocation, database));
        }
        /// <summary>
        /// 经费分配列表的显示扩展
        /// </summary>
        /// <param name="fundAllocationList"></param>
        /// <param name="database"></param>
        /// <param name="user"></param>
        /// <param name="response"></param>
        public static void Show(this IList<FundAllocation> fundAllocationList, IDatabase database, User user, HttpResponse response)
        {
            ShowDelegateWithUserAndDatabase<FundAllocation> showDelegate = new ShowDelegateWithUserAndDatabase<FundAllocation>(ShowFundAllocation);
            fundAllocationList.Show<FundAllocation>(response, user, database, showDelegate);
        }
        /// <summary>
        /// 取得经费分配
        /// </summary>
        /// <param name="request"></param>
        /// <param name="user"></param>
        /// <param name="database"></param>
        /// <returns></returns>
        public static FundAllocation Get(this HttpRequest request, User user, IDatabase database)
        {
            var fundDescend = request.GetEntity(database.FundDescends, "FundDescendId");
            var fundAllocation = fundDescend.GetFundAllocation(database.FundAllocations,database);

            if (fundAllocation.IsNew)
                fundAllocation.CurrentState = new FundAllocationStateHistory
                 {
                     DateTime = DateTime.Now,
                     FundAllocation = fundAllocation,
                     Operator = user.Name,
                     Remark = null,
                     State = FundAllocationState.UnSubmit,

                 };

            return fundAllocation;
        }
    }
}
