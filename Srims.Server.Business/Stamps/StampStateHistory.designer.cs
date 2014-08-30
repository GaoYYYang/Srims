using System;
using System.Collections.Generic;
using System.Data.Linq;
using System.Linq;
using System.Text;

using MIS.Common;
using MIS.Common.Validate;
using MIS.Common.Query;

using Srims.Server.Business.Stamps;

namespace Srims.Server.Business.Stamps
{
    /// <summary>
    /// 文印状态历史
    /// </summary>
    public partial class StampStateHistory
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

        private int _StampApplicationID;
        private EntityRef<StampApplication> _StampApplication;
        private StampState _State;
        private string _Operator;
        private DateTime? _DateTime;
        private string _Remark;

        #endregion

        #region 属性

        /// <summary>
        /// 取得对应文印申请的ID
        /// </summary>
        public int StampApplicationID
        {
            get { return _StampApplicationID; }
        }
        /// <summary>
        /// 取得对应的文印申请
        /// </summary>
        public StampApplication StampApplication
        {
            get { return _StampApplication.Entity; }
            set
            {
                _StampApplication.Entity = value;
                _StampApplicationID = value == null ? 0 : value.ID;
            }
        }
        /// <summary>
        /// 取得或设置状态
        /// </summary>
        public StampState State
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
        /// 取得或设置状态时间
        /// </summary>
        public DateTime? DateTime
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
