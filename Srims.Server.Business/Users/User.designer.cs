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
    /// 用户
    /// </summary>
    public partial class User
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
        private string _LoginID;
        private string _Name;
        private string _NameSpell;
        private string _Password;
        private string _Email;
        private string _HomePhone;
        private string _OfficePhone;
        private string _MobilePhone;
        private string _Fax;
        private bool _IsSuper;
        private bool _AllowMultiLogin;
        private bool _IsCustomPermission;
        private string _ExtClientState;

        #endregion

        #region 属性

        /// <summary>
        /// 取得对应用户角色的ID
        /// </summary>
        public int UserRoleID
        {
            get { return _UserRoleID; }
        }
        /// <summary>
        /// 取得对应的用户角色
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
        /// 取得或设置登录名
        /// </summary>
        public string LoginID
        {
            get { return _LoginID; }
            set { _LoginID = value; }
        }
        /// <summary>
        /// 取得或设置用户名拼音首字母
        /// </summary>
        public string NameSpell
        {
            get { return _NameSpell; }
            set { _NameSpell = value; }
        }
        /// <summary>
        /// 取得或设置电子邮件
        /// </summary>
        public string Email
        {
            get { return _Email; }
            set { _Email = value; }
        }
        /// <summary>
        /// 取得或设置家庭电话
        /// </summary>
        public string HomePhone
        {
            get { return _HomePhone; }
            set { _HomePhone = value; }
        }
        /// <summary>
        /// 取得或设置办公电话
        /// </summary>
        public string OfficePhone
        {
            get { return _OfficePhone; }
            set { _OfficePhone = value; }
        }
        /// <summary>
        /// 取得或设置移动电话
        /// </summary>
        public string MobilePhone
        {
            get { return _MobilePhone; }
            set { _MobilePhone = value; }
        }
        /// <summary>
        /// 取得或设置传真
        /// </summary>
        public string Fax
        {
            get { return _Fax; }
            set { _Fax = value; }
        }
        /// <summary>
        /// 取得或设置是否超级用户
        /// </summary>
        public bool IsSuper
        {
            get { return _IsSuper; }
            set { _IsSuper = value; }
        }
        /// <summary>
        /// 取得或设置是否允许多人登陆
        /// </summary>
        public bool AllowMultiLogin
        {
            get { return _AllowMultiLogin; }
            set { _AllowMultiLogin = value; }
        }
        /// <summary>
        /// 取得或设置是否自定义权限
        /// </summary>
        public bool IsCustomPermission
        {
            get { return _IsCustomPermission; }
            set { _IsCustomPermission = value; }
        }
        /// <summary>
        /// 取得或设置Ext客户端状态
        /// </summary>
        public string ExtClientState
        {
            get { return _ExtClientState; }
            set { _ExtClientState = value; }
        }

        #endregion
    }
}
