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
    /// 经费下拨状态历史
    /// </summary>
    public partial class FundDescendStateHistory
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
        private FundDescendState _State;
        private string _Operator;
        private DateTime _DateTime;
        private string _Remark;

        #endregion

        #region 属性

        /// <summary>
        /// 取得对应对应下拨经费的ID
        /// </summary>
        public int FundDescendID
        {
            get { return _FundDescendID; }
        }
        /// <summary>
        /// 取得对应的对应下拨经费
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
        /// 取得或设置状态
        /// </summary>
        public FundDescendState State
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
