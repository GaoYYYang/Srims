using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Web;

using Srims.Server.Business;
using Srims.Server.Business.Bases;
using Srims.Server.Business.Common;
using Srims.Server.Business.Fund;
using Srims.Server.Business.Projects;
using Srims.Server.Business.Type;
using Srims.Server.Business.Users;
using Srims.Server.Business.Documents;
using Srims.Server.Business.Experts;
using MIS.Common.Query;
using Srims.Server.UI.MISExtension;
using Srims.Server.UI.HttpExtension;

namespace Srims.Server.UI.Fund
{
    public static class RecoveryExtension
    {
        public static void ShowRecovery(this Recovery recovery, HttpResponse response, User user, IDatabase database)
        {
            if (recovery != null)
            {
                response.WriteTagBegin("Record");
                //basic
                response.WriteTagWithValue("ID", recovery.ID);
                response.WriteTagWithValue("Number", recovery.Project.Number);
                response.WriteTagWithValue("PID", recovery.Project.ID);
                response.WriteTagWithValue("Name", recovery.Project.Name);
                response.WriteTagWithValue("Principal", recovery.Project.Principal);
                response.WriteTagWithValue("PrincipalCollege", recovery.Project.Principal.College);
                response.WriteTagWithValue("FundAlreadyIn", recovery.Project.Fund.FundAlreadyIn);
                response.WriteTagWithValue("CurrentAllocationIn", recovery.CurrentAllocationIn);
                response.WriteTagWithValue("ReceivedOverheadExpensesIn", recovery.ReceivedOverheadExpensesIn);
                response.WriteTagWithValue("PlanedOverheadExpensesIn", recovery.PlanedOverheadExpensesIn);
                response.WriteTagWithValue("PlanedOverheadExpensesMiddle", recovery.PlanedOverheadExpensesMiddle);
                response.WriteTagWithValue("ReceivedOverheadExpensesMiddle", recovery.ReceivedOverheadExpensesMiddle);
                response.WriteTagWithValue("ReceivedPerformancePay", recovery.ReceivedPerformancePay);
                response.WriteTagWithValue("PlanedPerformancePay", recovery.PlanedPerformancePay);
                response.WriteTagWithValue("OldOverheadExpensesIn", recovery.OldOverheadExpensesIn);
                response.WriteTagWithValue("NewOverheadExpensesIn", recovery.NewOverheadExpensesIn);
                response.WriteTagWithValue("OldPerformancePay", recovery.OldPerformancePay);
                response.WriteTagWithValue("NewPerformancePay", recovery.NewPerformancePay);
                response.WriteTagWithValue("OldFundPlanIn", recovery.OldFundPlanIn);
                response.WriteTagWithValue("NewFundPlanIn", recovery.NewFundPlanIn);
                response.WriteTagWithValue("OperateTime", recovery.OperateTime);
                response.WriteTagWithValue("Operator", recovery.Operator);


                response.WriteTagWithValue("RecoveryAmount", recovery.PlanedOverheadExpensesIn + recovery.PlanedPerformancePay + recovery.PlanedOverheadExpensesMiddle - recovery.ReceivedOverheadExpensesMiddle - recovery.ReceivedPerformancePay - recovery.ReceivedOverheadExpensesIn);
                response.WriteTagWithValue("PerformancePayAmount", recovery.PlanedPerformancePay - recovery.ReceivedPerformancePay);
                response.WriteTagWithValue("OverheadExpensesInAmount", recovery.PlanedOverheadExpensesIn - recovery.ReceivedOverheadExpensesIn);
                response.WriteTagWithValue("OverheadExpensesMiddleAmount", recovery.PlanedOverheadExpensesMiddle - recovery.ReceivedOverheadExpensesMiddle);

                response.WriteTagWithValue("Remark", recovery.Remark);
                response.WriteTagWithValue("VoucherNumber", recovery.VoucherNumber);
                response.WriteTagWithValue("IsPrint", recovery.IsPrint == true ? "已打印" : "未打印");
                response.WriteTagWithValue("IsCanceled", recovery.IsCanceled);
                response.WriteTagWithValue("PrintDateTime", recovery.PrintDateTime);

                var projectinfofund = database.ProjectInfo_Funds.FirstOrDefault(c => c.Project == recovery.Project);
                var fundmember = database.FundMembers.FirstOrDefault(c => c.Expert == recovery.Project.Principal && c.ProjectInfo_Fund == projectinfofund && c.AccountBookNumber.Substring(5, 1) != "9");
                response.WriteTagWithValue("AccountBookNumber", fundmember == null ? "" : fundmember.AccountBookNumber);
                response.WriteTagEnd("Record");
            }
        }

        public static void Show(this IList<Recovery> list, HttpResponse response, User user, IDatabase database)
        {
            response.WriteTagBegin("List");
            foreach (var recovery in list)
                recovery.ShowRecovery(response, user, database);
            response.WriteTagEnd("List");
        }

        public static void Show(this RecoveryQueryResult recoveryQueryResult, HttpResponse response, User user, IDatabase database)
        {
            response.WriteTagBegin("QueryResult");

            response.WriteTagWithValue("Total", recoveryQueryResult.Total);
            response.WriteTagWithValue("PerformanceSum", recoveryQueryResult.PerformanceSum);
            response.WriteTagWithValue("OverheadExpensesSum", recoveryQueryResult.OverheadExpensesSum);
            response.WriteTagWithValue("OverheadExpensesMiddleSum", recoveryQueryResult.OverheadExpensesMiddleSum);
            recoveryQueryResult.ResultList.Show<Recovery>(response, user, database, ShowRecovery);

            response.WriteTagEnd("QueryResult");
        }

        public static Recovery GetRecovery(this HttpRequest request, IDatabase database)
        {
            var recovery = request.GetEntity<Recovery>(database.Recovery, "Id");
            recovery.Remark = request.GetString("Remark");
            return recovery;
        }
        public static Recovery getRecoveryByID(this HttpRequest request, IDatabase database)
        {
            return request.GetEntity(database.Recovery, "Id");
        }
        /// <summary>
        /// 根据projectId取得追缴单
        /// </summary>
        /// <param name="request"></param>
        /// <param name="database"></param>
        /// <returns></returns>
        public static Recovery getRecoveryByPID(this HttpRequest request, IDatabase database)
        {
            var project = request.GetEntity<Project>(database.Projects, "projectId");
            var recovery = new Recovery();
            recovery = database.Recovery.SingleOrDefault(c => c.ProjectID == project.ID);
            //Recovery re = database.Recovery.SingleOrDefault(c => c.ProjectID == project.ID);
            return recovery;
        }
        public static Recovery GetOldRecovery(this HttpRequest request, IDatabase database)
        {
            var recovery = request.GetEntity<Recovery>(database.Recovery, "Id");
            return recovery;
        }

    }
}
