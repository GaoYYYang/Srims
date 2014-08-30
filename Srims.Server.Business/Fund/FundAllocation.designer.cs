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
    /// 经费分配
    /// </summary>
    public partial class FundAllocation
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

        private int _FundDescendID;
        private EntityRef<FundDescend> _FundDescend;
        private long _AllocationIn;
        private long _AllocationOut;
        private long? _AllocationWantOut;
        private long _AllocationHardware;
        private long _PerformancePay;
        private long _OverheadExpensesIn;
        private long _OverheadExpensesMiddle;
        private long _OverheadExpensesExpert;
        private long _OverheadExpensesOut;
        private long _OverheadPerformancePay;
        private int? _CurrentStateID;
        private EntityRef<FundAllocationStateHistory> _CurrentState;
        private int? _OldID;

        #endregion

        #region 属性

        /// <summary>
        /// 取得对应对应经费下拨的ID
        /// </summary>
        public int FundDescendID
        {
            get { return _FundDescendID; }
        }
        /// <summary>
        /// 取得对应的对应经费下拨
        /// </summary>
        public FundDescend FundDescend
        {
            get { return _FundDescend.Entity; }
            set
            {
                _FundDescend.Entity = value;
                _FundDescendID = value == null ? 0 : value.ID;
            }
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
        /// 取得或设置外协已分配
        /// </summary>
        public long AllocationOut
        {
            get { return _AllocationOut; }
            set { _AllocationOut = value; }
        }
        /// <summary>
        /// 取得或设置外协欲分配
        /// </summary>
        public long? AllocationWantOut
        {
            get { return _AllocationWantOut; }
            set { _AllocationWantOut = value; }
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
        /// 取得或设置已分课题组管理费
        /// </summary>
        public long PerformancePay
        {
            get { return _PerformancePay; }
            set { _PerformancePay = value; }
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
        /// 取得对应当前状态的ID
        /// </summary>
        public int? CurrentStateID
        {
            get { return _CurrentStateID; }
        }
        /// <summary>
        /// 取得对应的当前状态
        /// </summary>
        public FundAllocationStateHistory CurrentState
        {
            get { return _CurrentState.Entity; }
            set
            {
                _CurrentState.Entity = value;
                _CurrentStateID = value == null ? null : new int?(value.ID);
            }
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
