using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Web;

using Srims.Server.Business.Users;
using Srims.Server.Business;
using Srims.Server.Business.Fund;
using Srims.Server.UI.HttpExtension;
using Srims.Server.UI.MISExtension;
using MIS.Common.Query;
namespace Srims.Server.UI.Fund
{
    /// <summary>
    /// 凭单扩展
    /// </summary>
    public static class VoucherExtension
    {
        /// <summary>
        /// 凭单的显示扩展
        /// </summary>
        /// <param name="voucher"></param>
        /// <param name="response"></param>
        /// <param name="user"></param>
        /// <param name="database"></param>
        public static void ShowVoucher(this Voucher voucher, HttpResponse response, User user, IDatabase database)
        {
            if (voucher != null)
            {
                //basic
                response.WriteTagWithValue("ID", voucher.ID);
                response.WriteTagWithValue("AccountBookNumber", voucher.AccountBookNumber);
                response.WriteTagWithValue("AllocationHardware", voucher.AllocationHardware);
                response.WriteTagWithValue("AllocationIn", voucher.AllocationIn);
                response.WriteTagWithValue("AllocationOut", voucher.AllocationOut);
                response.WriteTagWithValue("PerformancePay", voucher.PerformancePay);
                response.WriteTagWithValue("OverheadPerformancePay", voucher.OverheadPerformancePay);

                response.WriteTagWithValue("OverheadExpensesMiddle", voucher.OverheadExpensesMiddle);
                response.WriteTagWithValue("OverheadExpensesExpert", voucher.OverheadExpensesExpert);


                response.WriteTagWithValue("PerformanceAccountBookNumber", voucher.PerformanceAccountBookNumber);
                response.WriteTagWithValue("FinanceNumber", voucher.FinanceNumber);
                response.WriteTagWithValue("IsRead", voucher.IsRead);
                response.WriteTagWithValue("OverheadExpensesIn", voucher.OverheadExpensesIn);
                response.WriteTagWithValue("OverheadExpensesOut", voucher.OverheadExpensesOut);
                response.WriteTagWithValue("VoucherNumber", voucher.VoucherNumber);
                //carlsirce2013.3.4 凭单总额显示错误，加入判断，区分新旧算法计算数值
                var Amount = voucher.AllocationIn + voucher.AllocationOut + voucher.AllocationHardware + voucher.OverheadExpensesExpert + voucher.OverheadExpensesMiddle + voucher.OverheadExpensesIn + voucher.OverheadExpensesOut;
                if (voucher.CurrentState.DateTime < Convert.ToDateTime("2013-1-1") || voucher.ID == 17580 || voucher.ID == 17581 || voucher.ID == 17582 || voucher.ID == 17583 || voucher.ID == 14178)
                    Amount = voucher.AllocationIn + voucher.AllocationOut;
                response.WriteTagWithValue("Amount", Amount);
                response.WriteTagWithValue("OverheadExpenses", voucher.GetOverheadExpenses());
                response.WriteTagWithValue("UserIsExpert", user.IsExpert);


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
                response.WriteTagWithValue("IsHorizontal", project.Type.Rank.IsHorizontal);

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
                var fundAllocation = voucher.FundAllocation;
                if (fundAllocation == null)
                    return;

                response.WriteTagWithValue("FundAllocationID", voucher.FundAllocationID);
                response.WriteTagWithValue("FundAllocationHardware", fundAllocation.AllocationHardware.ToString());
                response.WriteTagWithValue("FundAllocationAllocationIn", fundAllocation.AllocationIn.ToString());
                response.WriteTagWithValue("FundAllocationAllocationOut", fundAllocation.AllocationOut.ToString());
                response.WriteTagWithValue("FundAllocationDateTime", fundAllocation.GetAllocationDateTime(database.FundAllocationStateHistories));
                response.WriteTagWithValue("FundAllocationOverheadExpensesIn", fundAllocation.OverheadExpensesIn.ToString());
                response.WriteTagWithValue("FundAllocationOverheadExpensesOut", fundAllocation.OverheadExpensesOut.ToString());
                response.WriteTagWithValue("FundAllocationAllocationTotal", fundAllocation.FundDescend.Amount);
                response.WriteTagWithValue("FundAllocationOverheadExpenses", (fundAllocation.OverheadExpensesOut + fundAllocation.OverheadExpensesIn + fundAllocation.OverheadExpensesExpert + fundAllocation.OverheadExpensesMiddle).ToString());
                response.WriteTagWithValue("FundAllocationOverheadExpensesIn", fundAllocation.OverheadExpensesIn.ToString()); response.WriteTagWithValue("FundAllocationOverheadExpensesIn", fundAllocation.OverheadExpensesIn.ToString());
                //从经费凭单中取得学校、二级单位、课题组间接费用
                response.WriteTagWithValue("FundAllocationOverheadExpensesIn", fundAllocation.OverheadExpensesIn.ToString());
                response.WriteTagWithValue("FundAllocationOverheadExpensesMiddle", fundAllocation.OverheadExpensesMiddle.ToString());
                response.WriteTagWithValue("FundAllocationOverheadExpensesExpert", fundAllocation.OverheadExpensesExpert.ToString());

                response.WriteTagWithValue("FundAllocationOverheadExpenses", fundAllocation.OverheadExpensesIn + fundAllocation.OverheadExpensesMiddle + fundAllocation.OverheadExpensesExpert);

                //fundAllocation-state
                var fundAllocationState = fundAllocation.CurrentState;
                response.WriteTagWithValue("FundAllocationStateDateTime", fundAllocationState == null ? null : new Nullable<DateTime>(fundAllocationState.DateTime));
                response.WriteTagWithValue("FundAllocationStateOperator", fundAllocationState == null ? string.Empty : fundAllocationState.Operator);
                response.WriteTagWithValue("FundAllocationStateRemark", fundAllocationState == null ? string.Empty : fundAllocationState.Remark);
                response.WriteTagWithValue("FundAllocationState", fundAllocationState == null ? string.Empty : fundAllocationState.State.ToString());

                //fundAllocation-project


                //fundAllocation-finance
                var finance = fundAllocation.FundDescend.GetFinance(database.FinanceFundDescends);
                response.WriteTagWithValue("FinanceID", finance == null ? string.Empty : finance.ID.ToString());
                response.WriteTagWithValue("FinanceAmount", finance == null ? string.Empty : finance.Amount.ToString());
                response.WriteTagWithValue("FinanceReceivedDate", finance == null ? null : new Nullable<DateTime>(finance.ReceivedDate));
                response.WriteTagWithValue("FinanceVoucherNumber", finance == null ? string.Empty : finance.VoucherNumber);
                response.WriteTagWithValue("FinanceAbstract", finance == null ? string.Empty : finance.Abstract);
                response.WriteTagWithValue("IsBorrow", finance == null);


                //hasPermission
                response.WriteTagWithValue("HasPermission_Show", user.HasPermission_Show(voucher, database));
                response.WriteTagWithValue("HasPermission_Edit", user.HasPermission_Edit(voucher, database));
                response.WriteTagWithValue("HasPermission_Delete", user.HasPermission_Delete(voucher, database));
                response.WriteTagWithValue("HasPermission_ResetAccountBookNumber", user.HasPermission_ResetAccountBookNumber(voucher, database));
                response.WriteTagWithValue("HasPermission_Print", user.HasPermission_Print(voucher, database));
                response.WriteTagWithValue("HasPermission_ResetPrint", user.HasPermission_ResetPrint());
                response.WriteTagWithValue("HasPermission_ShowFundAllocation", user.HasPermission_ShowFundAllocation(voucher, database));

                response.WriteTagWithValue("HasPermission_SignIn", user.HasPermission_SignIn(database));
                response.WriteTagWithValue("HasPermission_ReturnVoucher", user.HasPermission_ReturnVoucher(database));
                response.WriteTagWithValue("HasPermission_FinanceAllocate", user.HasPermission_FinanceAllocate(database));
                response.WriteTagWithValue("HasPermission_CancelFinanceAllocate", user.HasPermission_CancelFinanceAllocate(database));
                response.WriteTagWithValue("HasPermission_Print", user.HasPermission_Print(voucher, database));
                response.WriteTagWithValue("HasPermission_ResetPrint", user.HasPermission_ResetPrint());

                //can
                response.WriteTagWithValue("CanShow", user.CanShow(voucher, database));
                response.WriteTagWithValue("CanEdit", user.CanEdit(voucher, database));
                response.WriteTagWithValue("CanDelete", user.CanDelete(voucher, database));
                response.WriteTagWithValue("CanResetAccountBookNumber", user.CanResetAccountBookNumber(voucher, database));
                response.WriteTagWithValue("CanShowFundAllocation", user.CanShowFundAllocation(voucher, database));

                response.WriteTagWithValue("CanSignIn", user.CanSignIn(voucher, database));
                response.WriteTagWithValue("CanReturnVoucher", user.CanReturnVoucher(voucher, database));
                response.WriteTagWithValue("CanFinanceAllocate", user.CanFinanceAllocate(voucher, database));
                response.WriteTagWithValue("CanCancelFinanceAllocate", user.CanCancelFinanceAllocate(voucher, database));
                response.WriteTagWithValue("CanPrint", user.CanPrint(voucher, database));
                //carlsirce2013.3.4 如果最后一步操作状态时间为2013.1.1之前，则按照旧算法计算，不能重置打印，以避免重置打印后按照新算法计算的情况。
                if (user.CanResetPrint(voucher) && (voucher.ID == 17580 || voucher.ID == 17581 || voucher.ID == 17582 || voucher.ID == 17583 || voucher.ID == 14178))
                {
                    response.WriteTagWithValue("CanResetPrint", true);
                }
                else
                {
                    response.WriteTagWithValue("CanResetPrint", user.CanResetPrint(voucher) && voucher.CurrentState.DateTime > Convert.ToDateTime("2013-1-1"));
                }
            }
        }
        /// <summary>
        /// 凭单财务查询的显示扩展
        /// </summary>
        /// <param name="voucherQueryResult"></param>
        /// <param name="response"></param>
        /// <param name="user"></param>
        /// <param name="database"></param>
        public static void Show(this QueryResult<Voucher> voucherQueryResult, HttpResponse response, User user, IDatabase database)
        {
            ShowDelegateWithUserAndDatabase<Voucher> showDelegate = new ShowDelegateWithUserAndDatabase<Voucher>(ShowVoucher);
            voucherQueryResult.Show<Voucher>(response, user, database, showDelegate);
        }
        /// <summary>
        /// 获得财务分配的凭单信息
        /// </summary>
        /// <param name="request"></param>
        /// <param name="database"></param>
        /// <param name="user"></param>
        /// <returns></returns>
        public static Voucher GetFinanceAllocatdVoucher(this HttpRequest request, IDatabase database, User user)
        {
            var voucher = request.GetEntity<Voucher>(database.Vouchers, "id");

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
        public static Voucher GetVoucher(this HttpRequest request, User user, bool isCorrect, IDatabase database)
        {
            var voucher = request.GetEntity<Voucher>(database.Vouchers, "Id");
            if (voucher == null)
                voucher = new Voucher();
            var expert = request.GetEntity(database.Experts, "ExpertID");
            var isExpertSecondCollege = request.GetBoolean("IsExpertSecondCollege").Value;

            voucher.AllocationHardware = 0;
            voucher.AllocationIn = request.GetMoney("AllocationIn") == null ? 0 : request.GetMoney("AllocationIn").Value;
            voucher.OverheadPerformancePay = request.GetMoney("OverheadPerformancePay") == null ? 0 : request.GetMoney("OverheadPerformancePay").Value;

            voucher.AllocationOut = 0;

            if (voucher.AllocationIn == 0 && voucher.PerformancePay > 0)
                voucher.FundAllocation = null;
            else
                voucher.FundAllocation = request.GetEntity(database.FundAllocations, "FundAllocationID");

            //voucher.OverheadExpensesIn = voucher.GetOverheadExpensesIn();
            //voucher.OverheadPerformancePay = voucher.GetPerformanceManagementPay();
            voucher.OverheadExpensesIn = request.GetMoney("OverheadExpensesIn") == null ? 0 : request.GetMoney("OverheadExpensesIn").Value;
            voucher.PerformancePay = request.GetMoney("PerformancePay") == null ? 0 : request.GetMoney("PerformancePay").Value;

            voucher.IsRead = isCorrect;
            if (isCorrect)
                voucher.VoucherNumber = request.GetString("VoucherNumber");

            //经费分配纠错时，指定账本号，账本号生成不参与规则
            var project = request.GetEntity(database.Projects, "ProjectID");
            if (voucher.FundAllocation == null)
                voucher.Project = project;
            else
                voucher.Project = voucher.FundAllocation.FundDescend.ProjectInfo_Fund.Project;



            if (isCorrect)
                voucher.FundMember = database.FundMembers.GetCorrect(voucher.Project.Fund, expert, request.GetString("AccountBookNumber"), database);
            else
                voucher.FundMember = database.FundMembers.Get(voucher.Project.Fund, expert, isExpertSecondCollege, database);

            voucher.CurrentState = getVoucherState(request, voucher, user, isCorrect, database);

            return voucher;
        }

        private static VoucherStateHistory getVoucherState(HttpRequest request, Voucher voucher, User user, bool isCorrect, IDatabase datagbase)
        {
            VoucherStateHistory voucherStateHistory = voucher.CurrentState;

            if (voucher.IsNew)
            {
                voucherStateHistory = new VoucherStateHistory();
                voucherStateHistory.Voucher = voucher;
            }

            voucherStateHistory.Operator = user.Name;

            //经费分配纠错时，经费状态为财务分配
            if (isCorrect)
            {
                DateTime? fundAllocationDateTime = voucher.FundAllocation.GetAllocationDateTime(datagbase.FundAllocationStateHistories);
                voucherStateHistory.DateTime = fundAllocationDateTime.HasValue ? fundAllocationDateTime.Value : FundAllocation.CAN_CORRECT_DATETIME;
                voucherStateHistory.Remark = "经费凭单纠错";
                voucherStateHistory.State = VoucherState.Allocated;
            }
            else
            {
                voucherStateHistory.DateTime = DateTime.Now;
                voucherStateHistory.Remark = null;
                voucherStateHistory.State = VoucherState.WaitingCensor;
            }

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
            var voucher = request.GetEntity<Voucher>(database.Vouchers, "Id");
            if (voucher == null)
                voucher = new Voucher();
            return voucher;
        }
    }
}
