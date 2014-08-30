using System;
using System.Collections.Generic;
using System.Data.Linq;
using System.Linq;
using System.Text;

using MIS.Common;
using MIS.Common.Validate;
using MIS.Common.Query;

using Srims.Server.Business.Performances;
using Srims.Server.Business.Fund;

namespace Srims.Server.Business.Performances
{
    /// <summary>
    /// 绩效凭单
    /// </summary>
    public partial class PerformanceVoucher
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

        private int _PerformanceAllocationID;
        private EntityRef<PerformanceAllocation> _PerformanceAllocation;
        private int _FundMemberID;
        private EntityRef<FundMember> _FundMember;
        private string _VoucherNumber;
        private string _AccountBookNumber;
        private long _PerformancePay;
        private long? _OverheadExpensesExpert;
        private bool _IsRead;
        private int? _CurrentStateID;
        private EntityRef<PerformanceVoucherStateHistory> _CurrentState;
        private string _FinanceNumber;
        private DateTime? _FinanceAllocateDateTime;
        private string _Remark;

        #endregion

        #region 属性

        /// <summary>
        /// 取得对应对应绩效分配的ID
        /// </summary>
        public int PerformanceAllocationID
        {
            get { return _PerformanceAllocationID; }
        }
        /// <summary>
        /// 取得对应的对应绩效分配
        /// </summary>
        public PerformanceAllocation PerformanceAllocation
        {
            get { return _PerformanceAllocation.Entity; }
            set
            {
                _PerformanceAllocation.Entity = value;
                _PerformanceAllocationID = value == null ? 0 : value.ID;
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
        /// 取得或设置绩效金额
        /// </summary>
        public long PerformancePay
        {
            get { return _PerformancePay; }
            set { _PerformancePay = value; }
        }
        /// <summary>
        /// 取得或设置课题组间接费用金额
        /// </summary>
        public long? OverheadExpensesExpert
        {
            get { return _OverheadExpensesExpert; }
            set { _OverheadExpensesExpert = value; }
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
        public PerformanceVoucherStateHistory CurrentState
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
        /// 取得或设置备注
        /// </summary>
        public string Remark
        {
            get { return _Remark; }
            set { _Remark = value; }
        }

        #endregion
    }
}
