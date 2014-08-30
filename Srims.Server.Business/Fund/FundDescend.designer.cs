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
    /// 下拨经费
    /// </summary>
    public partial class FundDescend
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

        private int _ProjectInfo_FundID;
        private EntityRef<ProjectInfo_Fund> _ProjectInfo_Fund;
        private DateTime _DescendDateTime;
        private long _Amount;
        private long _ReceivedAmount;
        private string _Operator;
        private int? _CurrentStateID;
        private EntityRef<FundDescendStateHistory> _CurrentState;
        private int? _OldID;

        #endregion

        #region 属性

        /// <summary>
        /// 取得对应对应项目的ID
        /// </summary>
        public int ProjectInfo_FundID
        {
            get { return _ProjectInfo_FundID; }
        }
        /// <summary>
        /// 取得对应的对应项目
        /// </summary>
        public ProjectInfo_Fund ProjectInfo_Fund
        {
            get { return _ProjectInfo_Fund.Entity; }
            set
            {
                _ProjectInfo_Fund.Entity = value;
                _ProjectInfo_FundID = value == null ? 0 : value.ID;
            }
        }
        /// <summary>
        /// 取得或设置下拨时间
        /// </summary>
        public DateTime DescendDateTime
        {
            get { return _DescendDateTime; }
            set { _DescendDateTime = value; }
        }
        /// <summary>
        /// 取得或设置下拨金额
        /// </summary>
        public long Amount
        {
            get { return _Amount; }
            set { _Amount = value; }
        }
        /// <summary>
        /// 取得或设置实到金额
        /// </summary>
        public long ReceivedAmount
        {
            get { return _ReceivedAmount; }
            set { _ReceivedAmount = value; }
        }
        /// <summary>
        /// 取得或设置下拨人
        /// </summary>
        public string Operator
        {
            get { return _Operator; }
            set { _Operator = value; }
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
        public FundDescendStateHistory CurrentState
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
