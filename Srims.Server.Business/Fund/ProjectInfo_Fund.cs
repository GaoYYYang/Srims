using System;
using System.Collections.Generic;
using System.Data.Linq;
using System.Linq;
using System.Text;
using System.Transactions;

using MIS.Common;
using MIS.Common.Validate;
using MIS.Common.Query;

using Srims.Server.Business;
using Srims.Server.Business.Projects;
using Srims.Server.Business.Type;
using Srims.Server.Business.Common;
using Srims.Server.Business.Users;
using Srims.Server.Business.Performances;

namespace Srims.Server.Business.Fund
{
    /// <summary>
    /// 项目信息—经费
    /// </summary>
    public partial class ProjectInfo_Fund : Entity<ProjectInfo_Fund>
    {
        /// <summary>
        /// 复制一个同于自己的实体
        /// </summary>
        /// <returns></returns>
        public object Clone()
        {
            return this.MemberwiseClone();
        }
        ///// <summary>
        ///// 取得编辑项目时的经费日志信息
        ///// </summary>
        ///// <returns></returns>
        //public override string ToString()
        //{
        //    return "ID：" + this.ID +
        //        "、合同额" + this.FundContract +
        //        "、到校经费" + this.FundTotal +
        //        "、计划外拨经费" + this.FundPlanOut +
        //        "、计划校内分配" + this.FundPlanIn +
        //        "、校内管理费总额" + this.OverheadExpenseInTotal +
        //        "、外协管理费总额" + this.OverheadExpenseOutTotal +
        //        "、资金来源" + this.FundFrom +
        //        "、来款单位" + this.FundFromUnit +
        //        "、来款单位地址" + this.FundFromUnitAddress;
        //}
        private const int MaxCharacterCount = 99;
        private static long[] baseLine = { 0, 100 * 100 * 10000, 500 * 100 * 10000, 1000 * 100 * 10000 };
        private static double[] baseRate = { 0.08, 0.05, 0.02, 0.01 };
        /// <summary>
        /// 经费比率单位
        /// </summary>
        public const long OVERHEAD_EXPENSE_RATE_UNIT = 10000;
        /// <summary>
        /// 预算制项目学校管理费费率
        /// </summary>
        public const double OVERHEAD_EXPENSE_IN_ISBUDJET_RATE = 0.05;
        /// <summary>
        /// 预算制项目学院管理费费率
        /// </summary>
        public const double OVERHEAD_EXPENSE_MIDDLE_ISBUDJET_RATE = 0.01;
        /// <summary>
        /// 取得计划校内分配
        /// </summary>
        public long FundPlanIn
        {
            get { return _FundTotal - _FundPlanOut - _FundPlanHardware; }
        }
        /// <summary>
        /// 取得已分配经费
        /// </summary>
        public long FundAlreadyAllocation
        {
            get { return _FundAlreadyIn + _FundAlreadyOut + _FundAlreadyHardware; }
        }
        /// <summary>
        /// 计算校内管理费总额
        /// </summary>
        /// <param name="type"></param>
        /// <param name="projectSupportCategory"></param>
        /// <param name="fundContract"></param>
        /// <param name="fundPlanIn"></param>
        /// <returns></returns>
        public static long CalculateOverheadExpenseInTotal(ProjectType type, ProjectSupportCategory projectSupportCategory, long fundContract, long fundPlanIn)
        {
            if (projectSupportCategory != null && !projectSupportCategory.IsGetOverheadExpense)
                return 0;

            if (type.IsBudget)
                return getBudgetOverheadExpenseIn(fundContract, fundPlanIn);

            return type.OverheadExpenseInRate * fundPlanIn / OVERHEAD_EXPENSE_RATE_UNIT; //费率一万分之一为单位
        }
        private static long getBudgetOverheadExpenseIn(long fundContract, long fundPlanIn)
        {
            int i = 0;
            double overheadExpenseInAll = 0;

            for (i = 1; i <= baseLine.Length - 1 && baseLine[i] < fundContract; i++)
                overheadExpenseInAll += (baseLine[i] - baseLine[i - 1]) * baseRate[i - 1];

            overheadExpenseInAll += (fundContract - baseLine[i - 1]) * baseRate[i - 1];

            return Convert.ToInt64(overheadExpenseInAll * fundPlanIn / fundContract);
        }
        /// <summary>
        /// 计算外协管理费总额
        /// </summary>
        /// <param name="type"></param>
        /// <param name="projectSupportCategory"></param>
        /// <param name="fundContract"></param>
        /// <param name="fundPlanOut"></param>
        /// <returns></returns>
        public static long CalculateOverheadExpenseOutTotal(ProjectType type, ProjectSupportCategory projectSupportCategory, long fundContract, long fundPlanOut)
        {
            if (projectSupportCategory != null && !projectSupportCategory.IsGetOverheadExpense)
                return 0;

            if (type.IsBudget)
                return 0;

            return type.OverheadExpenseOutRate * fundPlanOut / OVERHEAD_EXPENSE_RATE_UNIT; //费率一万分之一为单位
        }
        /// <summary>
        ///计算校内基准管理费
        /// </summary>
        /// <param name="database"></param>
        /// <returns></returns>
        //public long CalculateOverheadExpenseStandard(IDatabase database)
        //{
        //    var systemSetting = database.SystemSettings.GetSystemSetting();
        //    var DefaultOverheadExpenseInRate = systemSetting.DefaultOverheadExpenseInRateVertical;

        //    return (FundPlanIn * DefaultOverheadExpenseInRate) / Gobal.OVERHEADEXPENSE_RATE;
        //}
        /// <summary>
        ///新的计算间接基准管理费
        /// </summary>
        /// <param name="database"></param>
        /// <returns></returns>
        public double? CalculateOverheadExpenseStandard(IDatabase database)
        {
            //double? result = 0;
            //double? stepOne = 600 * Money.MONEY_UNIT / (1 - EquipmentCost * 1.0 / FundContract);
            //if (FundContract <= stepOne)
            //    result = FundContract * (1 - EquipmentCost * 1.0 / FundContract) / 6;

            //double? stepTwo = 1165 * Money.MONEY_UNIT / (1 - EquipmentCost * 1.0 / FundContract);
            //if (FundContract > stepOne && FundContract <= stepTwo)
            //    result = FundContract * 13 * (1 - EquipmentCost * 1.0 / FundContract) / 113 + 31 * Money.MONEY_UNIT; ;

            //if (FundContract > stepTwo)
            //    result = FundContract * (1 - EquipmentCost * 1.0 / FundContract) / 11 + Money.MONEY_UNIT * 650.0 / 11;

            //if (result.HasValue && FundContract != 0)
            //    result = result * (FundPlanIn * 1.0 / FundContract);

            var stepOne = (FundContract * 5.0 + EquipmentCost) / 6;
            if (stepOne - EquipmentCost <= 500 * Money.MONEY_UNIT)
                return FundContract - stepOne;

            var stepTwo = (FundContract - EquipmentCost - 35 * Money.MONEY_UNIT) * 100 / 113.0 + EquipmentCost;
            if ((stepTwo - EquipmentCost) > 500 * Money.MONEY_UNIT && (stepTwo - EquipmentCost) <= 1000 * Money.MONEY_UNIT)
                return FundContract - stepTwo;

            var stepThree = (FundContract - EquipmentCost - 65 * Money.MONEY_UNIT) * 10 / 11.0 + EquipmentCost;
            if (stepThree - EquipmentCost > 1000)
                return FundContract - stepThree;

            return 0;
        }
        /// <summary>
        ///新的计算绩效基准管理费
        /// </summary>
        /// <param name="database"></param>
        /// <returns></returns>
        public double? CalculatePerformancePayStandard(IDatabase database)
        {
            //double? result = 0;
            //double? stepOne = 600 * Money.MONEY_UNIT / (1 - EquipmentCost * 1.0 / FundContract);
            //if (FundContract <= stepOne)
            //    result = FundContract * (1 - EquipmentCost * 1.0 / FundContract) / 24;

            //double? stepTwo = 1165 * Money.MONEY_UNIT / (1 - EquipmentCost * 1.0 / FundContract);
            //if (FundContract > stepOne && FundContract <= stepTwo)
            //    result = FundContract * 5 * (1 - EquipmentCost * 1.0 / FundContract) / 113 - Money.MONEY_UNIT * 175.0 / 113;

            //if (FundContract > stepTwo)
            //    result = FundContract * (1 - EquipmentCost * 1.0 / FundContract) / 22 - Money.MONEY_UNIT * 65.0 / 22;

            //if (result.HasValue && FundContract != 0)
            //    result = result * (FundPlanIn * 1.0 / FundContract);

            //return result.HasValue ? Convert.ToInt64(result.Value) : 0;

            return (FundContract - CalculateOverheadExpenseStandard(database) - EquipmentCost) / 20.0;
        }

     /// <summary>
        ///  取得项目的账本号的6-12位
     /// </summary>
     /// <param name="database"></param>
     /// <param name="isExploitAnd40000000"></param>
     /// <returns></returns>
        public string GetAccountbookNumber(IDatabase database, bool isExploitAnd40000000)
        {
            if (!string.IsNullOrEmpty(_AccountBookNumber))
                return _AccountBookNumber;

            _AccountBookNumber = getCharacterNumber(database, isExploitAnd40000000);
            if (!string.IsNullOrEmpty(_AccountBookNumber))
                this.Save(database);

            return _AccountBookNumber;
        }
        private string getCharacterNumber(IDatabase database, bool isExploitAnd40000000)
        {
            var type = this.Project.Type.Type;
            if (type == null)
                return null;

            string characterNumber;
            //取得特征码（即账本号的6-12位）
            characterNumber = tryGetCharacterNumber(database, type.Code, isExploitAnd40000000);
            //如果分类代码计数超界，启用备用分类代码
            if (!String.IsNullOrEmpty(characterNumber))
                return characterNumber;
            else
                return tryGetCharacterNumber(database, type.BakCode, isExploitAnd40000000);
        }
        private string tryGetCharacterNumber(IDatabase database, string typeCode, bool isExploitAnd40000000)
        {
            if (string.IsNullOrEmpty(typeCode))
                return null;
            //取得账本号6-10位
            string characterNumber = getCharacterNumberSixToTen(typeCode);
            //十一十二位为该同年类型项目数
            int count = database.AccountBookNumberCounts.NewAccountBookNumberCount(characterNumber, isExploitAnd40000000);
            if (count <= MaxCharacterCount)
                return String.Format("{0}{1:D2}", characterNumber, count);

            return null;
        }
        //取得账本号6-10位
        private string getCharacterNumberSixToTen(string typeCode)
        {
            var projectLevelCode = (int)Project.Level;
            var projectStartDateTime = Project.StartDate.ToString().Substring(2, 2);
            //6-10为为项目级别加开始时间加项目分类代码
            return string.Format("{0}{1}{2}", projectLevelCode, projectStartDateTime, typeCode);
        }
        /// <summary>
        /// 取得项目绩效账本号的6-12位
        /// </summary>
        /// <param name="database"></param>
        /// <param name="isExploitAnd40000000"></param>
        /// <returns></returns>
        public string GetPerformanceAccountBookNumber(IDatabase database,bool isExploitAnd40000000)
        {
            if (!string.IsNullOrEmpty(_PerformanceAccountBookNumber))
                return _PerformanceAccountBookNumber;

            _PerformanceAccountBookNumber = GetAccountbookNumber(database, isExploitAnd40000000);
            if (!string.IsNullOrEmpty(_PerformanceAccountBookNumber))
            {
                StringBuilder stringBuilder = new StringBuilder(_PerformanceAccountBookNumber);
                _PerformanceAccountBookNumber = stringBuilder.Replace(_PerformanceAccountBookNumber.Substring(0, 1), "9", 0, 1).ToString();
                this.Save(database);
            }

            return _PerformanceAccountBookNumber;
        }
        /// <summary>
        /// 取得项目没有还清的借款记录
        /// </summary>
        /// <param name="query"></param>
        /// <returns></returns>
        public IList<FundDescend> GetUnReturn(IQueryable<FundDescend> query)
        {
            return query
                .Where(q => q.ProjectInfo_FundID == _ID && q.Amount > q.ReceivedAmount && q.CurrentState.State != FundDescendState.Delete)
                .ToList();
        }
        /// <summary>
        /// 取得项目的没有还清的借款金额
        /// </summary>
        /// <param name="query"></param>
        /// <returns></returns>
        public long GetUnReturnAmount(IQueryable<FundDescend> query)
        {
            long amount = 0;
            var UnreturnFundDescendList = GetUnReturn(query);
            foreach (var fundDescend in UnreturnFundDescendList)
                amount += fundDescend.Amount - fundDescend.ReceivedAmount;

            return amount;
        }
        /// <summary>
        /// 取得项目的还款总额
        /// </summary>
        /// <param name="query"></param>
        /// <returns></returns>
        public long GetReturnAmount(IQueryable<FinanceFundDescend> query)
        {
            long returnAmount = 0;
            var returnFunds = query.Where(q => q.IsReturn && q.FundDescend.ProjectInfo_FundID == _ID && (q.FundDescend.CurrentState.State == FundDescendState.Passed || q.FundDescend.CurrentState.State == FundDescendState.AllocationCompleted));
            foreach (var returnFund in returnFunds)
                returnAmount += returnFund.Amount;

            return returnAmount;
        }
        /// <summary>
        /// 取得项目所有的经费成员
        /// </summary>
        /// <param name="query"></param>
        /// <returns></returns>
        public IList<FundMember> GetAllFundMembers(IQueryable<FundMember> query)
        {
            if (query == null)
                throw new ArgumentNullException("query");

            return query.Where(q => q.ProjectInfo_FundID.HasValue && q.ProjectInfo_FundID.Value == this._ID).ToList();
        }
        /// <summary>
        /// 取得对应的绩效分配
        /// </summary>
        /// <param name="query"></param>
        /// <returns></returns>
        public IList<PerformanceAllocation> GetPerformances(IQueryable<PerformanceAllocation> query)
        {
            return query
               .Where(q => q.Performance.Project.FundID == _ID && q.CurrentState.State == PerformanceAllocationState.Passed)
               .ToList();
        }
        /// <summary>
        /// 清空项目的账本号
        /// </summary>
        /// <param name="user"></param>
        /// <param name="database"></param>
        public void ClearProjectAccountBookNumber(User user, IDatabase database)
        {
            using (TransactionScope ts = new TransactionScope())
            {
                this._AccountBookNumber = null;
                this._AccountBookNumberCount = 0;
                this.Save(database);

                foreach (FundMember fundMember in GetAllFundMembers(database.FundMembers))
                {
                    // 当该经费成员对应的凭单没有走财务，该经费成员的账本号清空
                    if (user.CanResetAccountBookNumber(fundMember, database))
                    {
                        fundMember.AccountBookNumber = null;
                        fundMember.Save(database);
                    }
                }

                ts.Complete();
            }
        }
        /// <summary>
        /// 更新经费信息的相关统计信息
        /// </summary>
        /// <param name="database"></param>
        public override void UpdateStatistic(IDatabase database)
        {
            _FundReceived = 0;
            _FundAlreadyIn = _FundAlreadyOut = _FundAlreadyHardware = 0;
            _OverheadExpensesAlreadyIn = _OverheadExpensesAlreadyOut = _OverheadExpensesAlreadyMiddle = 0;
            _PerformancePayAlready = 0;

            foreach (var fundDescend in GetFundDescends(database.FundDescends))
            {
                _FundReceived += fundDescend.Amount;
                if (fundDescend.CurrentState.State == FundDescendState.AllocationCompleted)
                {
                    var fundAllocation = fundDescend.GetFundAllocation(database.FundAllocations, database);

                    //_FundAlreadyIn += fundAllocation.AllocationIn;
                    //_FundAlreadyIn += fundAllocation.OverheadPerformancePay;
                    //_FundAlreadyIn += fundAllocation.OverheadExpensesIn;
                    //_FundAlreadyIn += fundAllocation.OverheadExpensesOut;
                    _FundAlreadyIn += fundDescend.Amount - fundAllocation.AllocationOut;
                    _FundAlreadyOut += fundAllocation.AllocationOut;
                    _FundAlreadyHardware += fundAllocation.AllocationHardware;

                    _OverheadExpensesAlreadyIn += fundAllocation.OverheadExpensesIn;
                    _OverheadExpensesAlreadyOut += fundAllocation.OverheadExpensesOut;
                    _OverheadExpensesAlreadyMiddle += fundAllocation.OverheadExpensesMiddle;
                    //统计已分配校内绩效
                    foreach (var performanceAllocation in GetPerformances(database.PerformanceAllocations))
                    {
                        _PerformancePayAlready += performanceAllocation.ArrivedPerformance;
                    }
                }
            }
            _ReturnAmount = GetReturnAmount(database.FinanceFundDescends);
            _BorrowAmount = _ReturnAmount + GetUnReturnAmount(database.FundDescends);
            _FundReceived = _FundReceived - GetUnReturnAmount(database.FundDescends);
        }
        /// <summary>
        /// 验证操作
        /// </summary>
        /// <param name="validater">验证器</param>
        /// <param name="database">数据库</param>
        protected override void ValidateAction(Validater validater, IDatabase database)
        {
            var systemSetting = database.SystemSettings.GetSystemSetting();

            validater.AddCondition(Project != null, "经费信息对应的项目必须存在！");
            validater.AddCondition(_AccountBookNumberCount >= 0, "账本号计数器的值不能小于零！");

            validater.AddCondition(FundContract >= 0, "合同额必须大于等于零！");
            validater.AddCondition(FundTotal >= 0, "总经费必须大于等于零！");
            validater.AddCondition(FundTotal >= FundReceived, "总经费必须大于等于已收到的经费额！");

            long fundPlanTotal = 0;

            validater.AddCondition(!string.IsNullOrEmpty(_FundPlanOut.ToString()), "项目计划外协分配金额不能为空！");
            validater.AddCondition(FundPlanOut >= 0, "计划外协分配的金额不能小于零！");
            if (Project.GetProjectInfo_Type(database.ProjectInfo_Types).Rank.IsHorizontal)
                validater.AddCondition(FundPlanOut <= ((float)FundTotal) / 100 * systemSetting.FundOutRatio, String.Format("计划外协分配的金额不能大于总经费的{0}%", systemSetting.FundOutRatio));
            fundPlanTotal += FundPlanOut;

            validater.AddCondition(!string.IsNullOrEmpty(FundPlanHardware.ToString()), "项目计划硬件费的金额不能为空！");
            validater.AddCondition(FundPlanHardware >= 0, "计划硬件费的金额不能小于零！");
            fundPlanTotal += FundPlanHardware;

            validater.AddCondition(!string.IsNullOrEmpty(FundPlanIn.ToString()), "项目计划校内分配的金额不能为空！");
            validater.AddCondition(FundPlanIn >= 0, "计划校内分配的金额不能小于零！");
            fundPlanTotal += FundPlanIn;

            validater.AddCondition(!string.IsNullOrEmpty(fundPlanTotal.ToString()), "项目计划分配的总额不能为空！");
            validater.AddCondition(fundPlanTotal <= FundTotal, "计划分配经费的总额不能大于总经费！");

            validater.AddCondition(!string.IsNullOrEmpty(FundReceived.ToString()), "项目已经受到的经费金额不能为空！");

            validater.AddCondition(!string.IsNullOrEmpty(FundAlreadyOut.ToString()), "项目已外协分配的经费不能为空！");
            validater.AddCondition(FundAlreadyOut >= 0, "已外协分配的经费不能小于零！");
            validater.AddCondition(FundAlreadyOut <= FundPlanOut, "已外协分配的金额不能大于计划外协分配经费金额！");

            validater.AddCondition(!string.IsNullOrEmpty(FundAlreadyIn.ToString()), "项目已校内分配的金额不能为空！");
            validater.AddCondition(FundAlreadyIn >= 0, "已校内分配的经费金额不能小于零！");
            validater.AddCondition(FundAlreadyIn <= FundPlanIn, "已校内分配的经费金额不能大于计划校内分配经费金额！");

            validater.AddCondition(!string.IsNullOrEmpty(FundAlreadyHardware.ToString()), "项目已分配的硬件费不能为空！");
            validater.AddCondition(FundAlreadyHardware >= 0, "已分配的硬件费不能小于零！");
            validater.AddCondition(FundAlreadyHardware <= FundPlanHardware, "已分配的硬件费不能大于计划分配的硬件费金额！");

            validater.AddCondition(!string.IsNullOrEmpty(OverheadExpenseInTotal.ToString()), "校内分配管理费不能为空！");
            validater.AddCondition(!string.IsNullOrEmpty(OverheadExpenseMiddleTotal.ToString()), "学院分配管理费不能为空！");
            validater.AddCondition(!string.IsNullOrEmpty(OverheadExpenseOutTotal.ToString()), "外协分配管理费不能为空！");
            validater.AddCondition(!string.IsNullOrEmpty(OverheadExpensesAlreadyIn.ToString()), "已收校内管理费不能为空！");
            validater.AddCondition(!string.IsNullOrEmpty(OverheadExpensesAlreadyOut.ToString()), "已收外协管理费不能为空！");
            validater.AddCondition(!string.IsNullOrEmpty(OverheadExpensesAlreadyMiddle.ToString()), "已收学院管理费不能为空！");


            validater.AddCondition(OverheadExpenseInTotal >= -1, "校内分配管理费不能小于零！");
            validater.AddCondition(OverheadExpenseOutTotal >= 0, "外协分配管理费不能小于零！");
            validater.AddCondition(OverheadExpensesAlreadyIn >= 0, "已收校内管理费不能小于零！");
            validater.AddCondition(OverheadExpensesAlreadyOut >= 0, "已收外协管理费不能小于零！");

            validater.AddCondition(_BorrowAmount >= _ReturnAmount, "借款记录必须大于等于还款记录");
        }
        /// <summary>
        /// 取得相应的通过审核的经费下拨
        /// </summary>
        /// <param name="query"></param>
        /// <returns></returns>
        public List<FundDescend> GetFundDescends(IEntityDataAccess<FundDescend> query)
        {
            return query.Where(fd => fd.ProjectInfo_FundID == _ID
                && (fd.CurrentState.State == FundDescendState.Passed || fd.CurrentState.State == FundDescendState.AllocationCompleted))
                .ToList();
        }
        /// <summary>
        /// 取得该项目所有的经费成员
        /// </summary>
        /// <param name="query"></param>
        /// <returns></returns>
        public List<FundMember> GetAllVouchers(IEntityDataAccess<FundMember> query)
        {
            return query
                .Where(q => q.ProjectInfo_FundID == this.ID)
                .ToList();
        }
        /// <summary>
        /// 更新项目账本号计数器（用于手工修改账本号计数器）
        /// </summary>
        /// <param name="database"></param>
        public void UpdateAccountBookNumber(IDatabase database)
        {
            var fundMembers = this.GetAllFundMembers(database.FundMembers);
            int max = 0;
            int count;
            string countstring = string.Empty;

            foreach (var fundMember in fundMembers)
            {
                //只有当经费成员的账本号为13位时，更新项目账本号计数器
                if (string.IsNullOrEmpty(fundMember.AccountBookNumber))
                    continue;
                if (fundMember.AccountBookNumber.Length != 13)
                    continue;

                countstring = fundMember.AccountBookNumber.Substring(12, 1);
                if (!Int32.TryParse(countstring, out count))
                    count = 10 + (countstring.ToCharArray()[0] - 'A');

                if (max < count)
                    max = count;
            }

            this._AccountBookNumberCount = max + 1;
            this.Save(database);
        }
    }

    /// <summary>
    /// 项目信息—经费的业务扩展
    /// </summary>
    public static class ProjectInfo_FundBusinessExtension
    {
    }
    /// <summary>
    /// 项目信息—经费的查询扩展
    /// </summary>
    public static class ProjectInfo_FundQueryExtension
    {
    }
    /// <summary>
    /// 项目信息—经费的权限扩展
    /// </summary>
    public static class ProjectInfo_FundPermissionExtension
    {
        /// <summary>
        /// 可下拨经费的状态
        /// </summary>
        private static readonly ProjectState[] ProjectState_CanFundDescend = new ProjectState[] { ProjectState.ProjectProcessing, ProjectState.WaitingEndCensor, ProjectState.ProjectEnd };
        /// <summary>
        /// 可还款的项目状态
        /// </summary>
        private static readonly ProjectState[] ProjectState_CanReturn = new ProjectState[] { ProjectState.ProjectProcessing, ProjectState.WaitingEndCensor, ProjectState.ProjectEnd };
        /// <summary>
        /// 判断用户能够给项目下拨经费（借款）
        /// </summary>
        /// <param name="user"></param>
        /// <param name="project"></param>
        /// <param name="database"></param>
        /// <returns></returns>
        public static bool CanFundDescend(this User user, Project project, IDatabase database)
        {
            if (!ProjectState_CanFundDescend.Contains(project.CurrentState.State))
                return false;

            if (project.Fund.FundTotal == (project.Fund.FundReceived + project.Fund.BorrowAmount - project.Fund.ReturnAmount))
                return false;

            if (user.IsExpert)
                return project.IsPrincipal(user) && project.CurrentState.State == ProjectState.ProjectProcessing && project.Type.Rank.IsHorizontal;

            return user.CanEdit(project, database);
        }
        /// <summary>
        /// 判断用户能够给项目还款
        /// </summary>
        /// <param name="user"></param>
        /// <param name="project"></param>
        /// <param name="database"></param>
        /// <returns></returns>
        public static bool CanReturn(this User user, Project project, IDatabase database)
        {
            if (!user.IsSuper)
                return false;

            if (!ProjectState_CanReturn.Contains(project.CurrentState.State))
                return false;

            return project.Fund.GetUnReturnAmount(database.FundDescends) > 0;
        }
        /// <summary>
        /// 判断用户能够清空项目的账本号
        /// </summary>
        /// <param name="user"></param>
        /// <returns></returns>
        public static bool CanClearProjectAccountBookNumber(this User user)
        {
            return user.IsSuper;
        }
    }
}
