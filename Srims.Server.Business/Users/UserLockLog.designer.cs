using System;
using System.Collections.Generic;
using System.Data.Linq;
using System.Linq;
using System.Text;

using MIS.Common;
using MIS.Common.Validate;
using MIS.Common.Query;

using Srims.Server.Business.Users;

namespace Srims.Server.Business.Users
{
    /// <summary>
    /// 用户锁定记录
    /// </summary>
    public partial class UserLockLog
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

        private int _UserID;
        private EntityRef<User> _User;
        private DateTime _StartTime;
        private DateTime? _EndTime;
        private string _Operator;
        private DateTime _OperateDateTime;
        private string _Reason;

        #endregion

        #region 属性

        /// <summary>
        /// 取得对应对应用户的ID
        /// </summary>
        public int UserID
        {
            get { return _UserID; }
        }
        /// <summary>
        /// 取得对应的对应用户
        /// </summary>
        public User User
        {
            get { return _User.Entity; }
            set
            {
                _User.Entity = value;
                _UserID = value == null ? 0 : value.ID;
            }
        }
        /// <summary>
        /// 取得或设置开始时间
        /// </summary>
        public DateTime StartTime
        {
            get { return _StartTime; }
            set { _StartTime = value; }
        }
        /// <summary>
        /// 取得或设置截止时间
        /// </summary>
        public DateTime? EndTime
        {
            get { return _EndTime; }
            set { _EndTime = value; }
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
        public DateTime OperateDateTime
        {
            get { return _OperateDateTime; }
            set { _OperateDateTime = value; }
        }
        /// <summary>
        /// 取得或设置锁定原因
        /// </summary>
        public string Reason
        {
            get { return _Reason; }
            set { _Reason = value; }
        }

        #endregion
    }
}
