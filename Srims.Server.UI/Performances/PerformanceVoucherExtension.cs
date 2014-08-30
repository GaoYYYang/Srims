using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Web;

using Srims.Server.Business.Users;
using Srims.Server.Business.Fund;
using Srims.Server.Business;
using Srims.Server.Business.Performances;
using Srims.Server.UI.HttpExtension;
using Srims.Server.UI.MISExtension;
using MIS.Common.Query;

namespace Srims.Server.UI.Performances
{
    /// <summary>
    /// 绩效凭单显示扩展
    /// </summary>
    public static class PerformanceVoucherExtension
    {
        /// <summary>
        /// 凭单的显示扩展
        /// </summary>
        /// <param name="voucher"></param>
        /// <param name="response"></param>
        /// <param name="user"></param>
        /// <param name="database"></param>
        public static void ShowVoucher(this PerformanceVoucher voucher, HttpResponse response, User user, IDatabase database)
        {
            if (voucher != null)
            {
                //basic
                response.WriteTagWithValue("ID", voucher.ID);
                response.WriteTagWithValue("AccountBookNumber", voucher.AccountBookNumber);
                response.WriteTagWithValue("PerformancePay", voucher.PerformancePay);
                response.WriteTagWithValue("OverheadExpensesExpertRest", voucher.OverheadExpensesExpert == null ? 0 : voucher.OverheadExpensesExpert.Value);
                response.WriteTagWithValue("OverheadExpensesExpert", (voucher.OverheadExpensesExpert == null ? 0 : voucher.OverheadExpensesExpert.Value) + voucher.PerformancePay);

                response.WriteTagWithValue("FinanceNumber", voucher.FinanceNumber);
                response.WriteTagWithValue("IsRead", voucher.IsRead);
                response.WriteTagWithValue("VoucherNumber", voucher.VoucherNumber);
                response.WriteTagWithValue("UserIsExpert", user.IsExpert);
                response.WriteTagWithValue("PerformanceAllocationId", voucher.PerformanceAllocationID); ;
                response.WriteTagWithValue("TotalPerformancePay", voucher.PerformanceAllocation.Performance.ArrivedPerformance); ;
                response.WriteTagWithValue("AllocatedPerformancePay", voucher.PerformanceAllocation.ArrivedPerformance);
                response.WriteTagWithValue("PerformanceAllocationExpertTotal", voucher.PerformanceAllocation.ArrivedOverheadexpensesExpert);

                response.WriteTagWithValue("PerformanceAllocationArrivedPerformance", voucher.PerformanceAllocation.ArrivedPerformance);
                //currentState
                response.WriteTagWithValue("CurrentStateID", voucher.CurrentStateID);
                response.WriteTagWithValue("VoucherState", voucher.CurrentStateID.HasValue ? voucher.CurrentState.State.ToString() : string.Empty);
                response.WriteTagWithValue("FinanceAllocationDateTime", voucher.FinanceAllocateDateTime);
                response.WriteTagWithValue("StateDateTime", voucher.CurrentStateID.HasValue ? new Nullable<DateTime>(voucher.CurrentState.DateTime) : null);
                response.WriteTagWithValue("StateOperator", voucher.CurrentStateID.HasValue ? voucher.CurrentState.Operator : string.Empty);
                response.WriteTagWithValue("StateRemark", voucher.CurrentStateID.HasValue ? voucher.CurrentState.Remark : string.Empty);


                var project = voucher.FundMember.ProjectInfo_Fund.Project;
                response.WriteTagWithValue("ProjectID", project.ID.ToString());
                response.WriteTagWithValue("ProjectName", project.Name.ToString());
                response.WriteTagWithValue("ProjectTypePreCode", project.Type.Type.PerCode);
                response.WriteTagWithValue("ProjectIsSecret", project.IsSecret);
                response.WriteTagWithValue("ProjectType", project.GetProjectInfo_Type(database.ProjectInfo_Types) == null ? string.Empty : project.GetProjectInfo_Type(database.ProjectInfo_Types).Type.Name);
                response.WriteTagWithValue("ProjectPrincipal", project.Principal.Name);

                //fundMember
                var fundMember = voucher.FundMember;
                response.WriteTagWithValue("FundMemberID", voucher.FundMemberID);
                response.WriteTagWithValue("ExpertID", fundMember == null ? string.Empty : voucher.FundMember.ExpertID.ToString());
                var expert = fundMember == null ? null : fundMember.Expert;
                response.WriteTagWithValue("ExpertName", expert == null ? string.Empty : expert.Name);
                response.WriteTagWithValue("Deparment", expert == null ? string.Empty : expert.Department == null ? string.Empty : expert.Department.Name);
                response.WriteTagWithValue("IsExpertSecondCollege", voucher.FundMember.IsExpertSecondCollege);
                response.WriteTagWithValue("ExpertCollegeCode", expert == null ? string.Empty : (voucher.FundMember.IsExpertSecondCollege != null && voucher.FundMember.IsExpertSecondCollege.Value == true) ? (expert.College2 == null ? string.Empty : expert.College2.Code) : (expert.College == null ? string.Empty : expert.College.Code));


                //fundAllocation
                var performance = voucher.PerformanceAllocation;
                if (performance == null)
                    return;

                response.WriteTagWithValue("PerformanceID", voucher.PerformanceAllocationID);
                response.WriteTagWithValue("PerformanceAllocationDateTime", performance.GetAllocationPerformanceDateTime(database.PerformanceAllocationStateHistories));
                //response.WriteTagWithValue("FundAllocationAllocationTotal", performance.FundDescend.Amount);
                //response.WriteTagWithValue("FundAllocationOverheadExpenses", (performance.OverheadExpensesOut + performance.OverheadExpensesIn + fundAllocation.OverheadPerformancePay).ToString());


                //fundAllocation-state
                var fundAllocationState = performance.CurrentState;
                response.WriteTagWithValue("FundAllocationStateDateTime", fundAllocationState == null ? null : new Nullable<DateTime>(fundAllocationState.DateTime));
                response.WriteTagWithValue("FundAllocationStateOperator", fundAllocationState == null ? string.Empty : fundAllocationState.Operator);
                response.WriteTagWithValue("FundAllocationStateRemark", fundAllocationState == null ? string.Empty : fundAllocationState.Remark);
                response.WriteTagWithValue("FundAllocationState", fundAllocationState == null ? string.Empty : fundAllocationState.State.ToString());

                //fundAllocation-project



                //hasPermission
                response.WriteTagWithValue("HasPermission_Show", user.HasPermission_Show(voucher, database));
                response.WriteTagWithValue("HasPermission_Edit", user.HasPermission_Edit(voucher, database));
                response.WriteTagWithValue("HasPermission_Delete", user.HasPermission_Delete(voucher, database));
                response.WriteTagWithValue("HasPermission_ResetAccountBookNumber", user.HasPermission_ResetAccountBookNumber(voucher, database));
                response.WriteTagWithValue("HasPermission_Print", user.HasPermission_Print(voucher, database));
                response.WriteTagWithValue("HasPermission_ResetPrint", user.HasPermission_ResetPerformanceVoucherPrint());
                response.WriteTagWithValue("HasPermission_ShowFundAllocation", user.HasPermission_ShowPerformanceAllocation(voucher, database));

                //response.WriteTagWithValue("HasPermission_SignIn", user.HasPermission_SignIn(database));
                //response.WriteTagWithValue("HasPermission_ReturnVoucher", user.HasPermission_ReturnVoucher(database));
                //response.WriteTagWithValue("HasPermission_FinanceAllocate", user.HasPermission_FinanceAllocate(database));
                //response.WriteTagWithValue("HasPermission_CancelFinanceAllocate", user.HasPermission_CancelFinanceAllocate(database));
                response.WriteTagWithValue("HasPermission_Print", user.HasPermission_Print(voucher, database));
                response.WriteTagWithValue("HasPermission_ResetPrint", user.HasPermission_ResetPrint());

                //can
                response.WriteTagWithValue("CanShow", user.CanShow(voucher, database));
                response.WriteTagWithValue("CanEdit", user.CanEdit(voucher, database));
                response.WriteTagWithValue("CanDelete", user.CanDelete(voucher, database));
                response.WriteTagWithValue("CanResetAccountBookNumber", user.CanResetAccountBookNumber(voucher, database));
                response.WriteTagWithValue("CanPrint", user.CanPrint(voucher, database));
                response.WriteTagWithValue("CanResetPrint", user.CanResetPerformaceVoucherPrint(voucher));
                response.WriteTagWithValue("CanShowFundAllocation", user.CanShowPerformanceAllocation(voucher, database));

                response.WriteTagWithValue("CanSignIn", user.CanSignIn(voucher, database));
                response.WriteTagWithValue("CanReturnVoucher", user.CanReturnVoucher(voucher, database));
                response.WriteTagWithValue("CanFinanceAllocate", user.CanFinanceAllocate(voucher, database));
                response.WriteTagWithValue("CanCancelFinanceAllocate", user.CanCancelFinanceAllocate(voucher, database));
                response.WriteTagWithValue("CanPrint", user.CanPrint(voucher, database));
                response.WriteTagWithValue("CanResetPrint", user.CanResetPerformaceVoucherPrint(voucher));

            }
        }
        /// <summary>
        /// 凭单财务查询的显示扩展
        /// </summary>
        /// <param name="voucherQueryResult"></param>
        /// <param name="response"></param>
        /// <param name="user"></param>
        /// <param name="database"></param>
        public static void Show(this PerformanceVoucherQueryResult voucherQueryResult, HttpResponse response, User user, IDatabase database)
        {
            ShowDelegateWithUserAndDatabase<PerformanceVoucher> showDelegate = new ShowDelegateWithUserAndDatabase<PerformanceVoucher>(ShowVoucher);
            response.WriteTagBegin("QueryResult");

            response.WriteTagWithValue("Total", voucherQueryResult.Total);
            response.WriteTagWithValue("OverheadExpensesExpertSumRest", voucherQueryResult.OverheadExpensesExpertSum);
            response.WriteTagWithValue("PerformanceSum", voucherQueryResult.PerformanceSum);
            response.WriteTagWithValue("OverheadExpensesExpertSum", voucherQueryResult.OverheadExpensesExpertSum + voucherQueryResult.PerformanceSum);

            voucherQueryResult.ResultList.Show<PerformanceVoucher>(response, user, database, ShowVoucher);

            response.WriteTagEnd("QueryResult");
        }
        /// <summary>
        /// 获得财务分配的凭单信息
        /// </summary>
        /// <param name="request"></param>
        /// <param name="database"></param>
        /// <param name="user"></param>
        /// <returns></returns>
        public static PerformanceVoucher GetFinanceAllocatdVoucher(this HttpRequest request, IDatabase database, User user)
        {
            var voucher = request.GetEntity<PerformanceVoucher>(database.PerformanceVouchers, "id");
            voucher.PerformanceAllocation = request.GetEntity<PerformanceAllocation>(database.PerformanceAllocations, "performanceAllocationID");
            voucher.FinanceNumber = request.GetString("FinanceNumber");
            voucher.FinanceAllocateDateTime = request.GetDateTime("financeAllocationDate");

            voucher.Allocate(user, database);

            return voucher;
        }
        /// <summary>
        /// 取得凭单（保存）
        /// </summary>
        /// <param name="request"></param>
        /// <param name="user"></param>
        /// <param name="isCorrect"></param>
        /// <param name="database"></param>
        /// <returns></returns>
        public static PerformanceVoucher GetVoucher(this HttpRequest request, User user, IDatabase database)
        {
            var voucher = request.GetEntity<PerformanceVoucher>(database.PerformanceVouchers, "Id");
            if (voucher == null)
                voucher = new PerformanceVoucher();
            var expert = request.GetEntity(database.Experts, "ExpertID");
            voucher.PerformanceAllocation = request.GetEntity<PerformanceAllocation>(database.PerformanceAllocations, "performanceAllocationID");
            var isExpertSecondCollege = request.GetBoolean("IsExpertSecondCollege").Value;


            voucher.PerformancePay = request.GetLong("performancePay").Value;
            voucher.IsRead = false;


            //经费分配纠错时，指定账本号，账本号生成不参与规则
            var project = request.GetEntity(database.Projects, "ProjectID");
            if (voucher.PerformanceAllocation == null)
                voucher.Project = project;
            else
                voucher.Project = voucher.PerformanceAllocation.Performance.Project;


            voucher.FundMember = database.FundMembers.Get(voucher.PerformanceAllocation.Performance.Project.Fund, expert, isExpertSecondCollege, database, true);


            voucher.CurrentState = getVoucherState(request, voucher, user, database);

            return voucher;
        }

        private static PerformanceVoucherStateHistory getVoucherState(HttpRequest request, PerformanceVoucher voucher, User user, IDatabase datagbase)
        {
            PerformanceVoucherStateHistory voucherStateHistory = voucher.CurrentState;

            if (voucher.IsNew)
            {
                voucherStateHistory = new PerformanceVoucherStateHistory();
                voucherStateHistory.PerformanceVoucher = voucher;
            }

            voucherStateHistory.Operator = user.Name;
            voucherStateHistory.DateTime = DateTime.Now;
            voucherStateHistory.Remark = null;
            voucherStateHistory.State = PerformanceVoucherState.WaitingCensor;



            return voucherStateHistory;
        }
        /// <summary>
        /// 取得新建的空实体或者编辑之前的旧实体
        /// </summary>
        /// <param name="request"></param>
        /// <param name="database"></param>
        /// <returns></returns>
        public static Object GetOldVoucher(this HttpRequest request, IDatabase database)
        {
            var voucher = request.GetEntity<PerformanceVoucher>(database.PerformanceVouchers, "Id");
            if (voucher == null)
                voucher = new PerformanceVoucher();
            return voucher;
        }
    }
}
