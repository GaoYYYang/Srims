using System;
using System.Collections;
using System.ComponentModel;
using System.Data;
using System.Linq;
using System.Web;
using System.Web.Services;
using System.Web.Services.Protocols;
using System.Xml.Linq;
using System.Collections.Generic;
using System.Text;

using Srims.Server.Business;
using Srims.Server.Business.Performances;
using Srims.Server.Business.Users;

using Srims.Server.UI;
using Srims.Server.UI.Performances;
using Srims.Server.UI.HttpExtension;
using Srims.Server.UI.MISExtension;
using System.Transactions;
using Srims.Server.Business.Common;

namespace Srims.WebSite.Service.Performance
{
    /// <summary>
    /// Summary description for PerformanceAllocationWebService
    /// </summary>
    [WebService(Namespace = "http://tempuri.org/")]
    [WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
    [System.ComponentModel.ToolboxItem(false)]
    // To allow this Web Service to be called from script, using ASP.NET AJAX, uncomment the following line. 
    // [System.Web.Script.Services.ScriptService]
    public class PerformanceAllocationWebService : WebServiceBase
    {
        [WebMethod]
        public void Query()
        {
            Response.WriteXmlHead();

            Database
                .PerformanceAllocations
                .Query(Request.GetPerformanceAllocationQueryInformation(User), User)
                .Show(Database, User, Response);
        }
        [WebMethod]
        public void GetByProjectID()
        {
            var projectID = Request.GetInt("ProjectID").Value;
            var project = Database.Projects.GetByID(projectID);

            Response.WriteXmlHead();
            Database
                .PerformanceAllocations
                .GetByProject(project)
                .Show(Database, User, Response);
        }
        [WebMethod]
        public void Save()
        {
            var performance = Request.GetEntity<Srims.Server.Business.Performances.Performance>(Database.Performances, "performanceID");
            using (TransactionScope ts = new TransactionScope())
            {
                var performanceAllocation = new PerformanceAllocation();
                performanceAllocation.Performance = performance;
                performanceAllocation.CanAllocate = false;
                performanceAllocation.ArrivedOverheadexpensesExpert = Request.GetLong("amount").Value;
                performanceAllocation.ArrivedPerformance = 0;
                performanceAllocation.Save(Database);

                var performanceAllocationStateHistory = new PerformanceAllocationStateHistory();
                performanceAllocationStateHistory.DateTime = System.DateTime.Now;
                performanceAllocationStateHistory.Operator = User.Name;
                performanceAllocationStateHistory.PerformanceAllocation = performanceAllocation;
                performanceAllocationStateHistory.State = PerformanceAllocationState.UnSubmit;
                performanceAllocationStateHistory.Save(Database);

                performanceAllocation.CurrentState = performanceAllocationStateHistory;
                performanceAllocation.Save(Database);

                performance.Save(Database);
                ts.Complete();
            }
            List<Srims.Server.Business.Performances.Performance> list = new List<Srims.Server.Business.Performances.Performance>();
            list.Add(performance);
            list.Show(Response, User, Database);
        }
        [WebMethod]
        public void GetById()
        {
            var performanceAllocation = Request.GetEntity(Database.PerformanceAllocations, "performanceAllocationId");
            Response.WriteXmlHead();
            performanceAllocation
                .ShowInList(Response, User, Database, PerformanceAllocationExtension.ShowPerformanceAllocation);
        }
        //提交经费分配
        [WebMethod]
        public void Submit()
        {
            var performanceAllocation = Request.GetEntity(Database.PerformanceAllocations, "performanceAllocationId");
            using (TransactionScope ts = new TransactionScope())
            {
                var description = string.Format("提交项目：{0}的绩效分配；\n对应ID为：{1}", performanceAllocation.Performance.Project.Name, performanceAllocation.ID);
                Log.Write(User.Name, (int)LogType.PerformanceAllocationSubmit, description, Request.UserHostAddress, "提交绩效分配", Database);
                performanceAllocation.Submit(User, Database);
                ts.Complete();
            }
        }
        //撤销
        [WebMethod]
        public void UndoSubmit()
        {
            var performanceAllocation = Request.GetEntity(Database.PerformanceAllocations, "performanceAllocationId");
            using (TransactionScope ts = new TransactionScope())
            {
                var description = string.Format("撤销项目：{0}的绩效分配；\n对应ID为：{1}", performanceAllocation.Performance.Project.Name, performanceAllocation.ID);
                Log.Write(User.Name, (int)LogType.PerformanceAllocationUndoSubmit, description, Request.UserHostAddress, "撤销绩效分配", Database);
                performanceAllocation.UndoSubmit(User, Database);
                ts.Complete();
            }
        }
        //审核通过
        [WebMethod]
        public void CensorPass()
        {
            var performanceAllocation = Request.GetEntity(Database.PerformanceAllocations, "PerformanceAllocationId");
            using (TransactionScope ts = new TransactionScope())
            {
                var description = string.Format("审核通过项目：{0}的绩效分配；\n对应ID为：{1}", performanceAllocation.Performance.Project.Name, performanceAllocation.ID);
                Log.Write(User.Name, (int)LogType.PerformanceAllocationCensorPass, description, Request.UserHostAddress, "审核通过绩效分配", Database);
                performanceAllocation.CensorPass(User, Request.GetString("Remark"), Database);
                ts.Complete();
            }
        }
        //审核驳回
        [WebMethod]
        public void CensorReject()
        {
            var performanceAllocation = Request.GetEntity(Database.PerformanceAllocations, "PerformanceAllocationId");
            using (TransactionScope ts = new TransactionScope())
            {
                var description = string.Format("审核驳回项目：{0}的绩效分配；\n对应ID为：{1}", performanceAllocation.Performance.Project.Name, performanceAllocation.ID);

                Log.Write(User.Name, (int)LogType.PerformanceAllocationCensorReject, description, Request.UserHostAddress, "审核驳回绩效分配", Database);
                performanceAllocation.CensorReject(User, Request.GetString("Remark"), Database);
                ts.Complete();
            }
        }
        //作废
        [WebMethod]
        public void Cancel()
        {
            var performanceAllocation = Request.GetEntity(Database.PerformanceAllocations, "PerformanceAllocationId");
            using (TransactionScope ts = new TransactionScope())
            {
                var description = string.Format("作废项目：{0}的绩效分配；\n对应ID为：{1}", performanceAllocation.Performance.Project.Name, performanceAllocation.ID);
                Log.Write(User.Name, (int)LogType.PerformanceAllocationCancel, description, Request.UserHostAddress, "作废绩效分配", Database);
                performanceAllocation.Cancel(User, Request.GetString("Remark"), Database);
                //产生新的绩效分配
                PerformanceAllocation newPerformanceAllocation = new PerformanceAllocation();
                newPerformanceAllocation.Performance = performanceAllocation.Performance;
                newPerformanceAllocation.ArrivedOverheadexpensesExpert = performanceAllocation.ArrivedOverheadexpensesExpert;
                newPerformanceAllocation.ArrivedPerformance = 0;
                newPerformanceAllocation.CanAllocate = false;
                newPerformanceAllocation.Save(Database);
                PerformanceAllocationStateHistory state = new PerformanceAllocationStateHistory();
                state.PerformanceAllocation = newPerformanceAllocation;
                state.DateTime = System.DateTime.Now;
                state.Operator = User.Name;
                state.State = PerformanceAllocationState.UnSubmit;
                state.Save(Database);
                newPerformanceAllocation.CurrentState = state;
                newPerformanceAllocation.Save(Database);

                ts.Complete();
            }
        }

        [WebMethod]
        public void GetWaitingCensorVerticalProjectPerformance()
        {
            Response.WriteXmlHead();
            Database
                .PerformanceAllocations
                .GetWaitingCensorPerformanceAllocationCount(false, User)
                .Show(Response);
        }

        [WebMethod]
        public void GetWaitingCensorHorizontalProjectPerformance()
        {
            Response.WriteXmlHead();
            Database
                .PerformanceAllocations
                .GetWaitingCensorPerformanceAllocationCount(true, User)
                .Show(Response);

        }
        [WebMethod]
        public void CheckExpertByID()
        {
            var performanceAllocation = Database.PerformanceAllocations.SingleOrDefault(c => c.ID == Request.GetInt("FundAllocationId").Value);
            var expertID = Request.GetInt("ExpertId").Value;
            var projectMemebers = Database.ProjectMemebers.Where(c => c.Project == performanceAllocation.Performance.Project && c.Expert.ID == expertID).ToList();
            if (projectMemebers.Count == 0)
                Response.Write(false);
            else
                Response.Write(true);
        }
        [WebMethod]
        public void CheckExpertByPerformanceAllocation()
        {
            var performanceAllocation = Database.PerformanceAllocations.SingleOrDefault(c => c.ID == Request.GetInt("PerformanceAllocationId").Value);
            bool flag = false;
            StringBuilder str = new StringBuilder();
            StringBuilder members = new StringBuilder();
            var project = performanceAllocation.Performance.Project;
            var vouchers = Database.PerformanceVouchers.Where(c => c.PerformanceAllocation == performanceAllocation).ToList();
            foreach (var item in vouchers)
            {
                var projectMember = Database.ProjectMemebers.SingleOrDefault(c => c.Expert == item.FundMember.Expert && c.Project == project);
                if (projectMember == null)
                {
                    flag = true;
                    members.AppendFormat("{0}({1}),", item.FundMember.Expert.Name, item.FundMember.Expert.Number);
                }
            }
            if (flag == false)
            {
                str.Append("blank");
            }
            else
            {
                str.Append("请注意，以下专家：");
                str.Append(members);
                str.Append("不在项目成员中！");
            }
            Response.Write(str);
        }
        [WebMethod]
        public void GetWaitingAllocationProjectPerformance()
        {
            Response.WriteXmlHead();
            Database
                .PerformanceAllocations
                .GetWaitingPerformanceAllocationCount(User, Database)
                .Show(Response);
        }
        [WebMethod]
        public void EnableAllocate()
        {
            var performanceAllocationIDs = Request.GetString("PerformanceAllocationIds").Split(new char[] { ',' }, StringSplitOptions.RemoveEmptyEntries);
            using (TransactionScope ts = new TransactionScope())
            {
                foreach (var item in performanceAllocationIDs)
                {
                    var performanceAllocation = Database.PerformanceAllocations.SingleOrDefault(c => c.ID.ToString() == item);
                    if (performanceAllocation != null)
                    {
                        performanceAllocation.CanAllocate = true;
                        performanceAllocation.Save(Database);
                    }
                }
                ts.Complete();
            }
            Response.Write(performanceAllocationIDs.Length);
        }
        [WebMethod]
        public void Delete()
        {
            var performanceAllocationID = Request.GetInt("PerformanceAllocationId");
            var performanceAllocation = Database.PerformanceAllocations.SingleOrDefault(c => c.ID == performanceAllocationID);
            if (performanceAllocation != null)
            {
                var state = Database.PerformanceAllocationStateHistories.Single(c => c.PerformanceAllocation == performanceAllocation);
                var performance = Database.Performances.Single(c => c == performanceAllocation.Performance);
                var fund = Database.ProjectInfo_Funds.Single(c => c == performanceAllocation.Performance.Project.Fund);
                using (TransactionScope ts = new TransactionScope())
                {
                    performanceAllocation.CurrentState = null;
                    state.Delete(Database);
                    performanceAllocation.Delete(Database);

                    performance.Save(Database);
                    fund.Save(Database);
                    ts.Complete();
                }
                List<Srims.Server.Business.Performances.Performance> list = new List<Srims.Server.Business.Performances.Performance>();
                list.Add(performance);
                list.Show(Response, User, Database);
            }

        }
        
        [WebMethod]
        public void GetByPerformance()
        {
            var performance = Request.GetEntity(Database.Performances, "performanceId");

            Response.WriteXmlHead();
            Database
                .PerformanceAllocations
                .GetByPerformance(performance)
                .Show(Response, User, Database, PerformanceAllocationExtension.ShowPerformanceAllocation);
        }
        [WebMethod]
        public void GetPerformanceAmountForAllocate()
        {
            var id = Request.GetInt("ID");
            var amount = Request.GetLong("Amount");
            var performanceAllcation = Database.PerformanceAllocations.SingleOrDefault(c => c.ID == id);
            using (TransactionScope ts = new TransactionScope())
            {
                if (performanceAllcation != null)
                {
                    performanceAllcation.ArrivedPerformance = amount == null ? 0 : amount.Value;
                    performanceAllcation.Save(Database);
                }
                ts.Complete();
            }
        }
    }

}
