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
    /// 用户登录记录
    /// </summary>
    public partial class UserLoginLog
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
        private Guid _Token;
        private string _LoingIP;
        private DateTime _LoginTime;
        private DateTime _LastActiveTime;
        private bool _IsLogout;

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
        /// 取得或设置令牌
        /// </summary>
        public Guid Token
        {
            get { return _Token; }
            set { _Token = value; }
        }
        /// <summary>
        /// 取得或设置登陆IP
        /// </summary>
        public string LoingIP
        {
            get { return _LoingIP; }
            set { _LoingIP = value; }
        }
        /// <summary>
        /// 取得或设置登陆时间
        /// </summary>
        public DateTime LoginTime
        {
            get { return _LoginTime; }
            set { _LoginTime = value; }
        }
        /// <summary>
        /// 取得或设置最后活动时间
        /// </summary>
        public DateTime LastActiveTime
        {
            get { return _LastActiveTime; }
            set { _LastActiveTime = value; }
        }
        /// <summary>
        /// 取得或设置是否已退出登陆
        /// </summary>
        public bool IsLogout
        {
            get { return _IsLogout; }
            set { _IsLogout = value; }
        }

        #endregion
    }
}
