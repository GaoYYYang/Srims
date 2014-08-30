using System;
using System.Collections.Generic;
using System.Data.Linq;
using System.Linq;
using System.Text;

using MIS.Common;
using MIS.Common.Validate;
using MIS.Common.Query;

using Srims.Server.Business.Stamps;
using Srims.Server.Business.Users;

namespace Srims.Server.Business.Stamps
{
    /// <summary>
    /// 一级审核管理员
    /// </summary>
    public partial class StampApplicationFirstAdmin
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

        private int _StampApplicationTypeID;
        private EntityRef<StampApplicationType> _StampApplicationType;
        private int _UserID;
        private EntityRef<User> _User;

        #endregion

        #region 属性

        /// <summary>
        /// 取得对应文印类型的ID
        /// </summary>
        public int StampApplicationTypeID
        {
            get { return _StampApplicationTypeID; }
        }
        /// <summary>
        /// 取得对应的文印类型
        /// </summary>
        public StampApplicationType StampApplicationType
        {
            get { return _StampApplicationType.Entity; }
            set
            {
                _StampApplicationType.Entity = value;
                _StampApplicationTypeID = value == null ? 0 : value.ID;
            }
        }
        /// <summary>
        /// 取得对应拥有者的ID
        /// </summary>
        public int UserID
        {
            get { return _UserID; }
        }
        /// <summary>
        /// 取得对应的拥有者
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

        #endregion
    }
}
