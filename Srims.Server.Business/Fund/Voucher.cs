using System;
using System.Collections.Generic;
using System.Data.Linq;
using System.Linq;
using System.Text;
using System.Transactions;
using System.Threading;


using MIS.Common;
using MIS.Common.Query;
using MIS.Common.Validate;

using Srims.Server.Business.Common;
using Srims.Server.Business.Projects;
using Srims.Server.Business.Fund;
using Srims.Server.Business.Users;
using Srims.Server.Business.Experts;
using Srims.Server.Business.Type;

namespace Srims.Server.Business.Fund
{
    /// <summary>
    /// 经费凭单
    /// </summary>
    public partial class Voucher : Entity<Voucher>
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

            list.Add(new LogDescriptionItem { Name = "FundAllocationID", Title = "对应经费分配的ID" });
            list.Add(new LogDescriptionItem { Name = "FundMemberID", Title = "对应经费成员的ID" });

            list.Add(new LogDescriptionItem { Name = "VoucherNumber", Title = "凭单号" });
            list.Add(new LogDescriptionItem { Name = "AccountBookNumber", Title = "账本号" });
            list.Add(new LogDescriptionItem { Name = "AllocationIn", Title = "校内分配" });
            list.Add(new LogDescriptionItem { Name = "AllocationOut", Title = "外协分配" });
            list.Add(new LogDescriptionItem { Name = "AllocationHardware", Title = "硬件费" });
            list.Add(new LogDescriptionItem { Name = "OverheadExpensesIn", Title = "校内分配管理费" });
            list.Add(new LogDescriptionItem { Name = "OverheadExpensesOut", Title = "外协分配管理费" });
            list.Add(new LogDescriptionItem { Name = "IsRead", Title = "是否已查看" });
            list.Add(new LogDescriptionItem { Name = "FinanceNumber", Title = "财务制单号" });
            return list.ToArray();
        }
        /// <summary>
        /// 将凭单的状态设为作废(当对应经费分配作废时)
        /// </summary>
        /// <param name="user"></param>
        /// <param name="database"></param>
        public void Canceled(User user, IDatabase database)
        {
            saveForChangeState(VoucherState.Canceled, user, database);
            //判断条件，删除项目成员与经费成员
            if (this.FundMember.GetVouchersCount(database.Vouchers) == 0 && this.FundMember.GetPerformanceVouchersCount(database.PerformanceVouchers) == 0)
            {
                var projectMember = database.ProjectMemebers.SingleOrDefault(c => c.Project == this.FundAllocation.FundDescend.ProjectInfo_Fund.Project && c.Expert == this.FundMember.Expert && c.Order > 500);
                if (projectMember != null)
                    projectMember.Delete(database);

            }
        }
        /// <summary>
        /// 当凭单的状态设置为审核驳回（当对应经费分配审核驳回时）
        /// </summary>
        /// <param name="user"></param>
        /// <param name="database"></param>
        public void Reject(User user, IDatabase database)
        {
            saveForChangeState(VoucherState.Reject, user, database);
        }
        /// <summary>
        /// 将凭单状态设置为待审核（当对应经费分配提交时）
        /// </summary>
        /// <param name="user"></param>
        /// <param name="database"></param>
        public void Submit(User user, IDatabase database)
        {
            saveForChangeState(VoucherState.WaitingCensor, user, database);
        }
        /// <summary>
        /// 将凭单状态设置为未打印（当对应经费分配审核通过时）
        /// </summary>
        /// <param name="user"></param>
        /// <param name="database"></param>
        public void UnPrinted(User user, IDatabase database)
        {
            saveForChangeState(VoucherState.UnPrinted, user, database);
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

            saveForChangeState(VoucherState.NotSignIn, user, database);
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

            saveForChangeState(VoucherState.Allocated, user, database);
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

            saveForChangeState(VoucherState.SignIn, user, database);
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

            saveForChangeState(VoucherState.SignIn, user, database);
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

            saveForChangeState(VoucherState.NotSignIn, user, database);
        }
        private void saveForChangeState(VoucherState voucherState, User user, IDatabase database)
        {
            using (TransactionScope ts = new TransactionScope())
            {
                var voucherStateHistory = new VoucherStateHistory
                {
                    DateTime = DateTime.Now,
                    Operator = user.Name,
                    State = voucherState,
                    Voucher = this,
                };

                voucherStateHistory.Save(database);
                this.CurrentState = voucherStateHistory;
                this.Save(database);

                ts.Complete();
            }

        }
        /// <summary>
        /// 取得该凭单的总金额
        /// </summary>
        public long GetAmount()
        {
            //carlsirce 2013.1.12系统中存有没打的旧项目的单子，想打就判断一下，按照旧项目的打印规则来返回值。
            if ((this.ID == 17580 || this.ID == 17581 || this.ID == 17582 || this.ID == 17583 || this.ID == 14178))
            {
                return _AllocationIn + _AllocationOut;
            }
            else
            {
                return _AllocationIn + _AllocationOut + _AllocationHardware + _OverheadExpensesExpert+_OverheadExpensesMiddle + _OverheadExpensesIn + OverheadExpensesOut;
            }

        }
        /// <summary>
        /// 取得该凭单的校内间接费用
        /// </summary>
        public long GetOverheadExpenses()
        {
            return OverheadExpensesIn + _OverheadExpensesExpert + _OverheadExpensesMiddle ;//+ OverheadExpensesOut
        }
        /// <summary>
        /// 取得外协列表
        /// </summary>
        /// <param name="query"></param>
        /// <returns></returns>
        public IList<VoucherOut> GetVoucherOut(IQueryable<VoucherOut> query)
        {
            return query.Where(vo => vo.VoucherID == this.ID).ToList();
        }
        /// <summary>
        /// 取得或设置校内管理费
        /// </summary>
        /// <returns></returns>
        public long GetOverheadExpensesIn(FundAllocation fundallocation)
        {
            if (fundallocation == null)
                return Convert.ToInt64(0);

            var projectInfo_Fund = fundallocation.FundDescend.ProjectInfo_Fund;
            double rate = projectInfo_Fund.FundPlanIn == 0 ? 0 : (double)projectInfo_Fund.OverheadExpenseInTotal / projectInfo_Fund.FundPlanIn;

            //原计算规则，根据分配的校内金额
            // return Convert.ToInt64(_AllocationIn * rate);
            //新计算规则
            return Convert.ToInt64((fundallocation.FundDescend.Amount - fundallocation.AllocationOut) * rate);
        }

        /// <summary>
        /// 取得或设置绩效
        /// </summary>
        /// <returns></returns>
        public long GetPerformanceManagementPay(FundAllocation fundallocation)
        {
            if (fundallocation == null)
                return Convert.ToInt64(0);

            var projectInfo_Fund = fundallocation.FundDescend.ProjectInfo_Fund;
            double rate = projectInfo_Fund.FundPlanIn == 0 ? 0 : (double)projectInfo_Fund.PerformancePay / projectInfo_Fund.FundPlanIn;

            //原计算规则，根据分配的校内金额
            //return Convert.ToInt64(_AllocationIn * rate);
            //新计算规则
            return Convert.ToInt64((fundallocation.FundDescend.Amount - fundallocation.AllocationOut) * rate);
        }
        /// <summary>
        /// 取得或设置外协管理费
        /// </summary>
        /// <returns></returns>
        public long GetOverheadExpenseOut()
        {
            if (this.FundAllocation == null)
                return Convert.ToInt64(0);

            var projectInfo_Fund = this.FundAllocation.FundDescend.ProjectInfo_Fund;

            double rate = 0;
            if (projectInfo_Fund.FundPlanOut > 0)
                rate = (double)projectInfo_Fund.OverheadExpenseOutTotal / projectInfo_Fund.FundPlanOut;

            return Convert.ToInt64(_AllocationOut * rate);
        }
        /// <summary>
        /// 验证操作
        /// </summary>
        /// <param name="validater"></param>
        /// <param name="database"></param>
        protected override void ValidateAction(Validater validater, IDatabase database)
        {
            // validater.AddCondition(this.FundAllocation != null, "对应的经费下拨不能为空");
            validater.AddCondition(_FundMember.Entity != null, "对应的经费成员不能为空");

            validater.AddCondition(_AllocationIn >= 0, "校内分配金额必须大于等于零");
            validater.AddCondition(_AllocationOut >= 0, "外协分配金额必须大于等于零");
            validater.AddCondition(_AllocationHardware >= 0, "硬件费金额必须大于等于零");

            validater.AddCondition(_OverheadExpensesIn >= 0, "校内分配管理费必须大于等于零");
            validater.AddCondition(_OverheadExpensesOut >= 0, "外协分配管理费必须大于等于零");
        }
        /// <summary>
        /// 统计信息
        /// </summary>
        /// <param name="database"></param>
        public override void UpdateStatistic(IDatabase database)
        {
            this.AllocationOut = 0;
            foreach (var vo in GetVoucherOut(database.VoucherOuts))
                this.AllocationOut += vo.Amount;

            //初始化经费下拨对于的经费分配应该收取的管理费和绩效费
            if (this.FundAllocation != null)
            {

            }
        }
        /// <summary>
        /// 保存操作
        /// </summary>
        /// <param name="database"></param>
        protected override void SaveAction(IDatabase database)
        {
            using (TransactionScope ts = new TransactionScope())
            {
                if (String.IsNullOrEmpty(_VoucherNumber))
                    this._VoucherNumber = getVoucherNumber(this, database);

                if (string.IsNullOrEmpty(_AccountBookNumber) && this.FundMember != null && _AccountBookNumber != FundMember.AccountBookNumber)
                    this._AccountBookNumber = this.FundMember.AccountBookNumber;

                base.SaveAction(database);
                if (FundAllocation == null)
                    database.PerformanceAllocations.Where(e => e.Performance.FundAllocationID == FundAllocation.ID).FirstOrDefault().Save(database);
                else
                {
                    FundAllocation.Save(database);
                 
                }

                ts.Complete();
            }
        }
        /// <summary>
        /// 生成凭单号
        /// </summary>
        /// <param name="voucher"></param>
        /// <param name="database"></param>
        /// <returns></returns>
        private static string getVoucherNumber(Voucher voucher, IDatabase database)
        {
            if (voucher.FundAllocation == null)
                return voucher.Project.Type.Rank.IsHorizontal ?
                    string.Format("H{0:D5}", database.SystemSettings.NewHorizontalVouherNumber()) :
                    string.Format("V{0:D5}", database.SystemSettings.NewVerticalVouherNumber());
            else if (voucher.FundAllocation != null && voucher.FundAllocation.CurrentState.State == FundAllocationState.Passed)
                return voucher.FundAllocation.FundDescend.ProjectInfo_Fund.Project.Type.Rank.IsHorizontal ?
                 string.Format("H{0:D5}", database.SystemSettings.NewHorizontalVouherNumber()) :
                 string.Format("V{0:D5}", database.SystemSettings.NewVerticalVouherNumber());
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
                foreach (var vo in GetVoucherOut(database.VoucherOuts))
                    vo.Delete(database);

                this.CurrentState = null;
                foreach (var vs in database.VoucherStateHistories.GetByVoucherID(this.ID))
                    vs.Delete(database);

                var fundAllocation = this.FundAllocation;
                var fundMember = this.FundMember;
                var expert = this.FundMember.Expert;
                base.DeleteAction(database);
                fundAllocation.Save(database);
                if (fundAllocation != null)
                {
                    fundAllocation.Save(database);
             
                }

                //fundAllocation.UpdateStatistic(database);
                // fundAllocation.Save(database);

                if (fundMember.GetVouchersCount(database.Vouchers) == 0)
                {
                    if ((database.Vouchers.Count(q => q.FundMember == fundMember && q.FundAllocation.FundDescend.ProjectInfo_Fund == fundAllocation.FundDescend.ProjectInfo_Fund) == 0) && (database.PerformanceVouchers.Count(q => q.FundMember == fundMember && q.PerformanceAllocation.Performance.Project == fundAllocation.FundDescend.ProjectInfo_Fund.Project) == 0))
                
                        fundMember.Delete(database);
                    var projectMember = database.ProjectMemebers.SingleOrDefault(c => c.Project == fundAllocation.FundDescend.ProjectInfo_Fund.Project && c.Expert == expert && c.Order > 500);
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
            string projectTypePreCode = this.FundAllocation.FundDescend.ProjectInfo_Fund.Project.Type.Type.PerCode;
            string accountBookNumberProjectTypePreCode = hasDivision ? accountBookNumber.Substring(5, 2) : accountBookNumber.Substring(4, 2);
            if (!string.IsNullOrEmpty(projectTypePreCode) && projectTypePreCode != accountBookNumberProjectTypePreCode)
                return false;

            return true;
        }



    }
    /// <summary>
    /// 经费凭单的业务扩展
    /// </summary>
    public static class VoucherBusinessExtension
    {
        /// <summary>
        /// 凭单打印提醒（提醒规则：超过10张未打印凭单，或凭单时间超过3个工作日的，发送邮件）
        /// </summary>
        /// <param name="query"></param>
        /// <param name="database"></param>
        public static void VoucherPrintRemind(this IQueryable<Voucher> query, IDatabase database)
        {
            var voucherNeedPrint = query
                .Where(q => q.CurrentState.State == VoucherState.UnPrinted)
                .ToList();
            var voucherNeedPrintTreeDays = voucherNeedPrint
                .Where(q => q.CurrentState.DateTime.AddDays(3) <= DateTime.Now)
                .ToList();

            var supers = database.Users.Where(q => q.IsSuper).ToList();
            var user = database.Users.First(u => u.IsSuper);

            if (voucherNeedPrint.Count() >= 10 || voucherNeedPrintTreeDays.Count >= 0)
            {
                string title = string.Format("凭单打印提醒");
                string body = string.Format("您目前有{0}张未打印的凭单，其中凭单时间超过3个工作日的凭单有{1}张。请及时登录科研管理系统打印凭单。", voucherNeedPrint.Count(), voucherNeedPrintTreeDays.Count());
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
        public static void VoucherPrintRemindToAdmin(this IQueryable<Voucher> query, IDatabase database)
        {
            var voucherNeedPrintH = query
                .Where(q => q.CurrentState.State == VoucherState.UnPrinted && q.FundAllocation.FundDescend.ProjectInfo_Fund.Project.Type.Type.ProjectRank.IsHorizontal == true)
                .ToList();
            var voucherNeedPrintV = query
              .Where(q => q.CurrentState.State == VoucherState.UnPrinted && q.FundAllocation.FundDescend.ProjectInfo_Fund.Project.Type.Type.ProjectRank.IsHorizontal == false)
              .ToList();

            int sendCount = 0;
            var admins = database.Users.Where(p => p.UserRole.Type == UserRoleType.Administrator && !p.IsSuper).ToList();
            var user = database.Users.First(u => u.IsSuper);
            string title = string.Format("凭单打印提醒");
            string body = string.Empty;
            string content = EmailContentModel.GetAdminEmailContentModel(body);

            foreach (var admin in admins)
            {
                if (!admin.HasPermission(PermissionItem.ManageFund, database) || admin.IsLocked(database.UserLockLogs))
                    continue;


                List<int> idsHorizontal = admin.GetCanCensorHorizontalProjectTypes(database).Select(p => p.ID).ToList();
                List<int> idsVertical = admin.GetCanCensorVerticalProjectTypes(database).Select(p => p.ID).ToList();

                int countH = voucherNeedPrintH
                    .Where(q => idsHorizontal.Contains(q.FundAllocation.FundDescend.ProjectInfo_Fund.Project.Type.Type.ID))
                    .ToList()
                    .Count();

                int countV = voucherNeedPrintV
                   .Where(q => idsHorizontal.Contains(q.FundAllocation.FundDescend.ProjectInfo_Fund.Project.Type.Type.ID))
                   .ToList()
                   .Count();

                if (countH > 0 || countV > 0)
                {
                    body = string.Format("您目前有：{0}张横向和：{1}张纵向凭单未打印的凭,单请及时登录科研管理系统打印凭单。", countH, countV);
                    content = EmailContentModel.GetAdminEmailContentModel(body);

                    Thread.Sleep(1000 * 120);
                    user.SendMail(admin.Email, title, content, database);
                    sendCount++;

                    var PrincipalDescription = string.Format("自动发送凭单打印提醒邮件，管理员：{0}，emal:{1}", admin.Name, admin.Email);
                    Log.Write("系统", (int)LogType.VoucherPrintRemind, PrincipalDescription, "自动发送凭单打印提醒邮件", database);
                }
            }
            var description = string.Format("管理员凭单打印提醒邮件{0}封", sendCount);
            Log.Write("系统", (int)LogType.VoucherPrintRemind, description, "自动发送管理员凭单打印提醒邮件", database);
        }
        /// <summary>
        /// 凭单已经打印提醒（提醒规则：打印后第二天提醒课题负责人）
        /// </summary>
        /// <param name="query"></param>
        /// <param name="database"></param>
        public static void VoucherPrintedRemind(this IQueryable<VoucherStateHistory> query, IDatabase database)
        {
            var vouchers = query.Where(q => q.State == VoucherState.NotSignIn && q.DateTime < DateTime.Now && q.DateTime.AddDays(1) > DateTime.Now)
                .Select(q => q.Voucher).ToList();

            var user = database.Users.First(u => u.IsSuper);

            foreach (var voucher in vouchers)
            {
                //一分钟发送一封邮件
                Thread.Sleep(1000 * 120);

                string title = string.Format("课题：{0}，凭单:{1}打印通知", voucher.FundAllocation.FundDescend.ProjectInfo_Fund.Project.Name, voucher.VoucherNumber);
                string body = string.Format("您的课题：{0},凭单:{1},已经打印，并提交财务处，请随时关注", voucher.FundAllocation.FundDescend.ProjectInfo_Fund.Project.Name, voucher.VoucherNumber);
                string content = EmailContentModel.GetAdminEmailContentModel(body);

                user.SendMail(voucher.FundMember.Expert.Email, title, content, database);

                var PrincipalDescription = string.Format("自动发送凭单已经打印提醒邮件，专家：{0}，emal:{1}", voucher.FundMember.Expert.Name, voucher.FundMember.Expert.Email);
                Log.Write("系统", (int)LogType.VoucherPrintedRemind, PrincipalDescription, "自动发送凭单已经打印提醒邮件", database);

            }
            var description = string.Format("发送凭单已经打印提醒邮件{0}封", vouchers.Count());
            Log.Write("系统", (int)LogType.VoucherPrintedRemind, description, "自动发送凭单已经打印提醒邮件", database);
        }
    }
    /// <summary>
    /// 经费凭单的查询扩展
    /// </summary>
    public static class VoucherQueryExtension
    {
        /// <summary>
        /// 取得经费分配对应的凭单
        /// </summary>
        /// <param name="query"></param>
        /// <param name="FundAllocationId"></param>
        /// <returns></returns>
        public static IList<Voucher> GetByFundAllocation(this IQueryable<Voucher> query, int FundAllocationId)
        {
            return query
                .Where(q => q.FundAllocationID == FundAllocationId)
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
        public static QueryResult<Voucher> Query(this IQueryable<Voucher> query, VoucherQueryInformation queryInformation, IDatabase database, User user)
        {
            if (query == null)
                throw new ArgumentNullException("query");
            if (queryInformation == null)
                throw new ArgumentNullException("queryInformation");

            var q = query.GetVouchers(queryInformation, database, user);
            q = SortQuery(q, queryInformation.SortInfo);

            return new QueryResult<Voucher>(q.Skip(queryInformation.Start).Take(queryInformation.Limit).ToList(), q.Count());

        }
        /// <summary>
        /// 取得凭单列表
        /// </summary>
        /// <param name="query"></param>
        /// <param name="queryInformation"></param>
        /// <param name="database"></param>
        /// <param name="user"></param>
        /// <returns></returns>
        public static IQueryable<Voucher> GetVouchers(this IQueryable<Voucher> query, VoucherQueryInformation queryInformation, IDatabase database, User user)
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
                    var voucherList = new List<Voucher>();
                    foreach (var voucher in q)
                        if (projectIDs.Contains(voucher.FundAllocation.FundDescend.ProjectInfo_Fund.ProjectID))
                            voucherList.Add(voucher);

                    q = voucherList.AsQueryable();
                }
            }
            if (queryInformation.FundAllocationStates != null && queryInformation.FundAllocationStates.Length > 0)
            {
                var fundAllocationIds = database
                    .FundAllocations
                    .Where(fa => queryInformation.FundAllocationStates.Contains(fa.CurrentState.State))
                    .Select(fd => fd.ID)
                    .ToList()
                    .Distinct();

                var voucherList = new List<Voucher>();
                foreach (var voucher in q)
                    if (fundAllocationIds.Contains(voucher.FundAllocationID.Value))
                        voucherList.Add(voucher);

                q = voucherList.AsQueryable();
            }
            if (queryInformation.FundAllocationCensorPassDateTime != null)
            {
                var fundAllocationStateHistoryQuery = database
                    .FundAllocationStateHistories
                    .AsQueryable()
                    .Where(fash => fash.State == FundAllocationState.Passed);

                if (queryInformation.FundAllocationCensorPassDateTime.Start.HasValue)
                    fundAllocationStateHistoryQuery = fundAllocationStateHistoryQuery.Where(fash => fash.DateTime >= queryInformation.FundAllocationCensorPassDateTime.Start);

                if (queryInformation.FundAllocationCensorPassDateTime.End.HasValue)
                    fundAllocationStateHistoryQuery = fundAllocationStateHistoryQuery.Where(fash => fash.DateTime <= queryInformation.FundAllocationCensorPassDateTime.End);

                var fundAllocationIds = fundAllocationStateHistoryQuery
                    .Select(fash => fash.FundAllocationID)
                    .ToList()
                    .Distinct();

                var voucherList = new List<Voucher>();
                foreach (var voucher in q)
                    if (fundAllocationIds.Contains(voucher.FundAllocationID.Value))
                        voucherList.Add(voucher);

                q = voucherList.AsQueryable();
            }

            return q;
        }
        private static IQueryable<Voucher> getVouchers(this IQueryable<Voucher> query, User user, VoucherQueryInformation queryInformation, IDatabase database)
        {
            //财务管理员所能查看的凭单状态
            VoucherState[] financeCanShowState = { VoucherState.NotSignIn, VoucherState.SignIn, VoucherState.Allocated };

            if (user == null || user.IsSuper)
                return query;

            //财务管理员
            if (user.HasPermission(PermissionItem.ManageFinance, database))
                return query.Where(q => financeCanShowState.Contains(q.CurrentState.State));

            if (user.IsExpert)
                return query.Where(v => v.FundMember.Expert.User == user && v.CurrentState.State != VoucherState.Canceled);

            var projectTypeIDList = user.GetCanEditVerticalTypes(database)
            .Union(user.GetCanEditHorizontalTypes(database))
            .Select(pt => pt.ID)
            .ToList();

            return query.Where(v => projectTypeIDList.Contains(v.FundAllocation.FundDescend.ProjectInfo_Fund.Project.Type.TypeID));
        }
        private static IQueryable<Voucher> getVouchers(this IQueryable<Voucher> query, VoucherQueryInformation queryInformation, IDatabase database)
        {
            if (queryInformation.VoucherNumber != null)
                queryInformation.VoucherNumber = queryInformation.VoucherNumber.Trim();
            if (queryInformation.ExpertNameOrNameSpell != null)
                queryInformation.ExpertNameOrNameSpell = queryInformation.ExpertNameOrNameSpell.Trim();
            if (queryInformation.ProjectNameOrNameSpell != null)
                queryInformation.ProjectNameOrNameSpell = queryInformation.ProjectNameOrNameSpell.Trim();

            var q = query.AsQueryable();

            if (queryInformation.IsHorizontal.HasValue)
                q = q.Where(v => v.FundAllocation.FundDescend.ProjectInfo_Fund.Project.Type.Rank.IsHorizontal == queryInformation.IsHorizontal.Value);

            if (!String.IsNullOrEmpty(queryInformation.VoucherNumber))
                q = q.Where(v => v.VoucherNumber.StartsWith(queryInformation.VoucherNumber));

            if (!String.IsNullOrEmpty(queryInformation.ProjectNameOrNameSpell))
                q = q.Where(v => v.FundAllocation.FundDescend.ProjectInfo_Fund.Project.Name.StartsWith(queryInformation.ProjectNameOrNameSpell)
                    || v.FundAllocation.FundDescend.ProjectInfo_Fund.Project.NameSpell.StartsWith(queryInformation.ProjectNameOrNameSpell));

            if (!String.IsNullOrEmpty(queryInformation.ExpertNameOrNameSpell))
                q = q.Where(v => v.FundMember.Expert.Name.StartsWith(queryInformation.ExpertNameOrNameSpell)
                    || v.FundMember.Expert.NameSpell.StartsWith(queryInformation.ExpertNameOrNameSpell));

            if (queryInformation.AccountBookNumber != null) queryInformation.AccountBookNumber = queryInformation.AccountBookNumber.Trim();
            if (!string.IsNullOrEmpty(queryInformation.AccountBookNumber))
                q = q.Where(v => v.AccountBookNumber.Contains(queryInformation.AccountBookNumber));

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

            q = q.Where(v => v.CurrentState.State != VoucherState.Unknown && v.CurrentState.State != VoucherState.Reject);

            return q;

        }
        private static IQueryable<Voucher> SortQuery(IQueryable<Voucher> query, SortInfo sortInfo)
        {
            if (sortInfo == null)
                return query = query.OrderByDescending(v => v.ID);
            else if (sortInfo.Field.EqualIgnoreCase("AccountBookNumber"))
                return sortInfo.Direction == SortDirection.ASC
                    ? query.OrderBy(v => v.AccountBookNumber)
                    : query.OrderByDescending(v => v.AccountBookNumber);
            else if (sortInfo.Field.EqualIgnoreCase("AllocationHardware"))
                return sortInfo.Direction == SortDirection.ASC
                    ? query.OrderBy(v => v.AllocationHardware)
                    : query.OrderByDescending(v => v.AllocationHardware);
            else if (sortInfo.Field.EqualIgnoreCase("AllocationIn"))
                return sortInfo.Direction == SortDirection.ASC
                    ? query.OrderBy(v => v.AllocationIn)
                    : query.OrderByDescending(v => v.AllocationIn);
            else if (sortInfo.Field.EqualIgnoreCase("AllocationOut"))
                return sortInfo.Direction == SortDirection.ASC
                    ? query.OrderBy(v => v.AllocationOut)
                    : query.OrderByDescending(v => v.AllocationOut);
            else if (sortInfo.Field.EqualIgnoreCase("IsRead"))
                return sortInfo.Direction == SortDirection.ASC
                    ? query.OrderBy(v => v.IsRead)
                    : query.OrderByDescending(v => v.IsRead);
            else if (sortInfo.Field.EqualIgnoreCase("OverheadExpensesIn"))
                return sortInfo.Direction == SortDirection.ASC
                    ? query.OrderBy(v => v.OverheadExpensesIn)
                    : query.OrderByDescending(v => v.OverheadExpensesIn);
            else if (sortInfo.Field.EqualIgnoreCase("OverheadExpensesOut"))
                return sortInfo.Direction == SortDirection.ASC
                    ? query.OrderBy(v => v.OverheadExpensesOut)
                    : query.OrderByDescending(v => v.OverheadExpensesOut);
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
                    ? query.OrderBy(v => v.CurrentState.State == VoucherState.Allocated).OrderBy(v => v.CurrentState.DateTime)
                    : query.OrderBy(v => v.CurrentState.State == VoucherState.Allocated).OrderByDescending(v => v.CurrentState.DateTime);
            else if (sortInfo.Field.EqualIgnoreCase("ProjectName"))
                return sortInfo.Direction == SortDirection.ASC
                    ? query.OrderBy(v => v.FundAllocation.FundDescend.ProjectInfo_Fund.Project.Name)
                    : query.OrderByDescending(v => v.FundAllocation.FundDescend.ProjectInfo_Fund.Project.Name);
            else if (sortInfo.Field.EqualIgnoreCase("ExpertName"))
                return sortInfo.Direction == SortDirection.ASC
                    ? query.OrderBy(v => v.FundMember.Expert.Name)
                    : query.OrderByDescending(v => v.FundMember.Expert.Name);
            else if (sortInfo.Field.EqualIgnoreCase("Amount"))
                return sortInfo.Direction == SortDirection.ASC
                    ? query.OrderBy(v => v.AllocationHardware + v.AllocationIn + v.AllocationOut)
                    : query.OrderByDescending(v => v.AllocationHardware + v.AllocationIn + v.AllocationOut);
            else if (sortInfo.Field.EqualIgnoreCase("OverheadExpenses"))
                return sortInfo.Direction == SortDirection.ASC
                    ? query.OrderBy(v => v.OverheadExpensesIn + v.OverheadExpensesOut)
                    : query.OrderByDescending(v => v.OverheadExpensesOut + v.OverheadExpensesIn);
            else
                return query = query.OrderByDescending(v => v.ID);
        }
        /// <summary>
        /// 取得未读凭单
        /// </summary>
        /// <param name="query"></param>
        /// <param name="user"></param>
        /// <returns></returns>
        public static int GetMyUnReadVouchers(this IQueryable<Voucher> query, User user)
        {
            if (!user.IsExpert)
                throw new ArgumentException("只有专家有这个权限");
            return query.Where(v => v.FundMember.Expert.User == user && v.CurrentState.State != VoucherState.Unknown && v.CurrentState.State != VoucherState.WaitingCensor && v.CurrentState.State != VoucherState.Reject && !v.IsRead).Count();
        }
    }
    /// <summary>
    /// 经费凭单的权限扩展
    /// </summary>
    public static class VoucherPermissionExtension
    {
        /// <summary>
        /// 判断用户是否具有凭单的查看权限
        /// </summary>
        /// <param name="user"></param>
        /// <param name="voucher"></param>
        /// <param name="database"></param>
        /// <returns></returns>
        public static bool HasPermission_Show(this User user, Voucher voucher, IDatabase database)
        {
            if (user.HasPermission(PermissionItem.ManageFinance, database))
                return true;

            var project = voucher.FundAllocation.FundDescend.ProjectInfo_Fund.Project;
            if (user.IsExpert)
                return user == voucher.FundMember.Expert.User;

            return user.HasPermission_Show(project, database);
        }
        /// <summary>
        /// 判断用户能否查看凭单
        /// </summary>
        /// <param name="user"></param>
        /// <param name="voucher"></param>
        /// <param name="database"></param>
        /// <returns></returns>
        public static bool CanShow(this User user, Voucher voucher, IDatabase database)
        {
            if (user.IsSuper)
                return true;

            if (user.HasPermission(PermissionItem.ManageFinance, database))
                return voucher.CurrentStateID.HasValue && voucher.CurrentState.State != VoucherState.UnPrinted && voucher.CurrentState.State != VoucherState.Unknown;

            return user.HasPermission_Show(voucher, database);
        }
        /// <summary>
        /// 判断用户是否具有凭单的编辑权限
        /// </summary>
        /// <param name="user"></param>
        /// <param name="voucher"></param>
        /// <param name="database"></param>
        /// <returns></returns>
        public static bool HasPermission_Edit(this User user, Voucher voucher, IDatabase database)
        {
            if (voucher.FundAllocation == null)
                return user.IsExpert == false;

            var project = voucher.FundAllocation.FundDescend.ProjectInfo_Fund.Project;

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
        /// <param name="voucher"></param>
        /// <param name="database"></param>
        /// <returns></returns>
        public static bool CanEdit(this User user, Voucher voucher, IDatabase database)
        {
            if (voucher.FundAllocation == null)
                return user.IsExpert == false;

            if (!user.HasPermission_Edit(voucher, database))
                return false;

            if (voucher.FundAllocation.CurrentState == null)
                return false;

            if (voucher.FundAllocation != null && voucher.FundAllocation.CurrentState.State != FundAllocationState.UnSubmit && voucher.FundAllocation.CurrentState.State != FundAllocationState.Reject)
                return false;

            return true;
        }
        /// <summary>
        /// 判断用户是否具有凭单的删除权限
        /// </summary>
        /// <param name="user"></param>
        /// <param name="voucher"></param>
        /// <param name="database"></param>
        /// <returns></returns>
        public static bool HasPermission_Delete(this User user, Voucher voucher, IDatabase database)
        {
            return user.HasPermission_Edit(voucher, database);
        }
        /// <summary>
        /// 判断用户能否删除凭单
        /// </summary>
        /// <param name="user"></param>
        /// <param name="voucher"></param>
        /// <param name="database"></param>
        /// <returns></returns>
        public static bool CanDelete(this User user, Voucher voucher, IDatabase database)
        {
            return user.CanEdit(voucher, database);
        }
        /// <summary>
        /// 判断用户是否具有编辑凭单账本号的权限
        /// </summary>
        /// <param name="user"></param>
        /// <param name="voucher"></param>
        /// <param name="database"></param>
        /// <returns></returns>
        public static bool HasPermission_ResetAccountBookNumber(this User user, Voucher voucher, IDatabase database)
        {
            //需求变更 专家也能修改账本号
            if (user.IsExpert)
                return voucher.FundAllocation.CurrentState.State == FundAllocationState.UnSubmit || voucher.FundAllocation.CurrentState.State == FundAllocationState.Reject;

            return user.HasPermission_Edit(voucher, database);
        }
        /// <summary>
        /// 判断用户能否编辑凭单的账本号
        /// </summary>
        /// <param name="user"></param>
        /// <param name="voucher"></param>
        /// <param name="database"></param>
        /// <returns></returns>
        public static bool CanResetAccountBookNumber(this User user, Voucher voucher, IDatabase database)
        {
            //设定特殊用户，可编辑账本号
            if (Voucher.IGNORE_ACCOUNTBOOKNUMBER_LEGAL_LOGINID.Contains(user.LoginID))
                return true;

            if (!user.HasPermission_ResetAccountBookNumber(voucher, database))
                return false;

            return voucher.AccountBookNumber == "新建";
        }
        /// <summary>
        /// 是否有打印的权限
        /// </summary>
        /// <param name="user"></param>
        /// <param name="voucher"></param>
        /// <param name="database"></param>
        /// <returns></returns>
        public static bool HasPermission_Print(this User user, Voucher voucher, IDatabase database)
        {
            if (!user.HasPermission(PermissionItem.ManageFund, database))
                return false;

            var project = voucher.FundAllocation.FundDescend.ProjectInfo_Fund.Project;
            return user.CanEdit(project, database);
        }
        /// <summary>
        /// 能否打印
        /// </summary>
        /// <param name="user"></param>
        /// <param name="voucher"></param>
        /// <param name="database"></param>
        /// <returns></returns>
        public static bool CanPrint(this User user, Voucher voucher, IDatabase database)
        {
            if (!user.HasPermission_Print(voucher, database))
                return false;

            if (voucher.FundAllocation.CurrentState == null)
                return false;

            if (voucher.FundAllocation.CurrentState.State != FundAllocationState.Passed)
                return false;

            if (voucher.CurrentState == null)
                return false;

            return voucher.CurrentState.State == VoucherState.UnPrinted;
        }
        /// <summary>
        /// 判断用户是否具有查看对应经费分配的权限
        /// </summary>
        /// <param name="user"></param>
        /// <param name="voucher"></param>
        /// <param name="database"></param>
        /// <returns></returns>
        public static bool HasPermission_ShowFundAllocation(this User user, Voucher voucher, IDatabase database)
        {
            if (!user.HasPermission(PermissionItem.ManageFund, database))
                return false;

            var project = voucher.FundAllocation.FundDescend.ProjectInfo_Fund.Project;
            return user.CanEdit(project, database);
        }
        /// <summary>
        /// 判断用户能够查看对景经费分配
        /// </summary>
        /// <param name="user"></param>
        /// <param name="voucher"></param>
        /// <param name="database"></param>
        /// <returns></returns>
        public static bool CanShowFundAllocation(this User user, Voucher voucher, IDatabase database)
        {
            return user.HasPermission_ShowFundAllocation(voucher, database);
        }
        /// <summary>
        /// 是否有重置打印次数的权限
        /// </summary>
        /// <param name="user"></param>
        /// <returns></returns>
        public static bool HasPermission_ResetPrint(this User user)
        {
            return user.IsSuper;
        }
        /// <summary>
        /// 能否重置打印次数
        /// </summary>
        /// <param name="user"></param>
        /// <param name="voucher"></param>
        /// <returns></returns>
        public static bool CanResetPrint(this User user, Voucher voucher)
        {
            if (!user.HasPermission_ResetPrint())
                return false;

            if (voucher.CurrentState == null)
                return false;

            return voucher.CurrentState.State == VoucherState.NotSignIn;
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
        /// <param name="voucher"></param>
        /// <param name="database"></param>
        /// <returns></returns>
        public static bool CanSignIn(this User user, Voucher voucher, IDatabase database)
        {
            if (!user.HasPermission_SignIn(database))
                return false;

            if (voucher.CurrentState == null)
                return false;

            return voucher.CurrentState.State == VoucherState.NotSignIn;
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
        /// <param name="voucher"></param>
        /// <param name="database"></param>
        /// <returns></returns>
        public static bool CanReturnVoucher(this User user, Voucher voucher, IDatabase database)
        {
            if (!user.HasPermission_ReturnVoucher(database))
                return false;

            if (voucher.CurrentState == null)
                return false;

            return voucher.CurrentState.State == VoucherState.SignIn;
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
        /// <param name="voucher"></param>
        /// <param name="database"></param>
        /// <returns></returns>
        public static bool CanFinanceAllocate(this User user, Voucher voucher, IDatabase database)
        {
            if (!user.HasPermission_FinanceAllocate(database))
                return false;

            if (voucher.CurrentState == null)
                return false;

            return voucher.CurrentState.State == VoucherState.SignIn;
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
        /// <param name="voucher"></param>
        /// <param name="database"></param>
        /// <returns></returns>
        public static bool CanCancelFinanceAllocate(this User user, Voucher voucher, IDatabase database)
        {
            if (!user.HasPermission_CancelFinanceAllocate(database))
                return false;

            if (voucher.CurrentState == null)
                return false;

            return voucher.CurrentState.State == VoucherState.Allocated;
        }
    }
}
