using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Text;
using System.Web;

using Srims.Server.Business;
using Srims.Server.Business.Performances;
using Srims.Server.Business.Users;

using Srims.Server.UI;
using Srims.Server.UI.HttpExtension;
using Srims.Server.UI.MISExtension;

namespace Srims.Server.UI.Performances
{
    /// <summary>
    /// 绩效分配显示扩展
    /// </summary>
    public static class PerformanceAllocationExtension
    {
        /// <summary>
        /// 经费分配的显示扩展
        /// </summary>
        /// <param name="performanceAllocation"></param>
        /// <param name="response"></param>
        /// <param name="user"></param>
        /// <param name="database"></param>
        public static void ShowPerformanceAllocation(this PerformanceAllocation performanceAllocation, HttpResponse response, User user, IDatabase database)
        {
            response.WriteTagWithValue("ID", performanceAllocation.ID);

            var allocationDateTime = performanceAllocation.GetAllocationPerformanceDateTime(database.PerformanceAllocationStateHistories);
            response.WriteTagWithValue("AllocationDateTime", allocationDateTime);

            response.WriteTagWithValue("FundAllocationIn", performanceAllocation.Performance.FundAllocation == null ? 0 : performanceAllocation.Performance.FundAllocation.FundDescend.Amount - performanceAllocation.Performance.FundAllocation.AllocationOut);
            response.WriteTagWithValue("IndirectCosts", performanceAllocation.Performance.Project.Fund.IndirectCosts);
            response.WriteTagWithValue("ProjectPerformancePay", performanceAllocation.Performance.Project.Fund.ProjectPerformancePay);

            response.WriteTagWithValue("PerformancePay", performanceAllocation.Performance.Project.Fund.PerformancePay);
            response.WriteTagWithValue("PerformanceTotal", performanceAllocation.Performance.ArrivedPerformance);
            response.WriteTagWithValue("ArrivedPerformance", performanceAllocation.ArrivedPerformance);
            response.WriteTagWithValue("ArrivedOverheadexpensesExpert", performanceAllocation.ArrivedOverheadexpensesExpert);
            response.WriteTagWithValue("ExpertIndirectFee", performanceAllocation.ArrivedOverheadexpensesExpert - performanceAllocation.ArrivedPerformance);

            long allocatedPerformance = 0;
            foreach (var item in performanceAllocation.GetPerformanceVouchers(database.PerformanceVouchers))
            {
                allocatedPerformance += item.PerformancePay;
            }
            response.WriteTagWithValue("AllocatedPerformance", allocatedPerformance);
            response.WriteTagWithValue("CanAllocate", performanceAllocation.CanAllocate);

            var currentState = performanceAllocation.CurrentState;
            response.WriteTagWithValue("DateTime", currentState == null ? string.Empty : currentState.DateTime.ToString());
            response.WriteTagWithValue("Operator", currentState == null ? string.Empty : currentState.Operator);
            response.WriteTagWithValue("Remark", currentState == null ? string.Empty : currentState.Remark);
            response.WriteTagWithValue("CurrentState", currentState == null ? string.Empty : currentState.State.ToString());
            response.WriteTagWithValue("IsCancel", currentState == null ? false : (currentState.State == PerformanceAllocationState.Canceled ? true : false));

            //project
            var project = performanceAllocation.Performance.Project;
            response.WriteTagWithValue("ProjectID", project.ID);
            response.WriteTagWithValue("ProjectName", project.Name);
            response.WriteTagWithValue("ProjectPricinpalName", project.Principal.Name);
            response.WriteTagWithValue("TypeName", project.Type.Type.Name);
            response.WriteTagWithValue("IsHorizontal", project.Type.Rank.IsHorizontal);
            response.WriteTagWithValue("IndirectCosts", project.Fund.IndirectCosts);
            response.WriteTagWithValue("ProjectPerformancePay", project.Fund.ProjectPerformancePay);
            response.WriteTagWithValue("ProjectNumber", project.Number);


            //permission
            response.WriteTagWithValue("HasPermission_Allocation", user.HasPermission_Allocation(performanceAllocation, database));
            response.WriteTagWithValue("HasPermission_Canel", user.HasPermission_Canel(performanceAllocation, database));
            response.WriteTagWithValue("HasPermission_Censor", user.HasPermission_Censor(performanceAllocation, database));
            response.WriteTagWithValue("HasPermission_Submit", user.HasPermission_Submit(performanceAllocation, database));
            response.WriteTagWithValue("HasPermission_UndoSubmit", user.HasPermission_UndoSubmit(performanceAllocation, database));
            response.WriteTagWithValue("HasPermission_Correct", user.HasPermission_Correct(performanceAllocation, database));

            //can
            response.WriteTagWithValue("CanAllocation", user.CanAllocation(performanceAllocation, database) && !performanceAllocation.Performance.IsCancel && performanceAllocation.ArrivedPerformance > 0);
            response.WriteTagWithValue("CanCancel", user.CanCancel(performanceAllocation, database));
            response.WriteTagWithValue("CanCensorPass", user.CanCensorPass(performanceAllocation, database));
            response.WriteTagWithValue("CanCensorReject", user.CanCensorReject(performanceAllocation, database));
            response.WriteTagWithValue("CanSubmit", user.CanSubmit(performanceAllocation, database));
            response.WriteTagWithValue("CanUndoSubmit", user.CanUndoSubmit(performanceAllocation, database));
            response.WriteTagWithValue("CanCorrect", user.CanCorrect(performanceAllocation, database));
            response.WriteTagWithValue("CanChangePerformanceAmount", user.CanChangePerformanceAmount(performanceAllocation, database));
        }
        /// <summary>
        /// 经费分配列表的显示扩展
        /// </summary>
        /// <param name="fundAllocationList"></param>
        /// <param name="database"></param>
        /// <param name="user"></param>
        /// <param name="response"></param>
        public static void Show(this PerformanceAllocationQueryResult performanceResult, IDatabase database, User user, HttpResponse response)
        {
            ShowDelegateWithUserAndDatabase<PerformanceAllocation> showDelegate = new ShowDelegateWithUserAndDatabase<PerformanceAllocation>(ShowPerformanceAllocation);
            response.WriteTagBegin("QueryResult");

            response.WriteTagWithValue("Total", performanceResult.Total);
            response.WriteTagWithValue("OverheadExpensesExpertSum", performanceResult.OverheadExpensesExpertSum);

            performanceResult.ResultList.Show<PerformanceAllocation>(response, user, database, ShowPerformanceAllocation);

            response.WriteTagEnd("QueryResult");
        }
        /// <summary>
        /// 经费分配列表的显示扩展
        /// </summary>
        /// <param name="fundAllocationList"></param>
        /// <param name="database"></param>
        /// <param name="user"></param>
        /// <param name="response"></param>
        public static void Show(this IList<PerformanceAllocation> fundAllocationList, IDatabase database, User user, HttpResponse response)
        {
            ShowDelegateWithUserAndDatabase<PerformanceAllocation> showDelegate = new ShowDelegateWithUserAndDatabase<PerformanceAllocation>(ShowPerformanceAllocation);
            fundAllocationList.Show<PerformanceAllocation>(response, user, database, showDelegate);
        }
        /// <summary>
        /// 取得经费分配
        /// </summary>
        /// <param name="request"></param>
        /// <param name="user"></param>
        /// <param name="database"></param>
        /// <returns></returns>
        //public static PerformanceAllocation Get(this HttpRequest request, User user, IDatabase database)
        //{
        //    var performance = request.GetEntity(database.Performances, "PerformanceId");
        //    var performanceAllocation = performance.GetPerformanceAllocation(database.PerformanceAllocations);

        //    if (performanceAllocation.IsNew)
        //        performanceAllocation.CurrentState = new PerformanceAllocationStateHistory
        //        {
        //            DateTime = DateTime.Now,
        //            PerformanceAllocation = performanceAllocation,
        //            Operator = user.Name,
        //            Remark = null,
        //            State = PerformanceAllocationState.UnSubmit,

        //        };

        //    return performanceAllocation;
        //}
    }
}
