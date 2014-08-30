using System;
using System.Collections.Generic;
using System.Data.Linq;
using System.Linq;
using System.Text;

using MIS.Common;
using MIS.Common.Validate;
using MIS.Common.Query;

using Srims.Server.Business.Fund;

namespace Srims.Server.Business.Fund
{
    /// <summary>
    /// 经费凭单
    /// </summary>
    public partial class Voucher
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

        private int? _FundAllocationID;
        private EntityRef<FundAllocation> _FundAllocation;
        private int _FundMemberID;
        private EntityRef<FundMember> _FundMember;
        private string _VoucherNumber;
        private string _AccountBookNumber;
        private long _AllocationIn;
        private long _AllocationOut;
        private long _AllocationHardware;
        private long _PerformancePay;
        private string _PerformanceAccountBookNumber;
        private long _OverheadExpensesIn;
        private long _OverheadExpensesMiddle;
        private long _OverheadExpensesExpert;
        private long _OverheadExpensesOut;
        private long _OverheadPerformancePay;
        private bool _IsRead;
        private int? _CurrentStateID;
        private EntityRef<VoucherStateHistory> _CurrentState;
        private string _FinanceNumber;
        private DateTime? _FinanceAllocateDateTime;
        private int? _OldID;

        #endregion

        #region 属性

        /// <summary>
        /// 取得对应对应经费分配的ID
        /// </summary>
        public int? FundAllocationID
        {
            get { return _FundAllocationID; }
        }
        /// <summary>
        /// 取得对应的对应经费分配
        /// </summary>
        public FundAllocation FundAllocation
        {
            get { return _FundAllocation.Entity; }
            set
            {
                _FundAllocation.Entity = value;
                _FundAllocationID = value == null ? null : new int?(value.ID);
            }
        }
        /// <summary>
        /// 取得对应对应经费成员的ID
        /// </summary>
        public int FundMemberID
        {
            get { return _FundMemberID; }
        }
        /// <summary>
        /// 取得对应的对应经费成员
        /// </summary>
        public FundMember FundMember
        {
            get { return _FundMember.Entity; }
            set
            {
                _FundMember.Entity = value;
                _FundMemberID = value == null ? 0 : value.ID;
            }
        }
        /// <summary>
        /// 取得或设置凭单号
        /// </summary>
        public string VoucherNumber
        {
            get { return _VoucherNumber; }
            set { _VoucherNumber = value; }
        }
        /// <summary>
        /// 取得或设置账本号
        /// </summary>
        public string AccountBookNumber
        {
            get { return _AccountBookNumber; }
            set { _AccountBookNumber = value; }
        }
        /// <summary>
        /// 取得或设置校内分配
        /// </summary>
        public long AllocationIn
        {
            get { return _AllocationIn; }
            set { _AllocationIn = value; }
        }
        /// <summary>
        /// 取得或设置外协分配
        /// </summary>
        public long AllocationOut
        {
            get { return _AllocationOut; }
            set { _AllocationOut = value; }
        }
        /// <summary>
        /// 取得或设置硬件费
        /// </summary>
        public long AllocationHardware
        {
            get { return _AllocationHardware; }
            set { _AllocationHardware = value; }
        }
        /// <summary>
        /// 取得或设置绩效管理费(系统中没用)
        /// </summary>
        public long PerformancePay
        {
            get { return _PerformancePay; }
            set { _PerformancePay = value; }
        }
        /// <summary>
        /// 取得或设置绩效账本号
        /// </summary>
        public string PerformanceAccountBookNumber
        {
            get { return _PerformanceAccountBookNumber; }
            set { _PerformanceAccountBookNumber = value; }
        }
        /// <summary>
        /// 取得或设置学校管理费
        /// </summary>
        public long OverheadExpensesIn
        {
            get { return _OverheadExpensesIn; }
            set { _OverheadExpensesIn = value; }
        }
        /// <summary>
        /// 取得或设置学院管理费
        /// </summary>
        public long OverheadExpensesMiddle
        {
            get { return _OverheadExpensesMiddle; }
            set { _OverheadExpensesMiddle = value; }
        }
        /// <summary>
        /// 取得或设置课题组管理费
        /// </summary>
        public long OverheadExpensesExpert
        {
            get { return _OverheadExpensesExpert; }
            set { _OverheadExpensesExpert = value; }
        }
        /// <summary>
        /// 取得或设置外协分配管理费
        /// </summary>
        public long OverheadExpensesOut
        {
            get { return _OverheadExpensesOut; }
            set { _OverheadExpensesOut = value; }
        }
        /// <summary>
        /// 取得或设置绩效
        /// </summary>
        public long OverheadPerformancePay
        {
            get { return _OverheadPerformancePay; }
            set { _OverheadPerformancePay = value; }
        }
        /// <summary>
        /// 取得或设置是否已查看
        /// </summary>
        public bool IsRead
        {
            get { return _IsRead; }
            set { _IsRead = value; }
        }
        /// <summary>
        /// 取得对应当前状态的ID
        /// </summary>
        public int? CurrentStateID
        {
            get { return _CurrentStateID; }
        }
        /// <summary>
        /// 取得对应的当前状态
        /// </summary>
        public VoucherStateHistory CurrentState
        {
            get { return _CurrentState.Entity; }
            set
            {
                _CurrentState.Entity = value;
                _CurrentStateID = value == null ? null : new int?(value.ID);
            }
        }
        /// <summary>
        /// 取得或设置财务制单号
        /// </summary>
        public string FinanceNumber
        {
            get { return _FinanceNumber; }
            set { _FinanceNumber = value; }
        }
        /// <summary>
        /// 取得或设置财务分配时间
        /// </summary>
        public DateTime? FinanceAllocateDateTime
        {
            get { return _FinanceAllocateDateTime; }
            set { _FinanceAllocateDateTime = value; }
        }
        /// <summary>
        /// 取得或设置原系统ID
        /// </summary>
        public int? OldID
        {
            get { return _OldID; }
            set { _OldID = value; }
        }

        #endregion
    }
}
