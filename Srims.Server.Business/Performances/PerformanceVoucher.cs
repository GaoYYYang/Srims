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
using Srims.Server.Business.Common;
using Srims.Server.Business.Fund;
using Srims.Server.Business.Performances;
using Srims.Server.Business.Projects;
using Srims.Server.Business.Type;
using Srims.Server.Business.Users;

namespace Srims.Server.Business.Performances
{
    /// <summary>
    /// 绩效凭单
    /// </summary>
    public partial class PerformanceVoucher : Entity<PerformanceVoucher>
    {
        public Project Project = null;
        /// <summary>
        /// 忽略账本号规则检查的用户
        /// </summary>
        public static string[] IGNORE_ACCOUNTBOOKNUMBER_LEGAL_LOGINID = { "yuandong", "admin" };
        /// <summary>
        /// 取得实体的各个字段项
        /// </summary>
        /// <returns></returns>
        public static LogDescriptionItem[] GetDescriptionItems()
        {
            List<LogDescriptionItem> list = new List<LogDescriptionItem>();

            list.Add(new LogDescriptionItem { Name = "PerformanceAllocationID", Title = "对应经费分配的ID" });
            list.Add(new LogDescriptionItem { Name = "FundMemberID", Title = "对应经费成员的ID" });

            list.Add(new LogDescriptionItem { Name = "VoucherNumber", Title = "凭单号" });
            list.Add(new LogDescriptionItem { Name = "AccountBookNumber", Title = "账本号" });
            list.Add(new LogDescriptionItem { Name = "PerformancePay", Title = "绩效管理费" });
            list.Add(new LogDescriptionItem { Name = "IsRead", Title = "是否已查看" });
            list.Add(new LogDescriptionItem { Name = "FinanceNumber", Title = "财务制单号" });
            return list.ToArray();
        }

        /// <summary>
        /// 将凭单的状态设为作废(当对应绩效分配作废时)
        /// </summary>
        /// <param name="user"></param>
        /// <param name="database"></param>
        public void Canceled(User user, IDatabase database)
        {
            saveForChangeState(PerformanceVoucherState.Canceled, user, database);
            //判断条件，删除项目成员与经费成员
            if (this.FundMember.GetVouchersCount(database.Vouchers) == 0 && this.FundMember.GetPerformanceVouchersCount(database.PerformanceVouchers) == 0)
            {
                var projectMember = database.ProjectMemebers.SingleOrDefault(c => c.Project == this.Project && c.Expert == this.FundMember.Expert && c.Order > 500);
                if (projectMember != null)
                    projectMember.Delete(database);

            }
        }
        /// <summary>
        /// 当凭单的状态设置为审核驳回（当对应绩效分配审核驳回时）
        /// </summary>
        /// <param name="user"></param>
        /// <param name="database"></param>
        public void Reject(User user, IDatabase database)
        {
            saveForChangeState(PerformanceVoucherState.Reject, user, database);
        }
        /// <summary>
        /// 将凭单状态设置为待审核（当对应绩效分配提交时）
        /// </summary>
        /// <param name="user"></param>
        /// <param name="database"></param>
        public void Submit(User user, IDatabase database)
        {
            saveForChangeState(PerformanceVoucherState.WaitingCensor, user, database);
        }
        /// <summary>
        /// 将凭单状态设置为未打印（当对应绩效分配审核通过时）
        /// </summary>
        /// <param name="user"></param>
        /// <param name="database"></param>
        public void UnPrinted(User user, IDatabase database)
        {
            saveForChangeState(PerformanceVoucherState.UnPrinted, user, database);
        }
        /// <summary>
        /// 将凭单状态设置为已打印
        /// </summary>
        /// <param name="user"></param>
        /// <param name="database"></param>
        public void Print(User user, IDatabase database)
        {
            if (!user.HasPermission_Print(this, database))
                throw new HasNoPermissionException();

            saveForChangeState(PerformanceVoucherState.NotSignIn, user, database);
        }
        /// <summary>
        /// 将凭单状态设置为分配
        /// </summary>
        /// <param name="user"></param>
        /// <param name="database"></param>
        public void Allocate(User user, IDatabase database)
        {
            if (!user.HasPermission_FinanceAllocate(database))
                throw new HasNoPermissionException();

            saveForChangeState(PerformanceVoucherState.Allocated, user, database);
        }
        /// <summary>
        /// 将凭单状态设置为取消分配
        /// </summary>
        /// <param name="user"></param>
        /// <param name="database"></param>
        public void CancelAllocate(User user, IDatabase database)
        {
            if (!user.HasPermission_CancelFinanceAllocate(database))
                throw new HasNoPermissionException();

            saveForChangeState(PerformanceVoucherState.SignIn, user, database);
        }
        /// <summary>
        /// 将凭单状态设置为签收
        /// </summary>
        /// <param name="user"></param>
        /// <param name="database"></param>
        public void SignIn(User user, IDatabase database)
        {
            if (!user.HasPermission_SignIn(database))
                throw new HasNoPermissionException();

            saveForChangeState(PerformanceVoucherState.SignIn, user, database);
        }
        /// <summary>
        /// 将凭单状态设置为退回
        /// </summary>
        /// <param name="user"></param>
        /// <param name="database"></param>
        public void Return(User user, IDatabase database)
        {
            if (!user.HasPermission_ReturnVoucher(database))
                throw new HasNoPermissionException();

            saveForChangeState(PerformanceVoucherState.NotSignIn, user, database);
        }
        private void saveForChangeState(PerformanceVoucherState performanceVoucherState, User user, IDatabase database)
        {
            using (TransactionScope ts = new TransactionScope())
            {
                var performanceVoucherStateHistory = new PerformanceVoucherStateHistory
                {
                    DateTime = DateTime.Now,
                    Operator = user.Name,
                    State = performanceVoucherState,
                    PerformanceVoucher = this,
                };

                performanceVoucherStateHistory.Save(database);
                this.CurrentState = performanceVoucherStateHistory;
                this.Save(database);

                ts.Complete();
            }
        }
        /// <summary>
        /// 验证操作
        /// </summary>
        /// <param name="validater"></param>
        /// <param name="database"></param>
        protected override void ValidateAction(Validater validater, IDatabase database)
        {
            validater.AddCondition(_FundMember.Entity != null, "对应的经费成员不能为空");
            validater.AddCondition(_PerformanceAllocation.Entity != null, "对应的绩效分配不能为空");

            validater.AddCondition(_PerformancePay >= 0, "绩效金额费必须大于等于零");
        }
        /// <summary>
        /// 保存操作
        /// </summary>
        /// <param name="database"></param>
        protected override void SaveAction(IDatabase database)
        {
            using (TransactionScope ts = new TransactionScope())
            {
                if (string.IsNullOrEmpty(_VoucherNumber))
                    this._VoucherNumber = getVoucherNumber(this, database);

                if (string.IsNullOrEmpty(_AccountBookNumber) && this.FundMember != null && _AccountBookNumber != FundMember.AccountBookNumber)
                    this._AccountBookNumber = this.FundMember.AccountBookNumber;
                base.SaveAction(database);
                if (PerformanceAllocation == null)
                    database.PerformanceAllocations.Where(e => e.ID == PerformanceAllocation.ID).FirstOrDefault().Save(database);
                else
                    PerformanceAllocation.Save(database);

                ts.Complete();
            }
        }
        /// <summary>
        /// 生成凭单号
        /// </summary>
        /// <param name="performanceVoucher"></param>
        /// <param name="database"></param>
        /// <returns></returns>
        private static string getVoucherNumber(PerformanceVoucher performanceVoucher, IDatabase database)
        {
            if (performanceVoucher.PerformanceAllocation.Performance.Project == null)
                return performanceVoucher.Project.Type.Rank.IsHorizontal ?
                    string.Format("P{0:D5}", database.SystemSettings.NewHorizontalPerformanceVouherNumber()) :
                    string.Format("J{0:D5}", database.SystemSettings.NewVerticalPerformanceVouherNumber());
            else if (performanceVoucher.PerformanceAllocation != null && performanceVoucher.PerformanceAllocation.CurrentState.State == PerformanceAllocationState.Passed)
                return performanceVoucher.PerformanceAllocation.Performance.Project.Type.Rank.IsHorizontal ?
                 string.Format("P{0:D5}", database.SystemSettings.NewHorizontalPerformanceVouherNumber()) :
                 string.Format("J{0:D5}", database.SystemSettings.NewVerticalPerformanceVouherNumber());
            return null;
        }
        /// <summary>
        /// 删除操作
        /// </summary>
        /// <param name="database"></param>
        protected override void DeleteAction(IDatabase database)
        {
            using (TransactionScope ts = new TransactionScope())
            {
                this.CurrentState = null;
                foreach (var performanceVoucherStateHistory in database.PerformanceVoucherStateHistories.GetByPerformanceVoucherID(ID))
                    performanceVoucherStateHistory.Delete(database);

                var performanceAllocation = this.PerformanceAllocation;
                var fundMember = this.FundMember;
                base.DeleteAction(database);

                if (performanceAllocation != null)
                {
                    performanceAllocation.Save(database);
                }

                //fundAllocation.UpdateStatistic(database);
                // fundAllocation.Save(database);

                var expert = fundMember.Expert;
                if (fundMember.GetPerformanceVouchersCount(database.PerformanceVouchers) == 0)
                {
                    if (database.PerformanceVouchers.Count(q => q.FundMember == fundMember && q.PerformanceAllocation.Performance.Project == performanceAllocation.Performance.Project) == 0 && database.Vouchers.Count(q => q.FundMember == fundMember && q.FundAllocation.FundDescend.ProjectInfo_Fund.Project == performanceAllocation.Performance.Project) == 0)
                        fundMember.Delete(database);
                    var projectMember = database.ProjectMemebers.SingleOrDefault(c => c.Project == performanceAllocation.Performance.Project && c.Expert == expert && c.Order > 500);
                    if (projectMember != null)
                        projectMember.Delete(database);
                }

                ts.Complete();
            }
        }
        /// <summary>
        /// 判断手工输入的账本号是否合法
        /// </summary>
        /// <param name="accountBookNumber"></param>
        /// <returns></returns>
        public bool IsAccountBookNumberLegal(string accountBookNumber, User user)
        {
            if (IGNORE_ACCOUNTBOOKNUMBER_LEGAL_LOGINID.Contains(user.LoginID))
                return true;

            //长度必须是10位或11位（有“-”)
            bool hasDivision = accountBookNumber.IndexOf("-") >= 0;
            if (accountBookNumber.Length != (hasDivision ? 11 : 10))
                return false;

            //前四位必须是院系代码
            string fundMemberCollegeCode = !this.FundMember.ExpertID.HasValue ? string.Empty : !this.FundMember.Expert.CollegeID.HasValue ? string.Empty : this.FundMember.Expert.College.Code;
            if (!string.IsNullOrEmpty(fundMemberCollegeCode) && accountBookNumber.Substring(0, 1) != fundMemberCollegeCode.Substring(0, 1))
                return false;

            //第五位和第六位必须是项目类型代码
            string sixth = accountBookNumber.Substring(5, 1);
            if (sixth != "9")
                return false;

            return true;
        }

    }

    /// <summary>
    /// 绩效凭单的业务扩展
    /// </summary>
    public static class PerformanceVoucherBusinessExtension
    {
        /// <summary>
        /// 凭单打印提醒（提醒规则：超过10张未打印凭单，或凭单时间超过3个工作日的，发送邮件）
        /// </summary>
        /// <param name="query"></param>
        /// <param name="database"></param>
        public static void VoucherPrintRemind(this IQueryable<PerformanceVoucher> query, IDatabase database)
        {
            var voucherNeedPrint = query
                .Where(q => q.CurrentState.State == PerformanceVoucherState.UnPrinted)
                .ToList();
            var voucherNeedPrintTreeDays = voucherNeedPrint
                .Where(q => q.CurrentState.DateTime.AddDays(3) <= DateTime.Now)
                .ToList();

            var supers = database.Users.Where(q => q.IsSuper).ToList();
            var user = database.Users.First(u => u.IsSuper);

            if (voucherNeedPrint.Count() >= 10 || voucherNeedPrintTreeDays.Count >= 0)
            {
                string title = string.Format("凭单打印提醒");
                string body = string.Format("您目前有{0}张未打印的绩效凭单，其中凭单时间超过3个工作日的绩效凭单有{1}张。请及时登录科研管理系统打印绩效凭单。", voucherNeedPrint.Count(), voucherNeedPrintTreeDays.Count());
                string content = EmailContentModel.GetAdminEmailContentModel(body);

                foreach (var super in supers)
                {
                    if (super.IsLocked(database.UserLockLogs))
                        continue;
                    //一分钟发送一封邮件
                    Thread.Sleep(1000 * 120);
                    user.SendMail(super.Email, title, content, database);

                    var PrincipalDescription = string.Format("自动发送凭单打印提醒邮件，超管：{0}，emal:{1}", super.Name, super.Email);
                    Log.Write("系统", (int)LogType.VoucherPrintRemind, PrincipalDescription, "自动发送凭单打印提醒邮件", database);

                }
            }
            var description = string.Format("超管凭单打印提醒邮件{0}封", supers.Count());
            Log.Write("系统", (int)LogType.VoucherPrintRemind, description, "自动发送超管凭单打印提醒邮件", database);
        }
        /// <summary>
        /// 提醒管理员打印凭单
        /// </summary>
        /// <param name="query"></param>
        /// <param name="database"></param>
        public static void VoucherPrintRemindToAdmin(this IQueryable<PerformanceVoucher> query, IDatabase database)
        {
            var voucherNeedPrintH = query
                .Where(q => q.CurrentState.State == PerformanceVoucherState.UnPrinted && q.PerformanceAllocation.Performance.Project.Type.Type.ProjectRank.IsHorizontal == true)
                .ToList();
            var voucherNeedPrintV = query
              .Where(q => q.CurrentState.State == PerformanceVoucherState.UnPrinted && q.PerformanceAllocation.Performance.Project.Type.Type.ProjectRank.IsHorizontal == false)
              .ToList();

            int sendCount = 0;
            var admins = database.Users.Where(p => p.UserRole.Type == UserRoleType.Administrator && !p.IsSuper).ToList();
            var user = database.Users.First(u => u.IsSuper);
            string title = string.Format("绩效凭单打印提醒");
            string body = string.Empty;
            string content = EmailContentModel.GetAdminEmailContentModel(body);

            foreach (var admin in admins)
            {
                if (!admin.HasPermission(PermissionItem.ManageFund, database) || admin.IsLocked(database.UserLockLogs))
                    continue;


                List<int> idsHorizontal = admin.GetCanCensorHorizontalProjectTypes(database).Select(p => p.ID).ToList();
                List<int> idsVertical = admin.GetCanCensorVerticalProjectTypes(database).Select(p => p.ID).ToList();

                int countH = voucherNeedPrintH
                    .Where(q => idsHorizontal.Contains(q.PerformanceAllocation.Performance.Project.Type.Type.ID))
                    .ToList()
                    .Count();

                int countV = voucherNeedPrintV
                   .Where(q => idsHorizontal.Contains(q.PerformanceAllocation.Performance.Project.Type.Type.ID))
                   .ToList()
                   .Count();

                if (countH > 0 || countV > 0)
                {
                    body = string.Format("您目前有：{0}张横向和：{1}张纵向凭单未打印的绩效凭单,请及时登录科研管理系统打印绩效凭单。", countH, countV);
                    content = EmailContentModel.GetAdminEmailContentModel(body);

                    Thread.Sleep(1000 * 120);
                    user.SendMail(admin.Email, title, content, database);
                    sendCount++;

                    var PrincipalDescription = string.Format("自动发送绩效凭单打印提醒邮件，管理员：{0}，emal:{1}", admin.Name, admin.Email);
                    Log.Write("系统", (int)LogType.VoucherPrintRemind, PrincipalDescription, "自动发送绩效凭单打印提醒邮件", database);
                }
            }
            var description = string.Format("管理员绩效凭单打印提醒邮件{0}封", sendCount);
            Log.Write("系统", (int)LogType.VoucherPrintRemind, description, "自动发送管理员绩效凭单打印提醒邮件", database);
        }
        /// <summary>
        /// 凭单已经打印提醒（提醒规则：打印后第二天提醒课题负责人）
        /// </summary>
        /// <param name="query"></param>
        /// <param name="database"></param>
        public static void VoucherPrintedRemind(this IQueryable<PerformanceVoucherStateHistory> query, IDatabase database)
        {
            var vouchers = query.Where(q => q.State == PerformanceVoucherState.NotSignIn && q.DateTime < DateTime.Now && q.DateTime.AddDays(1) > DateTime.Now)
                .Select(q => q.PerformanceVoucher).ToList();

            var user = database.Users.First(u => u.IsSuper);

            foreach (var voucher in vouchers)
            {
                //一分钟发送一封邮件
                Thread.Sleep(1000 * 120);

                string title = string.Format("课题：{0}，绩效凭单:{1}打印通知", voucher.PerformanceAllocation.Performance.Project.Name, voucher.VoucherNumber);
                string body = string.Format("您的课题：{0},绩效凭单:{1},已经打印，并提交财务处，请随时关注", voucher.PerformanceAllocation.Performance.Project.Name, voucher.VoucherNumber);
                string content = EmailContentModel.GetAdminEmailContentModel(body);

                user.SendMail(voucher.FundMember.Expert.Email, title, content, database);

                var PrincipalDescription = string.Format("自动发送绩效凭单已经打印提醒邮件，专家：{0}，emal:{1}", voucher.FundMember.Expert.Name, voucher.FundMember.Expert.Email);
                Log.Write("系统", (int)LogType.VoucherPrintedRemind, PrincipalDescription, "自动发送绩效凭单已经打印提醒邮件", database);

            }
            var description = string.Format("发送绩效凭单已经打印提醒邮件{0}封", vouchers.Count());
            Log.Write("系统", (int)LogType.VoucherPrintedRemind, description, "自动发送绩效凭单已经打印提醒邮件", database);
        }
    }
    /// <summary>
    /// 绩效凭单的查询扩展
    /// </summary>
    public static class PerformanceVoucherQueryExtension
    {
        /// <summary>
        /// 取得经费分配对应的凭单
        /// </summary>
        /// <param name="query"></param>
        /// <param name="performanceAllocationID"></param>
        /// <returns></returns>
        public static IList<PerformanceVoucher> GetByPerformanceAllocation(this IQueryable<PerformanceVoucher> query, int performanceAllocationID)
        {
            return query
                .Where(q => q.PerformanceAllocationID == performanceAllocationID)
                .ToList();
        }
        /// <summary>
        /// 取得凭单列表
        /// </summary>
        /// <param name="query"></param>
        /// <param name="queryInformation"></param>
        /// <param name="database"></param>
        /// <param name="user"></param>
        /// <returns></returns>
        public static PerformanceVoucherQueryResult Query(this IQueryable<PerformanceVoucher> query, PerformanceVoucherQueryInformation queryInformation, IDatabase database, User user)
        {
            if (query == null)
                throw new ArgumentNullException("query");
            if (queryInformation == null)
                throw new ArgumentNullException("queryInformation");

            var q = query.GetVouchers(queryInformation, database, user);
            q = SortQuery(q, queryInformation.SortInfo);

            return new PerformanceVoucherQueryResult(q.Skip(queryInformation.Start).Take(queryInformation.Limit).ToList(), q.Count(),
                q.Where(c => c.PerformanceAllocation.CurrentState.State == PerformanceAllocationState.Passed).Count() == 0 ? 0 : q.Where(c => c.PerformanceAllocation.CurrentState.State == PerformanceAllocationState.Passed).Sum(c => c.OverheadExpensesExpert == null ? 0 : c.OverheadExpensesExpert.Value),
               q.Where(c => c.PerformanceAllocation.CurrentState.State == PerformanceAllocationState.Passed).Count() == 0 ? 0 : q.Where(c => c.PerformanceAllocation.CurrentState.State == PerformanceAllocationState.Passed).Sum(c => c.PerformancePay));

        }
        /// <summary>
        /// 取得凭单列表
        /// </summary>
        /// <param name="query"></param>
        /// <param name="queryInformation"></param>
        /// <param name="database"></param>
        /// <param name="user"></param>
        /// <returns></returns>
        public static IQueryable<PerformanceVoucher> GetVouchers(this IQueryable<PerformanceVoucher> query, PerformanceVoucherQueryInformation queryInformation, IDatabase database, User user)
        {
            var q = query.AsQueryable();

            q = q.Intersect(query.getVouchers(user, queryInformation, database));
            q = q.Intersect(query.getVouchers(queryInformation, database));


            //以下为统计的情况
            if (queryInformation.ProjectQueryInformation != null)
            {
                var projects = database.Projects.GetProject(queryInformation.ProjectQueryInformation, null, database);
                if (projects.Count() != database.Projects.Count())
                {
                    var projectIDs = projects.Select(p => p.ID).ToArray();
                    var performanceVoucherList = new List<PerformanceVoucher>();
                    foreach (var performanceVoucher in q)
                        if (projectIDs.Contains(performanceVoucher.PerformanceAllocation.Performance.ProjectID))
                            performanceVoucherList.Add(performanceVoucher);

                    q = performanceVoucherList.AsQueryable();
                }
            }
            if (queryInformation.PerformanceAllocationStates != null && queryInformation.PerformanceAllocationStates.Length > 0)
            {
                var performanceAllocationIds = database
                    .PerformanceAllocations
                    .Where(fa => queryInformation.PerformanceAllocationStates.Contains(fa.CurrentState.State))
                    .Select(fd => fd.ID)
                    .ToList()
                    .Distinct();

                var voucherList = new List<PerformanceVoucher>();
                foreach (var performanceVoucher in q)
                    if (performanceAllocationIds.Contains(performanceVoucher.PerformanceAllocationID))
                        voucherList.Add(performanceVoucher);

                q = voucherList.AsQueryable();
            }
            if (queryInformation.PerformanceAllocationCensorPassDateTime != null)
            {
                var performanceAllocationStateHistoryQuery = database
                    .PerformanceAllocationStateHistories
                    .AsQueryable()
                    .Where(fash => fash.State == PerformanceAllocationState.Passed);

                if (queryInformation.PerformanceAllocationCensorPassDateTime.Start.HasValue)
                    performanceAllocationStateHistoryQuery = performanceAllocationStateHistoryQuery.Where(fash => fash.DateTime >= queryInformation.PerformanceAllocationCensorPassDateTime.Start);

                if (queryInformation.PerformanceAllocationCensorPassDateTime.End.HasValue)
                    performanceAllocationStateHistoryQuery = performanceAllocationStateHistoryQuery.Where(fash => fash.DateTime <= queryInformation.PerformanceAllocationCensorPassDateTime.End);

                var performanceAllocationIds = performanceAllocationStateHistoryQuery
                    .Select(fash => fash.PerformanceAllocationID)
                    .ToList()
                    .Distinct();

                var performanceVoucherList = new List<PerformanceVoucher>();
                foreach (var performanceVoucher in q)
                    if (performanceAllocationIds.Contains(performanceVoucher.PerformanceAllocationID))
                        performanceVoucherList.Add(performanceVoucher);

                q = performanceVoucherList.AsQueryable();
            }
            //carlsirce2013.3.4 如果是专家，只能看到审核通过的凭单。
            if (user.IsExpert)
            {
                q = q.Intersect(database.PerformanceVouchers.Where(c => c.CurrentState.State != PerformanceVoucherState.WaitingCensor && c.CurrentState.State != PerformanceVoucherState.Canceled && c.CurrentState.State != PerformanceVoucherState.Reject));
            }
            return q;
        }
        private static IQueryable<PerformanceVoucher> getVouchers(this IQueryable<PerformanceVoucher> query, User user, PerformanceVoucherQueryInformation queryInformation, IDatabase database)
        {
            //财务管理员所能查看的凭单状态
            PerformanceVoucherState[] financeCanShowState = { PerformanceVoucherState.NotSignIn, PerformanceVoucherState.SignIn, PerformanceVoucherState.Allocated };

            if (user == null || user.IsSuper)
                return query;

            //财务管理员
            if (user.HasPermission(PermissionItem.ManageFinance, database))
                return query.Where(q => financeCanShowState.Contains(q.CurrentState.State));

            if (user.IsExpert)
                return query.Where(v => v.FundMember.Expert.User == user && v.CurrentState.State != PerformanceVoucherState.Canceled);

            var projectTypeIDList = user.GetCanEditVerticalTypes(database)
            .Union(user.GetCanEditHorizontalTypes(database))
            .Select(pt => pt.ID)
            .ToList();

            return query.Where(v => projectTypeIDList.Contains(v.PerformanceAllocation.Performance.Project.Type.TypeID));
        }
        private static IQueryable<PerformanceVoucher> getVouchers(this IQueryable<PerformanceVoucher> query, PerformanceVoucherQueryInformation queryInformation, IDatabase database)
        {
            if (queryInformation.VoucherNumber != null)
                queryInformation.VoucherNumber = queryInformation.VoucherNumber.Trim();
            if (queryInformation.ExpertNameOrNameSpell != null)
                queryInformation.ExpertNameOrNameSpell = queryInformation.ExpertNameOrNameSpell.Trim();
            if (queryInformation.ProjectNameOrNameSpell != null)
                queryInformation.ProjectNameOrNameSpell = queryInformation.ProjectNameOrNameSpell.Trim();

            var q = query.AsQueryable();

            if (queryInformation.IsHorizontal.HasValue)
                q = q.Where(v => v.PerformanceAllocation.Performance.Project.Type.Rank.IsHorizontal == queryInformation.IsHorizontal.Value);

            if (!String.IsNullOrEmpty(queryInformation.VoucherNumber))
                q = q.Where(v => v.VoucherNumber.StartsWith(queryInformation.VoucherNumber));

            if (!String.IsNullOrEmpty(queryInformation.ProjectNameOrNameSpell))
                q = q.Where(v => v.PerformanceAllocation.Performance.Project.Name.StartsWith(queryInformation.ProjectNameOrNameSpell)
                    || v.PerformanceAllocation.Performance.Project.NameSpell.StartsWith(queryInformation.ProjectNameOrNameSpell));

            if (!String.IsNullOrEmpty(queryInformation.ExpertNameOrNameSpell))
                q = q.Where(v => v.FundMember.Expert.Name.StartsWith(queryInformation.ExpertNameOrNameSpell)
                    || v.FundMember.Expert.NameSpell.StartsWith(queryInformation.ExpertNameOrNameSpell));

            if (queryInformation.PerformanceAccountBookNumber != null) queryInformation.PerformanceAccountBookNumber = queryInformation.PerformanceAccountBookNumber.Trim();
            if (!string.IsNullOrEmpty(queryInformation.PerformanceAccountBookNumber))
                q = q.Where(v => v.AccountBookNumber.Contains(queryInformation.PerformanceAccountBookNumber));

            if (queryInformation.VoucherState != null && queryInformation.VoucherState.Length != 0)
                q = q.Where(v => queryInformation.VoucherState.Contains(v.CurrentState.State));

            if (queryInformation.FinanceNumber != null) queryInformation.FinanceNumber = queryInformation.FinanceNumber.Trim();
            if (!string.IsNullOrEmpty(queryInformation.FinanceNumber))
                q = q.Where(v => v.FinanceNumber.StartsWith(queryInformation.FinanceNumber));

            if (queryInformation.FinanceAllocationDateTime != null)
            {
                if (queryInformation.FinanceAllocationDateTime.Start.HasValue)
                    q = q.Where(v => v.FinanceAllocateDateTime.HasValue && v.FinanceAllocateDateTime.Value >= queryInformation.FinanceAllocationDateTime.Start.Value);
                if (queryInformation.FinanceAllocationDateTime.End.HasValue)
                    q = q.Where(v => v.FinanceAllocateDateTime.HasValue && v.FinanceAllocateDateTime.Value <= queryInformation.FinanceAllocationDateTime.End.Value);
            }

            if (queryInformation.College != null) queryInformation.College = queryInformation.College.Trim();
            if (!string.IsNullOrEmpty(queryInformation.College))
                q = q.Where(v => v.FundMember.Expert.College.Name == queryInformation.College);

            q = q.Where(v => v.CurrentState.State != PerformanceVoucherState.Unknown && v.CurrentState.State != PerformanceVoucherState.Reject);

            return q;

        }
        private static IQueryable<PerformanceVoucher> SortQuery(IQueryable<PerformanceVoucher> query, SortInfo sortInfo)
        {
            if (sortInfo == null)
                return query = query.OrderByDescending(v => v.ID);
            else if (sortInfo.Field.EqualIgnoreCase("AccountBookNumber"))
                return sortInfo.Direction == SortDirection.ASC
                    ? query.OrderBy(v => v.AccountBookNumber)
                    : query.OrderByDescending(v => v.AccountBookNumber);
            else if (sortInfo.Field.EqualIgnoreCase("IsRead"))
                return sortInfo.Direction == SortDirection.ASC
                    ? query.OrderBy(v => v.IsRead)
                    : query.OrderByDescending(v => v.IsRead);
            else if (sortInfo.Field.EqualIgnoreCase("VoucherNumber"))
                return sortInfo.Direction == SortDirection.ASC
                    ? query.OrderBy(v => v.VoucherNumber)
                    : query.OrderByDescending(v => v.VoucherNumber);

            else if (sortInfo.Field.EqualIgnoreCase("VoucherState"))
                return sortInfo.Direction == SortDirection.ASC
                    ? query.OrderBy(v => v.CurrentState.State)
                    : query.OrderByDescending(v => v.CurrentState.State);
            else if (sortInfo.Field.EqualIgnoreCase("FinanceAllocationDateTime"))
                return sortInfo.Direction == SortDirection.ASC
                    ? query.OrderBy(v => v.CurrentState.State == PerformanceVoucherState.Allocated).OrderBy(v => v.CurrentState.DateTime)
                    : query.OrderBy(v => v.CurrentState.State == PerformanceVoucherState.Allocated).OrderByDescending(v => v.CurrentState.DateTime);
            else if (sortInfo.Field.EqualIgnoreCase("ProjectName"))
                return sortInfo.Direction == SortDirection.ASC
                    ? query.OrderBy(v => v.PerformanceAllocation.Performance.Project.Name)
                    : query.OrderByDescending(v => v.PerformanceAllocation.Performance.Project.Name);
            else if (sortInfo.Field.EqualIgnoreCase("ExpertName"))
                return sortInfo.Direction == SortDirection.ASC
                    ? query.OrderBy(v => v.FundMember.Expert.Name)
                    : query.OrderByDescending(v => v.FundMember.Expert.Name);
            else
                return query = query.OrderByDescending(v => v.ID);
        }
        /// <summary>
        /// 取得未读凭单
        /// </summary>
        /// <param name="query"></param>
        /// <param name="user"></param>
        /// <returns></returns>
        public static int GetMyUnReadVouchers(this IQueryable<PerformanceVoucher> query, User user)
        {
            if (!user.IsExpert)
                throw new ArgumentException("只有专家有这个权限");
            return query.Where(v => v.FundMember.Expert.User == user && v.CurrentState.State != PerformanceVoucherState.Unknown && v.CurrentState.State != PerformanceVoucherState.WaitingCensor && v.CurrentState.State != PerformanceVoucherState.Reject && !v.IsRead).Count();
        }
    }
    /// <summary>
    /// 绩效凭单的权限扩展
    /// </summary>
    public static class PerformanceVoucherPermissionExtension
    {
        /// <summary>
        /// 判断用户是否具有凭单的查看权限
        /// </summary>
        /// <param name="user"></param>
        /// <param name="performanceVoucher"></param>
        /// <param name="database"></param>
        /// <returns></returns>
        public static bool HasPermission_Show(this User user, PerformanceVoucher performanceVoucher, IDatabase database)
        {
            if (user.HasPermission(PermissionItem.ManageFinance, database))
                return true;

            var project = performanceVoucher.PerformanceAllocation.Performance.Project;
            if (user.IsExpert)
                return user == performanceVoucher.FundMember.Expert.User;

            return user.HasPermission_Show(project, database);
        }
        /// <summary>
        /// 判断用户能否查看凭单
        /// </summary>
        /// <param name="user"></param>
        /// <param name="performanceVoucher"></param>
        /// <param name="database"></param>
        /// <returns></returns>
        public static bool CanShow(this User user, PerformanceVoucher performanceVoucher, IDatabase database)
        {
            if (user.IsSuper)
                return true;

            if (user.HasPermission(PermissionItem.ManageFinance, database))
                return performanceVoucher.CurrentStateID.HasValue && performanceVoucher.CurrentState.State != PerformanceVoucherState.UnPrinted && performanceVoucher.CurrentState.State != PerformanceVoucherState.Unknown;

            return user.HasPermission_Show(performanceVoucher, database);
        }
        /// <summary>
        /// 判断用户是否具有凭单的编辑权限
        /// </summary>
        /// <param name="user"></param>
        /// <param name="performanceVoucher"></param>
        /// <param name="database"></param>
        /// <returns></returns>
        public static bool HasPermission_Edit(this User user, PerformanceVoucher performanceVoucher, IDatabase database)
        {
            var project = performanceVoucher.PerformanceAllocation.Performance.Project;

            if (user.IsExpert)
                return project.IsPrincipal(user);

            if (!user.HasPermission(PermissionItem.ManageFund, database))
                return false;

            return user.CanEdit(project, database);
        }
        /// <summary>
        /// 判断用户能够编辑凭单
        /// </summary>
        /// <param name="user"></param>
        /// <param name="performanceVoucher"></param>
        /// <param name="database"></param>
        /// <returns></returns>
        public static bool CanEdit(this User user, PerformanceVoucher performanceVoucher, IDatabase database)
        {
            if (performanceVoucher.PerformanceAllocation == null)
                return user.IsExpert == false;

            if (!user.HasPermission_Edit(performanceVoucher, database))
                return false;

            if (performanceVoucher.PerformanceAllocation.CurrentState == null)
                return false;

            if (performanceVoucher.PerformanceAllocation != null && performanceVoucher.PerformanceAllocation.CurrentState.State != PerformanceAllocationState.UnSubmit && performanceVoucher.PerformanceAllocation.CurrentState.State != PerformanceAllocationState.Reject)
                return false;

            return true;
        }
        /// <summary>
        /// 判断用户是否具有凭单的删除权限
        /// </summary>
        /// <param name="user"></param>
        /// <param name="performanceVoucher"></param>
        /// <param name="database"></param>
        /// <returns></returns>
        public static bool HasPermission_Delete(this User user, PerformanceVoucher performanceVoucher, IDatabase database)
        {
            return user.HasPermission_Edit(performanceVoucher, database);
        }
        /// <summary>
        /// 判断用户能否删除凭单
        /// </summary>
        /// <param name="user"></param>
        /// <param name="performanceVoucher"></param>
        /// <param name="database"></param>
        /// <returns></returns>
        public static bool CanDelete(this User user, PerformanceVoucher performanceVoucher, IDatabase database)
        {
            return user.CanEdit(performanceVoucher, database);
        }
        /// <summary>
        /// 判断用户是否具有编辑凭单账本号的权限
        /// </summary>
        /// <param name="user"></param>
        /// <param name="performanceVoucher"></param>
        /// <param name="database"></param>
        /// <returns></returns>
        public static bool HasPermission_ResetAccountBookNumber(this User user, PerformanceVoucher performanceVoucher, IDatabase database)
        {
            return user.HasPermission_Edit(performanceVoucher, database);
        }
        /// <summary>
        /// 判断用户能否编辑凭单的账本号
        /// </summary>
        /// <param name="user"></param>
        /// <param name="performanceVoucher"></param>
        /// <param name="database"></param>
        /// <returns></returns>
        public static bool CanResetAccountBookNumber(this User user, PerformanceVoucher performanceVoucher, IDatabase database)
        {
            //设定特殊用户，可编辑账本号
            if (Voucher.IGNORE_ACCOUNTBOOKNUMBER_LEGAL_LOGINID.Contains(user.LoginID))
                return true;

            if (!user.HasPermission_ResetAccountBookNumber(performanceVoucher, database))
                return false;

            return performanceVoucher.AccountBookNumber == "新建";
        }
        /// <summary>
        /// 是否有打印的权限
        /// </summary>
        /// <param name="user"></param>
        /// <param name="performanceVoucher"></param>
        /// <param name="database"></param>
        /// <returns></returns>
        public static bool HasPermission_Print(this User user, PerformanceVoucher performanceVoucher, IDatabase database)
        {
            if (!user.HasPermission(PermissionItem.ManageFund, database))
                return false;

            var project = performanceVoucher.PerformanceAllocation.Performance.Project;
            return user.CanEdit(project, database);
        }
        /// <summary>
        /// 能否打印
        /// </summary>
        /// <param name="user"></param>
        /// <param name="performanceVoucher"></param>
        /// <param name="database"></param>
        /// <returns></returns>
        public static bool CanPrint(this User user, PerformanceVoucher performanceVoucher, IDatabase database)
        {
            if (!user.HasPermission_Print(performanceVoucher, database))
                return false;

            if (performanceVoucher.PerformanceAllocation.CurrentState == null)
                return false;

            if (performanceVoucher.PerformanceAllocation.CurrentState.State != PerformanceAllocationState.Passed)
                return false;

            if (performanceVoucher.CurrentState == null)
                return false;

            return performanceVoucher.CurrentState.State == PerformanceVoucherState.UnPrinted;
        }
        /// <summary>
        /// 判断用户是否具有查看对应经费分配的权限
        /// </summary>
        /// <param name="user"></param>
        /// <param name="performanceVoucher"></param>
        /// <param name="database"></param>
        /// <returns></returns>
        public static bool HasPermission_ShowPerformanceAllocation(this User user, PerformanceVoucher performanceVoucher, IDatabase database)
        {
            if (!user.HasPermission(PermissionItem.ManageFund, database))
                return false;

            var project = performanceVoucher.PerformanceAllocation.Performance.Project;
            return user.CanEdit(project, database);
        }
        /// <summary>
        /// 判断用户能够查看对景经费分配
        /// </summary>
        /// <param name="user"></param>
        /// <param name="performanceVoucher"></param>
        /// <param name="database"></param>
        /// <returns></returns>
        public static bool CanShowPerformanceAllocation(this User user, PerformanceVoucher performanceVoucher, IDatabase database)
        {
            return user.HasPermission_ShowPerformanceAllocation(performanceVoucher, database);
        }
        /// <summary>
        /// 是否有重置打印次数的权限
        /// </summary>
        /// <param name="user"></param>
        /// <returns></returns>
        public static bool HasPermission_ResetPerformanceVoucherPrint(this User user)
        {
            return user.IsSuper;
        }
        /// <summary>
        /// 能否重置打印次数
        /// </summary>
        /// <param name="user"></param>
        /// <param name="performanceVoucher"></param>
        /// <returns></returns>
        public static bool CanResetPerformaceVoucherPrint(this User user, PerformanceVoucher performanceVoucher)
        {
            if (!user.HasPermission_ResetPrint())
                return false;

            if (performanceVoucher.CurrentState == null)
                return false;

            return performanceVoucher.CurrentState.State == PerformanceVoucherState.NotSignIn;
        }
        /// <summary>
        /// 是否有签收权限
        /// </summary>
        /// <param name="user"></param>
        /// <param name="database"></param>
        /// <returns></returns>
        public static bool HasPermission_SignIn(this User user, IDatabase database)
        {
            return user.HasPermission(PermissionItem.ManageFinance, database);
        }
        /// <summary>
        /// 能否签收
        /// </summary>
        /// <param name="user"></param>
        /// <param name="performanceVoucher"></param>
        /// <param name="database"></param>
        /// <returns></returns>
        public static bool CanSignIn(this User user, PerformanceVoucher performanceVoucher, IDatabase database)
        {
            if (!user.HasPermission_SignIn(database))
                return false;

            if (performanceVoucher.CurrentState == null)
                return false;

            return performanceVoucher.CurrentState.State == PerformanceVoucherState.NotSignIn;
        }
        /// <summary>
        /// 是否有退回权限
        /// </summary>
        /// <param name="user"></param>
        /// <param name="database"></param>
        /// <returns></returns>
        public static bool HasPermission_ReturnVoucher(this User user, IDatabase database)
        {
            return user.HasPermission_SignIn(database);
        }
        /// <summary>
        /// 能否退回
        /// </summary>
        /// <param name="user"></param>
        /// <param name="performanceVoucher"></param>
        /// <param name="database"></param>
        /// <returns></returns>
        public static bool CanReturnVoucher(this User user, PerformanceVoucher performanceVoucher, IDatabase database)
        {
            if (!user.HasPermission_ReturnVoucher(database))
                return false;

            if (performanceVoucher.CurrentState == null)
                return false;

            return performanceVoucher.CurrentState.State == PerformanceVoucherState.SignIn;
        }
        /// <summary>
        ///是否有财务分配的权限
        /// </summary>
        /// <param name="user"></param>
        /// <param name="database"></param>
        /// <returns></returns>
        public static bool HasPermission_FinanceAllocate(this User user, IDatabase database)
        {
            return user.HasPermission_SignIn(database);
        }
        /// <summary>
        /// 能否财务分配
        /// </summary>
        /// <param name="user"></param>
        /// <param name="performanceVoucher"></param>
        /// <param name="database"></param>
        /// <returns></returns>
        public static bool CanFinanceAllocate(this User user, PerformanceVoucher performanceVoucher, IDatabase database)
        {
            if (!user.HasPermission_FinanceAllocate(database))
                return false;

            if (performanceVoucher.CurrentState == null)
                return false;

            return performanceVoucher.CurrentState.State == PerformanceVoucherState.SignIn;
        }
        /// <summary>
        /// 是否有取消财务分配的权限
        /// </summary>
        /// <param name="user"></param>
        /// <param name="database"></param>
        /// <returns></returns>
        public static bool HasPermission_CancelFinanceAllocate(this User user, IDatabase database)
        {
            return user.HasPermission_FinanceAllocate(database);
        }
        /// <summary>
        /// 能否取消财务分配
        /// </summary>
        /// <param name="user"></param>
        /// <param name="performanceVoucher"></param>
        /// <param name="database"></param>
        /// <returns></returns>
        public static bool CanCancelFinanceAllocate(this User user, PerformanceVoucher performanceVoucher, IDatabase database)
        {
            if (!user.HasPermission_CancelFinanceAllocate(database))
                return false;

            if (performanceVoucher.CurrentState == null)
                return false;

            return performanceVoucher.CurrentState.State == PerformanceVoucherState.Allocated;
        }
    }
}
