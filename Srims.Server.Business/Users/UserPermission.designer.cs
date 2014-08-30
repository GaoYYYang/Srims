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
    /// 权限_用户
    /// </summary>
    public partial class UserPermission
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
        private int _PermissionID;
        private EntityRef<Permission> _Permission;

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
        /// 取得对应对应权限的ID
        /// </summary>
        public int PermissionID
        {
            get { return _PermissionID; }
        }
        /// <summary>
        /// 取得对应的对应权限
        /// </summary>
        public Permission Permission
        {
            get { return _Permission.Entity; }
            set
            {
                _Permission.Entity = value;
                _PermissionID = value == null ? 0 : value.ID;
            }
        }

        #endregion
    }
}
