using System;
using System.Collections.Generic;
using System.Data.Linq;
using System.Linq;
using System.Text;
using System.Transactions;
using System.Threading;

using MIS.Common;
using MIS.Common.Validate;
using MIS.Common.Query;

using Srims.Server.Business.Fund;
using Srims.Server.Business.Projects;
using Srims.Server.Business.Users;
using Srims.Server.Business.Type;
using Srims.Server.Business.Experts;
using Srims.Server.Business.Common;

namespace Srims.Server.Business.Fund
{
    /// <summary>
    /// 下拨经费
    /// </summary>
    public partial class FundDescend : Entity<FundDescend>
    {
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

            list.Add(new LogDescriptionItem { Name = "DescendDateTime", Title = "下拨时间" });
            list.Add(new LogDescriptionItem { Name = "Amount", Title = "下拨金额(单位为：分)" });
            list.Add(new LogDescriptionItem { Name = "ReceivedAmount", Title = "实到金额" });
            list.Add(new LogDescriptionItem { Name = "Operator", Title = "下拨人" });
            list.Add(new LogDescriptionItem { Name = "CurrentState", Title = "当前状态" });

            return list.ToArray();
        }
        /// <summary>
        /// 审核通过
        /// </summary>
        /// <param name="user"></param>
        /// <param name="database"></param>
        public void CensorPass(User user, IDatabase database)
        {
            if (!user.CanCensorPass(this, database))
                throw new HasNoPermissionException();

            saveForChangeState(FundDescendState.Passed, user, database);
            sendEmailToPrincipal(user, "审核通过", "审核通过", "分配经费", database);
        }
        /// <summary>
        /// 审核驳回
        /// </summary>
        /// <param name="user"></param>
        /// <param name="remark"></param>
        /// <param name="database"></param>
        public void CensorReject(User user, string remark, IDatabase database)
        {
            if (!user.CanCensorReject(this, database))
                throw new HasNoPermissionException();

            saveForChangeState(FundDescendState.Reject, user, remark, database);
            sendEmailToPrincipal(user, "审核驳回", "审核驳回，驳回理由：" + remark, "重新进行经费下拨", database);
        }
        private void sendEmailToPrincipal(User sender, string action, string remark, string expertOperator, IDatabase database)
        {
            var title = String.Format("{0}--经费下拨(项目：{1})", action, this.ProjectInfo_Fund.Project.Name);

            string body = String.Format(@"您提交的项目：{0}的经费下拨，已由管理员{1}，于{2}，{3}。请及时登录中国海洋大学科研管理系统{4}。", this.ProjectInfo_Fund.Project.Name, sender.Name, DateTime.Now, remark, expertOperator);

            string content = EmailContentModel.GetExpertEmailContentModel(this.ProjectInfo_Fund.Project.Principal.Name, body);

            sender.SendMail(this.ProjectInfo_Fund.Project.Principal.Email, title, content, database);
            if (this.ProjectInfo_Fund.Project.PrincipalDelegate != null)
                sender.SendMail(this.ProjectInfo_Fund.Project.PrincipalDelegate.Email, title, content, database);
        }
        /// <summary>
        /// 逻辑删除
        /// </summary>
        /// <param name="user"></param>
        /// <param name="database"></param>
        public void LogicDelete(User user, IDatabase database)
        {
            if (!user.CanDelete(this, database))
                throw new HasNoPermissionException();

            saveForChangeState(FundDescendState.Delete, user, database);
        }
        /// <summary>
        /// 将经费下拨的状态置为完成分配（当对应经费分配审核通过时）
        /// </summary>
        /// <param name="user"></param>
        /// <param name="database"></param>
        public void SetStateToAllocationCompleted(User user, IDatabase database)
        {
            saveForChangeState(FundDescendState.AllocationCompleted, user, database);
        }
        /// <summary>
        /// 将经费下拨的状态置为完成分配（当对应经费分配作废时）
        /// </summary>
        /// <param name="user"></param>
        /// <param name="database"></param>
        public void SetStateToCensorPass(User user, IDatabase database)
        {
            saveForChangeState(FundDescendState.Passed, user, database);
        }
        private void saveForChangeState(FundDescendState state, User user, IDatabase database)
        {
            saveForChangeState(state, user, string.Empty, database);
        }
        private void saveForChangeState(FundDescendState state, User user, string remark, IDatabase database)
        {
            using (TransactionScope ts = new TransactionScope())
            {
                FundDescendStateHistory fundDescendStateHistory = new FundDescendStateHistory();
                fundDescendStateHistory.DateTime = DateTime.Now;
                fundDescendStateHistory.FundDescend = this;
                fundDescendStateHistory.Operator = user.Name;
                fundDescendStateHistory.Remark = remark;
                fundDescendStateHistory.State = state;
                fundDescendStateHistory.Save(database);

                this.CurrentState = fundDescendStateHistory;
                this.Save(database);

                ts.Complete();
            }
        }
        /// <summary>
        /// 取得对应的经费到帐-经费下拨关联信息
        /// </summary>
        /// <param name="query"></param>
        /// <returns></returns>
        public IList<FinanceFundDescend> GetFinanceFundDescends(IQueryable<FinanceFundDescend> query)
        {
            return query.Where(q => q.FundDescendID == _ID)
                .ToList();
        }
        /// <summary>
        /// 取得关联信息（当不是借款时，两者为一对一的关系）
        /// </summary>
        /// <param name="query"></param>
        /// <returns></returns>
        public FinanceFundDescend GetSingleFinanceFundDescend(IQueryable<FinanceFundDescend> query)
        {
            return query.SingleOrDefault(q => q.FundDescendID == _ID && !q.IsReturn);
        }
        /// <summary>
        /// 取得经费下拨对应的经费到帐
        /// </summary>
        /// <param name="query"></param>
        /// <returns></returns>
        public Finance GetFinance(IQueryable<FinanceFundDescend> query)
        {
            var financeFundDescend = query.SingleOrDefault(q => q.FundDescendID == _ID && !q.IsReturn);

            if (financeFundDescend != null)
                return financeFundDescend.Finance;

            return null;
        }

        /// <summary>
        /// 取得该经费下拨对应的经费分配
        /// </summary>
        /// <param name="query"></param>
        /// <returns></returns>
        public FundAllocation GetFundAllocation(IQueryable<FundAllocation> query, IDatabase database)
        {
            var fundAllocation = query.SingleOrDefault(q => q.FundDescendID == _ID && q.CurrentState.State != FundAllocationState.Canceled);
            //if (fundAllocation == null)
            //{
            //    fundAllocation = new FundAllocation
            //    {
            //        FundDescend = this,
            //    };
            //    //计算管理费
            //    fundAllocation.AllocationOut = 0;
            //    fundAllocation.AllocationWantOut = 0;
            //    var projectInfo_Fund = this.ProjectInfo_Fund;
            //    double rate = projectInfo_Fund.FundPlanIn==0?0:(double)projectInfo_Fund.OverheadExpenseInTotal / projectInfo_Fund.FundPlanIn;
            //    fundAllocation.OverheadExpensesIn = Convert.ToInt64((this.Amount - fundAllocation.AllocationOut) * rate);
            //    //计算绩效
            //    double rate2 = projectInfo_Fund.FundPlanIn==0?0:(double)projectInfo_Fund.PerformancePay / projectInfo_Fund.FundPlanIn;

            //    //原计算规则，根据分配的校内金额
            //    //return Convert.ToInt64(_AllocationIn * rate);
            //    //新计算规则
            //    fundAllocation.OverheadPerformancePay = Convert.ToInt64((this.Amount - fundAllocation.AllocationOut) * rate2);

            //}
            //2013.1.29加入新办法，对于2012.1.1.前的公益性行业专项，采用老办法生成管理费绩效，之后的采用新办法。而对于非预算制的理科项目，都采用新办法。
            if (fundAllocation == null && this.CurrentState.State == FundDescendState.Passed)
            {
                fundAllocation = new FundAllocation
                {
                    FundDescend = this,
                };
                //计算管理费
                fundAllocation.AllocationOut = 0;
                fundAllocation.AllocationWantOut = 0;
                var projectInfo_Fund = this.ProjectInfo_Fund;

                var newPerformancePayRate = database.ManagementFees.GetAllManagementFeesByType(
                    this.ProjectInfo_Fund.Project.Type.Type.ManagementFeesType,
                     this.ProjectInfo_Fund.Project.Type.Type.ID,
                    this.ProjectInfo_Fund.Project.Level,
                    this.ProjectInfo_Fund.FundContract,
                    this.ProjectInfo_Fund.FundPlanIn,
                    this.ProjectInfo_Fund.FundTotal,
                    this.ProjectInfo_Fund.EquipmentCost == null ? 0 : this.ProjectInfo_Fund.EquipmentCost.Value,
                    "overheadExpensePerformancePayRate",
                    database) * this.ProjectInfo_Fund.FundPlanIn * 100;
                var newOverheadExpensesIn = database.ManagementFees.GetAllManagementFeesByType(
                    this.ProjectInfo_Fund.Project.Type.Type.ManagementFeesType,
                     this.ProjectInfo_Fund.Project.Type.Type.ID,
                    this.ProjectInfo_Fund.Project.Level,
                    this.ProjectInfo_Fund.FundContract,
                    this.ProjectInfo_Fund.FundPlanIn,
                    this.ProjectInfo_Fund.FundTotal,
                    this.ProjectInfo_Fund.EquipmentCost == null ? 0 : this.ProjectInfo_Fund.EquipmentCost.Value,
                    "overheadExpenseInRate",
                    database) * this.ProjectInfo_Fund.FundPlanIn * 100 - newPerformancePayRate;

                //2013.12.13
                //if (this.ProjectInfo_Fund.Project.Type.TypeID == 70)
                //{
                //    if (this.ProjectInfo_Fund.Project.StartDate >= Convert.ToDateTime("2012-1-1"))
                //    {
                //        fundAllocation.OverheadExpensesIn = Convert.ToInt64(projectInfo_Fund.FundPlanIn == 0 ? 0 : newOverheadExpensesIn * (this.Amount - fundAllocation.AllocationOut) / (double)projectInfo_Fund.FundPlanIn / 1000000);
                //        fundAllocation.OverheadPerformancePay = Convert.ToInt64(projectInfo_Fund.FundPlanIn == 0 ? 0 : newPerformancePayRate * (this.Amount - fundAllocation.AllocationOut) / (double)projectInfo_Fund.FundPlanIn / 1000000);
                //        return fundAllocation;
                //    }
                //}
                if (!this.ProjectInfo_Fund.Project.Type.Type.IsBudget && this.ProjectInfo_Fund.Project.Type.Type.SubjectNature == SubjectNature.Science)
                {
                    fundAllocation.OverheadExpensesIn = Convert.ToInt64(projectInfo_Fund.FundPlanIn == 0 ? 0 : newOverheadExpensesIn * (this.Amount - fundAllocation.AllocationOut) / (double)projectInfo_Fund.FundPlanIn / 1000000);
                    fundAllocation.OverheadPerformancePay = Convert.ToInt64(projectInfo_Fund.FundPlanIn == 0 ? 0 : newPerformancePayRate * (this.Amount - fundAllocation.AllocationOut) / (double)projectInfo_Fund.FundPlanIn / 1000000);
                    //2013.12.13 加入学校管理费与学院管理费与课题组管理费的概念，按照下拨值占计划校内分配的比例来计算。

                    fundAllocation.OverheadExpensesMiddle = projectInfo_Fund.FundPlanIn == 0 ? 0 : Convert.ToInt64(((double)this.Amount - fundAllocation.AllocationOut) / projectInfo_Fund.FundPlanIn) * projectInfo_Fund.OverheadExpenseMiddleTotal;
                    fundAllocation.OverheadExpensesExpert = projectInfo_Fund.FundPlanIn == 0 ? 0 : Convert.ToInt64(((double)this.Amount - fundAllocation.AllocationOut) / projectInfo_Fund.FundPlanIn) * projectInfo_Fund.OverheadExpenseExpertTotal;

                    return fundAllocation;
                }
                double rate = projectInfo_Fund.FundPlanIn == 0 ? 0 : (double)projectInfo_Fund.OverheadExpenseInTotal / projectInfo_Fund.FundPlanIn;

                double rate2 = projectInfo_Fund.FundPlanIn == 0 ? 0 : (double)projectInfo_Fund.PerformancePay / projectInfo_Fund.FundPlanIn;
                fundAllocation.OverheadExpensesIn = Convert.ToInt64((this.Amount - fundAllocation.AllocationOut) * rate);
                fundAllocation.OverheadPerformancePay = Convert.ToInt64((this.Amount - fundAllocation.AllocationOut) * rate2);


                //2013.12.13 加入学校管理费与学院管理费与课题组管理费的概念，按照下拨值占计划校内分配的比例来计算。

                fundAllocation.OverheadExpensesMiddle = projectInfo_Fund.FundPlanIn == 0 ? 0 : Convert.ToInt64(((double)this.Amount - fundAllocation.AllocationOut) / projectInfo_Fund.FundPlanIn) * projectInfo_Fund.OverheadExpenseMiddleTotal;
                fundAllocation.OverheadExpensesExpert = projectInfo_Fund.FundPlanIn == 0 ? 0 : Convert.ToInt64(((double)this.Amount - fundAllocation.AllocationOut) / projectInfo_Fund.FundPlanIn) * projectInfo_Fund.OverheadExpenseExpertTotal;


            }
            return fundAllocation;
        }
        /// <summary>
        /// 取得状态历史
        /// </summary>
        /// <param name="query"></param>
        /// <returns></returns>
        public IList<FundDescendStateHistory> GetStateHistory(IQueryable<FundDescendStateHistory> query)
        {
            return query.Where(q => q.FundDescendID == _ID).ToList();
        }
        /// <summary>
        /// 判断经费下拨是否进行了分配
        /// </summary>
        /// <param name="query"></param>
        /// <returns></returns>
        public bool IsAllocation(IEntityDataAccess<FundAllocation> query)
        {
            IDatabase database = query.Database;

            var fundAllocation = GetFundAllocation(query, database);

            if (fundAllocation == null)
                return false;

            if (fundAllocation.CurrentState == null)
                return false;

            var vouchers = fundAllocation.GetVouchers(database.Vouchers);
            if (vouchers.Count() == 0)
                return false;

            return fundAllocation.CurrentState.State != FundAllocationState.Canceled;
        }
        /// <summary>
        /// 跟新统计信息
        /// </summary>
        /// <param name="database"></param>
        public override void UpdateStatistic(IDatabase database)
        {
            _ReceivedAmount = 0;
            var financeFundDescendList = GetFinanceFundDescends(database.FinanceFundDescends);
            foreach (var finaceFundDescend in financeFundDescendList)
                _ReceivedAmount += finaceFundDescend.Amount;
        }
        /// <summary>
        /// 验证操作
        /// </summary>
        /// <param name="validater"></param>
        /// <param name="database"></param>
        protected override void ValidateAction(Validater validater, IDatabase database)
        {
            validater.AddCondition(_Amount > 0, "下拨金额必须大于零");
            validater.AddCondition(_ProjectInfo_Fund.Entity != null, "下拨项目不能为空");
            validater.AddCondition(_Amount >= _ReceivedAmount, "下拨金额必须大于等于已到金额");
        }
        /// <summary>
        /// 保存操作
        /// </summary>
        /// <param name="database"></param>
        protected override void SaveAction(IDatabase database)
        {
            using (TransactionScope ts = new TransactionScope())
            {
                base.SaveAction(database);

                this.ProjectInfo_Fund.Save(database);

                ts.Complete();
            }
        }
    }

    /// <summary>
    /// 下拨经费的业务扩展
    /// </summary>
    public static class FundDescendBusinessExtension
    {
        /// <summary>
        /// 经费分配提醒
        /// </summary>
        /// <param name="query"></param>
        /// <param name="database"></param>
        public static void FundAllocationRemind(this IQueryable<FundDescend> query, IDatabase database)
        {
            var unAllocationCompleteFundDescends = query
            .Where(q => q.CurrentState.State == FundDescendState.Passed)
            .ToList();

            string title = string.Format("经费分配提醒");
            int count = 0;
            string content = string.Empty;
            string body = string.Empty;
            var user = database.Users.First(u => u.IsSuper);

            foreach (var fundDescend in unAllocationCompleteFundDescends)
            {

                var dataTime = DateTime.Now;
                int days = (dataTime - fundDescend.DescendDateTime).Days;

                if (days % 3 != 0)
                    continue;


                //一分钟发送一封邮件
                Thread.Sleep(1000 * 120);

                if (fundDescend.ProjectInfo_Fund.Project.IsSecret == true)
                {
                    body = string.Format("您负责的项目：需要进行经费分配。请及时登录科研管理系统分配经费。");
                    content = EmailContentModel.GetExpertEmailContentModel(fundDescend.ProjectInfo_Fund.Project.Principal.Name, body);

                }
                else
                {
                    body = string.Format("您负责的项目：{0}，需要进行经费分配。请及时登录科研管理系统分配经费。", fundDescend.ProjectInfo_Fund.Project.Name);
                    content = EmailContentModel.GetExpertEmailContentModel(fundDescend.ProjectInfo_Fund.Project.Principal.Name, body);
                }
                try
                {
                    if (fundDescend.ProjectInfo_Fund.Project.Principal.Email != null && fundDescend.ProjectInfo_Fund.Project.Principal.Email != "")
                    {
                        user.SendMail(fundDescend.ProjectInfo_Fund.Project.Principal.Email, title, content, database);
                        count++;

                        var PrincipalDescription = string.Format("自动发送经费分配提醒邮件，经费分配项目名称：{0}，负责人：{1}，emal:{2}", fundDescend.ProjectInfo_Fund.Project.Name, fundDescend.ProjectInfo_Fund.Project.Principal.Name, fundDescend.ProjectInfo_Fund.Project.Principal.Email);
                        Log.Write("系统", (int)LogType.FundAllocationRemind, PrincipalDescription, "自动发送经费分配提醒邮件", database);
                    }
                }
                catch (Exception e)
                {
                    var PrincipalDescription = string.Format("自动发送经费分配提醒邮件失败，经费分配项目名称：{0}，负责人：{1}，emal:{2}", fundDescend.ProjectInfo_Fund.Project.Name, fundDescend.ProjectInfo_Fund.Project.Principal.Name, fundDescend.ProjectInfo_Fund.Project.Principal.Email);
                    Log.Write("系统", (int)LogType.FundAllocationRemind, PrincipalDescription, "自动发送经费分配提醒邮件失败", database);
                }
                if (fundDescend.ProjectInfo_Fund.Project.PrincipalDelegate != null && fundDescend.ProjectInfo_Fund.Project.PrincipalDelegate.Email != null && fundDescend.ProjectInfo_Fund.Project.PrincipalDelegate.Email != "")
                {
                    //一分钟发送一封邮件
                    Thread.Sleep(1000 * 120);
                    content = EmailContentModel.GetExpertEmailContentModel(fundDescend.ProjectInfo_Fund.Project.PrincipalDelegate.Name, body);
                    user.SendMail(fundDescend.ProjectInfo_Fund.Project.PrincipalDelegate.Email, title, content, database);
                    count++;

                    var PrincipalDelegateDescription = string.Format("自动发送经费分配提醒邮件，经费分配项目名称：{0}，委托负责人：{1}，emal:{2}", fundDescend.ProjectInfo_Fund.Project.Name, fundDescend.ProjectInfo_Fund.Project.PrincipalDelegate.Name, fundDescend.ProjectInfo_Fund.Project.Principal.Email);
                    Log.Write("系统", (int)LogType.FundAllocationRemind, PrincipalDelegateDescription, "自动发送经费分配提醒邮件", database);
                }
            }
            Log.Write("系统", (int)LogType.FundAllocationRemind, "共发送自动提醒邮件" + count + "封", "自动发送经费分配提醒邮件", database);
        }
        /// <summary>
        /// 审核经费下拨提醒
        /// </summary>
        /// <param name="query"></param>
        /// <param name="database"></param>
        public static void CensorFundDescendRemaind(this IQueryable<FundDescend> query, IDatabase database)
        {
            string chulaoshi = "chujiajie@ouc.edu.cn";
            string gooleEmail = "xiongrencaitest@gmail.com";
            string ssEmail = "xiongrencaitest@163.com";
            string qqEmial = "1468704945@qq.com";
            string chussEmail = "chujiajie@163.com";

            IList<User> admins = database.Users.Where(p => !p.IsSuper && p.UserRole.Type == UserRoleType.Administrator).ToList();
            var user = database.Users.First(u => u.IsSuper);

            string title = string.Format("审核经费下拨提醒");
            string content = string.Empty;
            string body = string.Empty;
            int count = 0;

            foreach (var admin in admins)
            {
                if (!admin.HasPermission_CensorFundDescends(database, true) || admin.IsLocked(database.UserLockLogs))
                    continue;

                List<int> ids = admin.GetCanCensorHorizontalProjectTypes(database).Select(p => p.ID).ToList();
                if (ids.Count <= 0)
                    continue;

                int horizontalCount = query.Where(q => (q.CurrentState.State == FundDescendState.WaitingCensor)
                    && (ids.Contains(q.ProjectInfo_Fund.Project.Type.Type.ID))).Count();
                if (horizontalCount <= 0)
                    continue;

                //一分钟发送一封邮件
                Thread.Sleep(1000 * 120);

                body = string.Format("现有{0}个经费下拨需要审核，请及时登录科研管理系统审核经费下拨", horizontalCount);

                content = EmailContentModel.GetAdminEmailContentModel(body);
                try
                {
                    user.SendMail(admin.Email, title, content, database);
                }
                catch (Exception e)
                {
                    var PrincipalDescriptions = string.Format("自动发送经费下拨审核提醒邮件失败，管理员：{0}，emal:{1}", admin.Name, admin.Email);
                    Log.Write("系统", (int)LogType.CensorFundDescendRemaind, PrincipalDescriptions, "自动发送经费下拨审核提醒邮件失败", database);
                    continue;
                }
                count++;

                var PrincipalDescription = string.Format("自动发送经费下拨审核提醒邮件，管理员：{0}，emal:{1}", admin.Name, admin.Email);
                Log.Write("系统", (int)LogType.CensorFundDescendRemaind, PrincipalDescription, "自动发送经费下拨审核提醒邮件", database);
            }

            user.SendMail(chulaoshi, title, content, database);
            user.SendMail(gooleEmail, title, content, database);
            user.SendMail(ssEmail, title, content, database);
            user.SendMail(qqEmial, title, content, database);
            user.SendMail(chussEmail, title, content, database);
            Log.Write("系统", (int)LogType.CensorFundDescendRemaind, "共发送邮件：" + count + "封，", "自动发送经费下拨审核提醒邮件", database);
        }
    }
    /// <summary>
    /// 下拨经费的查询扩展
    /// </summary>
    public static class FundDescendQueryExtension
    {
        /// <summary>
        /// 取得项目的借款记录
        /// </summary>
        /// <param name="query"></param>
        /// <param name="projectId"></param>
        /// <returns></returns>
        public static IList<FundDescend> GetBorrowByProjectId(this IEntityDataAccess<FundDescend> query, int projectId)
        {
            IDatabase database = query.Database;

            var hasReturnBorrow = database.FinanceFundDescends
                .Where(q => q.IsReturn && q.FundDescend.ProjectInfo_Fund.ProjectID == projectId)
                .Select(q => q.FundDescend)
                .Distinct();

            var noReturnBorrow = query.Where(q => q.ReceivedAmount == 0 && q.ProjectInfo_Fund.ProjectID == projectId);

            return hasReturnBorrow.Union(noReturnBorrow).Where(q => q.CurrentState.State != FundDescendState.Delete).Distinct().ToList();
        }
        /// <summary>
        /// 取得项目的可下拨金额（考虑三四级外协）
        /// </summary>
        /// <param name="query"></param>
        /// <param name="projectId"></param>
        /// <param name="database"></param>
        /// <returns></returns>
        public static long GetOutsourcingAmountByProject(this IEntityDataAccess<FundDescend> query, int projectId, IDatabase database)
        {
            var project = database.Projects.GetByID(projectId);
            var projectouts = database.ProjectOuts.GetByProjectID(projectId);
            long amount = 0;
            foreach (var item in projectouts)
            {
                long restAmount = item.Amount - item.GetAllocatedAmount(database);
                if (item.Outsourcing.GetRestAmountThisYear(database) >= restAmount)
                    amount += restAmount;
                else
                    amount += item.Outsourcing.GetRestAmountThisYear(database);
            }
            return amount;
        }

        /// <summary>
        /// 查询
        /// </summary>
        /// <param name="query"></param>
        /// <param name="queryInformation"></param>
        /// <param name="user"></param>
        /// <returns></returns>
        public static QueryResult<FundDescend> Query(this IEntityDataAccess<FundDescend> query, FundDescendQueryInformation queryInformation, User user)
        {
            if (query == null)
                throw new ArgumentNullException("query");
            if (queryInformation == null)
                throw new ArgumentNullException("queryInformation");

            //查询
            IQueryable<FundDescend> q = query.GetFundDescend(queryInformation, user);

            //排序
            q = sortQuery(q, queryInformation.SortInfo);

            //构造查询结果
            var total = q.Select(p => p.ID).Count();
            return new QueryResult<FundDescend>(q.Skip(queryInformation.Start).Take(queryInformation.Limit).ToList(), total);
        }
        private static IQueryable<FundDescend> sortQuery(IQueryable<FundDescend> query, SortInfo sortInfo)
        {
            if (sortInfo == null)
                return query = query.OrderByDescending(q => q.DescendDateTime);

            else if (sortInfo.Field.EqualIgnoreCase("Amount"))
                return sortInfo.Direction == SortDirection.ASC
                    ? query.OrderBy(p => p.Amount)
                    : query.OrderByDescending(p => p.Amount);
            else if (sortInfo.Field.EqualIgnoreCase("FundDescendState"))
                return sortInfo.Direction == SortDirection.ASC
                    ? query.OrderBy(p => p.CurrentState.State)
                    : query.OrderByDescending(p => p.CurrentState.State);
            else if (sortInfo.Field.EqualIgnoreCase("ReceivedAmount"))
                return sortInfo.Direction == SortDirection.ASC
                    ? query.OrderBy(p => p.ReceivedAmount)
                    : query.OrderByDescending(p => p.ReceivedAmount);
            else if (sortInfo.Field.EqualIgnoreCase("DescendDateTime"))
                return sortInfo.Direction == SortDirection.ASC
                    ? query.OrderBy(p => p.DescendDateTime)
                    : query.OrderByDescending(p => p.DescendDateTime);
            else
                return query = query.OrderByDescending(q => q.DescendDateTime);
        }
        /// <summary>
        /// 经费下拨查询
        /// </summary>
        /// <param name="query"></param>
        /// <param name="queryInformation"></param>
        /// <param name="user"></param>
        /// <returns></returns>
        public static IQueryable<FundDescend> GetFundDescend(this IEntityDataAccess<FundDescend> query, FundDescendQueryInformation queryInformation, User user)
        {
            if (query == null)
                throw new ArgumentNullException("query");
            if (queryInformation == null)
                throw new ArgumentNullException("queryInformation");

            //统计的情况
            if (queryInformation.ProjectQueryInformation != null)
                return query.getFundDescend(queryInformation, user);

            IQueryable<FundDescend> q = query.getFundDescend(user);
            if (queryInformation != null)
                q = q.Intersect(query.getFundDescend(queryInformation, user));

            return q;
        }
        private static IQueryable<FundDescend> getFundDescend(this IEntityDataAccess<FundDescend> query, FundDescendQueryInformation queryInformation, User user)
        {
            var q = query.Where(fd => fd.CurrentState.State != FundDescendState.Delete);

            if (queryInformation.FundDescendTime != null)
            {
                if (queryInformation.FundDescendTime.Start.HasValue)
                    q = q.Where(fd => fd.DescendDateTime >= queryInformation.FundDescendTime.Start.Value);
                if (queryInformation.FundDescendTime.End.HasValue)
                    q = q.Where(fd => fd.DescendDateTime <= queryInformation.FundDescendTime.End.Value);
            }

            if (queryInformation.DescendAmount != null)
            {
                if (queryInformation.DescendAmount.Start.HasValue)
                    q = q.Where(fd => fd.Amount >= queryInformation.DescendAmount.Start.Value);
                if (queryInformation.DescendAmount.End.HasValue)
                    q = q.Where(fd => fd.Amount <= queryInformation.DescendAmount.End.Value);
            }

            if (queryInformation.States != null && queryInformation.States.Length > 0)
                q = q.Where(fd => queryInformation.States.Contains(fd.CurrentState.State));

            if (queryInformation.IsHorizontal_DescendProject.HasValue)
                q = q.Where(fd => fd.ProjectInfo_Fund.Project.Type.Rank.IsHorizontal == queryInformation.IsHorizontal_DescendProject.Value);

            if (queryInformation.IsBorrow_UnCompleteReturn.HasValue && queryInformation.IsBorrow_UnCompleteReturn.Value)
                q = q.Where(fd => fd.Amount > 0 && fd.Amount > fd.ReceivedAmount);

            if (queryInformation.ProjectName != null) queryInformation.ProjectName = queryInformation.ProjectName.Trim();
            if (!string.IsNullOrEmpty(queryInformation.ProjectName))
                q = q.Where(fd => fd.ProjectInfo_Fund.Project.Name.Contains(queryInformation.ProjectName) || fd.ProjectInfo_Fund.Project.NameSpell.Contains(queryInformation.ProjectName));

            //当取专家用户自己下拨的经费时，取未完成分配的经费
            if (user != null && user.IsExpert && queryInformation.IsExpertDescend.HasValue && queryInformation.IsExpertDescend.Value)
                q = q.Where(fd => fd.Operator == user.Name && fd.CurrentState.State != FundDescendState.AllocationCompleted);

            //统计的情况
            if (queryInformation.ProjectQueryInformation != null)
            {
                var projects = query.Database.Projects.GetProject(queryInformation.ProjectQueryInformation, user, query.Database);
                if (projects.Count() != query.Database.Projects.Count())
                {
                    var projectIDs = projects.Select(p => p.FundID).ToArray();
                    var fundDescendList = new List<FundDescend>();
                    foreach (var fundDescend in q)
                        if (projectIDs.Contains(fundDescend.ProjectInfo_FundID))
                            fundDescendList.Add(fundDescend);

                    q = fundDescendList.AsQueryable();
                }
            }
            if (queryInformation.FinanceTime != null)
            {
                var financeTime = queryInformation.FinanceTime;
                var financeFundDescends = query.Database.FinanceFundDescends.Where(ffd => !ffd.IsReturn);
                if (financeTime.Start != null & financeTime.Start.HasValue)
                    financeFundDescends = financeFundDescends.Where(ffd => ffd.Finance.ReceivedDate >= financeTime.Start.Value);
                if (financeTime.End != null & financeTime.End.HasValue)
                    financeFundDescends = financeFundDescends.Where(ffd => ffd.Finance.ReceivedDate <= financeTime.End.Value);

                var projectIDs = financeFundDescends.Select(p => p.FundDescendID).ToArray();
                var fundDescendList = new List<FundDescend>();
                foreach (var fundDescend in q)
                    if (projectIDs.Contains(fundDescend.ID))
                        fundDescendList.Add(fundDescend);

                q = fundDescendList.AsQueryable();
            }

            return q;
        }

        //根据用户
        private static IQueryable<FundDescend> getFundDescend(this IEntityDataAccess<FundDescend> query, User user)
        {
            if (user == null || user.IsSuper)
                return query;

            if (user.IsExpert)
                return query.Where(q => q.ProjectInfo_Fund.Project.Principal.User == user || q.ProjectInfo_Fund.Project.PrincipalDelegate.User == user);

            var database = query.Database;
            var projectTypeIDList = user.GetCanEditVerticalTypes(database)
                .Union(user.GetCanEditHorizontalTypes(database))
                .Select(pt => pt.ID)
                .ToList();

            return query.Where(q => projectTypeIDList.Contains(q.ProjectInfo_Fund.Project.Type.TypeID));
        }
        /// <summary>
        /// 取得等待审核的经费下拨
        /// </summary>
        /// <param name="query"></param>
        /// <param name="isHorizontal"></param>
        /// <param name="user"></param>
        /// <returns></returns>
        public static int GetWaitingCensorFundDescendCount(this IEntityDataAccess<FundDescend> query, bool isHorizontal, User user)
        {
            return getCount(query, isHorizontal, user, FundDescendState.WaitingCensor);
        }
        /// <summary>
        /// 取得等待分配的经费下拨
        /// </summary>
        /// <param name="query"></param>
        /// <param name="isHorizontal"></param>
        /// <param name="user"></param>
        /// <returns></returns>
        public static int GetWaitingAllocationFundDescendCount(this IEntityDataAccess<FundDescend> query, bool? isHorizontal, User user)
        {
            return getCount(query, isHorizontal, user, FundDescendState.Passed);
        }
        private static int getCount(this IEntityDataAccess<FundDescend> query, bool? isHorizontal, User user, FundDescendState fundDescendState)
        {
            IDatabase database = query.Database;

            var fd = query.Where(q => q.CurrentState.State == fundDescendState).AsQueryable();

            if (user.IsExpert)
                return fd.Count(q => q.ProjectInfo_Fund.Project.Principal.UserID == user.ID || q.ProjectInfo_Fund.Project.PrincipalDelegate.User.ID == user.ID);

            //只有用户为专家时 isHorizontal可为空
            if (!isHorizontal.HasValue)
                throw new ArgumentException();

            if (user.IsSuper)
                return fd.Count(q => q.ProjectInfo_Fund.Project.Type.Rank.IsHorizontal == isHorizontal);

            var projectTypesID = new List<int>();
            if (isHorizontal.Value)
                projectTypesID = user.GetCanCensorHorizontalProjectTypes(database).Select(q => q.ID).ToList();
            else
                projectTypesID = user.GetCanCensorVerticalProjectTypes(database).Select(q => q.ID).ToList();

            return fd.Count(q => projectTypesID.Contains(q.ProjectInfo_Fund.Project.Type.TypeID));
        }
        /// <summary>
        /// 取得某一专家等待分配的经费下拨
        /// </summary>
        /// <param name="query"></param>
        /// <param name="user"></param>
        /// <returns></returns>
        public static IList<FundDescend> GetMyWaitingAllocationFundDescend(this IQueryable<FundDescend> query, User user)
        {
            return query
                .Where(q => q.CurrentState.State == FundDescendState.Passed
                    && (q.ProjectInfo_Fund.Project.Principal.User == user || q.ProjectInfo_Fund.Project.PrincipalDelegate.User == user))
                .ToList();
        }
        /// <summary>
        /// 根据项目ID取得下拨经费中待审核和审核通过的个数
        /// </summary>
        /// <param name="query"></param>
        /// <param name="projectId"></param>
        /// <returns></returns>
        public static int GetCountByProjectId(this IQueryable<FundDescend> query, int projectId)
        {
            return query.Where(p => p.ProjectInfo_FundID == projectId & (p.CurrentState.State == FundDescendState.Passed || p.CurrentState.State == FundDescendState.WaitingCensor))
                .Count();
        }
    }
    /// <summary>
    /// 下拨经费的权限扩展
    /// </summary>
    public static class FundDescendPermissionExtension
    {
        /// <summary>
        /// 判断用户是否具有审核经费下拨的权限
        /// </summary>
        /// <param name="user"></param>
        /// <param name="database"></param>
        /// <param name="isHorizontal"></param>
        /// <returns></returns>
        public static bool HasPermission_CensorFundDescends(this User user, IDatabase database, bool isHorizontal)
        {
            if (!user.HasPermission(PermissionItem.ManageFund, database))
                return false;

            if (isHorizontal)
                return user.HasPermission_CensorHorizontalProject(database);

            return user.HasPermission_CensorVerticalProject(database);
        }

        /// <summary>
        /// 判断用户是否具有编辑某一经费下拨的权限
        /// </summary>
        /// <param name="user"></param>
        /// <param name="fundDescend"></param>
        /// <param name="database"></param>
        /// <returns></returns>
        public static bool HasPermission_Edit(this User user, FundDescend fundDescend, IDatabase database)
        {
            if (user.IsExpert)
                return fundDescend.ProjectInfo_Fund.Project.IsPrincipal(user);

            if (!user.HasPermission(PermissionItem.ManageFund, database))
                return false;

            var project = fundDescend.ProjectInfo_Fund.Project;
            return user.HasPermission_Edit(project, database);
        }
        /// <summary>
        /// 判断用户能够编辑某一经费下拨
        /// </summary>
        /// <param name="user"></param>
        /// <param name="fundDescend"></param>
        /// <param name="database"></param>
        /// <returns></returns>
        public static bool CanEdit(this User user, FundDescend fundDescend, IDatabase database)
        {
            if (user.IsExpert)
                return fundDescend.ProjectInfo_Fund.Project.IsPrincipal(user)
                    && (fundDescend.CurrentState.State == FundDescendState.WaitingCensor || fundDescend.CurrentState.State == FundDescendState.Reject);

            if (!user.HasPermission(PermissionItem.ManageFund, database))
                return false;

            if (fundDescend.IsAllocation(database.FundAllocations))
                return false;

            var project = fundDescend.ProjectInfo_Fund.Project;
            if (!user.CanEdit(project, database))
                return false;
            //如果是借款，如果有还款记录，不能删
            var financeFundDescends = fundDescend.GetFinanceFundDescends(database.FinanceFundDescends);
            foreach (var financeFundDescend in financeFundDescends)
                if (financeFundDescend.IsReturn)
                    return false;

            return true;
        }
        /// <summary>
        /// 判断用户是否具有删除某一经费下拨的权限
        /// </summary>
        /// <param name="user"></param>
        /// <param name="fundDescend"></param>
        /// <param name="database"></param>
        /// <returns></returns>
        public static bool HasPermission_Delete(this User user, FundDescend fundDescend, IDatabase database)
        {
            return user.HasPermission_Edit(fundDescend, database);
        }
        /// <summary>
        /// 判断用户能够删除某一经费分配
        /// </summary>
        /// <param name="user"></param>
        /// <param name="fundDescend"></param>
        /// <param name="database"></param>
        /// <returns></returns>
        public static bool CanDelete(this User user, FundDescend fundDescend, IDatabase database)
        {
            return user.CanEdit(fundDescend, database);
        }
        /// <summary>
        /// 判断用户能够查看某一经费下拨的分配信息
        /// </summary>
        /// <param name="user"></param>
        /// <param name="fundDescend"></param>
        /// <param name="database"></param>
        /// <returns></returns>
        public static bool HasPermission_ShowAlloction(this User user, FundDescend fundDescend, IDatabase database)
        {
            if (!user.IsExpert)
                return true;
            //暂停所有专家分配经费
            return fundDescend.ProjectInfo_Fund.Project.IsPrincipal(user);

            //return user.CanEdit(fundDescend.ProjectInfo_Fund.Project, database);
        }
        /// <summary>
        /// 是否能够查看某一经费分配
        /// </summary>
        /// <param name="user"></param>
        /// <param name="fundDescend"></param>
        /// <param name="database"></param>
        /// <returns></returns>
        public static bool CanShowAllocation(this User user, FundDescend fundDescend, IDatabase database)
        {
            if (!user.HasPermission_ShowAlloction(fundDescend, database))
                return false;

            return fundDescend.CurrentState.State == FundDescendState.Passed;
        }
        /// <summary>
        /// 判断用户是否具有审核该经费下拨的权限
        /// </summary>
        /// <param name="user"></param>
        /// <param name="fundDescend"></param>
        /// <param name="database"></param>
        /// <returns></returns>
        public static bool HasPermission_Censor(this User user, FundDescend fundDescend, IDatabase database)
        {
            if (!user.HasPermission(PermissionItem.ManageFund, database))
                return false;

            return user.CanEdit(fundDescend.ProjectInfo_Fund.Project, database);
        }
        /// <summary>
        /// 判断用户能否审核通过某一经费下拨
        /// </summary>
        /// <param name="user"></param>
        /// <param name="fundDescend"></param>
        /// <param name="database"></param>
        /// <returns></returns>
        public static bool CanCensorPass(this User user, FundDescend fundDescend, IDatabase database)
        {
            if (!user.HasPermission_Censor(fundDescend, database))
                return false;

            if (fundDescend.CurrentState.State != FundDescendState.WaitingCensor)
                return false;

            //判断对应的经费到帐信息
            var financeFundDescend = fundDescend.GetSingleFinanceFundDescend(database.FinanceFundDescends);
            var finance = financeFundDescend.Finance;
            if (finance.DescendAmount + fundDescend.ReceivedAmount > finance.Amount)
                return false;
            //判断项目经费信息
            var projectInfo_Fund = fundDescend.ProjectInfo_Fund;
            if (projectInfo_Fund.FundTotal < projectInfo_Fund.FundReceived + fundDescend.ReceivedAmount)
                return false;

            return true;
        }
        /// <summary>
        /// 判断用户能够审核驳回某一经费下拨
        /// </summary>
        /// <param name="user"></param>
        /// <param name="fundDescend"></param>
        /// <param name="database"></param>
        /// <returns></returns>
        public static bool CanCensorReject(this User user, FundDescend fundDescend, IDatabase database)
        {
            if (!user.HasPermission_Censor(fundDescend, database))
                return false;

            return fundDescend.CurrentState.State == FundDescendState.WaitingCensor;
        }
    }
}
