using System;
using System.Collections.Generic;
using System.Data.Linq;
using System.Linq;
using System.Text;
using System.Threading;
using System.Transactions;

using MIS.Common;
using MIS.Common.Query;
using MIS.Common.Validate;

using Srims.Server.Business.Bases;
using Srims.Server.Business.Common;
using Srims.Server.Business.Documents;
using Srims.Server.Business.Experts;
using Srims.Server.Business.Fund;
using Srims.Server.Business.Projects;
using Srims.Server.Business.Type;
using Srims.Server.Business.Users;
using Srims.Server.Business.Performances;

namespace Srims.Server.Business.Projects
{
    /// <summary>
    /// 项目
    /// </summary>
    public partial class Project : Entity<Project>
    {
        /// <summary>
        /// 项目的名称
        /// </summary>
        public override string ToString()
        {
            return this.Name;
        }
        /// <summary>
        /// 复制一个同于自己的实体
        /// </summary>
        /// <returns></returns>
        public object Clone()
        {
            return this.MemberwiseClone();
        }
        /// <summary>
        /// 取得实体的各个字段项
        /// </summary>
        /// <returns></returns>
        public static LogDescriptionItem[] GetDescriptionItems()
        {
            List<LogDescriptionItem> list = new List<LogDescriptionItem>();
            list.Add(new LogDescriptionItem { Name = "TypeID", Title = "对应项目分类信息的ID" });
            list.Add(new LogDescriptionItem { Name = "FundID", Title = "项目经费信息的ID" });
            list.Add(new LogDescriptionItem { Name = "PrincipalID", Title = "项目负责人的ID" });
            list.Add(new LogDescriptionItem { Name = "PrincipalDelegateID", Title = "对应委托负责人的ID" });
            list.Add(new LogDescriptionItem { Name = "PrincipalQualityID", Title = "项目质量负责人的ID" });
            list.Add(new LogDescriptionItem { Name = "FirstLevelSubjectID", Title = "对应的一级学科的ID" });
            list.Add(new LogDescriptionItem { Name = "SecondLevelSubjectID", Title = "对应二级学科的ID" });
            list.Add(new LogDescriptionItem { Name = "BaseID", Title = "基地的ID" });
            list.Add(new LogDescriptionItem { Name = "CurrentStateID", Title = "当前状态的ID" });

            list.Add(new LogDescriptionItem { Name = "Number", Title = "项目编号" });
            list.Add(new LogDescriptionItem { Name = "SerialNumber", Title = "项目流水号" });
            list.Add(new LogDescriptionItem { Name = "Name", Title = "项目名称" });
            list.Add(new LogDescriptionItem { Name = "Level", Title = "项目分级" });
            list.Add(new LogDescriptionItem { Name = "ResearchType", Title = "研究属性" });
            list.Add(new LogDescriptionItem { Name = "IsSecret", Title = "是否保密" });
            list.Add(new LogDescriptionItem { Name = "StartDate", Title = "起始年月" });
            list.Add(new LogDescriptionItem { Name = "EndDate", Title = "终止年月" });
            list.Add(new LogDescriptionItem { Name = "CooperationType", Title = "合作方式" });
            list.Add(new LogDescriptionItem { Name = "TaskComingFrom", Title = "任务来源" });
            list.Add(new LogDescriptionItem { Name = "CorporationPlace", Title = "公司所在地" });
            list.Add(new LogDescriptionItem { Name = "Creator", Title = "建立人" });
            list.Add(new LogDescriptionItem { Name = "CreateDate", Title = "建立时间" });
            list.Add(new LogDescriptionItem { Name = "Remark", Title = "备注" });

            return list.ToArray();
        }

        /// <summary>
        /// 项目状态
        /// </summary>
        public static readonly ProjectState[] AvailableProjectStates = new ProjectState[] { ProjectState.ProjectProcessing, ProjectState.WaitingEndCensor, ProjectState.ProjectEnd, ProjectState.Terminate, ProjectState.WithDraw, ProjectState.Defer, ProjectState.DeferEnd };


        /// <summary>
        /// 取得或设置项目名称
        /// </summary>
        public string Name
        {
            get { return _Name; }
            set
            {
                _Name = value;
                _NameSpell = Spell.GetSpell(value);
            }
        }

        /// <summary>
        /// 取得学科
        /// </summary>
        public ISubject Subject
        {
            get { return SecondLevelSubject == null ? (ISubject)FirstLevelSubject : (ISubject)SecondLevelSubject; }
        }
        /// <summary>
        /// 取得学科名称
        /// </summary>
        public string SubjectName
        {
            get
            {
                var name = string.Empty;

                if (FirstLevelSubjectID.HasValue)
                    name += FirstLevelSubject.Name;

                if (SecondLevelSubjectID.HasValue)
                    name += " - " + SecondLevelSubject.Name;

                return name;
            }
        }
        /// <summary>
        /// 指定项目的委托负责人
        /// </summary>
        /// <param name="principal"></param>
        /// <param name="user"></param>
        /// <param name="database"></param>
        public void SetPrincipal(Expert principal, User user, IDatabase database)
        {
            if (!user.HasPermissionManageDelegatePrincipal(this, database))
                throw new HasNoPermissionException();

            PrincipalDelegate = principal;
            Save(database);
        }
        /// <summary>
        /// 撤销项目的委托负责人
        /// </summary>
        /// <param name="user"></param>
        /// <param name="database"></param>
        public void ClearPrincipal(User user, IDatabase database)
        {
            if (!user.HasPermissionManageDelegatePrincipal(this, database))
                throw new HasNoPermissionException();

            PrincipalDelegate = null;
            Save(database);
        }
        /// <summary>
        /// 取得学科代码
        /// </summary>
        public string SubjectCode
        {
            get { return Subject == null ? null : Subject.Code; }
        }
        /// <summary>
        /// 判断该用户是否为项目负责人
        /// </summary>
        /// <param name="user">用户</param>
        /// <returns></returns>
        public bool IsPrincipal(User user)
        {
            if (user == this.Principal.User)
                return true;

            if (this.PrincipalDelegateID.HasValue && this.PrincipalDelegate.User == user)
                return true;

            return false;
        }
        /// <summary>
        /// 取得项目的成员信息
        /// </summary>
        /// <param name="query">项目成员信息数据访问</param>
        /// <returns>项目成员列表</returns>
        public IList<ProjectMember> GetProjectMembers(IQueryable<ProjectMember> query)
        {
            if (query == null)
                throw new ArgumentNullException("query");

            return query
                .Where(pm => pm.ProjectID == this.ID)
                .OrderBy(pm => pm.Order)
                .ToList();
        }
        /// <summary>
        /// 取得项目类型信息
        /// </summary>
        /// <param name="projectInfo_TypeQuery">项目类型信息数据访问</param>
        /// <returns>项目的类型信息</returns>
        public ProjectInfo_Type GetProjectInfo_Type(IQueryable<ProjectInfo_Type> projectInfo_TypeQuery)
        {
            if (projectInfo_TypeQuery == null)
                throw new ArgumentNullException("projectInfo_TypeQuery");

            ProjectInfo_Type projectInfo_Type;
            if (this.IsNew)
            {
                projectInfo_Type = new ProjectInfo_Type();
                projectInfo_Type.Project = this;
            }
            else
            {
                projectInfo_Type = projectInfo_TypeQuery.SingleOrDefault(pit => pit.ProjectID == _ID);
                if (projectInfo_Type == null)
                    throw new InvalidDataException("项目对应的分类信息不存在！");
            }
            return projectInfo_Type;
        }
        /// <summary>
        /// 取得项目的经费信息
        /// </summary>
        /// <param name="projectInfo_FundQuery">项目经费信息数据访问</param>
        /// <returns>项目经费信息</returns>
        public ProjectInfo_Fund GetProjectInfo_Fund(IQueryable<ProjectInfo_Fund> projectInfo_FundQuery)
        {
            if (projectInfo_FundQuery == null)
                throw new ArgumentNullException("projectInfo_FundQuery");

            if (this.IsNew)
            {
                var fund = new ProjectInfo_Fund { Project = this };
                return fund;
            }

            var projectInfo_Fund = projectInfo_FundQuery.SingleOrDefault(pif => pif.ProjectID == _ID);
            if (projectInfo_Fund == null)
                throw new InvalidDataException("项目对应的经费信息不存在！");

            return projectInfo_Fund;
        }

        /// <summary>
        /// 取得项目课题组间接费暂存（考虑调整单）
        /// </summary>
        /// <param name="projectInfo_FundQuery"></param>
        /// <returns></returns>
        public long GetDescendPormance(IDatabase database)
        {
            var performances = database.Performances.Where(c => c.Project == this && c.IsCancel == false).ToList();
            long sum = 0;
            foreach (var item in performances)
            {
                sum += item.ArrivedPerformance;
            }
            return sum;

        }
        /// <summary>
        /// 取得项目实发绩效（考虑调整单）
        /// </summary>
        /// <param name="projectInfo_FundQuery"></param>
        /// <returns></returns>
        public long GetAllocatedPormance(IDatabase database)
        {
            var performanceAllocations = database.PerformanceAllocations.Where(c => c.Performance.Project == this && c.CurrentState.State == PerformanceAllocationState.Passed).ToList();
            long sum = 0;
            foreach (var item in performanceAllocations)
            {
                sum += item.ArrivedPerformance;
            }

            return sum;

        }
        /// <summary>
        /// 取得项目已收学校间接费（不考虑调整单）
        /// </summary>
        /// <param name=""></param>
        /// <returns></returns>
        public long GetOverheadExpensesInAlready(IDatabase database)
        {
            var fundAllocations = database.FundAllocations.Where(c => c.FundDescend.ProjectInfo_Fund.Project == this && c.CurrentState.State == FundAllocationState.Passed).ToList();
            long sum = 0;
            foreach (var item in fundAllocations)
            {
                foreach (var item2 in item.GetVouchers(database.Vouchers))
                {
                    sum += item2.OverheadExpensesIn;
                }
            }
            return sum;

        }
        /// <summary>
        /// 取得项目已产生绩效暂存（不考虑调整单）
        /// </summary>
        /// <param name=""></param>
        /// <returns></returns>
        public long GetPerformancePayAlready(IDatabase database)
        {
            var fundAllocations = database.FundAllocations.Where(c => c.FundDescend.ProjectInfo_Fund.Project == this && c.CurrentState.State == FundAllocationState.Passed).ToList();
            long sum = 0;
            foreach (var item in fundAllocations)
            {
                foreach (var item2 in item.GetVouchers(database.Vouchers))
                {
                    sum += item2.OverheadPerformancePay;
                }
            }
            return sum;

        }
        /// <summary>
        /// 取得项目实收学校间接费（考虑调整单）
        /// </summary>
        /// <param name=""></param>
        /// <returns></returns>
        public long GetAllocatedOverheadExpensesIn(IDatabase database)
        {
            var fundAllocations = database.FundAllocations.Where(c => c.FundDescend.ProjectInfo_Fund.Project == this && c.CurrentState.State == FundAllocationState.Passed).ToList();
            long sum = 0;
            foreach (var item in fundAllocations)
            {
                foreach (var item2 in item.GetVouchers(database.Vouchers))
                {
                    sum += item2.OverheadExpensesIn;
                }
            }
            var recoverys = database.Recovery.Where(c => c.Project == this && c.IsCanceled != true).ToList();
            foreach (var item in recoverys)
            {
                var value = item.PlanedOverheadExpensesIn - item.ReceivedOverheadExpensesIn;
                sum += value;
            }
            return sum;

        }
        /// <summary>
        /// 取得项目实收二级单位间接费（考虑调整单）
        /// </summary>
        /// <param name=""></param>
        /// <returns></returns>
        public long GetAllocatedOverheadExpensesMiddle(IDatabase database)
        {
            var fundAllocations = database.FundAllocations.Where(c => c.FundDescend.ProjectInfo_Fund.Project == this && c.CurrentState.State == FundAllocationState.Passed).ToList();
            long sum = 0;
            foreach (var item in fundAllocations)
            {
                foreach (var item2 in item.GetVouchers(database.Vouchers))
                {
                    sum += item2.OverheadExpensesMiddle;
                }
            }
            var recoverys = database.Recovery.Where(c => c.Project == this && c.IsCanceled == false).ToList();
            foreach (var item in recoverys)
            {
                var value = item.PlanedOverheadExpensesMiddle - item.ReceivedOverheadExpensesMiddle;
                sum += value;
            }
            return sum;

        }
        /// <summary>
        /// 取得项目的合同
        /// </summary>
        /// <param name="contractQuery">合同数据访问</param>
        /// <returns>项目的所有合同</returns>
        public List<Contract> GetContracts(IQueryable<Contract> contractQuery)
        {
            if (contractQuery == null)
                throw new ArgumentNullException("contractQuery");

            return contractQuery
                .Where(c => c.ProjectID == _ID)
                .OrderBy(c => c.Type)
                .ToList();
        }
        /// <summary>
        /// 取得项目的主合同
        /// </summary>
        /// <param name="query"></param>
        /// <returns></returns>
        public Contract GetMainContract(IQueryable<Contract> query)
        {
            if (query == null)
                throw new ArgumentNullException("contractQuery");

            return query
                .SingleOrDefault(c => c.ProjectID == _ID && c.Type == ContractType.MainContract);
        }
        /// <summary>
        /// 项目是否拥有主合同
        /// </summary>
        /// <param name="query"></param>
        /// <returns></returns>
        public bool hasMainContract(IQueryable<Contract> query)
        {
            if (query == null)
                throw new ArgumentNullException("contractQuery");

            return query
                .Count(c => c.ProjectID == _ID && c.Type == ContractType.MainContract) != 0;
        }
        /// <summary>
        /// 取得项目的文档
        /// </summary>
        /// <param name="documentQuery">文档的数据访问</param>
        /// <returns>项目的所有文档</returns>
        public List<Document> GetDocuments(IQueryable<Document> documentQuery)
        {
            if (documentQuery == null)
                throw new ArgumentNullException("documentQuery");

            return documentQuery
                .Where(d => d.ProjectID == _ID)
                .ToList();
        }
        /// <summary>
        /// 验证操作
        /// </summary>
        /// <param name="validater">验证器</param>
        /// <param name="database">数据库</param>
        protected override void ValidateAction(Validater validater, IDatabase database)
        {
            validater.AddCondition(!String.IsNullOrEmpty(_Name), "项目名称不能为空！");
            validater.AddCondition(Principal != null, "项目负责人不能为空！");
            if (_StartDate.HasValue && _EndDate.HasValue)
                validater.AddCondition(_EndDate >= _StartDate, "项目的结束日期不能小于开始日期！");
            validater.AddCondition(!String.IsNullOrEmpty(_ResearchType), "研究类型不能为空！");
            validater.AddCondition(!String.IsNullOrEmpty(_CooperationType), "合作类型不能为空！");

        }
        /// <summary>
        /// 取得横向项目的项目编号
        /// </summary>
        /// <param name="database"></param>
        /// <returns></returns>
        public string GetHorizontalProjectNumber(IDatabase database)
        {
            int year = DateTime.Now.Year;
            return string.Format("{0}{1:D4}", year, database.Counts.NewHorizontalProjectCount(year));
        }
        /// <summary>
        /// 保存操作
        /// </summary>
        /// <param name="database"></param>
        protected override void SaveAction(IDatabase database)
        {
            using (TransactionScope ts = new TransactionScope())
            {
                if (this.IsNew)
                {
                    ProjectMember pm = new ProjectMember();
                    pm.Project = this;
                    pm.Order = 1;
                    pm.Expert = this.Principal;
                    pm.IsExpertSecondCollege = this.IsPrincipalSecondCollege;
                    pm.Save(database);
                }
                base.SaveAction(database);
                ts.Complete();
            }
        }
        /// <summary>
        /// 取得项目未审核的项目合同
        /// </summary>
        /// <param name="query"></param>
        /// <returns></returns>
        public IList<Contract> GetUncensorContract(IQueryable<Contract> query)
        {
            return query
                .Where(q => q.ProjectID == this.ID && q.State == CensorState.WaitingCensor)
                .ToList();
        }
        /// <summary>
        /// 取得项目未审核的项目文档
        /// </summary>
        /// <param name="query"></param>
        /// <returns></returns>
        public IList<Document> GetUncensorDocument(IQueryable<Document> query)
        {
            return query
                .Where(q => q.ProjectID == this.ID && q.State == CensorState.WaitingCensor)
                .ToList();
        }
        /// <summary>
        /// 提交立项申请
        /// </summary>
        /// <param name="user"></param>
        /// <param name="database"></param>
        public void SubmitStart(User user, IDatabase database)
        {
            if (CurrentState.State != ProjectState.WaitingStartInformation)
                throw new ArgumentException("只有状态为等待专家提交立项信息的项目才能提交立项申请");
            if (!user.CanSubmitStart(this))
                throw new HasNoPermissionException();

            saveForChangeState(user, ProjectState.WaitingStartCensor, database);
            sendMessageToAdmin(user, "提交立项申请", database);
        }
        /// <summary>
        /// 撤销立项申请
        /// </summary>
        /// <param name="user"></param>
        /// <param name="database"></param>
        public void UndoSubmitStart(User user, IDatabase database)
        {
            if (CurrentState.State != ProjectState.WaitingStartCensor)
                throw new ArgumentException("只有状态为等待立项审核的项目才能撤销立项申请");
            if (!user.CanUndoStart(this))
                throw new HasNoPermissionException();

            saveForChangeState(user, ProjectState.WaitingStartInformation, database);
            sendMessageToAdmin(user, "撤销立项申请", database);
        }
        /// <summary>
        /// 审核通过立项申请
        /// </summary>
        /// <param name="user"></param>
        /// <param name="database"></param>
        /// <param name="isCensorDocuemntAndContract"></param>
        public void CensorStartPass(User user, IDatabase database, bool isCensorDocuemntAndContract)
        {
            if (CurrentState.State != ProjectState.WaitingStartCensor)
                throw new ArgumentException("只有状态为等待立项审核的项目才能审核通过立项申请");
            if (!user.CanCensorStart(this, database))
                throw new HasNoPermissionException();

            using (TransactionScope ts = new TransactionScope())
            {
                saveForChangeState(user, ProjectState.ProjectProcessing, database);

                if (this.Type.Rank.IsHorizontal && string.IsNullOrEmpty(Number))
                {
                    this.Number = this.GetHorizontalProjectNumber(database);
                    this.Save(database);
                }
                //同时审核通过项目的合同和文档
                if (isCensorDocuemntAndContract)
                {
                    foreach (var contract in this.GetUncensorContract(database.Contracts))
                        contract.CensorPass(user, database);

                    foreach (var document in this.GetUncensorDocument(database.Documents))
                        document.CensorPass(user, database);
                }

                ts.Complete();
            }
            sendMessageToPrincipal(user, "审核通过立项申请", string.Empty, database);
            sendEmailToPrincipal(user, "立项申请", "审核通过", string.Empty, database);
        }
        /// <summary>
        /// 审核驳回立项申请
        /// </summary>
        /// <param name="user"></param>
        /// <param name="remark"></param>
        /// <param name="database"></param>
        /// <param name="isCensorDocuemntAndContract"></param>
        public void CensorStartReject(User user, string remark, IDatabase database, bool isCensorDocuemntAndContract)
        {
            if (CurrentState.State != ProjectState.WaitingStartCensor)
                throw new ArgumentException("只有状态为等待立项审核的项目才能审核驳回立项申请");
            if (!user.CanCensorStart(this, database))
                throw new HasNoPermissionException();

            saveForChangeState(user, ProjectState.WaitingStartInformation, remark, database);

            //同时审核驳回项目的合同和文档
            if (isCensorDocuemntAndContract)
            {
                foreach (var contract in this.GetUncensorContract(database.Contracts))
                    contract.CensorReject("因为项目立项申请被驳回,提交合同被驳回", user, database);

                foreach (var document in this.GetUncensorDocument(database.Documents))
                    document.CensorReject("因为项目立项申请被驳回，提交文档被驳回", user, database);
            }

            sendMessageToPrincipal(user, "审核驳回立项申请", remark + "。", database);
            sendEmailToPrincipal(user, "立项申请", "审核驳回", remark + "。", database);
        }
        /// <summary>
        /// 提交结项申请
        /// </summary>
        /// <param name="user"></param>
        /// <param name="database"></param>
        public void SubmitEnd(User user, IDatabase database)
        {
            if (CurrentState.State != ProjectState.ProjectProcessing)
                throw new ArgumentException("只有状态为在研的项目才能提交结项申请");
            if (!user.CanSubmitEnd(this))
                throw new HasNoPermissionException();

            saveForChangeState(user, ProjectState.WaitingEndCensor, database);
            sendMessageToAdmin(user, "提交结项申请", database);
        }
        /// <summary>
        /// 撤销结项申请
        /// </summary>
        /// <param name="user"></param>
        /// <param name="database"></param>
        public void UndoSubmitEnd(User user, IDatabase database)
        {

            if (CurrentState.State != ProjectState.WaitingEndCensor)
                throw new ArgumentException("只有状态为等待结项审核的项目才能撤销结项申请");
            if (!user.CanUndoEnd(this))
                throw new HasNoPermissionException();

            saveForChangeState(user, ProjectState.ProjectProcessing, database);
            sendMessageToAdmin(user, "撤销结项申请", database);
        }
        /// <summary>
        /// 审核通过结项申请
        /// </summary>
        /// <param name="user"></param>
        /// <param name="database"></param>
        public void CensorEndPass(User user, IDatabase database)
        {
            if (CurrentState.State != ProjectState.WaitingEndCensor)
                throw new ArgumentException("只有状态为等待结项审核的项目才能审核通过结项申请");
            if (!user.CanCensorEnd(this, database))
                throw new HasNoPermissionException();
            if (!this.CanEnd(database))
                throw new Exception("请确认项目的文档、合同、经费是否都已提交");

            saveForChangeState(user, ProjectState.ProjectEnd, database);
            sendMessageToPrincipal(user, "审核通过结项申请", string.Empty, database);
            sendEmailToPrincipal(user, "结项申请", "审核通过", string.Empty, database);
        }
        /// <summary>
        /// 审核驳回立项申请
        /// </summary>
        /// <param name="user"></param>
        /// <param name="remark"></param>
        /// <param name="database"></param>
        public void CensorEndReject(User user, string remark, IDatabase database)
        {
            if (CurrentState.State != ProjectState.WaitingEndCensor)
                throw new ArgumentException("只有状态为等待结项审核的项目才能审核驳回结项申请");
            if (!user.CanCensorEnd(this, database))
                throw new HasNoPermissionException();

            saveForChangeState(user, ProjectState.ProjectProcessing, remark, database);
            sendMessageToPrincipal(user, "审核驳回结项申请", remark + "。", database);
            sendEmailToPrincipal(user, "结项申请", "审核驳回", remark + "。", database);
        }
        /// <summary>
        /// 删除项目(逻辑删除)
        /// </summary>
        /// <param name="user"></param>
        /// <param name="database"></param>
        public void LogicDelete(User user, IDatabase database)
        {
            if (!user.CanDelete(this, database))
                throw new HasNoPermissionException();

            saveForChangeState(user, ProjectState.Deleted, database);
        }
        /// <summary>
        /// 撤销项目
        /// </summary>
        /// <param name="user"></param>
        /// <param name="database"></param>
        public void WithDraw(User user, IDatabase database)
        {
            if (!user.CanWithDraw(this, database))
                throw new HasNoPermissionException();

            saveForChangeState(user, ProjectState.WithDraw, database);
        }
        /// <summary>
        /// 终止项目
        /// </summary>
        /// <param name="user"></param>
        /// <param name="database"></param>
        public void Terminate(User user, IDatabase database)
        {
            if (!user.CanTerminate(this, database))
                throw new HasNoPermissionException();

            saveForChangeState(user, ProjectState.Terminate, database);
        }
        private void saveForChangeState(User user, ProjectState projectState, IDatabase database)
        {
            saveForChangeState(user, projectState, string.Empty, database);
        }
        private void saveForChangeState(User user, ProjectState projectState, string remark, IDatabase database)
        {
            using (TransactionScope ts = new TransactionScope())
            {
                //相同状态只保留一次
                ProjectStateHistory projectStateHistory = this.CurrentState.State == projectState ? this.CurrentState : new ProjectStateHistory();

                projectStateHistory.DateTime = DateTime.Now;
                projectStateHistory.Operator = user.Name;
                projectStateHistory.Project = this;
                projectStateHistory.Remark = remark;
                projectStateHistory.State = projectState;

                projectStateHistory.Save(database);

                this.CurrentState = projectStateHistory;
                this.Save(database);
                ts.Complete();
            }
        }
        private void sendMessageToPrincipal(User sender, string action, string remark, IDatabase database)
        {
            var title = String.Format("项目：{0}--{1}", _Name, action);
            var content = String.Format(@"您负责的项目：{0}，已由管理员{1}，于{2}，{3}。{4}{5}。", _Name, sender.Name, DateTime.Now, action, remark, GetHyperLinkString(false, false, "点击查看项目"));


            Message.SendMessage(title, content, sender, this.Principal.User, database);
            if (this.PrincipalDelegate != null)
                Message.SendMessage(title, content, sender, this.PrincipalDelegate.User, database);
        }
        private void sendMessageToAdmin(User sender, string action, IDatabase database)
        {
            var title = String.Format("项目：{0}--{1}", _Name, action);
            var content = String.Format(@"项目：{0}，已由专家{1}，于{2}，{3}。{4}。", _Name, sender.Name, DateTime.Now, action, GetHyperLinkString(false, false, "点击查看项目"));

            var administrators = getAdminCanSendMessage(database);
            foreach (var administrator in administrators)
                Message.SendMessage(title, content, sender, administrator, database);
        }
        /// <summary>
        /// 取得超链接
        /// </summary>
        /// <returns></returns>
        public string GetHyperLinkString(bool isShowDocumentManageWindow, bool isShowContractMangageWindow, string literal)
        {
            return string.Format("<a href='#' onclick='Srims.MessageAction.showProject({0},{1},{2});return false;'>{3}</a>", this.ID, isShowDocumentManageWindow.ToString().ToLower(), isShowContractMangageWindow.ToString().ToLower(), literal);
        }
        private void sendEmailToPrincipal(User sender, string actionName, string action, string remark, IDatabase database)
        {
            string title = String.Empty;
            string body = String.Empty;

            if (_IsSecret == true)
            {
                title = String.Format("项目：--{0}{1}", actionName, action);
                body = String.Format(@"您负责的项目：{0}已由管理员{1}于{2}，{3}。{4}请及时登录中国海洋大学科研管理系统查看该项目。", actionName, sender.Name, DateTime.Now, action, remark);

            }
            else
            {
                title = String.Format("项目：{0}--{1}{2}", _Name, actionName, action);
                body = String.Format(@"您负责的项目：{0}的{1}已由管理员{2}于{3}，{4}。{5}请及时登录中国海洋大学科研管理系统查看该项目。", _Name, actionName, sender.Name, DateTime.Now, action, remark);
            }
            string content = EmailContentModel.GetExpertEmailContentModel(this.Principal.Name, body);

            sender.SendMail(this.Principal.Email, title, content, database);
            if (this.PrincipalDelegate != null)
                sender.SendMail(this.PrincipalDelegate.Email, title, content, database);
        }
        /// <summary>
        /// 取得项目的管理员（如果有二级管理员，返回二级管理员；否则返回超管）
        /// </summary>
        /// <param name="database"></param>
        /// <returns></returns>
        public List<User> getAdminCanSendMessage(IDatabase database)
        {
            List<User> administratorList = new List<User>();
            List<User> superList = new List<User>();

            var allAdministrators = database.Users.GetAllAdministrators();
            foreach (var administrator in allAdministrators)
            {
                if (administrator.CanEdit(this, database) && !administrator.IsSuper)
                    administratorList.Add(administrator);

                if (administrator.IsSuper)
                    superList.Add(administrator);
            }

            if (administratorList.Count > 0)
                return administratorList;

            return superList;
        }

    }
    /// <summary>
    /// 项目的业务扩展
    /// </summary>
    public static class ProjectBusinessExtension
    {
        /// <summary>
        /// 给项目负责人发送项目结项申请（提醒规则：在项目结项日期的前三个月和后六个月，一个月发送一封提醒邮件）
        /// </summary>
        /// <param name="query"></param>
        /// <param name="database"></param>
        public static void EndAwoke(this IQueryable<Project> query, IDatabase database)
        {
            List<DateTime> effectiveDate = new List<DateTime>();
            for (int i = 3; i <= -6; i++)
                effectiveDate.Add(DateTime.Now.AddMonths(i));

            var projects = query.Where(q => q.EndDate.HasValue
                && q.CurrentState.State == ProjectState.ProjectProcessing
                && (effectiveDate.Contains(q.EndDate.Value))).ToList();

            int count = 0;

            string title = string.Empty;
            string body = string.Empty;
            string content = string.Empty;

            foreach (var project in projects)
            {
                if (!string.IsNullOrEmpty(project.Principal.Email))
                {
                    //一分钟发送一封邮件
                    Thread.Sleep(1000 * 120);

                    if (project.IsSecret == true)
                    {

                        title = string.Format("项目结项提醒");
                        body = string.Format("您负责的项目：结项日期为：{0}。请及时登录科研管理系统提交项目结项申请。", project.EndDate.Value);
                        content = EmailContentModel.GetExpertEmailContentModel(project.Principal.Name, body);

                    }
                    else
                    {

                        title = string.Format("项目：{0}-结项提醒", project.Name);
                        body = string.Format("您负责的项目：{0}，结项日期为：{1}。请及时登录科研管理系统提交项目结项申请。", project.Name, project.EndDate.Value);
                        content = EmailContentModel.GetExpertEmailContentModel(project.Principal.Name, body);
                    }

                    var user = database.Users.First(u => u.IsSuper);
                    user.SendMail(project.Principal.Email, title, content, database);

                    var description = "项目结项提醒邮件，项目名称为：" + project.Name + "收信人为：" + project.Principal.Name + "邮箱地址为：" + project.Principal.Email;
                    Log.Write("系统", (int)LogType.ProjectEndRemind, description, "自动发送项目结项提醒邮件", database);
                    count++;
                }
            }
            Log.Write("系统", (int)LogType.ProjectEndRemind, "共发送项目结项提醒邮件：" + count + "封", "自动发送项目结项提醒邮件", database);
        }
        /// <summary>
        /// 项目能否结项（合同、文档、经费都提交完毕）
        /// </summary>
        /// <param name="project"></param>
        /// <param name="databaase"></param>
        /// <returns></returns>
        public static bool CanEnd(this Project project, IDatabase databaase)
        {

            //项目必须有主合同
            if (databaase.Contracts.GetCountByProjectID(project.ID) <= 0)
                return false;
            //不能有未审核通过的合同
            if (databaase.Contracts.Where(q => q.ProjectID == project.ID && q.State != CensorState.Passed).ToList().Count() > 0)
                return false;

            //项目必须要有文档
            if (databaase.Documents.GetCountByProjectID(project.ID) <= 0)
                return false;
            //不能有未审核通过的文档
            if (databaase.Documents.Where(q => q.ProjectID == project.ID && q.State != CensorState.Passed).ToList().Count() > 0)
                return false;

            // 判断是否有未分配的经费下拨（状态为审核通过和等待审核）
            if (databaase.FundDescends.GetCountByProjectId(project.ID) > 0)
                return false;

            //判断分配的经费和合同额是否相等
            var fundDescends = databaase.FundDescends.Where(q => q.ProjectInfo_Fund.ProjectID == project.ID).ToList();
            long fundDescendAmount = 0;
            foreach (var fundDescend in fundDescends)
            {
                fundDescendAmount += fundDescend.Amount;
            }
            if (project.Fund.FundContract != fundDescendAmount)
                return false;

            return true;
        }
        /// <summary>
        /// 纵向项目结项审核提醒
        /// </summary>
        /// <param name="query"></param>
        /// <param name="database"></param>
        public static void CensorVerticalProjectRemind(this IQueryable<Project> query, IDatabase database)
        {
            List<User> admins = database.Users.Where(q => q.UserRole.Type == UserRoleType.Administrator && (!q.IsSuper)).ToList();
            var user = database.Users.First(u => u.IsSuper);

            string title = string.Format("审核项目结项提醒");
            string content = string.Empty;
            string body = string.Empty;

            int sendEmailCount = 0;
            foreach (var admin in admins)
            {
                List<int> idsVertical = admin.GetCanCensorVerticalProjectTypes(database).Select(p => p.ID).ToList();
                int count = query.Where(p => p.CurrentState.State == ProjectState.WaitingEndCensor
                    && (!p.Type.Rank.IsHorizontal)
                    && p.CurrentState.DateTime.AddDays(2) < DateTime.Now
                    && idsVertical.Contains(p.Type.Type.ID)).Count();

                if (!admin.HasPermission_CensorVerticalProject(database) || count <= 0 || admin.IsLocked(database.UserLockLogs))
                    continue;

                //一分钟发送一封邮件
                Thread.Sleep(1000 * 120);

                body = string.Format("现有：{0}个纵向项目需要进行结项审核。请及时登录科研管理系统审核项目。", count);
                content = EmailContentModel.GetAdminEmailContentModel(body);
                try
                {
                    user.SendMail(admin.Email, title, content, database);
                }
                catch (Exception e)
                {
                    var PrincipalDescriptions = string.Format("自动发送纵向项目结项审核提醒邮件失败，管理员：{0}，emal:{1}", admin.Name, admin.Email);
                    Log.Write("系统", (int)LogType.ExpertCensorRemind, PrincipalDescriptions, "自动发送纵向项目结项审核提醒邮件失败", database);
                    continue;
                }

                sendEmailCount++;
                var PrincipalDescription = string.Format("自动发送纵向项目结项审核提醒邮件，管理员：{0}，emal:{1}", admin.Name, admin.Email);
                Log.Write("系统", (int)LogType.ExpertCensorRemind, PrincipalDescription, "自动发送纵向项目结项审核提醒邮件", database);
            }
            Log.Write("系统", (int)LogType.CensorVerticalProjectRemind, "共发送自动提醒邮件" + sendEmailCount + "封", "自动发送纵向项目结项审核提醒邮件", database);

        }
        /// <summary>
        /// 横向项目结项审核提醒
        /// </summary>
        /// <param name="query"></param>
        /// <param name="database"></param>
        public static void CensorHorizontalProjectRemind(this  IQueryable<Project> query, IDatabase database)
        {

            List<User> admins = database.Users.Where(q => q.UserRole.Type == UserRoleType.Administrator && (!q.IsSuper)).ToList();
            var user = database.Users.First(u => u.IsSuper);

            string title = string.Format("审核项目结项提醒");
            string content = string.Empty;
            string body = string.Empty;

            int sendEmailCount = 0;
            foreach (var admin in admins)
            {
                List<int> idsHorizontal = admin.GetCanCensorHorizontalProjectTypes(database).Select(p => p.ID).ToList();
                int count = query.Where(p => (p.CurrentState.State == ProjectState.WaitingEndCensor)
                    && (p.Type.Rank.IsHorizontal)
                    && (p.CurrentState.DateTime.AddDays(2) < DateTime.Now)
                    && (idsHorizontal.Contains(p.Type.Type.ID)))
                    .Count();

                if (!admin.HasPermission_CensorHorizontalProject(database) || count <= 0 || admin.IsLocked(database.UserLockLogs))
                    continue;

                //一分钟发送一封邮件
                Thread.Sleep(1000 * 120);

                body = string.Format("现有：{0}个横向项目需要进结项行审核。请及时登录科研管理系统审核项目。", count);
                content = EmailContentModel.GetAdminEmailContentModel(body);
                try
                {
                    user.SendMail(admin.Email, title, content, database);
                }
                catch (Exception e)
                {
                    var PrincipalDescriptions = string.Format("自动发送横向项目结项审核提醒邮件失败，管理员：{0}，emal:{1}", admin.Name, admin.Email);
                    Log.Write("系统", (int)LogType.ExpertCensorRemind, PrincipalDescriptions, "自动发送横向项目结项审核提醒邮件失败", database);
                    continue;
                }

                sendEmailCount++;
                var PrincipalDescription = string.Format("自动发送横向项目结项审核提醒邮件，管理员：{0}，emal:{1}", admin.Name, admin.Email);
                Log.Write("系统", (int)LogType.ExpertCensorRemind, PrincipalDescription, "自动发送横向项目结项审核提醒邮件", database);
            }
            Log.Write("系统", (int)LogType.CensorHorizontalProjectRemind, "共发送自动提醒邮件" + sendEmailCount + "封", "自动发送横向项目结项审核提醒邮件", database);

        }
        /// <summary>
        /// 审核项目立项提醒
        /// </summary>
        /// <param name="query"></param>
        /// <param name="database"></param>
        public static void CensorProjectRemaind(this  IQueryable<Project> query, IDatabase database)
        {

            IList<User> admins = database.Users.Where(p => !p.IsSuper && p.UserRole.Type == UserRoleType.Administrator).ToList();
            var user = database.Users.First(u => u.IsSuper);

            string title = string.Format("项目立项审核提醒");
            string content = string.Empty;
            string body = string.Empty;
            int count = 0;

            foreach (var admin in admins)
            {
                int horizontalCount = database.Projects.GetWaitingCensorProjectCount(admin, true, ProjectState.WaitingStartCensor);
                int verticalCount = database.Projects.GetWaitingCensorProjectCount(admin, false, ProjectState.WaitingStartCensor);
                if ((horizontalCount <= 0 && verticalCount <= 0) || admin.IsLocked(database.UserLockLogs))
                    continue;

                try
                {
                    if (horizontalCount > 0)
                    {
                        //一分钟发送一封邮件
                        Thread.Sleep(1000 * 120);
                        body = string.Format("现有{0}个横向项目立项需要审核，请及时登录科研管理系统审核项目立项", horizontalCount);
                        content = EmailContentModel.GetAdminEmailContentModel(body);
                        user.SendMail(admin.Email, title, content, database);
                        count++;

                        var PrincipalDescription = string.Format("自动发送横向项目立项审核提醒邮件，管理员：{0}，emal:{1}", admin.Name, admin.Email);
                        Log.Write("系统", (int)LogType.CensorProjectRemaind, PrincipalDescription, "自动发送横向项目立项审核提醒邮件", database);
                    }
                    if (verticalCount > 0)
                    {
                        //一分钟发送一封邮件
                        Thread.Sleep(1000 * 120);
                        body = string.Format("现有{0}个纵向项目立项需要审核，请及时登录科研管理系统审核项目立项", horizontalCount);
                        content = EmailContentModel.GetAdminEmailContentModel(body);
                        user.SendMail(admin.Email, title, content, database);
                        count++;

                        var PrincipalDescription = string.Format("自动发送纵向项目立项审核提醒邮件，管理员：{0}，emal:{1}", admin.Name, admin.Email);
                        Log.Write("系统", (int)LogType.CensorProjectRemaind, PrincipalDescription, "自动发送纵向项目立项审核提醒邮件", database);
                    }
                }
                catch (Exception e)
                {
                    var PrincipalDescriptions = string.Format("自动发送项目立项审核提醒邮件失败，管理员：{0}，emal:{1}", admin.Name, admin.Email);
                    Log.Write("系统", (int)LogType.CensorProjectRemaind, PrincipalDescriptions, "自动发送项目立项审核提醒邮件失败", database);
                    continue;
                }

            }
            Log.Write("系统", (int)LogType.CensorProjectRemaind, "共发送邮件：" + count + "封，", "自动发送项目立项审核提醒邮件", database);
        }
    }
    /// <summary>
    /// 项目的查询扩展
    /// </summary>
    public static class ProjectQueryExtension
    {  /// <summary>
        /// 根据项目的负责人取得项目
        /// </summary>
        /// <param name="query"></param>
        /// <param name="principalID"></param>
        /// <returns></returns>
        public static IList<Project> GetByPrincipalID(this IQueryable<Project> query, int principalID)
        {
            return query
                .Where(q => q.PrincipalID == principalID)
                .ToList();
        }
        /// <summary>
        /// 根据项目的外协单位取得项目carlsirce2013.5.13
        /// </summary>
        /// <param name="query"></param>
        /// <param name="outsourcingID"></param>
        /// <param name="database"></param>
        /// <returns></returns>
        public static IQueryable<Project> GetByOutsourcingID(this IQueryable<Project> query, int outsourcingID, IDatabase database)
        {
            var projectouts = database.ProjectOuts.Where(c => c.OutsourcingID == outsourcingID).ToList();
            List<Project> list = new List<Project>();
            foreach (var item in projectouts)
            {
                var project = query.SingleOrDefault(c => c == item.Project);
                if (project != null)
                    list.Add(project);
            }

            return database.Projects.Where(c => list.Contains(c));
        }
        /// <summary>
        /// 筛选项目
        /// </summary>
        /// <param name="query"></param>
        /// <param name="keyWord"></param>
        /// <returns></returns>
        public static IList<Project> Search(this IQueryable<Project> query, string keyWord)
        {
            var q = query.AsQueryable();
            if (keyWord != null) keyWord = keyWord.Trim();
            if (!string.IsNullOrEmpty(keyWord))
                q = q.Where(p => p.Name.StartsWith(keyWord)
                    || p.Number.StartsWith(keyWord)
                    || p.Principal.Name.StartsWith(keyWord)
                    || p.Principal.NameSpell.StartsWith(keyWord)
                    || p.PrincipalDelegate.Name.StartsWith(keyWord)
                    || p.PrincipalDelegate.NameSpell.StartsWith(keyWord));
            return q.ToList();
        }
        /// <summary>
        /// 筛选项目
        /// </summary>
        /// <param name="query"></param>
        /// <param name="keyWord"></param>
        /// <param name="user"></param>
        /// <returns></returns>
        public static IList<Project> SearchProject(this IQueryable<Project> query, string keyWord, User user)
        {
            var q = query.AsQueryable();
            if (user.IsExpert)
                q = q.Where(p => p.Principal.User == user);
            if (keyWord != null) keyWord = keyWord.Trim();
            if (!string.IsNullOrEmpty(keyWord))
                q = q.Where(p => p.Name.StartsWith(keyWord)
                    || p.Number.StartsWith(keyWord)
                    || p.Principal.Name.StartsWith(keyWord)
                    || p.Principal.NameSpell.StartsWith(keyWord)
                    || p.PrincipalDelegate.Name.StartsWith(keyWord)
                    || p.PrincipalDelegate.NameSpell.StartsWith(keyWord));
            return q.ToList();

        }
        /// <summary>
        /// 筛选项目（下拨经费）
        /// </summary>
        /// <param name="query"></param>
        /// <param name="keyWord"></param>
        /// <param name="user"></param>
        /// <param name="database"></param>
        /// <returns></returns>
        public static IList<Project> SearchForFundDescend(this IQueryable<Project> query, string keyWord, User user, IDatabase database)
        {
            var projectList = query.Search(keyWord);

            return getCanDescendProjectList(projectList, user, database);
        }
        /// <summary>
        /// 查询项目（批量下拨经费）
        /// </summary>
        /// <param name="query"></param>
        /// <param name="queryInformation"></param>
        /// <param name="user"></param>
        /// <param name="database"></param>
        /// <returns></returns>
        public static IList<Project> QueryForFundDescend(this IQueryable<Project> query, ProjectQueryInformation queryInformation, User user, IDatabase database)
        {
            var projectList = query.GetProject(queryInformation, user, database).ToList();

            return getCanDescendProjectList(projectList, user, database);
        }
        private static IList<Project> getCanDescendProjectList(IList<Project> projectList, User user, IDatabase database)
        {
            var projectCanDescendList = new List<Project>();

            foreach (var project in projectList)
                if (user.CanFundDescend(project, database))
                    projectCanDescendList.Add(project);

            return projectCanDescendList;
        }
        /// <summary>
        /// 筛选项目（还款）
        /// </summary>
        /// <param name="query"></param>
        /// <param name="keyWord"></param>
        /// <param name="user"></param>
        /// <param name="database"></param>
        /// <returns></returns>
        public static IList<Project> SearchForReturn(this IQueryable<Project> query, string keyWord, User user, IDatabase database)
        {
            var projectList = query.Search(keyWord);
            var projectCanReturnList = new List<Project>();

            foreach (var project in projectList)
                if (user.CanReturn(project, database))
                    projectCanReturnList.Add(project);

            return projectCanReturnList;
        }
        /// <summary>
        /// 项目查询
        /// </summary>
        /// <param name="query"></param>
        /// <param name="queryInformation"></param>
        /// <param name="user"></param>
        /// <param name="database"></param>
        /// <returns></returns>
        public static ProjectQueryResult Query(this IQueryable<Project> query, ProjectQueryInformation queryInformation, User user, IDatabase database)
        {
            if (query == null)
                throw new ArgumentNullException("query");
            if (queryInformation == null)
                throw new ArgumentNullException("queryInformation");

            //查询
            var q = query.GetProject(queryInformation, user, database).Distinct();


            //排序
            q = sortQuery(q, queryInformation.SortInfo, user);

            //构造查询结果
            var total = q.Select(p => p.ID).Count();
            return new ProjectQueryResult(
                q.Skip(queryInformation.Start).Take(queryInformation.Limit).ToList(),
                total,
                total == 0 ? Convert.ToInt64(0) : q.Sum(p => p.Fund.FundTotal),
                total == 0 ? Convert.ToInt64(0) : q.Sum(p => p.Fund.FundReceived));
        }
        /// <summary>
        /// 所有项目查询
        /// </summary>
        /// <param name="query"></param>
        /// <param name="queryInformation"></param>
        /// <param name="user"></param>
        /// <param name="database"></param>
        /// <returns></returns>
        public static ProjectQueryResult QueryAll(this IQueryable<Project> query, ProjectQueryInformation queryInformation, User user, IDatabase database)
        {
            if (query == null)
                throw new ArgumentNullException("query");
            if (queryInformation == null)
                throw new ArgumentNullException("queryInformation");

            //查询
            var q = query.GetProject(queryInformation, user, database).Distinct();


            //排序
            q = sortQuery(q, queryInformation.SortInfo, user);

            //构造查询结果
            var total = q.Select(p => p.ID).Count();
            return new ProjectQueryResult(
                q.ToList(),
                total,
                total == 0 ? Convert.ToInt64(0) : q.Sum(p => p.Fund.FundTotal),
                total == 0 ? Convert.ToInt64(0) : q.Sum(p => p.Fund.FundReceived));
        }
        private static IQueryable<Project> sortQuery(IQueryable<Project> query, SortInfo sortInfo, User user)
        {
            if (sortInfo == null)
                return query.OrderByDescending(p => p.CreateDate);
            else if (sortInfo.Field.EqualIgnoreCase("StartDate"))
                return sortInfo.Direction == SortDirection.ASC
                    ? query.OrderBy(p => p.StartDate)
                    : query.OrderByDescending(p => p.StartDate);
            else if (sortInfo.Field.EqualIgnoreCase("EndDate"))
                return sortInfo.Direction == SortDirection.ASC
                    ? query.OrderBy(p => p.EndDate)
                    : query.OrderByDescending(p => p.EndDate);
            else if (sortInfo.Field.EqualIgnoreCase("CreateDate"))
                return sortInfo.Direction == SortDirection.ASC
                    ? query.OrderBy(p => p.CreateDate)
                    : query.OrderByDescending(p => p.CreateDate);
            else if (sortInfo.Field.EqualIgnoreCase("RankName"))
                return sortInfo.Direction == SortDirection.ASC
                    ? query.OrderBy(p => p.Type.Rank.Name)
                    : query.OrderByDescending(p => p.Type.Rank.Name);
            else if (sortInfo.Field.EqualIgnoreCase("TypeName") || sortInfo.Field.EqualIgnoreCase("TypeShortName"))
                return sortInfo.Direction == SortDirection.ASC
                    ? query.OrderBy(p => p.Type.Type.Name)
                    : query.OrderByDescending(p => p.Type.Type.Name);
            else if (sortInfo.Field.EqualIgnoreCase("FundAlreadyHardware"))
                return sortInfo.Direction == SortDirection.ASC
                    ? query.OrderBy(p => p.Fund.FundAlreadyHardware)
                    : query.OrderByDescending(p => p.Fund.FundAlreadyHardware);
            else if (sortInfo.Field.EqualIgnoreCase("FundAlreadyIn"))
                return sortInfo.Direction == SortDirection.ASC
                    ? query.OrderBy(p => p.Fund.FundAlreadyIn)
                    : query.OrderByDescending(p => p.Fund.FundAlreadyIn);
            else if (sortInfo.Field.EqualIgnoreCase("FundAlreadyOut"))
                return sortInfo.Direction == SortDirection.ASC
                    ? query.OrderBy(p => p.Fund.FundAlreadyOut)
                    : query.OrderByDescending(p => p.Fund.FundAlreadyOut);
            else if (sortInfo.Field.EqualIgnoreCase("FundTotal"))
                return sortInfo.Direction == SortDirection.ASC
                    ? query.OrderBy(p => p.Fund.FundTotal)
                    : query.OrderByDescending(p => p.Fund.FundTotal);
            else if (sortInfo.Field.EqualIgnoreCase("FundContract"))
                return sortInfo.Direction == SortDirection.ASC
                    ? query.OrderBy(p => p.Fund.FundContract)
                    : query.OrderByDescending(p => p.Fund.FundContract);
            else if (sortInfo.Field.EqualIgnoreCase("FundReceived"))
                return sortInfo.Direction == SortDirection.ASC
                    ? query.OrderBy(p => p.Fund.FundReceived)
                    : query.OrderByDescending(p => p.Fund.FundReceived);
            else if (sortInfo.Field.EqualIgnoreCase("FundPlanHardware"))
                return sortInfo.Direction == SortDirection.ASC
                    ? query.OrderBy(p => p.Fund.FundPlanHardware)
                    : query.OrderByDescending(p => p.Fund.FundPlanHardware);
            else if (sortInfo.Field.EqualIgnoreCase("FundPlanOutTotal"))
                return sortInfo.Direction == SortDirection.ASC
                    ? query.OrderBy(p => p.Fund.FundPlanOut)
                    : query.OrderByDescending(p => p.Fund.FundPlanOut);
            else if (sortInfo.Field.EqualIgnoreCase("OverheadExpenseInTotal"))
                return sortInfo.Direction == SortDirection.ASC
                    ? query.OrderBy(p => p.Fund.OverheadExpenseInTotal)
                    : query.OrderByDescending(p => p.Fund.OverheadExpenseInTotal);
            else if (sortInfo.Field.EqualIgnoreCase("OverheadExpenseOutTotal"))
                return sortInfo.Direction == SortDirection.ASC
                    ? query.OrderBy(p => p.Fund.OverheadExpenseOutTotal)
                    : query.OrderByDescending(p => p.Fund.OverheadExpenseOutTotal);
            else if (sortInfo.Field.EqualIgnoreCase("OverheadExpensesAlreadyIn"))
                return sortInfo.Direction == SortDirection.ASC
                    ? query.OrderBy(p => p.Fund.OverheadExpensesAlreadyIn)
                    : query.OrderByDescending(p => p.Fund.OverheadExpensesAlreadyIn);
            else if (sortInfo.Field.EqualIgnoreCase("OverheadExpensesAlreadyOut"))
                return sortInfo.Direction == SortDirection.ASC
                    ? query.OrderBy(p => p.Fund.OverheadExpensesAlreadyOut)
                    : query.OrderByDescending(p => p.Fund.OverheadExpensesAlreadyOut);
            else if (sortInfo.Field.EqualIgnoreCase("Name"))
                return sortInfo.Direction == SortDirection.ASC
                    ? query.OrderBy(p => p.Name)
                    : query.OrderByDescending(p => p.Name);
            else if (sortInfo.Field.EqualIgnoreCase("Number"))
                return sortInfo.Direction == SortDirection.ASC
                    ? query.OrderBy(p => p.Number)
                    : query.OrderByDescending(p => p.Number);
            else if (sortInfo.Field.EqualIgnoreCase("Principal"))
                return sortInfo.Direction == SortDirection.ASC
                    ? query.OrderBy(p => p.Principal.Name)
                    : query.OrderByDescending(p => p.Principal.Name);
            else
            {
                if (user.IsExpert)
                    return query.OrderByDescending(p => p.Fund.FundTotal - p.Fund.FundReceived);
                else
                    return query.OrderByDescending(p => p.CreateDate);
            }
        }

        /// <summary>
        /// 根据项目查询信息取得项目
        /// </summary>
        /// <param name="query"></param>
        /// <param name="queryInformation"></param>
        /// <param name="user"></param>
        /// <param name="database"></param>
        /// <returns></returns>
        public static IQueryable<Project> GetProject(this IQueryable<Project> query, ProjectQueryInformation queryInformation, User user, IDatabase database)
        {
            if (query == null)
                throw new ArgumentNullException("query");
            if (queryInformation == null)
                throw new ArgumentNullException("queryInformation");

            //项目状态查询
            var q = query.Where(p => p.CurrentState.State != ProjectState.Deleted);

            //统计,不包含撤销的项目
            if (user == null)
                q = q.Where(p => p.CurrentState.State != ProjectState.WithDraw);

            if (queryInformation.State.ProjectStates != null && queryInformation.State.ProjectStates.Length != 0)
                q = q.Where(p => queryInformation.State.ProjectStates.Contains(p.CurrentState.State));

            q = q.Intersect(query.getProject(user, queryInformation.Basic, database));

            if (queryInformation.Basic != null)
                q = q.Intersect(query.getProject(queryInformation.Basic, user));

            if (queryInformation.Fund != null)
                q = q.Intersect(query.getProject(queryInformation.Fund));

            if (queryInformation.Type != null)
                q = q.Intersect(query.getProject(queryInformation.Type));

            if (queryInformation.Member != null)
                q = q.Intersect(database.ProjectMemebers.getProject(queryInformation.Member));

            return q;
        }
        private static IQueryable<Project> getProject(this IQueryable<Project> query, ProjectQueryInformation_Basic queryInformation, User user)
        {
            var q = query;

            if (queryInformation.Name != null)
                queryInformation.Name = queryInformation.Name.Trim();
            if (!String.IsNullOrEmpty(queryInformation.Name))
                q = q.Where(p => p.Name.Contains(queryInformation.Name) || p.NameSpell.Contains(queryInformation.Name));

            if (queryInformation.Number != null)
                queryInformation.Number = queryInformation.Number.Trim();
            if (!String.IsNullOrEmpty(queryInformation.Number))
                q = q.Where(p => p.Number.StartsWith(queryInformation.Number));

            if (queryInformation.Principal != null)
                queryInformation.Principal = queryInformation.Principal.Trim();
            if (!String.IsNullOrEmpty(queryInformation.Principal))
                q = q.Where(p => p.Principal.Name.Equals(queryInformation.Principal) || p.Principal.NameSpell.Equals(queryInformation.Principal));

            if (queryInformation.PrincipalCollege != null)
                queryInformation.PrincipalCollege = queryInformation.PrincipalCollege.Trim();
            if (!string.IsNullOrEmpty(queryInformation.PrincipalCollege))
                q = q.Where(p => p.Principal.College.Name == queryInformation.PrincipalCollege);

            if (!string.IsNullOrEmpty(queryInformation.TaskFroms))
                queryInformation.TaskFroms = queryInformation.TaskFroms.Trim();
            if (!string.IsNullOrEmpty(queryInformation.TaskFroms))
                q = q.Where(p => p.TaskComingFrom.Contains(queryInformation.TaskFroms));

            if (queryInformation.CorporationPlace != null) queryInformation.CorporationPlace = queryInformation.CorporationPlace.Trim();
            if (!string.IsNullOrEmpty(queryInformation.CorporationPlace))
                q = q.Where(p => p.CorporationPlace.Contains(queryInformation.CorporationPlace));

            if (queryInformation.ProjectLevels != null && queryInformation.ProjectLevels.Length != 0)
                q = q.Where(p => queryInformation.ProjectLevels.Contains(p.Level));

            if (queryInformation.StartDate != null)
            {
                if (queryInformation.StartDate.Start.HasValue)
                    q = q.Where(p => p.StartDate >= queryInformation.StartDate.Start);
                if (queryInformation.StartDate.End.HasValue)
                    q = q.Where(p => p.StartDate <= queryInformation.StartDate.End);
            }

            if (queryInformation.EndDate != null)
            {
                if (queryInformation.EndDate.Start.HasValue)
                    q = q.Where(p => p.EndDate >= queryInformation.EndDate.Start);
                if (queryInformation.EndDate.End.HasValue)
                    q = q.Where(p => p.EndDate <= queryInformation.EndDate.End);
            }

            if (queryInformation.IsHorizontal.HasValue)
                q = q.Where(p => p.Type.Rank.IsHorizontal == queryInformation.IsHorizontal.Value);

            if (queryInformation.IsSecret.HasValue)
                q = q.Where(p => p.IsSecret);

            return q;
        }
        private static IQueryable<Project> getProject(this IQueryable<Project> query, ProjectQueryInformation_Fund queryInformation)
        {
            var q = query;

            if (queryInformation.FundFroms != null && queryInformation.FundFroms.Length != 0)
                q = q.Where(p => queryInformation.FundFroms.Contains(p.Fund.FundFrom));

            if (queryInformation.FundTotal != null)
            {
                if (queryInformation.FundTotal.Start.HasValue)
                    q = q.Where(p => p.Fund.FundTotal >= queryInformation.FundTotal.Start);
                if (queryInformation.FundTotal.End.HasValue)
                    q = q.Where(p => p.Fund.FundTotal <= queryInformation.FundTotal.End);
            }

            if (queryInformation.FundContract != null)
            {
                if (queryInformation.FundContract.Start.HasValue)
                    q = q.Where(p => p.Fund.FundContract >= queryInformation.FundContract.Start);
                if (queryInformation.FundContract.End.HasValue)
                    q = q.Where(p => p.Fund.FundContract <= queryInformation.FundContract.End);
            }
            if (queryInformation.FundReceived != null)
            {
                if (queryInformation.FundReceived.Start.HasValue)
                    q = q.Where(p => p.Fund.FundReceived >= queryInformation.FundReceived.Start);
                if (queryInformation.FundReceived.End.HasValue)
                    q = q.Where(p => p.Fund.FundReceived <= queryInformation.FundReceived.End);
            }

            if (queryInformation.IsBorrowMoney.HasValue && queryInformation.IsBorrowMoney.Value)
                q = q.Where(p => p.Fund.BorrowAmount > 0);

            if (queryInformation.IsNotReturnAll.HasValue && queryInformation.IsNotReturnAll.Value)
                q = q.Where(p => p.Fund.BorrowAmount > p.Fund.ReturnAmount);

            return q;
        }
        private static IQueryable<Project> getProject(this IQueryable<Project> query, ProjectQueryInformation_Type queryInformation)
        {
            var q = query;

            var ranks = queryInformation.projectRanks;
            if (ranks != null && ranks.Length == 1)
                q = q.Where(p => p.Type.Rank.Name.Contains(ranks[0]));
            if (ranks != null && ranks.Length > 1)
                q = q.Where(p => ranks.Contains(p.Type.Rank.Name));

            var types = queryInformation.projectTypes;
            if (types != null && types.Length == 1)
                q = q.Where(p => p.Type.Type.Name.Contains(types[0]) || p.Type.Type.ShortName.Contains(types[0]));
            if (types != null && types.Length > 1)
                q = q.Where(p => types.Contains(p.Type.Type.Name) || types.Contains(p.Type.Type.ShortName));

            var subjectNature = queryInformation.projcectSubjectNature;
            if (subjectNature != SubjectNature.Unknown)
                q = q.Where(p => subjectNature == p.Type.Type.SubjectNature);

            var supportCategories = queryInformation.projectSupportCategories;
            if (supportCategories != null && supportCategories.Length == 1)
                q = q.Where(p => p.Type.SupportCategory.Name.Contains(supportCategories[0]));
            if (supportCategories != null && supportCategories.Length > 1)
                q = q.Where(p => supportCategories.Contains(p.Type.SupportCategory.Name));

            var supportFields = queryInformation.projectSupportFields;
            if (supportFields != null && supportFields.Length == 1)
                q = q.Where(p => p.Type.SupportField.Name.Contains(supportFields[0]));
            if (supportFields != null && supportFields.Length > 1)
                q = q.Where(p => supportFields.Contains(p.Type.SupportField.Name));

            var supportSubFields = queryInformation.projectSupportSubFields;
            if (supportSubFields != null && supportSubFields.Length == 1)
                q = q.Where(p => p.Type.SupportSubField.Name.Contains(supportSubFields[0]));
            if (supportSubFields != null && supportSubFields.Length > 1)
                q = q.Where(p => supportSubFields.Contains(p.Type.SupportSubField.Name));

            return q;
        }

        private static IQueryable<Project> getProject(this IQueryable<ProjectMember> query, ProjectQueryInformation_Member projectMemberqueryInformation)
        {
            var q = query;
            var queryInformation = projectMemberqueryInformation.projectMemberQueryInformation;

            if (queryInformation.ExpertCollege != null) queryInformation.ExpertCollege = queryInformation.ExpertCollege.Trim();
            if (!string.IsNullOrEmpty(queryInformation.ExpertCollege))
                q = q.Where(pm => pm.Expert.College.Name == queryInformation.ExpertCollege);

            if (queryInformation.ExpertBirthday != null)
            {
                if (queryInformation.ExpertBirthday.Start.HasValue)
                    q = q.Where(pm => pm.Expert.Birthday <= queryInformation.ExpertBirthday.Start);
                if (queryInformation.ExpertBirthday.End.HasValue)
                    q = q.Where(pm => pm.Expert.Birthday >= queryInformation.ExpertBirthday.End);
            }

            if (queryInformation.IsPostOrAcademyDegree.HasValue && queryInformation.IsPostOrAcademyDegree.Value == true && queryInformation.ExpertAcademyDegree != null
              && queryInformation.ExpertAcademyDegree.Length != 0 && queryInformation.ExpertPostLevel != null)
            {

                if (queryInformation.ExpertPostLevel.Start.HasValue)
                    q = q.Where(pm => queryInformation.ExpertAcademyDegree.Contains(pm.Expert.AcademyDegree) || pm.Expert.PostLevel >= queryInformation.ExpertPostLevel.Start.Value);
                if (queryInformation.ExpertPostLevel.End.HasValue)
                    q = q.Where(pm => queryInformation.ExpertAcademyDegree.Contains(pm.Expert.AcademyDegree) || pm.Expert.PostLevel <= queryInformation.ExpertPostLevel.End.Value); ;
            }
            else
            {
                if (queryInformation.ExpertAcademyDegree != null && queryInformation.ExpertAcademyDegree.Length != 0)
                    q = q.Where(pm => queryInformation.ExpertAcademyDegree.Contains(pm.Expert.AcademyDegree));

                if (queryInformation.ExpertPostLevel != null)
                {
                    if (queryInformation.ExpertPostLevel.Start.HasValue)
                        q = q.Where(pm => pm.Expert.PostLevel >= queryInformation.ExpertPostLevel.Start.Value);
                    if (queryInformation.ExpertPostLevel.End.HasValue)
                        q = q.Where(pm => pm.Expert.PostLevel <= queryInformation.ExpertPostLevel.End.Value);
                }
            }

            return q.Select(pm => pm.Project).Distinct();
        }
        private static IQueryable<Project> getProject(this IQueryable<Project> query, User user, ProjectQueryInformation_Basic queryInformation, IDatabase database)
        {
            if (user == null || user.IsSuper)
                return query;

            //当用户为专家时，取得用户对应的项目
            if (user.IsExpert)
            {
                int expertID = user.GetExpert(database.Experts).ID;
                ExpertAttendType exppertAttendType = queryInformation.ExpertAttendType;

                switch (exppertAttendType)
                {
                    case ExpertAttendType.Principal:
                        return query.Where(p => p.PrincipalID == expertID);
                    case ExpertAttendType.Delegate:
                        return query.Where(p => p.PrincipalDelegateID == expertID);
                    default:
                        return database.ProjectMemebers.Where(p => p.ExpertID == expertID).Select(p => p.Project).Where(p => p.PrincipalID != expertID);
                }
            }

            var q = query;

            //当用户为院系管理员时
            if (user.IsCollegeManagerOf(PermissionItem.ManageAllHorizontalProject, database) || user.IsCollegeManagerOf(PermissionItem.ManageAllVerticalProject, database))
            {
                var canManageProjectCollegesID = getCanManageProjectCollegesID(user, database);
                return q.Where(p => !p.IsSecret
                    && p.Principal.CollegeID.HasValue
                    && canManageProjectCollegesID.Contains(p.Principal.CollegeID.Value));
            }

            //当用户为管理员时，取得所能管理或审核的项目
            var projectTypeIDList = new List<int>();
            if (queryInformation.IsCensor.HasValue && queryInformation.IsCensor.Value)//当查找待审核的项目时
                projectTypeIDList = user.GetCanCensorHorizontalProjectTypes(database)
                    .Union(user.GetCanCensorVerticalProjectTypes(database))
                    .Select(pt => pt.ID)
                    .ToList();
            else
                projectTypeIDList = user.GetCanShowVerticalTypes(database)
                .Union(user.GetCanShowHorizontalTypes(database))
                .Select(pt => pt.ID)
                .ToList();

            return q.Where(p => projectTypeIDList.Contains(p.Type.Type.ID));
        }
        private static List<int> getCanManageProjectCollegesID(User user, IDatabase database)
        {
            return user.GetCanManageCollegesID(PermissionItem.ManageAllVerticalProject, database)
                .Union(user.GetCanManageCollegesID(PermissionItem.ManageAllHorizontalProject, database))
                .Distinct()
                .ToList();
        }
        /// <summary>
        /// 根据名字统计
        /// </summary>
        /// <param name="query"></param>
        /// <param name="name"></param>
        /// <returns></returns>
        public static int CountByName(this IQueryable<Project> query, string name)
        {
            return query
                .Count(p => Project.AvailableProjectStates.Contains(p.CurrentState.State) && p.Name == name);
        }
        /// <summary>
        ///根据用户和项目状态 ，取得等待审核的项目数目
        /// </summary>
        /// <param name="query"></param>
        /// <param name="user"></param>
        /// <param name="isHorizontal"></param>
        /// <param name="projectState"></param>
        /// <returns></returns>
        public static int GetWaitingCensorProjectCount(this IEntityDataAccess<Project> query, User user, bool isHorizontal, ProjectState projectState)
        {
            if (projectState != ProjectState.WaitingStartCensor && projectState != ProjectState.WaitingEndCensor)
                throw new Exception("项目状态不正确");

            var database = query.Database;
            var projectTypesID = getWaitingCensorProjectTypesID(query, user, isHorizontal, database);

            return query.Where(q => (q.CurrentState.State == projectState) && (projectTypesID.Contains(q.Type.TypeID))).Count();

        }
        private static List<int> getWaitingCensorProjectTypesID(IEntityDataAccess<Project> query, User user, bool isHorizontal, IDatabase database)
        {
            if (isHorizontal)
                return user.GetCanCensorHorizontalProjectTypes(database).Select(q => q.ID).ToList();

            return user.GetCanCensorVerticalProjectTypes(database).Select(q => q.ID).ToList();
        }
        /// <summary>
        /// 取得项目负责人所在的学院集合
        /// </summary>
        /// <param name="query"></param>
        /// <returns></returns>
        public static IList<Department> GetProjectColleges(this IQueryable<Project> query)
        {
            return query
                .Select(q => q.Principal.College)
                .Distinct()
                .ToList();
        }
        /// <summary>
        ///  取得专家为提交的项目
        /// </summary>
        /// <param name="query"></param>
        /// <param name="user"></param>
        /// <param name="isHorizontal"></param>
        /// <param name="databse"></param>
        /// <returns></returns>
        public static IList<Project> GetMyUnsubmitProjects(this IQueryable<Project> query, User user, bool isHorizontal, IDatabase databse)
        {
            return query
                .Where(p => p.Principal.User == user && p.CurrentState.State == ProjectState.WaitingStartInformation && p.Type.Rank.IsHorizontal == isHorizontal)
                .ToList();
        }
        /// <summary>
        /// 取得专家在研的项目
        /// </summary>
        /// <param name="query"></param>
        /// <param name="user"></param>
        /// <returns></returns>
        public static IList<Project> GetMyProcessingProject(this IQueryable<Project> query, User user)
        {
            if (!user.IsExpert)
                throw new ArgumentException("user");

            return query
                .Where(q => q.Principal.UserID == user.ID
                && q.CurrentState.State == ProjectState.ProjectProcessing)
                .ToList();
        }
        /// <summary>
        /// 
        /// </summary>
        /// <param name="value"></param>
        /// <returns></returns>
        private static string moneyRender(string value)
        {
            if (value == "")
                return "";
            if (value == "0")
                return "0";

            long money = Convert.ToInt64(value);
            return ((double)money / 100 / 10000).ToString() + "万";
        }
        /// <summary>
        /// 取得项目的外协公司分配计划字符串
        /// </summary>
        /// <param name="project"></param>
        /// <returns></returns>
        public static string GetProjectOutsourcingPlanAmountString(this Project project, IDatabase databse)
        {
            var list = databse.ProjectOuts.Where(p => p.Project == project).ToList();
            StringBuilder Outsourcinglist = new StringBuilder();
            foreach (var item in list)
            {
                Outsourcinglist.Append(item.Outsourcing.Name);
                Outsourcinglist.Append("：");
                Outsourcinglist.Append(moneyRender(item.Amount.ToString()));
                Outsourcinglist.Append("\n");
            }
            return Outsourcinglist.ToString();
        }
        /// <summary>
        /// 取得项目的外协公司已分配金额
        /// </summary>
        /// <param name="project"></param>
        /// <returns></returns>
        public static string GetProjectOutsourcingAlreadyAmountString(this Project project, IDatabase databse)
        {
            var list = databse.VoucherOuts.Where(p => p.Voucher.FundAllocation.FundDescend.ProjectInfo_Fund.Project == project && (p.Voucher.CurrentState.State == VoucherState.Allocated || p.Voucher.CurrentState.State == VoucherState.NotSignIn || p.Voucher.CurrentState.State == VoucherState.UnPrinted || p.Voucher.CurrentState.State == VoucherState.SignIn)).ToList();
            StringBuilder Outsourcinglist = new StringBuilder();
            foreach (var item in list)
            {
                Outsourcinglist.Append(item.Corporation);
                Outsourcinglist.Append("：");
                Outsourcinglist.Append(moneyRender(item.Amount.ToString()));
                Outsourcinglist.Append("\n");
            }
            return Outsourcinglist.ToString();
        }
    }
    /// <summary>
    /// 项目的权限扩展
    /// </summary>
    public static class ProjectPermissionExtension
    {

        /// <summary>
        /// 用户是否可以添加涉密项目
        /// </summary>
        /// <param name="user"></param>
        /// <returns></returns>
        public static bool HasPermission_AddSecretProject(this User user)
        {
            return user.UserRole.Type == UserRoleType.Administrator;
        }
        /// <summary>
        /// 判断用户能否查看某个项目
        /// </summary>
        /// <param name="user"></param>
        /// <param name="project"></param>
        /// <param name="database"></param>
        /// <returns></returns>
        public static bool HasPermission_Show(this User user, Project project, IDatabase database)
        {
            if (project.IsPrincipal(user))
                return true;

            return user.CanShowProjectsOf(project.Type.Type, database);
        }
        /// <summary>
        /// 项目能否被用户查看
        /// </summary>
        /// <param name="user"></param>
        /// <param name="project"></param>
        /// <param name="database"></param>
        /// <returns></returns>
        public static bool CanShow(this User user, Project project, IDatabase database)
        {
            return user.HasPermission_Show(project, database);
        }
        /// <summary>
        /// 用户是否具有编辑该项目的权限
        /// </summary>
        /// <param name="user"></param>
        /// <param name="project"></param>
        /// <param name="database"></param>
        /// <returns></returns>
        public static bool HasPermission_Edit(this User user, Project project, IDatabase database)
        {
            if (project.IsNew)
                return user.IsExpert
                    || !project.Type.Rank.IsHorizontal && user.HasPermission_EditVerticalProject(database)
                    || project.Type.Rank.IsHorizontal && user.HasPermission_EditHorizontalProject(database);
            else
                return project.IsPrincipal(user) || user.CanEditProjectsOf(project.Type.Type, database);
        }
        /// <summary>
        /// 该项目是否能被用户编辑
        /// </summary>
        /// <param name="user"></param>
        /// <param name="project"></param>
        /// <param name="database"></param>
        /// <returns></returns>
        public static bool CanEdit(this User user, Project project, IDatabase database)
        {
            if (!user.HasPermission_Edit(project, database))
                return false;

            switch (project.CurrentState.State)
            {
                case ProjectState.WaitingStartInformation:
                    return user.HasPermission_Edit(project, database);

                case ProjectState.WaitingStartCensor:
                case ProjectState.ProjectProcessing:
                case ProjectState.WaitingEndCensor:
                    return !user.IsExpert && user.HasPermission_Edit(project, database);

                case ProjectState.ProjectEnd:
                case ProjectState.Terminate:
                case ProjectState.Defer:
                case ProjectState.DeferEnd:
                    return user.HasPermission(PermissionItem.ManageFinishProject, database);

                case ProjectState.WithDraw:
                    return user.IsSuper;

                default:
                    throw new InvalidDataException();
            }
        }
        /// <summary>
        /// 是否具有改变项目状态的权限
        /// </summary>
        /// <param name="user"></param>
        /// <param name="project"></param>
        /// <param name="Database"></param>
        /// <returns></returns>
        public static bool HasPermission_ChangeState(this User user, Project project, IDatabase Database)
        {
            return user.HasPermission_Edit(project, Database);
        }
        /// <summary>
        /// 能够改变项目状态
        /// </summary>
        /// <param name="user"></param>
        /// <param name="project"></param>
        /// <param name="database"></param>
        /// <returns></returns>
        public static bool CanChangeState(this User user, Project project, IDatabase database)
        {
            if (!user.HasPermission_ChangeState(project, database))
                return false;

            return user.CanEdit(project, database);
        }
        /// <summary>
        /// 是否具有自定义管理费的权限
        /// </summary>
        /// <param name="user"></param>
        /// <param name="project"></param>
        /// <returns></returns>
        public static bool HasPermission_CustomOverheadExpense(this User user, Project project)
        {
            return user.IsSuper;
        }
        /// <summary>
        ///能够自定义管理费
        /// </summary>
        /// <param name="user"></param>
        /// <param name="project"></param>
        /// <returns></returns>
        public static bool CanCustomOverheadExpense(this User user, Project project)
        {
            return user.HasPermission_CustomOverheadExpense(project);
        }
        /// <summary>
        /// 判断用户是否具有删除项目权限
        /// </summary>
        /// <param name="user"></param>
        /// <param name="project"></param>
        /// <param name="database"></param>
        /// <returns></returns>
        public static bool HasPermission_Delete(this User user, Project project, IDatabase database)
        {
            return user.HasPermission_Edit(project, database);
        }
        /// <summary>
        /// 判断项目能否被该用户删除
        /// </summary>
        /// <param name="user"></param>
        /// <param name="project"></param>
        /// <param name="database"></param>
        /// <returns></returns>
        public static bool CanDelete(this User user, Project project, IDatabase database)
        {
            if (!user.HasPermission_Delete(project, database))
                return false;

            return project.CurrentState.State == ProjectState.WaitingStartCensor
                || project.CurrentState.State == ProjectState.WaitingStartInformation;
        }
        /// <summary>
        /// 判断用户是否具有终止项目权限
        /// </summary>
        /// <param name="user"></param>
        /// <param name="project"></param>
        /// <param name="database"></param>
        /// <returns></returns>
        public static bool HasPermission_Terminate(this User user, Project project, IDatabase database)
        {
            return user.HasPermission_Edit(project, database);
        }
        /// <summary>
        /// 判断项目能否被该用户终止
        /// </summary>
        /// <param name="user"></param>
        /// <param name="project"></param>
        /// <param name="database"></param>
        /// <returns></returns>
        public static bool CanTerminate(this User user, Project project, IDatabase database)
        {
            if (!user.HasPermission_Delete(project, database))
                return false;

            return user.CanEdit(project, database) && project.CurrentState.State == ProjectState.ProjectProcessing;
        }
        /// <summary>
        /// 判断用户是否具有撤销项目权限
        /// </summary>
        /// <param name="user"></param>
        /// <param name="project"></param>
        /// <param name="database"></param>
        /// <returns></returns>
        public static bool HasPermission_WithDraw(this User user, Project project, IDatabase database)
        {
            return user.HasPermission_Edit(project, database);
        }
        /// <summary>
        /// 判断项目能否被该用户撤销
        /// </summary>
        /// <param name="user"></param>
        /// <param name="project"></param>
        /// <param name="database"></param>
        /// <returns></returns>
        public static bool CanWithDraw(this User user, Project project, IDatabase database)
        {
            if (!user.HasPermission_Delete(project, database))
                return false;

            //判断项目是否有经费下拨和经费分配

            return user.CanEdit(project, database) && project.CurrentState.State == ProjectState.ProjectProcessing;
        }
        /// <summary>
        /// 判断项目能够提交立项申请
        /// </summary>
        /// <param name="user"></param>
        /// <param name="project"></param>
        /// <returns></returns>
        public static bool CanSubmitStart(this User user, Project project)
        {
            return project.IsPrincipal(user) && project.CurrentState.State == ProjectState.WaitingStartInformation;
        }
        /// <summary>
        /// 判断项目能够撤销立项申请
        /// </summary>
        /// <param name="user"></param>
        /// <param name="project"></param>
        /// <returns></returns>
        public static bool CanUndoStart(this User user, Project project)
        {
            return project.IsPrincipal(user) && project.CurrentState.State == ProjectState.WaitingStartCensor;
        }
        /// <summary>
        /// 判断项目能否提交结项申请
        /// </summary>
        /// <param name="user"></param>
        /// <param name="project"></param>
        /// <returns></returns>
        public static bool CanSubmitEnd(this User user, Project project)
        {
            return project.IsPrincipal(user) && project.CurrentState.State == ProjectState.ProjectProcessing;
        }
        /// <summary>
        /// 判断能够撤回结项申请
        /// </summary>
        /// <param name="user"></param>
        /// <param name="project"></param>
        /// <returns></returns>
        public static bool CanUndoEnd(this User user, Project project)
        {
            return project.IsPrincipal(user) && project.CurrentState.State == ProjectState.WaitingEndCensor;
        }
        #region 2013年1月12日新的管理费收取方法修改
        /// <summary>
        /// 判断用户是否可以完善校内间接费和校内绩效
        /// </summary>
        /// <param name="user"></param>
        /// <param name="project"></param>
        /// <param name="database"></param>
        /// <returns></returns>
        public static bool CanCompeteIn(this User user, Project project, IDatabase database)
        {
            if (!user.IsExpert)
                if (project.Fund.OverheadExpenseInTotal < 0 || project.Fund.PerformancePay < 0)
                    return true;

            return false;
        }
        #endregion
        /// <summary>
        /// 判断该项目是否是自定义管理费
        /// 标注：属于9类项目中非13%比例的情况
        /// </summary>
        /// <param name="project"></param>
        /// <returns></returns>
        public static bool isCustomManageFee(this Project project)
        {
            //int[] projectTypeIDs = { 7, 8, 11, 12, 13, 23, 30, 70, 117 };
            var projectTypeID = project.Type.TypeID;
            //如果不是九类项目中的一种，返回false
            // if (!projectTypeIDs.Contains(projectTypeID))
            if (project.Type.Type.IsBudget == false)
                return false;
            if (project.Level != ProjectLevel.Perside && project.Fund.FundContract == project.Fund.FundTotal)
                return false;
            return true;
        }
        /// <summary>
        /// 判断用户能否审核项目的立项申请
        /// </summary>
        /// <param name="user"></param>
        /// <param name="project"></param>
        /// <param name="database"></param>
        /// <returns></returns>
        public static bool CanCensorStart(this User user, Project project, IDatabase database)
        {
            #region 2013年1月12日新的管理费收取方法修改
            if (!user.IsExpert)
                if (project.Fund.OverheadExpenseInTotal < 0 || project.Fund.PerformancePay < 0)
                    return false;
            #endregion

            //if (user.IsSuper == false && (project.Fund.OverHeadExpenseInStandard * 0.95 > (project.Fund.OverheadExpenseInTotal + project.Fund.PerformancePay)))
            //    return false;

            //if (user.IsSuper == false && (project.Fund.PerformanceInStandard * 1.05 < project.Fund.PerformancePay))
            //    return false;
            //判断项目所对应外协单位是否审核通过 carlsirce@2013.2.26
            var projectOut = database.ProjectOuts.GetByProjectID(project.ID);
            foreach (var item in projectOut)
            {
                if (item.Outsourcing.IsVerify != "审核通过")
                {
                    return false;
                }
            }
            return user.CanEdit(project, database) && project.CurrentState.State == ProjectState.WaitingStartCensor;
        }
        /// <summary>
        /// 判断用户能否审核项目的结项申请
        /// </summary>
        /// <param name="user"></param>
        /// <param name="project"></param>
        /// <param name="database"></param>
        /// <returns></returns>
        public static bool CanCensorEnd(this User user, Project project, IDatabase database)
        {
            return user.CanEdit(project, database) && project.CurrentState.State == ProjectState.WaitingEndCensor;

        }
        /// <summary>
        /// 判断用户是否有管理项目委托负责人的权限
        /// </summary>
        /// <param name="user"></param>
        /// <param name="project"></param>
        /// <param name="database"></param>
        /// <returns></returns>
        public static bool HasPermissionManageDelegatePrincipal(this User user, Project project, IDatabase database)
        {
            return (project.IsPrincipal(user) || user.CanEdit(project, database))
               && project.CurrentState.State == ProjectState.ProjectProcessing;
        }
        /// <summary>
        /// 判断用户能够指定项目的委托负责人
        /// </summary>
        /// <param name="user"></param>
        /// <param name="project"></param>
        /// <param name="database"></param>
        /// <returns></returns>
        public static bool CanSetDelegatePrincipal(this User user, Project project, IDatabase database)
        {
            return (project.IsPrincipal(user) || user.CanEdit(project, database))
                && project.CurrentState.State == ProjectState.ProjectProcessing
                && project.PrincipalDelegate == null;
        }
        /// <summary>
        /// 判断用户能够取消项目的委托负责人
        /// </summary>
        /// <param name="user"></param>
        /// <param name="project"></param>
        /// <param name="database"></param>
        /// <returns></returns>
        public static bool CanClearDelegatePrincipal(this User user, Project project, IDatabase database)
        {
            return (project.IsPrincipal(user) || user.CanEdit(project, database))
                && project.CurrentState.State == ProjectState.ProjectProcessing
                && project.PrincipalDelegate != null;
        }

    }
}

