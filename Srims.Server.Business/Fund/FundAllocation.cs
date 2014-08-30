using System;
using System.Collections.Generic;
using System.Data.Linq;
using System.Linq;
using System.Text;
using System.Threading;
using System.Transactions;

using MIS.Common;
using MIS.Common.Validate;
using MIS.Common.Query;

using Srims.Server.Business;
using Srims.Server.Business.Fund;
using Srims.Server.Business.Projects;
using Srims.Server.Business.Users;
using Srims.Server.Business.Type;
using Srims.Server.Business.Common;
using Srims.Server.Business.Performances;


namespace Srims.Server.Business.Fund
{
    /// <summary>
    /// 经费分配
    /// </summary>
    public partial class FundAllocation : Entity<FundAllocation>
    {
        /// <summary>
        /// 可进行数据纠错的经费分配时间
        /// </summary>
        public static DateTime CAN_CORRECT_DATETIME = Convert.ToDateTime("2004/06/01");
        /// <summary>
        /// 取得已分配的经费的数额
        /// </summary>
        public long IndirectFund
        {
            get { return _AllocationIn + _AllocationOut; }//+ _AllocationHardware
        }

        /// <summary>
        /// 取得间接费的数额
        /// </summary>
        public long FundAllocated
        {
            get { return _OverheadExpensesIn + _OverheadExpensesMiddle + _OverheadExpensesExpert + _OverheadExpensesOut; }
        }

        /// <summary>
        /// 取得项目已收管理费（不考虑调整单）
        /// </summary>
        /// <param name=""></param>
        /// <returns></returns>
        public long GetOverheadExpensesInAlready(IDatabase database)
        {
            long sum = 0;
            foreach (var item in this.GetVouchers(database.Vouchers))
            {
                sum += item.OverheadExpensesIn;
            }

            return sum;

        }
        /// <summary>
        /// 取得项目已收二级单位（不考虑调整单）
        /// </summary>
        /// <param name=""></param>
        /// <returns></returns>
        public long GetOverheadExpensesMiddleAlready(IDatabase database)
        {
            long sum = 0;
            foreach (var item in this.GetVouchers(database.Vouchers))
            {
                sum += item.OverheadExpensesMiddle;
            }

            return sum;

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
                saveForChangeState(FundAllocationState.WaitingCensor, user, database);

                Voucher voucherForOverHeadExpensen = null;
                var vouchers = this.GetVouchers(database.Vouchers);
                foreach (var voucher in vouchers)
                {
                    voucher.Submit(user, database);
                    if (voucher.FundMember.Expert == FundDescend.ProjectInfo_Fund.Project.Principal)
                        voucherForOverHeadExpensen = voucher;
                }

                if (voucherForOverHeadExpensen == null && (this.OverheadExpensesIn != 0 || this.OverheadExpensesOut != 0 || this.OverheadExpensesMiddle != 0 || this.OverheadExpensesExpert != 0))
                {
                    voucherForOverHeadExpensen = new Voucher();
                    voucherForOverHeadExpensen.AllocationHardware = 0;
                    voucherForOverHeadExpensen.AllocationIn = 0;
                    voucherForOverHeadExpensen.AllocationOut = 0;
                    voucherForOverHeadExpensen.PerformancePay = 0;
                    voucherForOverHeadExpensen.FundAllocation = this;
                    voucherForOverHeadExpensen.IsRead = true;
                    voucherForOverHeadExpensen.VoucherNumber = "";
                    voucherForOverHeadExpensen.Project = this.FundDescend.ProjectInfo_Fund.Project;
                    voucherForOverHeadExpensen.FundMember = database.FundMembers.Get(voucherForOverHeadExpensen.Project.Fund, FundDescend.ProjectInfo_Fund.Project.Principal, false, database);
                    voucherForOverHeadExpensen.Submit(user, database);
                }
                if (voucherForOverHeadExpensen != null)
                {
                    voucherForOverHeadExpensen.OverheadExpensesIn = this.OverheadExpensesIn;
                    voucherForOverHeadExpensen.OverheadExpensesOut = this.OverheadExpensesOut;
                    voucherForOverHeadExpensen.OverheadPerformancePay = this.OverheadPerformancePay;
                    voucherForOverHeadExpensen.OverheadExpensesExpert = this.OverheadExpensesExpert;
                    voucherForOverHeadExpensen.OverheadExpensesMiddle = this.OverheadExpensesMiddle;
                    voucherForOverHeadExpensen.Save(database);
                }
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

            saveForChangeState(FundAllocationState.UnSubmit, user, database);
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
                saveForChangeState(FundAllocationState.Passed, user, remark, database);

                //将凭单审核状态置为未打印
                var vouchers = this.GetVouchers(database.Vouchers);
                foreach (var voucher in vouchers)
                    voucher.UnPrinted(user, database);

                //将对应经费下拨设置为分配完成
                this.FundDescend.SetStateToAllocationCompleted(user, database);

                var project = FundDescend.ProjectInfo_Fund.Project;
                var performance = database.Performances.SingleOrDefault(c => c.FundAllocation == this);
                if (performance == null)
                {
                    performance = new Performance();
                    performance.FundAllocation = this;
                    performance.ArrivedPerformance = this.OverheadExpensesExpert == null ? 0 : this.OverheadExpensesExpert;
                    performance.IsCancel = false;
                    performance.IsAllocated = performance.ArrivedPerformance == 0 ? true : false;
                    performance.FoundationTime = System.DateTime.Now;
                    performance.Remark = String.Empty;
                    performance.DescendPerformance = 0;
                    performance.Save(database);
                }
                ts.Complete();

            }
            sendEmailToPrincipal(user, "审核通过", "审核通过", "查看您此次经费分配产生的经费凭单情况", database);

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
                saveForChangeState(FundAllocationState.Reject, user, remark, database);

                var vouchers = this.GetVouchers(database.Vouchers);
                foreach (var voucher in vouchers)
                    voucher.Reject(user, database);

                ts.Complete();
            }
            sendEmailToPrincipal(user, "审核驳回", "审核驳回，驳回理由：" + remark, "重新进行经费分配", database);
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


                //将凭单作废
                var vouchers = this.GetVouchers(database.Vouchers);
                foreach (var voucher in vouchers)
                    voucher.Canceled(user, database);
                //将绩效作废
                var performance = database.Performances.SingleOrDefault(c => c.FundAllocation == this && c.IsCancel == false);
                if (performance != null)
                {
                    performance.IsAllocated = true;
                    performance.IsCancel = true;
                    performance.Save(database);
                    var performanceallocations = database.PerformanceAllocations.Where(c => c.Performance == performance && c.CurrentState.State != PerformanceAllocationState.Canceled).ToList();
                    if (performanceallocations.Count != 0)
                    {
                        foreach (var performanceallocation in performanceallocations)
                            performanceallocation.Cancel(user, remark, database);
                    }
                }
                saveForChangeState(FundAllocationState.Canceled, user, remark, database);

                //将对应经费下拨的状态置为审核通过
                this.FundDescend.SetStateToCensorPass(user, database);
                this.Save(database);
                ts.Complete();
            }
        }
        private void saveForChangeState(FundAllocationState fundAllocationState, User user, IDatabase database)
        {
            saveForChangeState(fundAllocationState, user, string.Empty, database);
        }
        private void saveForChangeState(FundAllocationState fundAllocationState, User user, string remark, IDatabase database)
        {
            using (TransactionScope ts = new TransactionScope())
            {
                FundAllocationStateHistory fundAllocationStateHistory = new FundAllocationStateHistory
                {
                    DateTime = DateTime.Now,
                    FundAllocation = this,
                    Operator = user.Name,
                    Remark = remark,
                    State = fundAllocationState,
                };

                fundAllocationStateHistory.Save(database);

                this.CurrentState = fundAllocationStateHistory;
                this.Save(database);

                ts.Complete();
            }
        }
        private void sendEmailToPrincipal(User sender, string action, string remark, string expertOperator, IDatabase database)
        {
            var title = String.Format("{0}--经费分配(项目：{1})", action, this.FundDescend.ProjectInfo_Fund.Project.Name);

            string body = String.Format(@"您的项目：{0}的经费分配，已由管理员{1}，于{2}，{3}。请及时登录中国海洋大学科研管理系统{4}。", this.FundDescend.ProjectInfo_Fund.Project.Name, sender.Name, DateTime.Now, remark, expertOperator);

            string content = EmailContentModel.GetExpertEmailContentModel(this.FundDescend.ProjectInfo_Fund.Project.Principal.Name, body);

            sender.SendMail(this.FundDescend.ProjectInfo_Fund.Project.Principal.Email, title, content, database);
            if (this.FundDescend.ProjectInfo_Fund.Project.PrincipalDelegate != null)
                sender.SendMail(this.FundDescend.ProjectInfo_Fund.Project.PrincipalDelegate.Email, title, content, database);
        }
        /// <summary>
        /// 取得经费的分配时间
        /// </summary>
        /// <param name="query"></param>
        /// <returns></returns>
        public DateTime? GetAllocationDateTime(IQueryable<FundAllocationStateHistory> query)
        {
            var StateHistory = query.SingleOrDefault(q => q.FundAllocationID == _ID
                                        && q.State == FundAllocationState.Passed);


            if (StateHistory == null)
                return null;

            return StateHistory.DateTime;
        }
        /// <summary>
        /// 取得对应的凭单
        /// </summary>
        /// <param name="query"></param>
        /// <returns></returns>
        public IList<Voucher> GetVouchers(IQueryable<Voucher> query)
        {
            return query
                .Where(q => q.FundAllocationID == _ID)
                .ToList();
        }
        /// <summary>
        /// 取得凭单号未null的凭单
        /// </summary>
        /// <param name="query"></param>
        /// <returns></returns>
        public IList<Voucher> GetVouchersHasNoVoucherNumber(IQueryable<Voucher> query)
        {
            return query
                  .Where(q => q.FundAllocationID == _ID && q.VoucherNumber == null)
                  .ToList();
        }
        /// <summary>
        /// 取得该经费下拨对应的已经财务分配的凭单
        /// </summary>
        /// <param name="query"></param>
        /// <returns></returns>
        public IList<Voucher> GetVouchersSignAlready(IQueryable<Voucher> query)
        {
            return query.Where(q => q.FundAllocationID == _ID && (q.CurrentState.State == VoucherState.SignIn || q.CurrentState.State == VoucherState.Allocated))
                .ToList();
        }
        /// <summary>
        /// 验证操作
        /// </summary>
        /// <param name="validater"></param>
        /// <param name="database"></param>
        protected override void ValidateAction(Validater validater, IDatabase database)
        {
            validater.AddCondition(_FundDescend.Entity != null, "对应的经费下拨不能为空");

            validater.AddCondition(_AllocationIn >= 0, "校内分配金额必须大于等于零");
            validater.AddCondition(_AllocationHardware >= 0, "硬件费金额必须大于等于零");

            validater.AddCondition(_OverheadExpensesIn >= 0, "校内分配管理费必须大于等于零");
            validater.AddCondition(_OverheadExpensesOut >= 0, "外协分配管理费必须大于等于零");
            //carlsirce2013.3.8 
            if (this.FundDescend.DescendDateTime > Convert.ToDateTime("2013-3-1"))
            {
                validater.AddCondition(this.FundAllocated + this.IndirectFund <= FundDescend.Amount, "分配的金额不能超过下拨的金额");
                //validater.AddCondition(this.FundAllocated + this.AllocationIn + FundDescend.ProjectInfo_Fund.FundAlreadyIn <= FundDescend.ProjectInfo_Fund.FundPlanIn, "分配的校内金额不能超过计划校内分配");
            }
            validater.AddCondition(this.PerformancePay <= this.OverheadExpensesExpert, "分配的课题组管理费金额不能超过最大值");
        }
        /// <summary>
        /// 更新统计信息
        /// </summary>
        /// <param name="database"></param>
        public override void UpdateStatistic(IDatabase database)
        {
            bool vouchersStateIsWaitingCensor = true;
            if (this.AllocationWantOut == null)
            {
                this.AllocationWantOut = 0;
            }
            this._AllocationIn = this._AllocationOut = this._AllocationHardware = this._PerformancePay = 0;
            //this._OverheadExpensesIn = this._OverheadExpensesOut = this.OverheadPerformancePay = 0;
            double rate = Convert.ToDouble(this.FundDescend.ProjectInfo_Fund.Project.Type.Type.OverheadExpenseOutRate) / 10000;
            if (this.CurrentState != null)
            {
                if (this.CurrentState.State != FundAllocationState.Passed && this.CurrentState.State != FundAllocationState.Canceled)
                {
                    this.OverheadExpensesOut = Convert.ToInt64((this.AllocationWantOut) * rate);
                    this._OverheadExpensesIn = GetOverheadExpensesIn(this, database);
                    this._OverheadPerformancePay = GetPerformanceManagementPay(this, database);

                    this._OverheadExpensesMiddle = this.FundDescend.ProjectInfo_Fund.FundPlanIn == 0 ? 0 : Convert.ToInt64(((double)this.FundDescend.Amount - this.AllocationWantOut) / this.FundDescend.ProjectInfo_Fund.FundPlanIn * this.FundDescend.ProjectInfo_Fund.OverheadExpenseMiddleTotal);
                    if (this.FundDescend.ProjectInfo_Fund.Project.Type.Type.IsBudget == true)
                        this._OverheadExpensesExpert = this.FundDescend.ProjectInfo_Fund.FundPlanIn == 0 ? 0 : Convert.ToInt64(((double)this.FundDescend.Amount - this.AllocationWantOut) / this.FundDescend.ProjectInfo_Fund.FundPlanIn * this.FundDescend.ProjectInfo_Fund.OverheadExpenseExpertTotal);
                    else
                        this._OverheadExpensesExpert = this._OverheadPerformancePay;
                }
            }
            else
            {
                this.OverheadExpensesOut = Convert.ToInt64((this.AllocationWantOut) * rate);
                this._OverheadExpensesIn = GetOverheadExpensesIn(this, database);
                this._OverheadPerformancePay = GetPerformanceManagementPay(this, database);

                this._OverheadExpensesMiddle = this.FundDescend.ProjectInfo_Fund.FundPlanIn == 0 ? 0 : Convert.ToInt64(((double)this.FundDescend.Amount - this.AllocationWantOut) / this.FundDescend.ProjectInfo_Fund.FundPlanIn * this.FundDescend.ProjectInfo_Fund.OverheadExpenseMiddleTotal);
                if (this.FundDescend.ProjectInfo_Fund.Project.Type.Type.IsBudget == true)
                    this._OverheadExpensesExpert = this.FundDescend.ProjectInfo_Fund.FundPlanIn == 0 ? 0 : Convert.ToInt64(((double)this.FundDescend.Amount - this.AllocationWantOut) / this.FundDescend.ProjectInfo_Fund.FundPlanIn * this.FundDescend.ProjectInfo_Fund.OverheadExpenseExpertTotal);
                else
                    this._OverheadExpensesExpert = this._OverheadPerformancePay;
            }
            var performance = database.Performances.SingleOrDefault(c => c.FundAllocation == this && c.IsCancel == false);
            if (performance != null)
            {
                this._PerformancePay = 0;

                foreach (var item in performance.GetPerformanceAllocation(database))
                {
                    this._PerformancePay += item.ArrivedOverheadexpensesExpert;
                }
            }
            foreach (var voucher in GetVouchers(database.Vouchers))
            {
                if (voucher.CurrentState != null)
                {
                    if (voucher.CurrentState.State != VoucherState.Canceled)
                    {
                        this._AllocationIn += voucher.AllocationIn;
                        this._AllocationOut += voucher.AllocationOut;
                        this._AllocationHardware += voucher.AllocationHardware;
                    }
                    // this._OverheadExpensesIn += voucher.OverheadExpensesIn;
                    // this._OverheadExpensesOut += voucher.OverheadExpensesOut;
                    //this._OverheadPerformancePay += voucher.OverheadPerformancePay;
                }
                if (voucher.CurrentState == null || voucher.CurrentState.State != VoucherState.WaitingCensor)
                    vouchersStateIsWaitingCensor = false;
            }

            if (FundAllocated + IndirectFund < this.FundDescend.Amount && vouchersStateIsWaitingCensor)
                if (this.CurrentState != null && this.CurrentState.State == FundAllocationState.Reject)
                    this.CurrentState.State = FundAllocationState.UnSubmit;

        }
        /// <summary>
        /// 取得或设置校内管理费
        /// </summary>
        /// <returns></returns>
        public long GetOverheadExpensesIn(FundAllocation fundallocation, IDatabase database)
        {
            if (fundallocation == null)
                return Convert.ToInt64(0);
            //文科项目，按照项目中保存的间接费用来计算每笔分配的间接费和绩效。理科项目，预算制全部按照项目信息中保存的校内间接费和校内绩效来计算每笔分配。非预算值项目，他们的间接费从管理费比例表中获取。
            var newPerformancePay = database.ManagementFees.GetAllManagementFeesByType(
                    fundallocation.FundDescend.ProjectInfo_Fund.Project.Type.Type.ManagementFeesType,
                     fundallocation.FundDescend.ProjectInfo_Fund.Project.Type.Type.ID,
                    fundallocation.FundDescend.ProjectInfo_Fund.Project.Level,
                    fundallocation.FundDescend.ProjectInfo_Fund.FundContract,
                    fundallocation.FundDescend.ProjectInfo_Fund.FundPlanIn,
                    fundallocation.FundDescend.ProjectInfo_Fund.FundTotal,
                    fundallocation.FundDescend.ProjectInfo_Fund.EquipmentCost == null ? 0 : fundallocation.FundDescend.ProjectInfo_Fund.EquipmentCost.Value,
                    "overheadExpensePerformancePayRate",
                    database) * fundallocation.FundDescend.ProjectInfo_Fund.FundPlanIn * 100;
            var newOverheadExpensesIn = database.ManagementFees.GetAllManagementFeesByType(
                fundallocation.FundDescend.ProjectInfo_Fund.Project.Type.Type.ManagementFeesType,
                 fundallocation.FundDescend.ProjectInfo_Fund.Project.Type.Type.ID,
                fundallocation.FundDescend.ProjectInfo_Fund.Project.Level,
                fundallocation.FundDescend.ProjectInfo_Fund.FundContract,
                fundallocation.FundDescend.ProjectInfo_Fund.FundPlanIn,
                fundallocation.FundDescend.ProjectInfo_Fund.FundTotal,
                fundallocation.FundDescend.ProjectInfo_Fund.EquipmentCost == null ? 0 : fundallocation.FundDescend.ProjectInfo_Fund.EquipmentCost.Value,
                "overheadExpenseInRate",
                database) * fundallocation.FundDescend.ProjectInfo_Fund.FundPlanIn * 100 - newPerformancePay;
            var projectInfo_Fund = fundallocation.FundDescend.ProjectInfo_Fund;
            //if (fundallocation.FundDescend.ProjectInfo_Fund.Project.Type.TypeID == 70 && fundallocation.FundDescend.DescendDateTime < Convert.ToDateTime("2013-1-1"))
            //{
            //    if (fundallocation.FundDescend.ProjectInfo_Fund.Project.StartDate >= Convert.ToDateTime("2012-1-1"))
            //    {
            //        var result = projectInfo_Fund.FundPlanIn == 0 ? 0 : newOverheadExpensesIn / 1000000 * (fundallocation.FundDescend.Amount - (fundallocation.AllocationWantOut == null ? 0 : fundallocation.AllocationWantOut.Value)) / (double)projectInfo_Fund.FundPlanIn;
            //        //    fundallocation.OverheadPerformancePay = projectInfo_Fund.FundPlanIn == 0 ? 0 : newPerformancePayRate * (fundallocation.FundDescend.Amount - fundallocation.AllocationWantOut == null ? 0 : fundallocation.AllocationWantOut.Value) / projectInfo_Fund.FundPlanIn;
            //        return Convert.ToInt64(result);
            //    }
            //}
            if (!fundallocation.FundDescend.ProjectInfo_Fund.Project.Type.Type.IsBudget && fundallocation.FundDescend.ProjectInfo_Fund.Project.Type.Type.SubjectNature == SubjectNature.Science && fundallocation.FundDescend.DescendDateTime > Convert.ToDateTime("2013-1-1"))
            {
                var result = projectInfo_Fund.FundPlanIn == 0 ? 0 : newOverheadExpensesIn / 1000000 * (fundallocation.FundDescend.Amount - (fundallocation.AllocationWantOut == null ? 0 : fundallocation.AllocationWantOut.Value)) / (double)projectInfo_Fund.FundPlanIn;
                // fundAllocation.OverheadPerformancePay = projectInfo_Fund.FundPlanIn == 0 ? 0 : newPerformancePayRate * (fundallocation.FundDescend.Amount - fundallocation.AllocationWantOut == null ? 0 : fundallocation.AllocationWantOut.Value) / projectInfo_Fund.FundPlanIn ;
                return Convert.ToInt64(result);
            }
            double rate = projectInfo_Fund.FundPlanIn == 0 ? 0 : (double)projectInfo_Fund.OverheadExpenseInTotal / projectInfo_Fund.FundPlanIn;

            //原计算规则，根据分配的校内金额
            // return Convert.ToInt64(_AllocationIn * rate);
            //新计算规则
            return Convert.ToInt64((fundallocation.FundDescend.Amount - fundallocation.AllocationWantOut) * rate);
        }

        /// <summary>
        /// 取得或设置绩效
        /// </summary>
        /// <returns></returns>
        public long GetPerformanceManagementPay(FundAllocation fundallocation, IDatabase database)
        {
            if (fundallocation == null)
                return Convert.ToInt64(0);
            //2013.1.29加入新办法，对于2012.1.1.前的公益性行业专项，采用老办法生成管理费，之后的采用新办法,但是对他的绩效一直采用旧办法。而对于非预算制的理科项目，都采用新办法。
            var newPerformancePay = database.ManagementFees.GetAllManagementFeesByType(
                    fundallocation.FundDescend.ProjectInfo_Fund.Project.Type.Type.ManagementFeesType,
                     fundallocation.FundDescend.ProjectInfo_Fund.Project.Type.Type.ID,
                    fundallocation.FundDescend.ProjectInfo_Fund.Project.Level,
                    fundallocation.FundDescend.ProjectInfo_Fund.FundContract,
                    fundallocation.FundDescend.ProjectInfo_Fund.FundPlanIn,
                    fundallocation.FundDescend.ProjectInfo_Fund.FundTotal,
                    fundallocation.FundDescend.ProjectInfo_Fund.EquipmentCost == null ? 0 : fundallocation.FundDescend.ProjectInfo_Fund.EquipmentCost.Value,
                    "overheadExpensePerformancePayRate",
                    database) * fundallocation.FundDescend.ProjectInfo_Fund.FundPlanIn * 100;
            var newOverheadExpensesIn = database.ManagementFees.GetAllManagementFeesByType(
                fundallocation.FundDescend.ProjectInfo_Fund.Project.Type.Type.ManagementFeesType,
                 fundallocation.FundDescend.ProjectInfo_Fund.Project.Type.Type.ID,
                fundallocation.FundDescend.ProjectInfo_Fund.Project.Level,
                fundallocation.FundDescend.ProjectInfo_Fund.FundContract,
                fundallocation.FundDescend.ProjectInfo_Fund.FundPlanIn,
                fundallocation.FundDescend.ProjectInfo_Fund.FundTotal,
                fundallocation.FundDescend.ProjectInfo_Fund.EquipmentCost == null ? 0 : fundallocation.FundDescend.ProjectInfo_Fund.EquipmentCost.Value,
                "overheadExpenseInRate",
                database) * fundallocation.FundDescend.ProjectInfo_Fund.FundPlanIn * 100 - newPerformancePay;
            var projectInfo_Fund = fundallocation.FundDescend.ProjectInfo_Fund;
            //if (fundallocation.FundDescend.ProjectInfo_Fund.Project.Type.TypeID == 70)
            //{
            //    if (fundallocation.FundDescend.ProjectInfo_Fund.Project.StartDate >= Convert.ToDateTime("2012-1-1") && fundallocation.FundDescend.DescendDateTime > Convert.ToDateTime("2013-1-1"))
            //    {
            //        // return projectInfo_Fund.FundPlanIn == 0 ? 0 : newOverheadExpensesIn * (fundallocation.FundDescend.Amount - fundallocation.AllocationWantOut == null ? 0 : fundallocation.AllocationWantOut.Value) / projectInfo_Fund.FundPlanIn ;
            //        var result = projectInfo_Fund.FundPlanIn == 0 ? 0 : newPerformancePay / 1000000 * (fundallocation.FundDescend.Amount - (fundallocation.AllocationWantOut == null ? 0 : fundallocation.AllocationWantOut.Value)) / (double)projectInfo_Fund.FundPlanIn;
            //        return Convert.ToInt64(result);
            //    }
            //}
            if (!fundallocation.FundDescend.ProjectInfo_Fund.Project.Type.Type.IsBudget && fundallocation.FundDescend.ProjectInfo_Fund.Project.Type.Type.SubjectNature == SubjectNature.Science && fundallocation.FundDescend.DescendDateTime >= Convert.ToDateTime("2013-1-1"))
            {
                // return projectInfo_Fund.FundPlanIn == 0 ? 0 : newOverheadExpensesIn * (fundallocation.FundDescend.Amount - fundallocation.AllocationWantOut == null ? 0 : fundallocation.AllocationWantOut.Value) / projectInfo_Fund.FundPlanIn ;
                var result = projectInfo_Fund.FundPlanIn == 0 ? 0 : (newPerformancePay / 1000000) * (fundallocation.FundDescend.Amount - (fundallocation.AllocationWantOut == null ? 0 : fundallocation.AllocationWantOut.Value)) / (double)projectInfo_Fund.FundPlanIn;
                return Convert.ToInt64(result);
            }
            double rate = projectInfo_Fund.FundPlanIn == 0 ? 0 : (double)projectInfo_Fund.PerformancePay / projectInfo_Fund.FundPlanIn;

            //原计算规则，根据分配的校内金额
            //return Convert.ToInt64(_AllocationIn * rate);
            //新计算规则
            return Convert.ToInt64((fundallocation.FundDescend.Amount - fundallocation.AllocationWantOut) * rate);
        }
    }

    /// <summary>
    /// 经费分配的业务扩展
    /// </summary>
    public static class FundAllocationBusinessExtension
    {
    }
    /// <summary>
    /// 经费分配的查询扩展
    /// </summary>
    public static class FundAllocationQueryExtension
    {
        /// <summary>
        /// 经费分配查询
        /// </summary>
        /// <param name="query"></param>
        /// <param name="queryInformation"></param>
        /// <param name="user"></param>
        /// <returns></returns>
        public static QueryResult<FundAllocation> Query(this IEntityDataAccess<FundAllocation> query, FundAllocationQueryInformation queryInformation, User user)
        {
            if (query == null)
                throw new ArgumentNullException("query");
            if (queryInformation == null)
                throw new ArgumentNullException("queryInformation");
            if (user == null)
                throw new ArgumentNullException("user");

            //查询
            var q = query.GetFundAllocation(queryInformation, user).Distinct();

            //排序
            q = sortQuery(q, queryInformation.SortInfo);

            //构造查询结果
            var total = q.Select(p => p.ID).Count();
            return new QueryResult<FundAllocation>(
                q.Skip(queryInformation.Start).Take(queryInformation.Limit).ToList(), total);
        }

        private static IQueryable<FundAllocation> sortQuery(IQueryable<FundAllocation> query, SortInfo sortInfo)
        {
            if (sortInfo == null)
                return query = query.OrderByDescending(q => q.FundDescend.DescendDateTime);

            else if (sortInfo.Field.EqualIgnoreCase("allocationTotal"))
                return sortInfo.Direction == SortDirection.ASC
                    ? query.OrderBy(q => q.FundDescend.Amount)
                    : query.OrderByDescending(p => p.FundDescend.Amount);
            else if (sortInfo.Field.EqualIgnoreCase("state"))
                return sortInfo.Direction == SortDirection.ASC
                    ? query.OrderBy(q => q.CurrentState.State)
                    : query.OrderByDescending(p => p.CurrentState.State);
            else if (sortInfo.Field.EqualIgnoreCase("allocationDateTime"))
                return sortInfo.Direction == SortDirection.ASC
                    ? query.OrderBy(q => q.FundDescend.DescendDateTime)
                    : query.OrderByDescending(q => q.FundDescend.DescendDateTime);

            else
                return query = query.OrderByDescending(q => q.FundDescend.DescendDateTime);
        }
        /// <summary>
        /// 取得经费分配
        /// </summary>
        /// <param name="query"></param>
        /// <param name="queryInformation"></param>
        /// <param name="user"></param>
        /// <returns></returns>
        public static IQueryable<FundAllocation> GetFundAllocation(this IEntityDataAccess<FundAllocation> query, FundAllocationQueryInformation queryInformation, User user)
        {
            if (query == null)
                throw new ArgumentNullException("query");
            if (queryInformation == null)
                throw new ArgumentNullException("queryInformation");

            var q = query.getFundAllocation(user);
            if (queryInformation != null)
                q = q.Intersect(query.getFundAllocation(queryInformation));

            return q;
        }
        private static IQueryable<FundAllocation> getFundAllocation(this IEntityDataAccess<FundAllocation> query, FundAllocationQueryInformation queryInformation)
        {
            var q = query.AsQueryable();

            if (queryInformation.FundAmount != null)
            {
                if (queryInformation.FundAmount.Start.HasValue)
                    q = q.Where(fa => (fa.AllocationHardware + fa.AllocationIn + fa.AllocationOut) >= queryInformation.FundAmount.Start.Value);
                if (queryInformation.FundAmount.End.HasValue)
                    q = q.Where(fa => (fa.AllocationHardware + fa.AllocationIn + fa.AllocationOut) <= queryInformation.FundAmount.End.Value);
            }

            if (queryInformation.IsHorizontal.HasValue)
                q = q.Where(fa => fa.FundDescend.ProjectInfo_Fund.Project.Type.Rank.IsHorizontal == queryInformation.IsHorizontal.Value);

            if (queryInformation.ProjectName != null) queryInformation.ProjectName = queryInformation.ProjectName.Trim();
            if (!string.IsNullOrEmpty(queryInformation.ProjectName))
                q = q.Where(fa => fa.FundDescend.ProjectInfo_Fund.Project.Name.Contains(queryInformation.ProjectName) || fa.FundDescend.ProjectInfo_Fund.Project.NameSpell.Contains(queryInformation.ProjectName));

            if (queryInformation.States != null && queryInformation.States.Length != 0)
                q = q.Where(fa => queryInformation.States.Contains(fa.CurrentState.State));

            return q;
        }
        private static IQueryable<FundAllocation> getFundAllocation(this IEntityDataAccess<FundAllocation> query, User user)
        {
            if (user.IsSuper)
                return query;

            if (user.IsExpert)
                return query.Where(q => q.FundDescend.ProjectInfo_Fund.Project.Principal.User == user
                    || q.FundDescend.ProjectInfo_Fund.Project.PrincipalDelegate.User == user);

            var database = query.Database;
            var projectTypeIDList = user.GetCanEditVerticalTypes(database)
            .Union(user.GetCanEditHorizontalTypes(database))
            .Select(pt => pt.ID)
            .ToList();

            return query.Where(q => projectTypeIDList.Contains(q.FundDescend.ProjectInfo_Fund.Project.Type.TypeID));
        }

        /// <summary>
        /// 根据项目取得经费分配记录
        /// </summary>
        /// <param name="query"></param>
        /// <param name="project"></param>
        /// <returns></returns>
        public static IList<FundAllocation> GetByProject(this IQueryable<FundAllocation> query, Project project)
        {
            return query
                .Where(q => q.FundDescend.ProjectInfo_FundID == project.FundID
                        && q.FundDescend.CurrentState.State != FundDescendState.Delete)
                .OrderBy(q => q.CurrentState.DateTime)
                .ToList();

        }
        /// <summary>
        /// 取得等待审核的经费分配的数目
        /// </summary>
        /// <param name="query"></param>
        /// <param name="isHorizontal"></param>
        /// <param name="user"></param>
        /// <returns></returns>
        public static int GetWaitingCensorFundAllocationCount(this IEntityDataAccess<FundAllocation> query, bool isHorizontal, User user)
        {
            if (user == null || user.IsSuper)
                return query.Count(q => q.CurrentState.State == FundAllocationState.WaitingCensor && q.FundDescend.ProjectInfo_Fund.Project.Type.Rank.IsHorizontal == isHorizontal);

            IDatabase database = query.Database;
            var projectTypesID = new List<int>();
            if (isHorizontal)
                projectTypesID = user.GetCanCensorHorizontalProjectTypes(database).Select(q => q.ID).ToList();
            else
                projectTypesID = user.GetCanCensorVerticalProjectTypes(database).Select(q => q.ID).ToList();

            return query.Count(q => q.CurrentState.State == FundAllocationState.WaitingCensor
                && projectTypesID.Contains(q.FundDescend.ProjectInfo_Fund.Project.Type.TypeID));

        }
        /// <summary>
        /// 审核经费分配提醒
        /// </summary>
        /// <param name="query"></param>
        /// <param name="database"></param>
        public static void CensorFundAllocationRemaind(this IQueryable<FundAllocation> query, IDatabase database)
        {

            IList<User> admins = database.Users.Where(p => !p.IsSuper).ToList();

            var user = database.Users.First(u => u.IsSuper);


            string title = string.Format("审核经费分配提醒");
            string content = string.Empty;
            string body = string.Empty;
            int count = 0;
            foreach (var admin in admins)
            {
                int horizontalCount = database.FundAllocations.GetWaitingCensorFundAllocationCount(true, admin);
                int verticalCount = database.FundAllocations.GetWaitingCensorFundAllocationCount(false, admin);
                if ((horizontalCount <= 0 && verticalCount <= 0) || admin.IsLocked(database.UserLockLogs))
                    continue;

                try
                {
                    if (horizontalCount > 0)
                    {
                        //一分钟发送一封邮件
                        Thread.Sleep(1000 * 120);
                        body = string.Format("现有{0}个横向项目经费分配需要审核，请及时登录科研管理系统审核经费分配", horizontalCount);
                        content = EmailContentModel.GetAdminEmailContentModel(body);

                        user.SendMail(admin.Email, title, content, database);
                        count++;

                        var PrincipalDescription = string.Format("自动发送经横向项目费分配审核提醒邮件，管理员：{0}，emal:{1}", admin.Name, admin.Email);
                        Log.Write("系统", (int)LogType.CensorFundAllocationRemaind, PrincipalDescription, "自动发送横向项目经费分配审核提醒邮件", database);
                    }
                    if (verticalCount > 0)
                    {
                        //一分钟发送一封邮件
                        Thread.Sleep(1000 * 120);
                        body = string.Format("现有{0}个纵向项目经费分配需要审核，请及时登录科研管理系统审核经费分配", verticalCount);
                        content = EmailContentModel.GetAdminEmailContentModel(body);

                        user.SendMail(admin.Email, title, content, database);
                        count++;

                        var PrincipalDescription = string.Format("自动发送纵向项目经费分配审核提醒邮件，管理员：{0}，emal:{1}", admin.Name, admin.Email);
                        Log.Write("系统", (int)LogType.CensorFundAllocationRemaind, PrincipalDescription, "自动发送纵向项目经费分配审核提醒邮件", database);
                    }
                }
                catch (Exception e)
                {
                    var PrincipalDescriptions = string.Format("自动发送项目经费分配审核提醒邮件是吧，管理员：{0}，emal:{1}", admin.Name, admin.Email);
                    Log.Write("系统", (int)LogType.CensorFundAllocationRemaind, PrincipalDescriptions, "自动发送项目经费分配审核提醒邮件失败", database);
                    continue;
                }

            }
            Log.Write("系统", (int)LogType.CensorFundAllocationRemaind, "共发送邮件：" + count + "封，", "自动发送经费分配审核提醒邮件", database);

        }
    }
    /// <summary>
    /// 经费分配的权限扩展
    /// </summary>
    public static class FundAllocationPermissionExtension
    {
        /// <summary>
        /// 判断用户是否具有审核经费分配的权限
        /// </summary>
        /// <param name="user"></param>
        /// <param name="database"></param>
        /// <param name="isHorizontal"></param>
        /// <returns></returns>
        public static bool HasPermission_CensorFundAllocation(this User user, IDatabase database, bool isHorizontal)
        {
            if (!user.HasPermission(PermissionItem.ManageFund, database))
                return false;

            if (isHorizontal)
                return user.HasPermission_EditHorizontalProject(database);

            return user.HasPermission_EditVerticalProject(database);
        }
        /// <summary>
        /// 判断用户是否具有经费分配的权限
        /// </summary>
        /// <param name="user"></param>
        /// <param name="database"></param>
        /// <param name="isHorizontal"></param>
        /// <returns></returns>
        public static bool HasPermission_FundAllocation(this User user, IDatabase database, bool isHorizontal)
        {
            if (!user.HasPermission(PermissionItem.ManageFund, database))
                return false;

            if (isHorizontal)
                return !user.IsExpert && user.HasPermission_EditHorizontalProject(database);

            return user.HasPermission_EditVerticalProject(database);
        }
        /// <summary>
        /// 判断用户是否具有经费的分配权限
        /// </summary>
        /// <param name="user"></param>
        /// <param name="fundAlloction"></param>
        /// <param name="database"></param>
        /// <returns></returns>
        public static bool HasPermission_Allocation(this User user, FundAllocation fundAlloction, IDatabase database)
        {
            var project = fundAlloction.FundDescend.ProjectInfo_Fund.Project;
            if (user.IsExpert)
                return project.IsPrincipal(user);

            if (!user.HasPermission(PermissionItem.ManageFund, database))
                return false;

            return user.HasPermission_Edit(project, database);
        }
        /// <summary>
        /// 判断用户能够进行经费分配
        /// </summary>
        /// <param name="user"></param>
        /// <param name="fundAllocation"></param>
        /// <param name="database"></param>
        /// <returns></returns>
        public static bool CanAllocation(this User user, FundAllocation fundAllocation, IDatabase database)
        {
            if (!user.HasPermission_Allocation(fundAllocation, database))
                return false;

            return fundAllocation.FundDescend.Amount > fundAllocation.FundAllocated + fundAllocation.IndirectFund
                && fundAllocation.CurrentState.State == FundAllocationState.UnSubmit;
        }
        /// <summary>
        /// 判断用户是否具有提交经费分配的权限
        /// </summary>
        /// <param name="user"></param>
        /// <param name="fundAllocation"></param>
        /// <param name="database"></param>
        /// <returns></returns>
        public static bool HasPermission_Submit(this User user, FundAllocation fundAllocation, IDatabase database)
        {
            return user.HasPermission_Allocation(fundAllocation, database);
        }
        /// <summary>
        /// 判断用户能够提交经费分配
        /// </summary>
        /// <param name="user"></param>
        /// <param name="fundAllocation"></param>
        /// <param name="database"></param>
        /// <returns></returns>
        public static bool CanSubmit(this User user, FundAllocation fundAllocation, IDatabase database)
        {
            if (!user.HasPermission_Submit(fundAllocation, database))
                return false;

            if (fundAllocation.CurrentState == null)
                return false;

            if (user.IsExpert && fundAllocation.CurrentState.State != FundAllocationState.UnSubmit && fundAllocation.CurrentState.State != FundAllocationState.Reject)
                return false;

            if (!user.IsExpert && fundAllocation.CurrentState.State != FundAllocationState.UnSubmit && fundAllocation.CurrentState.State != FundAllocationState.Reject)
                return false;

            return fundAllocation.FundAllocated + fundAllocation.IndirectFund == fundAllocation.FundDescend.Amount;
        }
        /// <summary>
        /// 判断用户是否具有撤销提交的权限
        /// </summary>
        /// <param name="user"></param>
        /// <param name="fundAllocation"></param>
        /// <param name="database"></param>
        /// <returns></returns>
        public static bool HasPermission_UndoSubmit(this User user, FundAllocation fundAllocation, IDatabase database)
        {
            return user.HasPermission_Submit(fundAllocation, database);
        }
        /// <summary>
        /// 判断用户能否撤销提交
        /// </summary>
        /// <param name="user"></param>
        /// <param name="fundAllocation"></param>
        /// <param name="database"></param>
        /// <returns></returns>
        public static bool CanUndoSubmit(this User user, FundAllocation fundAllocation, IDatabase database)
        {
            if (!user.HasPermission_UndoSubmit(fundAllocation, database))
                return false;

            if (fundAllocation.CurrentState == null)
                return false;

            return fundAllocation.CurrentState.State == FundAllocationState.WaitingCensor;
        }
        /// <summary>
        /// 判断用户是否具有审核经费分配的权限
        /// </summary>
        /// <param name="user"></param>
        /// <param name="fundAllocation"></param>
        /// <param name="database"></param>
        /// <returns></returns>
        public static bool HasPermission_Censor(this User user, FundAllocation fundAllocation, IDatabase database)
        {
            if (!user.HasPermission(PermissionItem.ManageFund, database))
                return false;

            return user.HasPermission_Edit(fundAllocation.FundDescend.ProjectInfo_Fund.Project, database);
        }
        /// <summary>
        /// 判断用户能够审核通过经费分配
        /// </summary>
        /// <param name="user"></param>
        /// <param name="fundAllocation"></param>
        /// <param name="database"></param>
        /// <returns></returns>
        public static bool CanCensorPass(this User user, FundAllocation fundAllocation, IDatabase database)
        {
            if (!user.HasPermission_Censor(fundAllocation, database))
                return false;

            if (fundAllocation.CurrentState == null)
                return false;

            return fundAllocation.CurrentState.State == FundAllocationState.WaitingCensor;
        }
        /// <summary>
        /// 判断用户能够审核驳回经费分配
        /// </summary>
        /// <param name="user"></param>
        /// <param name="fundAllocation"></param>
        /// <param name="database"></param>
        /// <returns></returns>
        public static bool CanCensorReject(this User user, FundAllocation fundAllocation, IDatabase database)
        {
            if (!user.HasPermission_Censor(fundAllocation, database))
                return false;

            if (fundAllocation.CurrentState == null)
                return false;

            return fundAllocation.CurrentState.State == FundAllocationState.WaitingCensor;
        }
        /// <summary>
        /// 判断用户是否具有作废经费分配的权限
        /// </summary>
        /// <param name="user"></param>
        /// <param name="fundAllocation"></param>
        /// <param name="database"></param>
        /// <returns></returns>
        public static bool HasPermission_Canel(this User user, FundAllocation fundAllocation, IDatabase database)
        {
            return user.HasPermission_Censor(fundAllocation, database);
        }
        /// <summary>
        ///  判断用户能够作废经费分配
        /// </summary>
        /// <param name="user"></param>
        /// <param name="fundAllocation"></param>
        /// <param name="database"></param>
        /// <returns></returns>
        public static bool CanCancel(this User user, FundAllocation fundAllocation, IDatabase database)
        {
            if (!user.HasPermission_Canel(fundAllocation, database))
                return false;

            if (fundAllocation.CurrentState == null)
                return false;
            if (!user.IsSuper)
            {
                if (fundAllocation.CurrentState.State != FundAllocationState.Passed)
                    return false;
            }
            var vouchers = fundAllocation.GetVouchersSignAlready(database.Vouchers);
            return vouchers.Count == 0;
        }
        /// <summary>
        /// 判断用户是否具有经费分配数据纠错权限
        /// </summary>
        /// <param name="user"></param>
        /// <param name="fundAllocation"></param>
        /// <param name="database"></param>
        /// <returns></returns>
        public static bool HasPermission_Correct(this User user, FundAllocation fundAllocation, IDatabase database)
        {
            return user.HasPermission(PermissionItem.FundAllocationDataCorrection, database);
        }
        /// <summary>
        /// 判断用户能否对经费分配的数据进行纠错
        /// </summary>
        /// <param name="user"></param>
        /// <param name="fundAllocation"></param>
        /// <param name="database"></param>
        /// <returns></returns>
        public static bool CanCorrect(this User user, FundAllocation fundAllocation, IDatabase database)
        {
            if (!user.HasPermission_Correct(fundAllocation, database))
                return false;

            if (!fundAllocation.GetAllocationDateTime(database.FundAllocationStateHistories).HasValue)
                return false;

            return fundAllocation.GetAllocationDateTime(database.FundAllocationStateHistories).Value <= FundAllocation.CAN_CORRECT_DATETIME;
        }

        /// <summary>
        /// 判断用户能够进行经费分配
        /// </summary>
        /// <param name="user"></param>
        /// <param name="fundAllocation"></param>
        /// <param name="database"></param>
        /// <returns></returns>
        public static bool CanAllocationPerformancePay(this User user, FundAllocation fundAllocation, IDatabase database)
        {
            if (!user.HasPermission_Allocation(fundAllocation, database))
                return false;

            return true;
            //return fundAllocation.PerformancePay < fundAllocation.OverheadPerformancePay
            //   && fundAllocation.CurrentState.State == FundAllocationState.UnSubmit;
        }
    }
}
