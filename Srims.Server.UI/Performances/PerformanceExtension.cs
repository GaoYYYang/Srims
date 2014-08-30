using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

using Srims.Server.Business.Common;
using Srims.Server.Business.Users;
using Srims.Server.Business;

using Srims.Server.UI.MISExtension;
using Srims.Server.UI.HttpExtension;
using System.Web;

using MIS.Common.Query;
using Srims.Server.DataExchange;
using Srims.Server.Business.Performances;


namespace Srims.Server.UI.Performances
{
    /// <summary>
    /// 绩效显示扩展
    /// </summary>
    public static class PerformanceExtension
    {
        /// <summary>
        /// 显示绩效
        /// </summary>
        /// <param name="performance"></param>
        /// <param name="response"></param>
        /// <param name="user"></param>
        /// <param name="database"></param>
        public static void ShowPerformance(this Performance performance, HttpResponse response, User user, IDatabase database)
        {
            long AllocatedPerformance = 0;
            long AllocatedOverheadExpensesExpert = 0;
            foreach (var allocation in performance.GetPerformanceAllocation(database).Where(c => c.CurrentState.State == PerformanceAllocationState.Passed))
            {
                AllocatedPerformance += allocation.ArrivedPerformance;
                AllocatedOverheadExpensesExpert += allocation.ArrivedOverheadexpensesExpert - allocation.ArrivedPerformance;

            }
            response.WriteTagWithValue("ID", performance.ID);
            response.WriteTagWithValue("ProjectID", performance.Project.ID);
            response.WriteTagWithValue("ProjectName", performance.Project.Name);
            response.WriteTagWithValue("ExpertName", performance.Project.Principal);
            response.WriteTagWithValue("FundAllocationIn", performance.FundAllocation == null ? 0 : performance.FundAllocation.FundDescend.Amount - performance.FundAllocation.AllocationOut);
            response.WriteTagWithValue("FundAllocationOverheadExpensesIn", performance.FundAllocation == null ? (performance.Recovery.PlanedOverheadExpensesIn - performance.Recovery.ReceivedOverheadExpensesIn) : performance.FundAllocation.GetOverheadExpensesInAlready(database));
            response.WriteTagWithValue("FundAllocationOverheadExpensesMiddle", performance.FundAllocation == null ? (performance.Recovery.PlanedOverheadExpensesMiddle - performance.Recovery.ReceivedOverheadExpensesMiddle) : performance.FundAllocation.OverheadExpensesMiddle);
            response.WriteTagWithValue("AllocatedOverheadExpensesExpert", AllocatedOverheadExpensesExpert);
            response.WriteTagWithValue("ArrivedPerformance", performance.ArrivedPerformance);
            response.WriteTagWithValue("DescendPerformance", performance.DescendPerformance);


            response.WriteTagWithValue("FundFromUnit", performance.Project.Fund.FundFromUnit);
            response.WriteTagWithValue("FundFromUnitAddress", performance.Project.Fund.FundFromUnitAddress);


            response.WriteTagWithValue("AllocatedPerformance", AllocatedPerformance);
            response.WriteTagWithValue("PerformancePay", performance.Project.Fund.PerformancePay);
            response.WriteTagWithValue("ProjectNumber", performance.Project.Number);
            response.WriteTagWithValue("TypeName", performance.Project.Type.Type.Name);

            response.WriteTagWithValue("IndirectCosts", performance.Project.Fund.IndirectCosts);
            response.WriteTagWithValue("ProjectPerformancePay", performance.Project.Fund.ProjectPerformancePay);
            response.WriteTagWithValue("FoundationTime", performance.FoundationTime);

            response.WriteTagWithValue("IsAllocated", performance.IsAllocated);
            response.WriteTagWithValue("IsCancel", performance.IsCancel);


            ////permission
            response.WriteTagWithValue("HasPermission_ShowAlloction", user.HasPermission_ShowAlloction(performance, database));

            response.WriteTagWithValue("CanShowAllocation", user.CanShowAllocation(performance, database) && performance.ArrivedPerformance > 0);
        }

        /// <summary>
        /// 绩效分配列表的显示扩展
        /// </summary>
        public static void Show(this PerformanceQueryResult performanceResult, HttpResponse response, User user, IDatabase database)
        {
            ShowDelegateWithUserAndDatabase<Performance> showDelegate = new ShowDelegateWithUserAndDatabase<Performance>(ShowPerformance);
            response.WriteTagBegin("QueryResult");

            response.WriteTagWithValue("Total", performanceResult.Total);
            response.WriteTagWithValue("OverheadExpensesInSum", performanceResult.OverheadExpensesInSum);
            response.WriteTagWithValue("OverheadExpensesMiddleSum", performanceResult.OverheadExpensesMiddleSum);
            response.WriteTagWithValue("ReceivedPerformance", performanceResult.ReceivedPerformance);
            response.WriteTagWithValue("DescendPerformance", performanceResult.DescendPerformance);

            performanceResult.ResultList.Show<Performance>(response, user, database, ShowPerformance);

            response.WriteTagEnd("QueryResult");

        }

        /// <summary>
        /// 单个绩效的显示扩展
        /// </summary>
        /// <param name="list"></param>
        /// <param name="response"></param>
        /// <param name="user"></param>
        /// <param name="database"></param>
        public static void Show(this IList<Performance> list, HttpResponse response, User user, IDatabase database)
        {
            list.Show<Performance>(response, user, database, ShowPerformance);
        }
    }
}
