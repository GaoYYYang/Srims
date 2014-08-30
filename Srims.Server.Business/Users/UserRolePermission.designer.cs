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
    /// 权限_角色
    /// </summary>
    public partial class UserRolePermission
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

        private int _UserRoleID;
        private EntityRef<UserRole> _UserRole;
        private int _PermissionID;
        private EntityRef<Permission> _Permission;

        #endregion

        #region 属性

        /// <summary>
        /// 取得对应对应用户角色的ID
        /// </summary>
        public int UserRoleID
        {
            get { return _UserRoleID; }
        }
        /// <summary>
        /// 取得对应的对应用户角色
        /// </summary>
        public UserRole UserRole
        {
            get { return _UserRole.Entity; }
            set
            {
                _UserRole.Entity = value;
                _UserRoleID = value == null ? 0 : value.ID;
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
