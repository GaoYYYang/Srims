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
    /// 经费分配状态历史
    /// </summary>
    public partial class FundAllocationStateHistory
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

        private int _FundAllocationID;
        private EntityRef<FundAllocation> _FundAllocation;
        private FundAllocationState _State;
        private string _Operator;
        private DateTime _DateTime;
        private string _Remark;

        #endregion

        #region 属性

        /// <summary>
        /// 取得对应对应经费分配的ID
        /// </summary>
        public int FundAllocationID
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
                _FundAllocationID = value == null ? 0 : value.ID;
            }
        }
        /// <summary>
        /// 取得或设置状态
        /// </summary>
        public FundAllocationState State
        {
            get { return _State; }
            set { _State = value; }
        }
        /// <summary>
        /// 取得或设置操作人
        /// </summary>
        public string Operator
        {
            get { return _Operator; }
            set { _Operator = value; }
        }
        /// <summary>
        /// 取得或设置操作时间
        /// </summary>
        public DateTime DateTime
        {
            get { return _DateTime; }
            set { _DateTime = value; }
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
