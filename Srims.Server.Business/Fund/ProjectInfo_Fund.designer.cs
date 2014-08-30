using System;
using System.Collections.Generic;
using System.Data.Linq;
using System.Linq;
using System.Text;

using MIS.Common;
using MIS.Common.Validate;
using MIS.Common.Query;

using Srims.Server.Business.Projects;

namespace Srims.Server.Business.Fund
{
    /// <summary>
    /// 项目信息—经费
    /// </summary>
    public partial class ProjectInfo_Fund
    {
        #region ID和时间戳

        private int _ID = NEW_ENTITY_ID;
        private byte[] _TimeStamp = new byte[] { };

        /// <summary>
        /// 取得ID
        /// </summary>
        public override int ID
        {
            get { return _ID; }
        }
        /// <summary>
        /// 取得时间戳
        /// </summary>
        public override byte[] TimeStamp
        {
            get { return _TimeStamp; }
        }

        #endregion

        #region 成员

        private int _ProjectID;
        private EntityRef<Project> _Project;
        private string _AccountBookNumber;
        private int _AccountBookNumberCount;
        private string _PerformanceAccountBookNumber;
        private int _PerformanceAccountBookNumberCount;
        private string _FundFrom;
        private string _FundFromUnit;
        private string _FundFromUnitAddress;
        private long _FundContract;
        private long _FundTotal;
        private long _FundPlanOut;
        private long _FundPlanHardware;
        private long? _IndirectCosts;
        private long _FundReceived;
        private long _FundAlreadyIn;
        private long _FundAlreadyOut;
        private long _FundAlreadyHardware;
        private long _CampusIndirectCosts;
        private long _OverheadExpenseInTotal;
        private long _OverheadExpenseMiddleTotal;
        private long _OverheadExpenseExpertTotal;
        private long _OverheadExpenseOutTotal;
        private long _OverheadExpensesAlreadyIn;
        private long _OverheadExpensesAlreadyMiddle;
        private long _OverheadExpensesAlreadyOut;
        private long _BorrowAmount;
        private long _ReturnAmount;
        private int _FundManageProportion;
        private long? _ProjectPerformancePay;
        private long _PerformancePay;
        private long _PerformancePayAlready;
        private long _FundAdjust;
        private long? _EquipmentCost;
        private long? _OverHeadExpenseInStandard;
        private long? _PerformanceInStandard;

        #endregion

        #region 属性

        /// <summary>
        /// 取得对应对应的项目的ID
        /// </summary>
        public int ProjectID
        {
            get { return _ProjectID; }
        }
        /// <summary>
        /// 取得对应的对应的项目
        /// </summary>
        public Project Project
        {
            get { return _Project.Entity; }
            set
            {
                _Project.Entity = value;
                _ProjectID = value == null ? 0 : value.ID;
            }
        }
        /// <summary>
        /// 取得或设置账本号
        /// </summary>
        /// <remarks>账本号的6-12位</remarks>
        public string AccountBookNumber
        {
            get { return _AccountBookNumber; }
            set { _AccountBookNumber = value; }
        }
        /// <summary>
        /// 取得或设置账本号计数器
        /// </summary>
        /// <remarks>表示成员的账本号中，顺序号（最后一位）最大的一个</remarks>
        public int AccountBookNumberCount
        {
            get { return _AccountBookNumberCount; }
            set { _AccountBookNumberCount = value; }
        }
        /// <summary>
        /// 取得或设置绩效账本号
        /// </summary>
        /// <remarks>绩效对应账本号的6-12位</remarks>
        public string PerformanceAccountBookNumber
        {
            get { return _PerformanceAccountBookNumber; }
            set { _PerformanceAccountBookNumber = value; }
        }
        /// <summary>
        /// 取得或设置绩效账本号计数器
        /// </summary>
        /// <remarks>表示绩效对应成员的账本号中，顺序号（最后一位）最大的一个</remarks>
        public int PerformanceAccountBookNumberCount
        {
            get { return _PerformanceAccountBookNumberCount; }
            set { _PerformanceAccountBookNumberCount = value; }
        }
        /// <summary>
        /// 取得或设置资金来源
        /// </summary>
        public string FundFrom
        {
            get { return _FundFrom; }
            set { _FundFrom = value; }
        }
        /// <summary>
        /// 取得或设置来款单位
        /// </summary>
        public string FundFromUnit
        {
            get { return _FundFromUnit; }
            set { _FundFromUnit = value; }
        }
        /// <summary>
        /// 取得或设置来款单位地址
        /// </summary>
        public string FundFromUnitAddress
        {
            get { return _FundFromUnitAddress; }
            set { _FundFromUnitAddress = value; }
        }
        /// <summary>
        /// 取得或设置合同额
        /// </summary>
        public long FundContract
        {
            get { return _FundContract; }
            set { _FundContract = value; }
        }
        /// <summary>
        /// 取得或设置总经费（到校经费）
        /// </summary>
        public long FundTotal
        {
            get { return _FundTotal; }
            set { _FundTotal = value; }
        }
        /// <summary>
        /// 取得或设置计划外拨经费
        /// </summary>
        public long FundPlanOut
        {
            get { return _FundPlanOut; }
            set { _FundPlanOut = value; }
        }
        /// <summary>
        /// 取得或设置计划硬件费
        /// </summary>
        public long FundPlanHardware
        {
            get { return _FundPlanHardware; }
            set { _FundPlanHardware = value; }
        }
        /// <summary>
        /// 取得或设置项目间接费
        /// </summary>
        public long? IndirectCosts
        {
            get { return _IndirectCosts; }
            set { _IndirectCosts = value; }
        }
        /// <summary>
        /// 取得或设置已到经费
        /// </summary>
        public long FundReceived
        {
            get { return _FundReceived; }
            set { _FundReceived = value; }
        }
        /// <summary>
        /// 取得或设置已校内分配
        /// </summary>
        public long FundAlreadyIn
        {
            get { return _FundAlreadyIn; }
            set { _FundAlreadyIn = value; }
        }
        /// <summary>
        /// 取得或设置已外拨经费
        /// </summary>
        public long FundAlreadyOut
        {
            get { return _FundAlreadyOut; }
            set { _FundAlreadyOut = value; }
        }
        /// <summary>
        /// 取得或设置已分配硬件费
        /// </summary>
        public long FundAlreadyHardware
        {
            get { return _FundAlreadyHardware; }
            set { _FundAlreadyHardware = value; }
        }
        /// <summary>
        /// 取得或设置校内间接费用
        /// </summary>
        public long CampusIndirectCosts
        {
            get { return _CampusIndirectCosts; }
            set { _CampusIndirectCosts = value; }
        }
        /// <summary>
        /// 取得或设置学校管理费总额
        /// </summary>
        public long OverheadExpenseInTotal
        {
            get { return _OverheadExpenseInTotal; }
            set { _OverheadExpenseInTotal = value; }
        }
        /// <summary>
        /// 取得或设置学院管理费总额
        /// </summary>
        public long OverheadExpenseMiddleTotal
        {
            get { return _OverheadExpenseMiddleTotal; }
            set { _OverheadExpenseMiddleTotal = value; }
        }
        /// <summary>
        /// 取得或设置课题组管理费总额
        /// </summary>
        public long OverheadExpenseExpertTotal
        {
            get { return _OverheadExpenseExpertTotal; }
            set { _OverheadExpenseExpertTotal = value; }
        }
        /// <summary>
        /// 取得或设置外协管理费总额
        /// </summary>
        public long OverheadExpenseOutTotal
        {
            get { return _OverheadExpenseOutTotal; }
            set { _OverheadExpenseOutTotal = value; }
        }
        /// <summary>
        /// 取得或设置已收校内管理费
        /// </summary>
        public long OverheadExpensesAlreadyIn
        {
            get { return _OverheadExpensesAlreadyIn; }
            set { _OverheadExpensesAlreadyIn = value; }
        }
        /// <summary>
        /// 取得或设置已收学院管理费
        /// </summary>
        public long OverheadExpensesAlreadyMiddle
        {
            get { return _OverheadExpensesAlreadyMiddle; }
            set { _OverheadExpensesAlreadyMiddle = value; }
        }
        /// <summary>
        /// 取得或设置已收外协管理费
        /// </summary>
        public long OverheadExpensesAlreadyOut
        {
            get { return _OverheadExpensesAlreadyOut; }
            set { _OverheadExpensesAlreadyOut = value; }
        }
        /// <summary>
        /// 取得或设置借款金额
        /// </summary>
        public long BorrowAmount
        {
            get { return _BorrowAmount; }
            set { _BorrowAmount = value; }
        }
        /// <summary>
        /// 取得或设置还款金额
        /// </summary>
        public long ReturnAmount
        {
            get { return _ReturnAmount; }
            set { _ReturnAmount = value; }
        }
        /// <summary>
        /// 取得或设置国家规定管理费比例
        /// </summary>
        public int FundManageProportion
        {
            get { return _FundManageProportion; }
            set { _FundManageProportion = value; }
        }
        /// <summary>
        /// 取得或设置项目绩效
        /// </summary>
        public long? ProjectPerformancePay
        {
            get { return _ProjectPerformancePay; }
            set { _ProjectPerformancePay = value; }
        }
        /// <summary>
        /// 取得或设置校内绩效
        /// </summary>
        public long PerformancePay
        {
            get { return _PerformancePay; }
            set { _PerformancePay = value; }
        }
        /// <summary>
        /// 取得或设置已分配校内绩效
        /// </summary>
        public long PerformancePayAlready
        {
            get { return _PerformancePayAlready; }
            set { _PerformancePayAlready = value; }
        }
        /// <summary>
        /// 取得或设置调节费
        /// </summary>
        /// <remarks>国家规定预算扣除学校管理费以及绩效工资后的余额</remarks>
        public long FundAdjust
        {
            get { return _FundAdjust; }
            set { _FundAdjust = value; }
        }
        /// <summary>
        /// 取得或设置设备购置费
        /// </summary>
        public long? EquipmentCost
        {
            get { return _EquipmentCost; }
            set { _EquipmentCost = value; }
        }
        /// <summary>
        /// 取得或设置校内基准间接费
        /// </summary>
        public long? OverHeadExpenseInStandard
        {
            get { return _OverHeadExpenseInStandard; }
            set { _OverHeadExpenseInStandard = value; }
        }
        /// <summary>
        /// 取得或设置校内基准绩效
        /// </summary>
        public long? PerformanceInStandard
        {
            get { return _PerformanceInStandard; }
            set { _PerformanceInStandard = value; }
        }

        #endregion
    }
}
