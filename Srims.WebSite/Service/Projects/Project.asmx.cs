using System;
using System.Collections;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Text;
using System.Linq;
using System.Web;
using System.Web.Services;
using System.Web.Services.Protocols;
using System.Xml.Linq;
using System.Transactions;
using System.Threading;

using Srims.Server.Business;
using Srims.Server.Business.Projects;
using Srims.Server.Business.Users;
using Srims.Server.Business.Fund;
using Srims.Server.Business.Performances;
using Srims.Server.Business.Common;
using Srims.Server.Business.Type;
using Srims.Server.DataExchange;
using Srims.Server.DataExchange.RecoveryImport;
using Srims.Server.UI;
using Srims.Server.UI.Projects;
using Srims.Server.UI.Users;
using Srims.Server.UI.Fund;
using Srims.Server.UI.HttpExtension;
using Srims.Server.UI.MISExtension;

using Srims.Server.DataExchange.ManageFeesImport;
using Srims.Server.DataExchange.ProjectImport;

namespace Srims.WebSite.Service.Projects
{
    [WebService(Namespace = "http://srims.ouc.edu.cn/")]
    [WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
    [ToolboxItem(false)]
    public class ProjectService : WebServiceBase
    {
        [WebMethod]
        public void Query()
        {
            Response.WriteXmlHead();
            Database
               .Projects
               .Query(Request.GetProjectQueryInformation(User), User, Database)
               .Show(Response, User, Database);
        }
        [WebMethod]
        public void RecoveryQuery()
        {
            Response.WriteXmlHead();
            Database
               .Recovery
               .Query(Request.GetRecoveryProjectQueryInformation(User), Database, User)
               .Show(Response, User, Database);
        }
        [WebMethod]
        public void RecoveryPrint()
        {
            var recovery = Request.GetOldRecovery(Database);
            recovery.IsPrint = true;
            recovery.PrintDateTime = DateTime.Today;
            recovery.Save(Database);
        }
        [WebMethod]
        public void RecoveryResetPrint()
        {
            var recovery = Request.GetOldRecovery(Database);
            recovery.IsPrint = false;
            recovery.PrintDateTime = DateTime.Today;
            recovery.Save(Database);
        }
        [WebMethod]
        public void GetMyUnsubmitProjects()
        {
            bool isHorizontal = Request.GetBoolean("isHorizontal").Value;
            Response.WriteXmlHead();
            Database
               .Projects
               .GetMyUnsubmitProjects(User, isHorizontal, Database)
               .Show(Response, User, Database);
        }
        [WebMethod]
        public void QueryForEmail()
        {
            Response.WriteXmlHead();
            Database
                .Projects
                .GetProject(Request.GetProjectQueryInformation(User), User, Database)
                .ToList()
                .Show(Response, ProjectShowExtension.ShowProjectForEmail);
        }
        [WebMethod]
        public void QueryForFundDescend()
        {
            Response.WriteXmlHead();
            Database
                .Projects
                .QueryForFundDescend(Request.GetProjectQueryInformation(User), User, Database)
                .ToList()
                .Show(Response, User, Database);
        }
        [WebMethod]
        public void SearchForFundDescend()
        {
            string keyWord = Request.GetString("query");
            Response.WriteXmlHead();
            Database
                .Projects
                .SearchForFundDescend(keyWord, User, Database)
                .ToList()
                .Show(Response, Database, ProjectShowExtension.ShowForFundDescend);
        }
        [WebMethod]
        public void SearchForReturn()
        {
            string keyWord = Request.GetString("query");
            Response.WriteXmlHead();
            Database
                .Projects
                .SearchForReturn(keyWord, User, Database)
                .ToList()
                .Show(Response, Database, ProjectShowExtension.ShowForFundDescend);
        }
        [WebMethod]
        public void Search()
        {
            var project = new Project();
            project.Name = "其他";
            project.Number = "其他";
            string keyWord = Request.GetString("query");
            Response.WriteXmlHead();
            List<Project> projects = Database
                .Projects
                .SearchProject(keyWord, User)
                .ToList();

            projects.Insert(0, project);
            projects.Show(Response, Database, ProjectShowExtension.ShowProjectForStamp);
        }
        [WebMethod]
        public void GetById()
        {
            var project = Request.getProjectByID(Database);

            returnProject(project);
        }
        [WebMethod]
        public void GetRecoveryByPID()
        {
            //var recovery = Request.getRecoveryByPID(Database);
            //Response.WriteXmlHead();
            //List<Recovery> listRecovery = new List<Recovery>();
            //listRecovery.Add(recovery);
            //listRecovery.Show(Response, User, Database);
            var projectID = Request.GetInt("ProjectID").Value;
            var project = Database.Projects.GetByID(projectID);

            Response.WriteXmlHead();
            Database
                .Recoverys
                .GetByProject(project)
                .Show(Response, User, Database);
        }
        [WebMethod]
        public void GetMyProcessingProject()
        {
            Response.WriteXmlHead();
            Database
                .Projects
                .GetMyProcessingProject(User)
                .Show(Response, ProjectShowExtension.ShowProjectForSetDelegate);

        }
        private string getVoucherNumber(Recovery recovery, IDatabase database)
        {

            return recovery.Project.Type.Rank.IsHorizontal ?
                 string.Format("H{0:D5}", database.SystemSettings.NewHorizontalVouherNumber()) :
                 string.Format("V{0:D5}", database.SystemSettings.NewVerticalVouherNumber());

        }
        private long getCurrentAllocationIn(Project project, IDatabase database)
        {
            var fundAllocations = database.FundAllocations.Where(c => c.FundDescend.ProjectInfo_Fund.Project == project && c.CurrentState.State == FundAllocationState.Passed).ToList();
            long sum = 0;
            foreach (var item in fundAllocations)
            {
                sum += item.FundDescend.Amount - item.AllocationOut;
            }
            return sum;
        }
        [WebMethod]
        public void Save()
        {
            var oldProject = (Project)Request.GetOldProject(Database, User);
            ProjectInfo_Fund oldFund = new ProjectInfo_Fund();
            if (oldProject.IsNew == false)
                oldFund = (ProjectInfo_Fund)oldProject.Fund.Clone();
            var project = Request.GetProject(Database, User);
            #region carlsirce 加入追缴单生成规则
            if (!project.IsNew && project.Type.Type.IsBudget && oldProject != null)
            {

                if (project.Fund.FundPlanIn != oldFund.FundPlanIn || project.Fund.CampusIndirectCosts != oldFund.CampusIndirectCosts || project.Fund.FundContract != oldFund.FundContract || project.Fund.FundTotal != oldFund.FundTotal)
                {
                    var currentAllocationIn = getCurrentAllocationIn(project, Database);
                    if (currentAllocationIn > 0)
                    {
                        double rate = (double)currentAllocationIn / project.Fund.FundPlanIn;
                        using (TransactionScope ts = new TransactionScope())
                        {
                            Recovery recovery = new Recovery();
                            recovery.Project = project;
                            recovery.VoucherNumber = getVoucherNumber(recovery, Database);
                            recovery.CurrentAllocationIn = currentAllocationIn;

                            recovery.ReceivedOverheadExpensesIn = oldProject.GetAllocatedOverheadExpensesIn(Database);
                            recovery.PlanedOverheadExpensesIn = Convert.ToInt64(project.Fund.OverheadExpenseInTotal * rate);
                            recovery.ReceivedPerformancePay = oldProject.GetDescendPormance(Database);
                            recovery.PlanedPerformancePay = Convert.ToInt64(project.Fund.OverheadExpenseExpertTotal * rate);
                            recovery.ReceivedOverheadExpensesMiddle = oldProject.GetAllocatedOverheadExpensesMiddle(Database);
                            recovery.PlanedOverheadExpensesMiddle = Convert.ToInt64(project.Fund.OverheadExpenseMiddleTotal * rate);

                            recovery.OldFundPlanIn = oldFund.FundPlanIn;
                            recovery.NewFundPlanIn = project.Fund.FundPlanIn;
                            recovery.OldOverheadExpensesIn = oldFund.OverheadExpenseInTotal;
                            recovery.NewOverheadExpensesIn = project.Fund.OverheadExpenseInTotal;
                            recovery.OldPerformancePay = oldFund.OverheadExpenseExpertTotal;
                            recovery.NewPerformancePay = project.Fund.OverheadExpenseExpertTotal;

                            recovery.OperateTime = System.DateTime.Now;
                            recovery.Operator = User.Name;
                            recovery.IsPrint = false;
                            if (recovery.PlanedOverheadExpensesIn != recovery.ReceivedOverheadExpensesIn || recovery.PlanedOverheadExpensesMiddle - recovery.ReceivedOverheadExpensesMiddle != 0 || recovery.PlanedPerformancePay != recovery.ReceivedPerformancePay)
                            {
                                recovery.Save(Database);

                                Srims.Server.Business.Performances.Performance performence = new Srims.Server.Business.Performances.Performance();
                                performence.ArrivedPerformance = (recovery.PlanedPerformancePay == null ? 0 : recovery.PlanedPerformancePay.Value) - (recovery.ReceivedPerformancePay == null ? 0 : recovery.ReceivedPerformancePay.Value);
                                performence.DescendPerformance = 0;
                                performence.Project = project;
                                performence.Recovery = recovery;
                                performence.IsAllocated = performence.ArrivedPerformance > 0 ? false : true;
                                performence.FoundationTime = System.DateTime.Now;
                                performence.Remark = "系统间接费用调整时产生";
                                performence.IsCancel = false;
                                performence.Save(Database);
                            }
                            ts.Complete();
                        }
                    }
                }
            }
            #endregion

            var type = project.Type;
            var fund = project.Fund;
            var state = project.CurrentState;
            var isNewProject = project.IsNew;

            if (!User.CanEdit(project, Database))
                throw new HasNoPermissionException();

            using (TransactionScope ts = new TransactionScope())
            {

                if (isNewProject)
                {
                    project.Type = null;
                    project.Fund = null;
                    project.CurrentState = null;
                }
                var description = project.IsNew ? "新建" : "编辑";
                description += string.Format("项目\n  项目名称为：{0}。\n", project.Name)
                    + Log.GetEditOperationDescription(oldProject, project, Project.GetDescriptionItems(), project.IsNew);
                Log.Write(User.Name, project.IsNew ? (int)LogType.ProjectNew : (int)LogType.ProjectEdit, description, Request.UserHostAddress, project.IsNew ? "新建项目" : "编辑项目", Database);

                project.Save(Database);
                type.Save(Database);
                fund.Save(Database);
                state.Save(Database);

                if (isNewProject)
                {
                    project.Type = type;
                    project.Fund = fund;
                    project.CurrentState = state;
                    project.Save(Database);
                }



                fund.OverHeadExpenseInStandard = Convert.ToInt64((double)Database
                     .ManagementFees
                     .GetAllManagementFeesByType(project.Type.Type.ManagementFeesType
                     , project.Type.Type.ID
                     , project.Level
                     , project.Fund.FundContract
                     , project.Fund.FundTotal
                     , project.Fund.FundPlanIn
                     , project.Fund.EquipmentCost.Value
                     , "overheadExpenseInRate"
                     , Database) / 10000.0 * (double)project.Fund.FundPlanIn);
                fund.PerformanceInStandard = Convert.ToInt64((double)Database
                     .ManagementFees
                     .GetAllManagementFeesByType(project.Type.Type.ManagementFeesType
                     , project.Type.Type.ID
                     , project.Level
                     , project.Fund.FundContract
                     , project.Fund.FundTotal
                     , project.Fund.FundPlanIn
                     , project.Fund.EquipmentCost.Value
                     , "overheadExpensePerformancePayRate"
                     , Database) / 10000.0 * (double)project.Fund.FundPlanIn);

                #region 2013年1月12日新的管理费收取方法修改
                if (!project.Type.Type.IsBudget && !User.IsSuper)
                {
                    fund.OverheadExpenseInTotal = fund.OverHeadExpenseInStandard.Value - fund.PerformanceInStandard.Value;
                    fund.PerformancePay = fund.PerformanceInStandard.Value;
                    fund.OverheadExpenseExpertTotal = fund.PerformancePay;
                    fund.CampusIndirectCosts = fund.OverheadExpenseExpertTotal + fund.OverheadExpenseInTotal;
                }
                //if (isNewProject)
                //{
                //    //if (project.Type.Type.IsBudget)
                //    //{
                //    //    if (Request.GetMoney("OverheadExpenseInTotal") != null)
                //    //        fund.OverheadExpenseInTotal = Request.GetMoney("OverheadExpenseInTotal").Value;
                //    //    if (Request.GetMoney("PerformancePay") != null)
                //    //        fund.PerformancePay = Request.GetMoney("PerformancePay").Value;
                //    //}
                //    if (!User.IsSuper && (project.Fund.OverHeadExpenseInStandard * 0.95 > (project.Fund.OverheadExpenseInTotal + project.Fund.PerformancePay) || project.Fund.PerformanceInStandard * 1.05 < project.Fund.PerformancePay))
                //    {
                //        state.State = ProjectState.WaitingStartCensor;
                //        state.Save(Database);
                //    }

                ////}
                //if (project.isCustomManageFee() && project.CurrentState.State == ProjectState.WaitingStartInformation && User.IsExpert)
                //{
                //    fund.OverheadExpenseInTotal = -1;
                //    fund.PerformancePay = -1;
                //}
                #endregion



                fund.Save(Database);


                //carlsirce2013.2.27 保存项目外协信息
                if (Request.GetString("projectOutString") != null)
                {
                    if (isNewProject)
                    {
                        var projectOutList = Request.GetProjectOuts(Database);
                        foreach (var item in projectOutList)
                        {
                            item.Project = project;
                            item.Save(Database);
                        }
                    }
                    else
                    {
                        var projectOutList = Request.GetProjectOuts(Database);
                        var oldProjectOutList = Database.ProjectOuts.GetByProjectID(project.ID);
                        foreach (var old in oldProjectOutList)
                        {
                            old.Delete(Database);
                        }
                        oldProjectOutList = Database.ProjectOuts.GetByProjectID(project.ID);
                        foreach (var late in projectOutList)
                        {
                            late.Project = project;
                            late.Save(Database);
                        }
                    }
                }
                ts.Complete();
            }

            returnProject(project);
        }
        [WebMethod]
        public void RecoverySave()
        {
            var recovery = Request.GetRecovery(Database);
            recovery.Save(Database);

            var recoverynew = Request.getRecoveryByID(Database);
            Response.WriteXmlHead();
            List<Recovery> listRecovey = new List<Recovery>();
            listRecovey.Add(recoverynew);
            listRecovey.Show(Response, User, Database);

        }
        [WebMethod]
        public void Delete()
        {
            using (TransactionScope ts = new TransactionScope())
            {
                var project = Request.getProjectByID(Database);
                var description = string.Format("删除项目：{0} 。", project.Name);
                Log.Write(User.Name, (int)LogType.ProjectDelete, description, Request.UserHostAddress, "删除项目", Database);

                project.LogicDelete(User, Database);
                ts.Complete();
            }
        }
        //撤销项目
        [WebMethod]
        public void WithDraw()
        {
            using (TransactionScope ts = new TransactionScope())
            {
                var project = Request.getProjectByID(Database);
                var description = string.Format("撤销项目：{0} ，\n项目的ID为：{1}。", project.Name, project.ID);
                Log.Write(User.Name, (int)LogType.ProjectWithDraw, description, Request.UserHostAddress, "撤销项目", Database);
                project.WithDraw(User, Database);
                returnProject(project);
                ts.Complete();
            }
        }
        //终止项目
        [WebMethod]
        public void Terminate()
        {
            using (TransactionScope ts = new TransactionScope())
            {
                var project = Request.getProjectByID(Database);
                var description = string.Format("终止项目：{0} ，\n项目的ID为：{1}。", project.Name, project.ID);
                Log.Write(User.Name, (int)LogType.ProjectTerminate, description, Request.UserHostAddress, "终止项目", Database);
                project.Terminate(User, Database);
                returnProject(project);
                ts.Complete();
            }
        }
        //提交立项申请
        [WebMethod]
        public void SubmitStart()
        {
            using (TransactionScope ts = new TransactionScope())
            {
                var project = Request.getProjectByID(Database);
                var description = string.Format("提交立项申请  \n 对应项目名称为：{0} ，\n项目的ID为：{1}。", project.Name, project.ID);
                Log.Write(User.Name, (int)LogType.ProjectStartSubmit, description, Request.UserHostAddress, "提交立项申请", Database);
                project.SubmitStart(User, Database);
                returnProject(project);
                ts.Complete();
            }
        }
        //撤销立项申请
        [WebMethod]
        public void UndoSubmitStart()
        {
            using (TransactionScope ts = new TransactionScope())
            {
                var project = Request.getProjectByID(Database);
                var description = string.Format("撤销立项申请  \n 对应项目名称为：{0} ，\n项目的ID为：{1}。", project.Name, project.ID);
                Log.Write(User.Name, (int)LogType.ProjectStartCancel, description, Request.UserHostAddress, "撤销立项申请", Database);
                project.UndoSubmitStart(User, Database);
                returnProject(project);
                ts.Complete();
            }
        }
        //立项申请审核通过
        [WebMethod]
        public void CensorStartPass()
        {
            using (TransactionScope ts = new TransactionScope())
            {
                var project = Request.getProjectByID(Database);
                bool isCensorDocumentAndContract = Request.GetBoolean("IsCensorDocumentAndContract").Value;

                var description = string.Format("立项申请审核通过  \n 对应项目名称为：{0} ，\n项目的ID为：{1}。", project.Name, project.ID);
                Log.Write(User.Name, (int)LogType.ProjectStartPass, description, Request.UserHostAddress, "立项申请审核通过", Database);
                project.CensorStartPass(User, Database, isCensorDocumentAndContract);
                returnProject(project);
                ts.Complete();
            }
        }
        //立项申请审核驳回
        [WebMethod]
        public void CensorStartReject()
        {
            using (TransactionScope ts = new TransactionScope())
            {
                var project = Request.getProjectByID(Database);
                bool isCensorDocumentAndContract = Request.GetBoolean("IsCensorDocumentAndContract").Value;

                var description = string.Format("立项申请审核驳回  \n 对应项目名称为：{0} ，\n项目的ID为：{1}。", project.Name, project.ID);
                Log.Write(User.Name, (int)LogType.ProjectStartReject, description, Request.UserHostAddress, "立项申请审核驳回", Database);
                project.CensorStartReject(User, Request.GetString("Remark"), Database, isCensorDocumentAndContract);
                returnProject(project);
                ts.Complete();
            }
        }
        //提交结项申请
        [WebMethod]
        public void SubmitEnd()
        {
            using (TransactionScope ts = new TransactionScope())
            {
                var project = Request.getProjectByID(Database);
                var description = string.Format("提交结项申请  \n 对应项目名称为：{0} ，\n项目的ID为：{1}。", project.Name, project.ID);
                Log.Write(User.Name, (int)LogType.ProjectEndSubmit, description, Request.UserHostAddress, "提交结项申请", Database);
                project.SubmitEnd(User, Database);
                returnProject(project);
                ts.Complete();
            }
        }
        //撤销结项申请
        [WebMethod]
        public void UndoSubmitEnd()
        {
            using (TransactionScope ts = new TransactionScope())
            {
                var project = Request.getProjectByID(Database);
                var description = string.Format("撤销结项申请  \n 对应项目名称为：{0} ，\n项目的ID为：{1}。", project.Name, project.ID);
                Log.Write(User.Name, (int)LogType.ProjectEndCancel, description, Request.UserHostAddress, "撤销结项申请", Database);
                project.UndoSubmitEnd(User, Database);
                returnProject(project);
                ts.Complete();
            }
        }
        //审核结项申请通过
        [WebMethod]
        public void CensorEndPass()
        {
            using (TransactionScope ts = new TransactionScope())
            {
                var project = Request.getProjectByID(Database);
                var description = string.Format("审核结项申请通过  \n 对应项目名称为：{0} ，\n项目的ID为：{1}。", project.Name, project.ID);
                Log.Write(User.Name, (int)LogType.ProjectEndPass, description, Request.UserHostAddress, "审核结项申请通过", Database);
                project.CensorEndPass(User, Database);
                returnProject(project);
                ts.Complete();
            }
        }
        //审核结项申请驳回
        [WebMethod]
        public void CensorEndReject()
        {
            using (TransactionScope ts = new TransactionScope())
            {
                var project = Request.getProjectByID(Database);
                var description = string.Format("审核结项申请驳回  \n 对应项目名称为：{0} ，\n项目的ID为：{1}。", project.Name, project.ID);
                Log.Write(User.Name, (int)LogType.ProjectEndReject, description, Request.UserHostAddress, "审核结项申请驳回", Database);
                project.CensorEndReject(User, Request.GetString("Remark"), Database);
                returnProject(project);
                ts.Complete();
            }
        }
        private void returnProject(Project project)
        {
            Response.WriteXmlHead();
            List<Project> listProject = new List<Project>();
            listProject.Add(project);
            listProject.Show(Response, User, Database);
        }
        //设置项目委托负责人
        [WebMethod]
        public void SetDelegatePrincipal()
        {
            using (TransactionScope ts = new TransactionScope())
            {
                var projectsId = Request["ProjectsID"];
                string[] projectsIdArray = projectsId.Split(new char[] { ',' }, StringSplitOptions.RemoveEmptyEntries);
                foreach (string projectID in projectsIdArray)
                {
                    var project = Database.Projects.GetByID(Convert.ToInt32(projectID));
                    var principalDelegate = Request.GetEntity(Database.Experts, "PrincipalDelegateID");
                    var description = string.Format("设置项目委托负责人，对应项目为：{0}，\n对应的项目ID为：{1}。", project.Name, project.ID);
                    Log.Write(User.Name, (int)LogType.SetDelegatePrincipal, description, Request.UserHostAddress, "设置项目委托负责人", Database);

                    project.SetPrincipal(principalDelegate, User, Database);
                }
                ts.Complete();
            }
        }
        //取消项目委托负责人
        [WebMethod]
        public void ClearDelegatePrincipal()
        {
            using (TransactionScope ts = new TransactionScope())
            {
                var projectsId = Request["projectsID"];
                var projectsIdArray = projectsId.Split(new char[] { ',' }, StringSplitOptions.RemoveEmptyEntries);
                foreach (var projectID in projectsIdArray)
                {
                    var project = Database.Projects.GetByID(Convert.ToInt32(projectID));
                    var description = string.Format("取消项目委托负责人，对应项目为：{0}，\n对应的项目ID为：{1}。", project.Name, project.ID);
                    Log.Write(User.Name, (int)LogType.ClearDelegatePrincipal, description, Request.UserHostAddress, "取消项目委托负责人", Database);

                    project.ClearPrincipal(User, Database);
                }
                ts.Complete();
            }
        }
        [WebMethod]
        public void CountByName()
        {
            Response.Write(Database.Projects.CountByName(Request.GetString("Name")));
        }
        [WebMethod]
        public void GetProjectColleges()
        {
            Response.WriteXmlHead();
            Database
                .Projects
                .GetProjectColleges()
                .Show(Response);
        }
        [WebMethod]
        public void GetWaitingStartCensorVerticalProjectCount()
        {
            Response.WriteXmlHead();
            Database
                .Projects
                .GetWaitingCensorProjectCount(User, false, ProjectState.WaitingStartCensor)
                .Show(Response);
        }
        [WebMethod]
        public void GetWaitingStartCensorHorizontalProjectCount()
        {
            Response.WriteXmlHead();
            Database
                .Projects
                .GetWaitingCensorProjectCount(User, true, ProjectState.WaitingStartCensor)
                .Show(Response);
        }
        [WebMethod]
        public void GetWaitingEndCensorVerticalProjectCount()
        {
            Response.WriteXmlHead();
            Database
                .Projects
                .GetWaitingCensorProjectCount(User, false, ProjectState.WaitingEndCensor)
                .Show(Response);
        }
        [WebMethod]
        public void GetWaitingEndCensorHorizontalProjectCount()
        {
            Response.WriteXmlHead();
            Database
                .Projects
                .GetWaitingCensorProjectCount(User, true, ProjectState.WaitingEndCensor)
                .Show(Response);
        }
        [WebMethod]
        public void ClearProjectAccountBookNumber()
        {
            var project = Request.GetEntity(Database.Projects, "projectId");
            var clearReason = Request.GetString("clearReason");

            if (!User.CanClearProjectAccountBookNumber())
                throw new HasNoPermissionException();

            using (TransactionScope ts = new TransactionScope())
            {
                project.Fund.ClearProjectAccountBookNumber(User, Database);
                string description = string.Format("成功清空项目：{0}的账本号，\n清空前的账本号为：{1}，\n清空理由为：{2}。", project.Name, project.Fund.AccountBookNumber, clearReason);
                Log.Write(User.Name, (int)LogType.ClearProjectAccountBookNumber, description, Request.UserHostAddress, "清空项目账本号", Database);

                ts.Complete();
            }
        }
        [WebMethod]
        public void Import()
        {
            var postedFiles = Request.GetHttpFiles();
            string logName = Context.ImportProject(postedFiles[0], Request, User);

            Response.Write("<html><body>{ success: true, LogDocumentName: '" + logName + "' }</body></html>");
        }
        /// <summary>
        /// 项目能否结项（合同、文档、经费都提交完毕）
        /// </summary>
        [WebMethod]
        public void CanEnd()
        {
            var project = Request.getProjectByID(Database);
            project.CanEnd(Database).Show(Response);

        }
        [WebMethod]
        public void ImportRecovery()
        {
            var postedFiles = Request.GetHttpFiles();
            string logName = Context.ImportRecovery(postedFiles[0], Request, User);
            Response.Write("<html><body>{ success: true, LogDocumentName: '" + logName + "' }</body></html>");
        }
        //carlsirce2013.2.28
        [WebMethod]
        public void GetProjectOutByProjectID()
        {
            var projectID = Request.GetInt("ProjectID") == null ? 0 : Request.GetInt("ProjectID").Value;
            Response.WriteXmlHead();
            Database
                .ProjectOuts
                .GetByProjectID(projectID)
                .Show(Response);
        }
        [WebMethod]
        public void GetFundOutRatio()
        {
            Response.Write(Database.SystemSettings.FirstOrDefault().FundOutRatio);
        }

        /// <summary>
        ///2013.12.17 批量更新预算制学校，院系，课题组间接费用，并生成追缴单
        /// </summary>
        //[WebMethod]
        //public void UpdateProjectThreeFields()
        //{
        //    int projectNum = 0;
        //    int performanceNum = 0;
        //    StringBuilder result = new StringBuilder();
        //    foreach (var project in Database.Projects.Where(c => c.StartDate >= Convert.ToDateTime("2011-1-1") && c.Type.Type.IsBudget == true && c.CurrentState.State == ProjectState.ProjectProcessing && c.Fund.FundAlreadyIn != 0))
        //    {k
        //        using (TransactionScope ts = new TransactionScope())
        //        {
        //            try
        //            {
        //                if (project.Type.Type.Name == "公益性行业科研专项" && project.StartDate < Convert.ToDateTime("2012-1-1"))
        //                    continue;

        //                //对于预算值没有预算的项目：
        //                if (project.Level == ProjectLevel.Join && project.Fund.FundContract == project.Fund.FundTotal)
        //                {
        //                    project.Fund.OverheadExpenseInTotal = Convert.ToInt64(project.Fund.FundPlanIn * ProjectInfo_Fund.OVERHEAD_EXPENSE_IN_ISBUDJET_RATE);
        //                    project.Fund.OverheadExpenseMiddleTotal = 0;
        //                    project.Fund.OverheadExpenseExpertTotal = 0;
        //                }
        //                else
        //                {
        //                    //对于主持参加的课题经费高于2000万且设备购置费比例超过20%且到校经费大于课题经费50%，学校从课题组
        //                    if ((project.Fund.FundContract > 2000000000 && project.Fund.EquipmentCost > project.Fund.FundContract * 0.2 && project.Level == ProjectLevel.Perside) || (project.Fund.FundContract > 2000000000 && project.Fund.EquipmentCost > project.Fund.FundContract * 0.2 && project.Fund.FundTotal > project.Fund.FundContract * 0.5 && project.Level == ProjectLevel.Join))
        //                    {
        //                        project.Fund.OverheadExpenseInTotal = Convert.ToInt64(project.Fund.FundPlanIn * (ProjectInfo_Fund.OVERHEAD_EXPENSE_IN_ISBUDJET_RATE - 0.01));
        //                        if (project.Fund.CampusIndirectCosts <= project.Fund.OverheadExpenseInTotal)
        //                        {
        //                            project.Fund.OverheadExpenseMiddleTotal = 0;
        //                            project.Fund.OverheadExpenseExpertTotal = 0;
        //                        }
        //                        if (project.Fund.CampusIndirectCosts > project.Fund.OverheadExpenseInTotal && project.Fund.CampusIndirectCosts <= project.Fund.OverheadExpenseInTotal + Convert.ToInt64(project.Fund.FundPlanIn * (ProjectInfo_Fund.OVERHEAD_EXPENSE_MIDDLE_ISBUDJET_RATE - 0.005)))
        //                        {
        //                            project.Fund.OverheadExpenseMiddleTotal = project.Fund.CampusIndirectCosts - project.Fund.OverheadExpenseInTotal;
        //                            project.Fund.OverheadExpenseExpertTotal = 0;
        //                        }
        //                        if (project.Fund.CampusIndirectCosts > project.Fund.OverheadExpenseInTotal + Convert.ToInt64(project.Fund.FundPlanIn * (ProjectInfo_Fund.OVERHEAD_EXPENSE_MIDDLE_ISBUDJET_RATE - 0.005)))
        //                        {
        //                            project.Fund.OverheadExpenseMiddleTotal = Convert.ToInt64(project.Fund.FundPlanIn * (ProjectInfo_Fund.OVERHEAD_EXPENSE_MIDDLE_ISBUDJET_RATE - 0.005));
        //                            project.Fund.OverheadExpenseExpertTotal = project.Fund.CampusIndirectCosts - project.Fund.OverheadExpenseInTotal - project.Fund.OverheadExpenseMiddleTotal;
        //                        }
        //                    }
        //                    else
        //                    {
        //                        project.Fund.OverheadExpenseInTotal = Convert.ToInt64(project.Fund.FundPlanIn * ProjectInfo_Fund.OVERHEAD_EXPENSE_IN_ISBUDJET_RATE);
        //                        if (project.Fund.CampusIndirectCosts <= project.Fund.OverheadExpenseInTotal)
        //                        {
        //                            project.Fund.OverheadExpenseMiddleTotal = 0;
        //                            project.Fund.OverheadExpenseExpertTotal = 0;
        //                        }
        //                        if (project.Fund.CampusIndirectCosts > project.Fund.OverheadExpenseInTotal && project.Fund.CampusIndirectCosts <= project.Fund.OverheadExpenseInTotal + Convert.ToInt64(project.Fund.FundPlanIn * ProjectInfo_Fund.OVERHEAD_EXPENSE_MIDDLE_ISBUDJET_RATE))
        //                        {
        //                            project.Fund.OverheadExpenseMiddleTotal = project.Fund.CampusIndirectCosts - project.Fund.OverheadExpenseInTotal;
        //                            project.Fund.OverheadExpenseExpertTotal = 0;
        //                        }
        //                        if (project.Fund.CampusIndirectCosts > project.Fund.OverheadExpenseInTotal + Convert.ToInt64(project.Fund.FundPlanIn * ProjectInfo_Fund.OVERHEAD_EXPENSE_MIDDLE_ISBUDJET_RATE))
        //                        {
        //                            project.Fund.OverheadExpenseMiddleTotal = Convert.ToInt64(project.Fund.FundPlanIn * ProjectInfo_Fund.OVERHEAD_EXPENSE_MIDDLE_ISBUDJET_RATE);
        //                            project.Fund.OverheadExpenseExpertTotal = project.Fund.CampusIndirectCosts - project.Fund.OverheadExpenseInTotal - project.Fund.OverheadExpenseMiddleTotal;
        //                        }

        //                        project.Fund.Save(Database);
        //                        result.Append("修改项目" + project.Name + "信息成功，校内间接费为" + project.Fund.CampusIndirectCosts + "。学校间接费为" + project.Fund.OverheadExpenseInTotal + "。二级单位间接费为" + project.Fund.OverheadExpenseMiddleTotal + "课题组间接费为" + project.Fund.OverheadExpenseExpertTotal);
        //                    }
        //                }
        //                projectNum++;

        //                //生成追缴单
        //                double RATE = (double)project.Fund.FundAlreadyIn / project.Fund.FundPlanIn;
        //                Recovery recovery = new Recovery();
        //                recovery.CurrentAllocationIn = project.Fund.FundAlreadyIn;
        //                recovery.PlanedOverheadExpensesIn = Convert.ToInt64(project.Fund.OverheadExpenseInTotal * RATE);
        //                recovery.ReceivedOverheadExpensesIn = project.GetOverheadExpensesInAlready(Database);
        //                recovery.PlanedOverheadExpensesMiddle = Convert.ToInt64(project.Fund.OverheadExpenseMiddleTotal * RATE);
        //                recovery.ReceivedOverheadExpensesMiddle = 0;
        //                recovery.PlanedPerformancePay = Convert.ToInt64(project.Fund.OverheadExpenseExpertTotal * RATE);
        //                recovery.ReceivedPerformancePay = project.GetPerformancePayAlready(Database);
        //                recovery.Remark = "第三次追缴单生成，作废已有追缴数据与绩效暂存，本次追缴为对从手改值之前状态到51文件状态的追缴";
        //                recovery.OperateTime = System.DateTime.Now;
        //                recovery.Operator = "高阳";
        //                recovery.Project = project;
        //                recovery.VoucherNumber = getVoucherNumber(recovery, Database);
        //                recovery.IsCanceled = false;
        //                recovery.Save(Database);
        //                //生成来源于追缴的绩效
        //                Srims.Server.Business.Performances.Performance performance = new Srims.Server.Business.Performances.Performance();
        //                performance.Project = project;
        //                performance.Recovery = recovery;
        //                performance.ArrivedPerformance = recovery.PlanedPerformancePay.Value - recovery.ReceivedPerformancePay.Value;
        //                performance.DescendPerformance = 0;
        //                performance.FoundationTime = System.DateTime.Now;
        //                performance.IsAllocated = false;
        //                performance.IsCancel = false;
        //                performance.Remark = "来源于追缴，同时作废已有的来源于追缴的暂存";
        //                performance.Save(Database);
        //                result.Append("产生一条暂存<br/>");
        //                performanceNum++;

        //                var fundallocations = Database.FundAllocations.Where(c => c.FundDescend.ProjectInfo_Fund.Project == project && c.CurrentState.State == FundAllocationState.Passed).ToList();
        //                foreach (var item in fundallocations)
        //                {
        //                    var oldperformance = Database.Performances.SingleOrDefault(c => c.FundAllocation == item);
        //                    if (oldperformance == null)
        //                    {
        //                        Srims.Server.Business.Performances.Performance newperformance = new Srims.Server.Business.Performances.Performance();
        //                        newperformance.Project = project;
        //                        newperformance.FundAllocation = item;
        //                        newperformance.ArrivedPerformance = 0;
        //                        newperformance.DescendPerformance = 0;
        //                        newperformance.FoundationTime = System.DateTime.Now;
        //                        newperformance.IsAllocated = false;
        //                        newperformance.IsCancel = false;
        //                        newperformance.Remark = "批量生成，用于间接费用统计";
        //                        newperformance.Save(Database);
        //                    }
        //                }
        //            }
        //            catch (Exception)
        //            {

        //                throw;
        //            }
        //            ts.Complete();
        //        }

        //    }
        //    result.AppendFormat("共生成{0}张调整单，生成{1}个暂存", projectNum, performanceNum);
        //    Response.Write(result);

        //}
        ///// <summary>
        ///// 2014绩效下拨后发邮件
        ///// </summary>
        //[WebMethod]
        //public void SendMail()
        //{

        //    string body = string.Format(@"尊敬的老师，您好！<div style=text-indent:2em;margin-top:10px></div><div style=text-indent:2em;margin-top:5px>跟据《中国海洋大学国家科技重大专项、公益性行业科研专项、国家科技计划经费间接费用管理暂时规定》（海大字[2013]23号）和《中国海洋大学自然科学类科技经费管理实施细则（修订）》（海大字〔2014〕1号），学校目前正在开展2013年已分配科研经费绩效发放工作。 </div><div style=text-indent:2em;margin-top:5px>目前，您可以到科研管理系统查询2013年度课题组间接费用金额。具体通知要求见科技处主页<a href=http://211.64.142.67/kjc/detail.asp?cat=A00120003&id=3348> “关于做好2013年度科研绩效奖励发放工作的通知。”</a> </div><div style=text-indent:2em;margin-top:5px>感谢您对我们工作的支持。<a href=http://121.251.234.119> 点击此处登录中国海洋大学科研管理系统</a></div><div style=margin-top:30px;margin-left:25px>中国海洋大学 科研信息管理系统(此邮件为系统自动发送，请勿回复）</div>");

        //    var experts = Database.PerformanceAllocations.Where(c => c.Performance.Project.Type.Rank.IsHorizontal == true).Select(c => c.Performance.Project.Principal).Distinct();
        //    foreach (var expert in experts)
        //    {
        //        Thread.Sleep(1000 * 60);
        //        User.SendMail(expert.Email, "科研绩效奖励发放工作通知", body, Database);
        //        Response.Write("给" + expert.Name + "老师发送一封邮件<br/>");
        //    }
        //    User.SendMail("carlsirce@126.com", "科研绩效奖励发放工作通知", body, Database);
        //    // User.SendMail("hexin@ouc.edu.cn", "通知", body, Database);
        //}

        ///<summary>
        ///  2014.1.8 批量更非新预算制纵向管理费，由10%调至8%，同时更新绩效，由4%至0，并生成追缴单
        ///    </summary>
        //[WebMethod]
        //public void Update14to8()
        //{
        //    int projectNum = 0;
        //    StringBuilder result = new StringBuilder();
        //    foreach (var project in Database.Projects.Where(c => (c.Fund.FundTotal - c.Fund.FundPlanOut) != 0 && c.Type.Type.ManagementFeesType == "其他纵向项目" && c.Type.Rank.IsHorizontal == false && c.Type.Type.IsBudget == false && c.CurrentState.State == ProjectState.ProjectProcessing))
        //    {
        //        var funddescends = Database.FundDescends.Where(c => c.ProjectInfo_Fund.Project == project && c.DescendDateTime >= Convert.ToDateTime("2013-1-1") && c.CurrentState.State == FundDescendState.AllocationCompleted).ToList();
        //        if (funddescends.Count() == 0)
        //            continue;
        //        using (TransactionScope ts = new TransactionScope())
        //        {
        //            try
        //            {
        //                project.Fund.OverheadExpenseInTotal = Convert.ToInt64(project.Fund.FundPlanIn * 0.08);
        //                project.Fund.OverHeadExpenseInStandard = project.Fund.OverheadExpenseInTotal;
        //                project.Fund.PerformancePay = 0;
        //                project.Fund.PerformanceInStandard = 0;
        //                project.Fund.OverheadExpenseExpertTotal = 0;
        //                project.Fund.CampusIndirectCosts = project.Fund.OverheadExpenseInTotal;

        //                project.Fund.Save(Database);

        //                long fundalreadyin = 0;
        //                long receivedOverheadExpensesIn = 0;
        //                foreach (var item in funddescends)
        //                {
        //                    var fundallocation = Database.FundAllocations.Single(c => c.FundDescend == item && c.CurrentState.State == FundAllocationState.Passed);
        //                    fundalreadyin += item.Amount - fundallocation.AllocationOut;

        //                    foreach (var voucher in fundallocation.GetVouchers(Database.Vouchers))
        //                        receivedOverheadExpensesIn += voucher.OverheadExpensesIn;
        //                }
        //                //生成追缴单
        //                double RATE = (double)fundalreadyin / project.Fund.FundPlanIn;
        //                if (RATE != 0)
        //                {
        //                    Recovery recovery = new Recovery();
        //                    recovery.CurrentAllocationIn = project.Fund.FundAlreadyIn;
        //                    recovery.PlanedOverheadExpensesIn = Convert.ToInt64(project.Fund.OverheadExpenseInTotal * RATE);
        //                    recovery.ReceivedOverheadExpensesIn = receivedOverheadExpensesIn;
        //                    recovery.PlanedOverheadExpensesMiddle = 0;
        //                    recovery.ReceivedOverheadExpensesMiddle = 0;
        //                    recovery.PlanedPerformancePay = 0;
        //                    recovery.ReceivedPerformancePay = project.GetDescendPormance(Database);
        //                    recovery.Remark = "由14%调至8%";
        //                    recovery.OperateTime = System.DateTime.Now;
        //                    recovery.Operator = "高阳";
        //                    recovery.Project = project;
        //                    recovery.VoucherNumber = getVoucherNumber(recovery, Database);
        //                    recovery.IsCanceled = false;
        //                    if (recovery.PlanedOverheadExpensesIn != recovery.ReceivedOverheadExpensesIn || recovery.PlanedPerformancePay != recovery.ReceivedPerformancePay)
        //                    {
        //                        recovery.Save(Database);

        //                        Srims.Server.Business.Performances.Performance performance = new Srims.Server.Business.Performances.Performance();
        //                        performance.Project = project;
        //                        performance.Recovery = recovery;
        //                        performance.ArrivedPerformance = recovery.PlanedPerformancePay.Value - recovery.ReceivedPerformancePay.Value;
        //                        performance.DescendPerformance = 0;
        //                        performance.FoundationTime = System.DateTime.Now;
        //                        performance.IsAllocated = false;
        //                        performance.IsCancel = false;
        //                        performance.Remark = "对非预算制纵向项目的追缴产生";
        //                        performance.Save(Database);
        //                        result.Append("项目：" + project.Name + "产生一次调整\n");
        //                        projectNum++;
        //                        project.IsAdjust = true;
        //                        project.Save(Database);
        //                    }
        //                    else
        //                        result.Append("项目：" + project.Name + "没有产生调整\n");
        //                }
        //            }
        //            catch (Exception)
        //            {

        //                throw;
        //            }
        //            ts.Complete();
        //        }

        //    }
        //    result.AppendFormat("共生成{0}张调整单", projectNum);
        //    Response.Write(result);

        //}
        /// <summary>
        ///2014.4.4 批量更新无大合同的预算制学校，院系，课题组间接费用，并生成追缴单
        /// </summary>
        //[WebMethod]
        //public void UpdateProjectThreeFieldsForRest()
        //{
        //    int projectNum = 0;
        //    int performanceNum = 0;
        //    StringBuilder result = new StringBuilder();
        //    foreach (var project in Database.Projects.Where(c => c.StartDate >= Convert.ToDateTime("2011-1-1") && c.Type.Type.IsBudget == true && c.CurrentState.State == ProjectState.ProjectProcessing && c.Fund.FundAlreadyIn != 0))
        //    {
        //        using (TransactionScope ts = new TransactionScope())
        //        {
        //            try
        //            {
        //                if (project.Type.Type.Name == "公益性行业科研专项" && project.StartDate < Convert.ToDateTime("2012-1-1"))
        //                    continue;

        //                //对于预算值没有预算的项目：
        //                if (project.Level == ProjectLevel.Join && project.Fund.FundContract == project.Fund.FundTotal)
        //                {


        //                    //对于主持参加的课题经费高于2000万且设备购置费比例超过20%且到校经费大于课题经费50%，学校从课题组
        //                    if ((project.Fund.FundContract > 2000000000 && project.Fund.EquipmentCost > project.Fund.FundContract * 0.2 && project.Level == ProjectLevel.Perside) || (project.Fund.FundContract > 2000000000 && project.Fund.EquipmentCost > project.Fund.FundContract * 0.2 && project.Fund.FundTotal > project.Fund.FundContract * 0.5 && project.Level == ProjectLevel.Join))
        //                    {
        //                        project.Fund.OverheadExpenseInTotal = Convert.ToInt64(project.Fund.FundPlanIn * (ProjectInfo_Fund.OVERHEAD_EXPENSE_IN_ISBUDJET_RATE - 0.01));
        //                        if (project.Fund.CampusIndirectCosts <= project.Fund.OverheadExpenseInTotal)
        //                        {
        //                            project.Fund.OverheadExpenseMiddleTotal = 0;
        //                            project.Fund.OverheadExpenseExpertTotal = 0;
        //                        }
        //                        if (project.Fund.CampusIndirectCosts > project.Fund.OverheadExpenseInTotal && project.Fund.CampusIndirectCosts <= project.Fund.OverheadExpenseInTotal + Convert.ToInt64(project.Fund.FundPlanIn * (ProjectInfo_Fund.OVERHEAD_EXPENSE_MIDDLE_ISBUDJET_RATE - 0.005)))
        //                        {
        //                            project.Fund.OverheadExpenseMiddleTotal = project.Fund.CampusIndirectCosts - project.Fund.OverheadExpenseInTotal;
        //                            project.Fund.OverheadExpenseExpertTotal = 0;
        //                        }
        //                        if (project.Fund.CampusIndirectCosts > project.Fund.OverheadExpenseInTotal + Convert.ToInt64(project.Fund.FundPlanIn * (ProjectInfo_Fund.OVERHEAD_EXPENSE_MIDDLE_ISBUDJET_RATE - 0.005)))
        //                        {
        //                            project.Fund.OverheadExpenseMiddleTotal = Convert.ToInt64(project.Fund.FundPlanIn * (ProjectInfo_Fund.OVERHEAD_EXPENSE_MIDDLE_ISBUDJET_RATE - 0.005));
        //                            project.Fund.OverheadExpenseExpertTotal = project.Fund.CampusIndirectCosts - project.Fund.OverheadExpenseInTotal - project.Fund.OverheadExpenseMiddleTotal;
        //                        }
        //                    }
        //                    else
        //                    {
        //                        project.Fund.OverheadExpenseInTotal = Convert.ToInt64(project.Fund.FundPlanIn * ProjectInfo_Fund.OVERHEAD_EXPENSE_IN_ISBUDJET_RATE);
        //                        if (project.Fund.CampusIndirectCosts <= project.Fund.OverheadExpenseInTotal)
        //                        {
        //                            project.Fund.OverheadExpenseMiddleTotal = 0;
        //                            project.Fund.OverheadExpenseExpertTotal = 0;
        //                        }
        //                        if (project.Fund.CampusIndirectCosts > project.Fund.OverheadExpenseInTotal && project.Fund.CampusIndirectCosts <= project.Fund.OverheadExpenseInTotal + Convert.ToInt64(project.Fund.FundPlanIn * ProjectInfo_Fund.OVERHEAD_EXPENSE_MIDDLE_ISBUDJET_RATE))
        //                        {
        //                            project.Fund.OverheadExpenseMiddleTotal = project.Fund.CampusIndirectCosts - project.Fund.OverheadExpenseInTotal;
        //                            project.Fund.OverheadExpenseExpertTotal = 0;
        //                        }
        //                        if (project.Fund.CampusIndirectCosts > project.Fund.OverheadExpenseInTotal + Convert.ToInt64(project.Fund.FundPlanIn * ProjectInfo_Fund.OVERHEAD_EXPENSE_MIDDLE_ISBUDJET_RATE))
        //                        {
        //                            project.Fund.OverheadExpenseMiddleTotal = Convert.ToInt64(project.Fund.FundPlanIn * ProjectInfo_Fund.OVERHEAD_EXPENSE_MIDDLE_ISBUDJET_RATE);
        //                            project.Fund.OverheadExpenseExpertTotal = project.Fund.CampusIndirectCosts - project.Fund.OverheadExpenseInTotal - project.Fund.OverheadExpenseMiddleTotal;
        //                        }

        //                        project.Fund.Save(Database);

        //                    }
        //                    result.Append("修改项目" + project.Name + "信息成功，校内间接费为" + project.Fund.CampusIndirectCosts + "。学校间接费为" + project.Fund.OverheadExpenseInTotal + "。二级单位间接费为" + project.Fund.OverheadExpenseMiddleTotal + "课题组间接费为" + project.Fund.OverheadExpenseExpertTotal);


        //                    //生成追缴单
        //                    double RATE = (double)project.Fund.FundAlreadyIn / project.Fund.FundPlanIn;
        //                    Recovery recovery = new Recovery();
        //                    recovery.CurrentAllocationIn = project.Fund.FundAlreadyIn;
        //                    recovery.PlanedOverheadExpensesIn = Convert.ToInt64(project.Fund.OverheadExpenseInTotal * RATE);
        //                    recovery.ReceivedOverheadExpensesIn = project.GetOverheadExpensesInAlready(Database);
        //                    recovery.PlanedOverheadExpensesMiddle = Convert.ToInt64(project.Fund.OverheadExpenseMiddleTotal * RATE);
        //                    recovery.ReceivedOverheadExpensesMiddle = 0;
        //                    recovery.PlanedPerformancePay = Convert.ToInt64(project.Fund.OverheadExpenseExpertTotal * RATE);
        //                    recovery.ReceivedPerformancePay = project.GetPerformancePayAlready(Database);
        //                    recovery.Remark = "第四次追缴单生成，针对参加且合同额等于到校经费的项目";
        //                    recovery.OperateTime = System.DateTime.Now;
        //                    recovery.Operator = "高阳";
        //                    recovery.Project = project;
        //                    recovery.VoucherNumber = getVoucherNumber(recovery, Database);
        //                    recovery.IsCanceled = false;
        //                    if (recovery.PlanedOverheadExpensesIn - recovery.ReceivedOverheadExpensesIn != 0 || recovery.PlanedOverheadExpensesMiddle - recovery.ReceivedOverheadExpensesMiddle != 0 || recovery.PlanedPerformancePay - recovery.ReceivedPerformancePay != 0)
        //                    {
        //                        recovery.Save(Database);
        //                        projectNum++;
        //                    }
        //                    //生成来源于追缴的绩效
        //                    Srims.Server.Business.Performances.Performance performance = new Srims.Server.Business.Performances.Performance();
        //                    performance.Project = project;
        //                    performance.Recovery = recovery;
        //                    performance.ArrivedPerformance = recovery.PlanedPerformancePay.Value - recovery.ReceivedPerformancePay.Value;
        //                    performance.DescendPerformance = 0;
        //                    performance.FoundationTime = System.DateTime.Now;
        //                    performance.IsAllocated = false;
        //                    performance.IsCancel = false;
        //                    performance.Remark = "来源于追缴，同时作废已有的来源于追缴的暂存";
        //                    if (performance.ArrivedPerformance != 0)
        //                    {
        //                        performance.Save(Database);
        //                        result.Append("产生一条绩效暂存<br/>");
        //                        performanceNum++;
        //                    }

        //                    var fundallocations = Database.FundAllocations.Where(c => c.FundDescend.ProjectInfo_Fund.Project == project && c.CurrentState.State == FundAllocationState.Passed).ToList();
        //                    foreach (var item in fundallocations)
        //                    {
        //                        var oldperformance = Database.Performances.SingleOrDefault(c => c.FundAllocation == item);
        //                        if (oldperformance == null)
        //                        {
        //                            Srims.Server.Business.Performances.Performance newperformance = new Srims.Server.Business.Performances.Performance();
        //                            newperformance.Project = project;
        //                            newperformance.FundAllocation = item;
        //                            newperformance.ArrivedPerformance = 0;
        //                            newperformance.DescendPerformance = 0;
        //                            newperformance.FoundationTime = System.DateTime.Now;
        //                            newperformance.IsAllocated = false;
        //                            newperformance.IsCancel = false;
        //                            newperformance.Remark = "批量生成，用于间接费用统计";
        //                            newperformance.Save(Database);
        //                        }
        //                    }
        //                }
        //            }
        //            catch (Exception)
        //            {

        //                throw;
        //            }
        //            ts.Complete();
        //        }

        //    }
        //    result.AppendFormat("共生成{0}张调整单，生成{1}个暂存", projectNum, performanceNum);
        //    Response.Write(result);

        //}

    }

}
