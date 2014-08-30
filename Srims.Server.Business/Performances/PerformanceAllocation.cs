using System;
using System.Collections.Generic;
using System.Linq;
using System.Transactions;
using MIS.Common;
using MIS.Common.Query;
using MIS.Common.Validate;
using Srims.Server.Business.Common;
using Srims.Server.Business.Projects;
using Srims.Server.Business.Type;
using Srims.Server.Business.Fund;
using Srims.Server.Business.Users;
using Srims.Server.UI.Performances;

namespace Srims.Server.Business.Performances
{
    /// <summary>
    /// 绩效
    /// </summary>
    public partial class PerformanceAllocation : Entity<PerformanceAllocation>
    {
        /// <summary>
        /// 可进行数据纠错的经费分配时间
        /// </summary>
        public static DateTime CAN_CORRECT_DATETIME = Convert.ToDateTime("2004/06/01");


        /// <summary>
        /// 给负责人发邮件
        /// </summary>
        /// <param name="query"></param>
        /// <returns></returns>
        public void SendEmailToPrincipal()
        {

        }
        /// <summary>
        /// 取得绩效的分配时间
        /// </summary>
        /// <param name="query"></param>
        /// <returns></returns>
        public DateTime? GetAllocationPerformanceDateTime(IQueryable<PerformanceAllocationStateHistory> query)
        {
            var StateHistory = query.SingleOrDefault(q => q.PerformanceAllocationID == _ID
                                        && q.State == PerformanceAllocationState.Passed);


            if (StateHistory == null)
                return null;

            return StateHistory.DateTime;
        }
        /// <summary>
        /// 取得该绩效分配对应的已经财务分配的凭单
        /// </summary>
        /// <param name="query"></param>
        /// <returns></returns>
        public IList<PerformanceVoucher> GetPerformanceVouchersSignAlready(IQueryable<PerformanceVoucher> query)
        {
            return query.Where(q => q.PerformanceAllocationID == _ID && (q.CurrentState.State == PerformanceVoucherState.SignIn || q.CurrentState.State == PerformanceVoucherState.Allocated))
                .ToList();
        }
        /// <summary>
        /// 取得对应的绩效凭单
        /// </summary>
        /// <param name="query"></param>
        /// <returns></returns>
        public IList<PerformanceVoucher> GetPerformanceVouchers(IQueryable<PerformanceVoucher> query)
        {
            return query
               .Where(q => q.PerformanceAllocationID == _ID)
               .ToList();
        }
        /// <summary>
        /// 提交
        /// </summary>
        /// <param name="user"></param>
        /// <param name="database"></param>
        public void Submit(User user, IDatabase database)
        {
            if (!user.CanSubmit(this, database))
                throw new HasNoPermissionException();
            using (TransactionScope ts = new TransactionScope())
            {
                saveForChangeState(PerformanceAllocationState.WaitingCensor, user, database);
                var performanceVoucherForPrincipal = database.PerformanceVouchers.SingleOrDefault(c => c.PerformanceAllocation == this && c.FundMember.Expert == this.Performance.Project.Principal);
                if (performanceVoucherForPrincipal == null)
                {
                    performanceVoucherForPrincipal = new PerformanceVoucher();
                    performanceVoucherForPrincipal.PerformanceAllocation = this;
                    performanceVoucherForPrincipal.FundMember = database.FundMembers.Get(this.Performance.Project.Fund, this.Performance.Project.Principal, this.Performance.Project.IsPrincipalSecondCollege == null ? true : this.Performance.Project.IsPrincipalSecondCollege.Value, database, true);
                    performanceVoucherForPrincipal.PerformancePay = 0;
                    performanceVoucherForPrincipal.AccountBookNumber = performanceVoucherForPrincipal.FundMember.AccountBookNumber;
                    performanceVoucherForPrincipal.Project = this.Performance.Project;
                    performanceVoucherForPrincipal.IsRead = false;
                    performanceVoucherForPrincipal.Save(database);
                    PerformanceVoucherStateHistory state = new PerformanceVoucherStateHistory();
                    state.DateTime = System.DateTime.Now;
                    state.Operator = user.Name;
                    state.PerformanceVoucher = performanceVoucherForPrincipal;
                    state.State = PerformanceVoucherState.WaitingCensor;
                    state.Save(database);
                    performanceVoucherForPrincipal.CurrentState = state;
                }
                performanceVoucherForPrincipal.OverheadExpensesExpert = this.ArrivedOverheadexpensesExpert - this.ArrivedPerformance;
                performanceVoucherForPrincipal.Save(database);
                //将凭单状态置为待审核
                var performanceVouchers = this.GetPerformanceVouchers(database.PerformanceVouchers);
                foreach (var performanceVoucher in performanceVouchers)
                    performanceVoucher.Submit(user, database);

                ts.Complete();

            }
        }
        /// <summary>
        /// 撤销提交
        /// </summary>
        /// <param name="user"></param>
        /// <param name="database"></param>
        public void UndoSubmit(User user, IDatabase database)
        {
            if (!user.CanUndoSubmit(this, database))
                throw new HasNoPermissionException();

            saveForChangeState(PerformanceAllocationState.UnSubmit, user, database);
        }
        /// <summary>
        /// 审核通过
        /// </summary>
        /// <param name="user"></param>
        /// <param name="remark"></param>
        /// <param name="database"></param>
        public void CensorPass(User user, string remark, IDatabase database)
        {
            if (!user.CanCensorPass(this, database))
                throw new HasNoPermissionException();

            using (TransactionScope ts = new TransactionScope())
            {
                saveForChangeState(PerformanceAllocationState.Passed, user, remark, database);

                //将凭单状态置为未打印
                var performanceVouchers = this.GetPerformanceVouchers(database.PerformanceVouchers);
                foreach (var performanceVoucher in performanceVouchers)
                    performanceVoucher.UnPrinted(user, database);

                ts.Complete();
            }
            sendEmailToPrincipal(user, "审核通过", "审核通过", "查看您此次绩效分配产生的经费凭单情况", database);
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

            using (TransactionScope ts = new TransactionScope())
            {
                saveForChangeState(PerformanceAllocationState.Reject, user, remark, database);

                //将凭单状态置为驳回
                var performanceVouchers = this.GetPerformanceVouchers(database.PerformanceVouchers);
                foreach (var performanceVoucher in performanceVouchers)
                    performanceVoucher.Reject(user, database);

                ts.Complete();
            }
            sendEmailToPrincipal(user, "审核驳回", "审核驳回，驳回理由：" + remark, "重新进行绩效分配", database);
        }
        /// <summary>
        /// 作废
        /// </summary>
        /// <param name="user"></param>
        /// <param name="remark"></param>
        /// <param name="database"></param>
        public void Cancel(User user, string remark, IDatabase database)
        {
            if (!user.CanCancel(this, database))
                throw new HasNoPermissionException();

            using (TransactionScope ts = new TransactionScope())
            {
                saveForChangeState(PerformanceAllocationState.Canceled, user, database);

                //将凭单状态置为驳回
                var performanceVouchers = this.GetPerformanceVouchers(database.PerformanceVouchers);
                foreach (var performanceVoucher in performanceVouchers)
                    performanceVoucher.Canceled(user, database);


                ts.Complete();
            }
        }
        private void saveForChangeState(PerformanceAllocationState performanceAllocationState, User user, IDatabase database)
        {
            saveForChangeState(performanceAllocationState, user, string.Empty, database);
        }
        private void saveForChangeState(PerformanceAllocationState performanceAllocationState, User user, string remark, IDatabase database)
        {
            using (TransactionScope ts = new TransactionScope())
            {
                PerformanceAllocationStateHistory performanceAllocationStateHistory = new PerformanceAllocationStateHistory()
                {
                    DateTime = DateTime.Now,
                    PerformanceAllocation = this,
                    Operator = user.Name,
                    Remark = remark,
                    State = performanceAllocationState
                };

                performanceAllocationStateHistory.Save(database);

                this.CurrentState = performanceAllocationStateHistory;
                this.Save(database);

                ts.Complete();

            }
        }
        private void sendEmailToPrincipal(User sender, string action, string remark, string expertOperator, IDatabase database)
        {
            var title = String.Format("{0}--绩效分配(项目：{1})", action, this.Performance.Project.Name);

            string body = String.Format(@"您的项目：{0}的绩效分配，已由管理员{1}，于{2}，{3}。请及时登录中国海洋大学科研管理系统{4}。", this.Performance.Project.Name, sender.Name, DateTime.Now, remark, expertOperator);

            string content = EmailContentModel.GetExpertEmailContentModel(this.Performance.Project.Principal.Name, body);

            //sender.SendMail(this.Performance.FundAllocation.FundDescend.ProjectInfo_Fund.Project.Principal.Email, title, content, database);
            //if (this.Performance.FundAllocation.FundDescend.ProjectInfo_Fund.Project.PrincipalDelegate != null)
            //    sender.SendMail(this.Performance.FundAllocation.FundDescend.ProjectInfo_Fund.Project.PrincipalDelegate.Email, title, content, database);
        }
        /// <summary>
        /// 验证操作
        /// </summary>
        /// <param name="validater"></param>
        /// <param name="database"></param>
        protected override void ValidateAction(Validater validater, IDatabase database)
        {
            validater.AddCondition(_Performance.Entity != null, "对应的绩效不能为空");

            validater.AddCondition(_ArrivedOverheadexpensesExpert >= 0, "课题组间接费用及绩效必须大于等于零");

            validater.AddCondition(_ArrivedPerformance >= 0, "绩效金额必须大于等于零");

            validater.AddCondition(Performance.ArrivedPerformance >= _ArrivedPerformance, "下拨的绩效金额不能超过已到绩效总额");

            long allocated = 0;
            foreach (var item in GetPerformanceVouchers(database.PerformanceVouchers))
            {
                allocated += item.PerformancePay;
            }
            validater.AddCondition(_ArrivedPerformance >= allocated, "分配的绩效金额不能超过下拨的绩效总额");
        }
        /// <summary>
        /// 更新统计信息
        /// </summary>
        /// <param name="database"></param>
        public override void UpdateStatistic(IDatabase database)
        {

            if (this.CurrentState != null && this.CurrentState.State == PerformanceAllocationState.Reject)
                this.CurrentState.State = PerformanceAllocationState.UnSubmit;
        }


    }

    /// <summary>
    /// 绩效的业务扩展
    /// </summary>
    public static class PerformanceAllocationBusinessExtension
    {
    }
    /// <summary>
    /// 绩效的查询扩展
    /// </summary>
    public static class PerformanceAllocationQueryExtension
    {
        /// <summary>
        /// 绩效分配查询
        /// </summary>
        /// <param name="query"></param>
        /// <param name="queryInformation"></param>
        /// <param name="user"></param>
        /// <returns></returns>
        public static PerformanceAllocationQueryResult Query(this IEntityDataAccess<PerformanceAllocation> query, PerformanceAllocationQueryInformation queryInformation, User user)
        {
            if (query == null)
                throw new ArgumentNullException("query");
            if (queryInformation == null)
                throw new ArgumentNullException("queryInformation");
            if (user == null)
                throw new ArgumentNullException("user");

            //查询
            var q = query.GetPermanceAllocation(queryInformation, user).Distinct();

            //排序
            q = sortQuery(q, queryInformation.SortInfo);

            //构造查询结果
            var total = q.Select(p => p.ID).Count();
            var totol2 = q.Where(c => c.CurrentState.State != PerformanceAllocationState.Canceled).Count();
            return new PerformanceAllocationQueryResult(
                q.Skip(queryInformation.Start).Take(queryInformation.Limit).ToList(), total, totol2 == 0 ? 0 : q.Where(c => c.CurrentState.State != PerformanceAllocationState.Canceled).Sum(c => c.ArrivedOverheadexpensesExpert));
        }

        private static IQueryable<PerformanceAllocation> sortQuery(IQueryable<PerformanceAllocation> query, SortInfo sortInfo)
        {
            if (sortInfo == null)
                return query = query.OrderByDescending(q => q.CurrentState.DateTime);

            else if (sortInfo.Field.EqualIgnoreCase("ProjectName"))
                return sortInfo.Direction == SortDirection.ASC
                    ? query.OrderBy(q => q.Performance.Project.Name)
                    : query.OrderByDescending(p => p.Performance.Project.Name);
            else if (sortInfo.Field.EqualIgnoreCase("TypeName"))
                return sortInfo.Direction == SortDirection.ASC
                    ? query.OrderBy(q => q.Performance.Project.Type.Type.Name)
                    : query.OrderByDescending(p => p.Performance.Project.Type.Type.Name);
            else if (sortInfo.Field.EqualIgnoreCase("AllocationDateTime"))
                return sortInfo.Direction == SortDirection.ASC
                    ? query.OrderBy(q => q.CurrentState.DateTime)
                    : query.OrderByDescending(q => q.CurrentState.DateTime);
            else if (sortInfo.Field.EqualIgnoreCase("CanAllocate"))
                return sortInfo.Direction == SortDirection.ASC
                    ? query.OrderBy(q => q.CanAllocate)
                    : query.OrderByDescending(q => q.CanAllocate);

            else
                return query = query.OrderByDescending(q => q.CurrentState.DateTime);
        }
        /// <summary>
        /// 取得绩效分配
        /// </summary>
        /// <param name="query"></param>
        /// <param name="queryInformation"></param>
        /// <param name="user"></param>
        /// <returns></returns>
        public static IQueryable<PerformanceAllocation> GetPermanceAllocation(this IEntityDataAccess<PerformanceAllocation> query, PerformanceAllocationQueryInformation queryInformation, User user)
        {
            if (query == null)
                throw new ArgumentNullException("query");
            if (queryInformation == null)
                throw new ArgumentNullException("queryInformation");

            var q = query.getPerformanceAllocation(user);
            if (queryInformation != null)
                q = q.Intersect(query.getPerformanceAllocation(queryInformation));

            return q;
        }
        private static IQueryable<PerformanceAllocation> getPerformanceAllocation(this IEntityDataAccess<PerformanceAllocation> query, PerformanceAllocationQueryInformation queryInformation)
        {
            var q = query.AsQueryable();

            if (queryInformation.ProjectName != null)
                queryInformation.ProjectName = queryInformation.ProjectName.Trim();
            if (!string.IsNullOrEmpty(queryInformation.ProjectName))
                q = q.Where(pq => pq.Performance.Project.Name.Contains(queryInformation.ProjectName) || pq.Performance.Project.NameSpell.Contains(queryInformation.ProjectName));

            if (queryInformation.ProjectNumber != null)
                queryInformation.ProjectNumber = queryInformation.ProjectNumber.Trim();
            if (!string.IsNullOrEmpty(queryInformation.ProjectNumber))
                q = q.Where(pq => pq.Performance.Project.Number.Contains(queryInformation.ProjectNumber));

            if (!string.IsNullOrEmpty(queryInformation.TypeName))
                q = q.Where(pq => pq.Performance.Project.Type.Type.Name.Contains(queryInformation.TypeName.Trim()) || pq.Performance.Project.Type.Type.ShortName.Contains(queryInformation.TypeName.Trim()));
            if (queryInformation.PrincipalName != null)
                queryInformation.PrincipalName = queryInformation.PrincipalName.Trim();
            if (!string.IsNullOrEmpty(queryInformation.PrincipalName))
                q = q.Where(pq => pq.Performance.Project.Principal.Name.Contains(queryInformation.PrincipalName) || pq.Performance.Project.Principal.NameSpell.Contains(queryInformation.PrincipalName));

            if (queryInformation.CanAllocate.HasValue)
                q = q.Where(pq => pq.CanAllocate == queryInformation.CanAllocate.Value);

            if (queryInformation.States != null && queryInformation.States.Length != 0)
                q = q.Where(pq => queryInformation.States.Contains(pq.CurrentState.State));

            if (queryInformation.IsHorizontal.HasValue)
                q = q.Where(pq => pq.Performance.Project.Type.Rank.IsHorizontal == queryInformation.IsHorizontal.Value);

            return q;
        }


        /// <summary>
        /// 取得未分配绩效分配数
        /// </summary>
        /// <param name="query"></param>
        /// <param name="user"></param>
        /// <param name="database"></param>
        /// <returns></returns>
        public static int GetWaitingPerformanceAllocationCount(this IEntityDataAccess<PerformanceAllocation> query, User user, IDatabase database)
        {
            var q = database.PerformanceAllocations.getPerformanceAllocation(user);
            if (q != null)
                q = q.Where(pq => pq.CurrentState.State == PerformanceAllocationState.UnSubmit || pq.CurrentState.State == PerformanceAllocationState.Reject);

            return q.Count();
        }

        private static IQueryable<PerformanceAllocation> getPerformanceAllocation(this IEntityDataAccess<PerformanceAllocation> query, User user)
        {
            if (user.IsSuper)
                return query;
            //临时开启专家查看分配
            if (user.IsExpert)
                return query.Where(q => (q.Performance.Project.Principal.User == user
                    || q.Performance.Project.PrincipalDelegate.User == user));// && q.CanAllocate == true);

            var database = query.Database;
            //巧妙
            var projectTypeIDList = user.GetCanEditVerticalTypes(database)
            .Union(user.GetCanEditHorizontalTypes(database))
            .Select(pt => pt.ID)
            .ToList();
            if (projectTypeIDList.Count != 0)
                return query.Where(q => projectTypeIDList.Contains(q.Performance.Project.Type.TypeID));
            else
                return query;
        }
        /// <summary>
        /// 根据项目取得绩效分配记录
        /// </summary>
        /// <param name="query"></param>
        /// <param name="project"></param>
        /// <returns></returns>
        public static IList<PerformanceAllocation> GetByProject(this IQueryable<PerformanceAllocation> query, Project project)
        {
            return query
                .Where(q => q.Performance.Project.FundID == project.FundID)
                .OrderBy(q => q.CurrentState.DateTime)
                .ToList();

        }
        /// <summary>
        /// 根据绩效取得绩效分配记录
        /// </summary>
        /// <param name="query"></param>
        /// <param name="performance"></param>
        /// <returns></returns>
        public static IList<PerformanceAllocation> GetByPerformance(this IQueryable<PerformanceAllocation> query, Performance performance)
        {
            return query.Where(c => c.Performance == performance)
                .OrderBy(q => q.CurrentState.DateTime)
                .ToList();
        }
        /// <summary>
        /// 取得等待审核的绩效分配的数目
        /// </summary>
        /// <param name="query"></param>
        /// <param name="isHorizontal"></param>
        /// <param name="user"></param>
        /// <returns></returns>
        public static int GetWaitingCensorPerformanceAllocationCount(this IEntityDataAccess<PerformanceAllocation> query, bool isHorizontal, User user)
        {
            if (user == null || user.IsSuper)
                return query.Count(q => q.CurrentState.State == PerformanceAllocationState.WaitingCensor && q.Performance.Project.Type.Rank.IsHorizontal == isHorizontal);

            IDatabase database = query.Database;
            var projectTypesID = new List<int>();
            if (isHorizontal)
                projectTypesID = user.GetCanCensorHorizontalProjectTypes(database).Select(q => q.ID).ToList();
            else
                projectTypesID = user.GetCanCensorVerticalProjectTypes(database).Select(q => q.ID).ToList();

            return query.Count(q => q.CurrentState.State == PerformanceAllocationState.WaitingCensor
                && projectTypesID.Contains(q.Performance.Project.Type.TypeID));

        }
        public static List<PerformanceVoucher> GetPerformanceVouchersByPerformanceAllocation(this PerformanceAllocation performanceAllocation, IDatabase database)
        {
            return database.PerformanceVouchers.Where(c => c.PerformanceAllocation == performanceAllocation && c.CurrentState.State != PerformanceVoucherState.Canceled).ToList();
        }
    }
    /// <summary>
    /// 绩效的权限扩展
    /// </summary>
    public static class PerformanceAllocationPermissionExtension
    {
        /// <summary>
        /// 判断用户是否具有审核绩效分配的权限
        /// </summary>
        /// <param name="user"></param>
        /// <param name="performanceAllocation"></param>
        /// <param name="database"></param>
        /// <param name="isHorizontal"></param>
        /// <returns></returns>
        public static bool HasPermission_CensorPerformanceAllocation(this User user, PerformanceAllocation performanceAllocation, IDatabase database, bool isHorizontal)
        {
            if (!user.HasPermission(PermissionItem.ManageFund, database))
                return false;
            if (isHorizontal)
                return user.HasPermission_EditHorizontalProject(database);

            return user.HasPermission_EditVerticalProject(database);
        }
        /// <summary>
        /// 判断用户是否具有绩效分配的权限
        /// </summary>
        /// <param name="user"></param>
        /// <param name="database"></param>
        /// <param name="isHorizontal"></param>
        /// <returns></returns>
        /// <remarks>是否能够进行绩效分配(左边菜单显示权限)</remarks>
        public static bool HasPermission_PerformanceAllocation(this User user, IDatabase database, bool isHorizontal)
        {
            if (!user.HasPermission(PermissionItem.ManageFund, database))
                return false;

            if (isHorizontal)
                return !user.IsExpert && user.HasPermission_EditHorizontalProject(database);

            return user.HasPermission_EditVerticalProject(database);
        }
        /// <summary>
        /// 判断用户是否有绩效分配的权限
        /// </summary>
        /// <param name="user"></param>
        /// <param name="performanceAllocation"></param>
        /// <param name="database"></param>
        /// <returns></returns>
        /// <remarks>针对只有项目负责人才能分配绩效</remarks>
        public static bool HasPermission_Allocation(this User user, PerformanceAllocation performanceAllocation, IDatabase database)
        {
            var project = performanceAllocation.Performance.Project;
            //临时关闭专家分配权限
            if (user.IsExpert)
                return false;
            //  return project.IsPrincipal(user);
            else if (user.IsSuper)
                return true;
            return false;
        }
        /// <summary>
        /// 判断用户能够进行绩效分配
        /// </summary>
        /// <param name="user"></param>
        /// <param name="performanceAllocation"></param>
        /// <param name="database"></param>
        /// <returns></returns>
        /// <remarks>需要剩余绩效大于等于1000元时才能进行分配</remarks>
        public static bool CanAllocation(this User user, PerformanceAllocation performanceAllocation, IDatabase database)
        {
            if (!user.HasPermission_Allocation(performanceAllocation, database))
                return false;
            //本次绩效大于等于1000元时以及已分配金额小于本次绩效以及绩效分配处于未提交状态时才能进行分配
            var minPerformanceAllocation = database.NoticeTexts.Get(NoticeTextType.PerformanceAllocation);
            float minPerformanceAllocationMoney = 0.1F;
            if (minPerformanceAllocation != null && minPerformanceAllocation.Count != 0)
                float.TryParse(minPerformanceAllocation[0].Value, out minPerformanceAllocationMoney);
            List<PerformanceVoucher> performanceVouchers = performanceAllocation.GetPerformanceVouchersByPerformanceAllocation(database);
            long allocatedPerformance = 0;
            foreach (var item in performanceVouchers)
            {
                allocatedPerformance += item.PerformancePay;
            }
            return performanceAllocation.Performance.ArrivedPerformance >= minPerformanceAllocationMoney * Money.MONEY_UNIT && allocatedPerformance < performanceAllocation.Performance.ArrivedPerformance
 && performanceAllocation.CurrentState.State == PerformanceAllocationState.UnSubmit;
        }
        /// <summary>
        /// 判断用户是否有权限提交
        /// </summary>
        /// <param name="user"></param>
        /// <param name="performanceAllocation"></param>
        /// <param name="database"></param>
        /// <returns></returns>
        /// <remarks>同是否有绩效分配的权限一样，只有项目负责人才能具有</remarks>
        public static bool HasPermission_Submit(this User user, PerformanceAllocation performanceAllocation, IDatabase database)
        {
            return user.HasPermission_Allocation(performanceAllocation, database);
        }
        /// <summary>
        /// 判断用户能够提交绩效分配
        /// </summary>
        /// <param name="user"></param>
        /// <param name="performanceAllocation"></param>
        /// <param name="database"></param>
        /// <returns></returns>
        public static bool CanSubmit(this User user, PerformanceAllocation performanceAllocation, IDatabase database)
        {
            if (!user.HasPermission_Submit(performanceAllocation, database))
                return false;

            if (performanceAllocation.CurrentState == null)
                return false;

            if (performanceAllocation.CurrentState.State != PerformanceAllocationState.UnSubmit && performanceAllocation.CurrentState.State != PerformanceAllocationState.Reject)
                return false;
            //只有全部绩效分配完成才能提交
            List<PerformanceVoucher> performanceVouchers = performanceAllocation.GetPerformanceVouchersByPerformanceAllocation(database);
            long allocatedPerformance = 0;
            foreach (var item in performanceVouchers)
            {
                allocatedPerformance += item.PerformancePay;
            }
            return performanceAllocation.ArrivedPerformance == allocatedPerformance;
        }
        /// <summary>
        /// 判断用户是否具有撤销提交的权限
        /// </summary>
        /// <param name="user"></param>
        /// <param name="performanceAllocation"></param>
        /// <param name="database"></param>
        /// <returns></returns>
        public static bool HasPermission_UndoSubmit(this User user, PerformanceAllocation performanceAllocation, IDatabase database)
        {
            return user.HasPermission_Submit(performanceAllocation, database);
        }
        /// <summary>
        /// 判断用户能否撤销提交
        /// </summary>
        /// <param name="user"></param>
        /// <param name="performanceAllocation"></param>
        /// <param name="database"></param>
        /// <returns></returns>
        public static bool CanUndoSubmit(this User user, PerformanceAllocation performanceAllocation, IDatabase database)
        {
            if (!user.HasPermission_UndoSubmit(performanceAllocation, database))
                return false;

            if (performanceAllocation.CurrentState == null)
                return false;

            return performanceAllocation.CurrentState.State == PerformanceAllocationState.WaitingCensor;
        }
        /// <summary>
        /// 判断用户是否具有审核绩效分配的权限
        /// </summary>
        /// <param name="user"></param>
        /// <param name="performanceAllocation"></param>
        /// <param name="database"></param>
        /// <returns></returns>
        public static bool HasPermission_Censor(this User user, PerformanceAllocation performanceAllocation, IDatabase database)
        {
            if (!user.HasPermission(PermissionItem.ManageFund, database))
                return false;

            return user.HasPermission_Edit(performanceAllocation.Performance.Project, database);
        }
        /// <summary>
        /// 判断用户能够审核通过绩效分配
        /// </summary>
        /// <param name="user"></param>
        /// <param name="performanceAllocation"></param>
        /// <param name="database"></param>
        /// <returns></returns>
        public static bool CanCensorPass(this User user, PerformanceAllocation performanceAllocation, IDatabase database)
        {
            if (!user.HasPermission_Censor(performanceAllocation, database))
                return false;

            if (performanceAllocation.CurrentState == null)
                return false;

            return performanceAllocation.CurrentState.State == PerformanceAllocationState.WaitingCensor;
        }
        /// <summary>
        /// 判断用户能够审核驳回绩效分配
        /// </summary>
        /// <param name="user"></param>
        /// <param name="performanceAllocation"></param>
        /// <param name="database"></param>
        /// <returns></returns>
        public static bool CanCensorReject(this User user, PerformanceAllocation performanceAllocation, IDatabase database)
        {
            if (!user.HasPermission_Censor(performanceAllocation, database))
                return false;

            if (performanceAllocation.CurrentState == null)
                return false;

            return performanceAllocation.CurrentState.State == PerformanceAllocationState.WaitingCensor;
        }
        /// <summary>
        /// 判断用户是否具有作废经费分配的权限
        /// </summary>
        /// <param name="user"></param>
        /// <param name="performanceAllocation"></param>
        /// <param name="database"></param>
        /// <returns></returns>
        public static bool HasPermission_Canel(this User user, PerformanceAllocation performanceAllocation, IDatabase database)
        {
            return user.HasPermission_Censor(performanceAllocation, database);
        }
        /// <summary>
        ///  判断用户能够作废经费分配
        /// </summary>
        /// <param name="user"></param>
        /// <param name="performanceAllocation"></param>
        /// <param name="database"></param>
        /// <returns></returns>
        public static bool CanCancel(this User user, PerformanceAllocation performanceAllocation, IDatabase database)
        {
            if (!user.HasPermission_Canel(performanceAllocation, database))
                return false;

            if (performanceAllocation.CurrentState == null)
                return false;
            //2013年1月25日，不论绩效非配处于什么状态，都可以将其作废
            //if (performanceAllocation.CurrentState.State != PerformanceAllocationState.Passed && performanceAllocation.CurrentState.State != PerformanceAllocationState.UnSubmit)
            //    return false;

            var vouchers = performanceAllocation.GetPerformanceVouchersSignAlready(database.PerformanceVouchers);
            //存在已经进行才无分配的凭单纳闷该绩效将不能被作废
            return vouchers.Count == 0 && performanceAllocation.CurrentState.State != PerformanceAllocationState.Canceled;
        }
        /// <summary>
        /// 判断用户是否具有绩效分配数据纠错权限
        /// </summary>
        /// <param name="user"></param>
        /// <param name="performanceAllocation"></param>
        /// <param name="database"></param>
        /// <returns></returns>
        public static bool HasPermission_Correct(this User user, PerformanceAllocation performanceAllocation, IDatabase database)
        {
            return user.HasPermission(PermissionItem.FundAllocationDataCorrection, database);
        }
        /// <summary>
        /// 判断用户能否对经费分配的数据进行纠错
        /// </summary>
        /// <param name="user"></param>
        /// <param name="performanceAllocation"></param>
        /// <param name="database"></param>
        /// <returns></returns>
        public static bool CanCorrect(this User user, PerformanceAllocation performanceAllocation, IDatabase database)
        {
            if (!user.HasPermission_Correct(performanceAllocation, database))
                return false;

            if (!performanceAllocation.GetAllocationPerformanceDateTime(database.PerformanceAllocationStateHistories).HasValue)
                return false;

            return performanceAllocation.GetAllocationPerformanceDateTime(database.PerformanceAllocationStateHistories).Value <= PerformanceAllocation.CAN_CORRECT_DATETIME;
        }

        /// <summary>
        /// 判断用户能否修改绩效分配额度
        /// </summary>
        /// <param name="user"></param>
        /// <param name="performanceAllocation"></param>
        /// <param name="database"></param>
        /// <returns></returns>
        public static bool CanChangePerformanceAmount(this User user, PerformanceAllocation performanceAllocation, IDatabase database)
        {
            if (!user.HasPermission_Submit(performanceAllocation, database))
                return false;
            var performancevouchers = database.PerformanceVouchers.Where(c => c.PerformanceAllocation == performanceAllocation).ToList();
            if (performancevouchers.Count() == 0)
                return true;
            else
                return false;
        }
    }
}
