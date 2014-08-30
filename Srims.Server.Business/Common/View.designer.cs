using System;
using System.Collections.Generic;
using System.Data.Linq;
using System.Linq;
using System.Text;

using MIS.Common;
using MIS.Common.Validate;
using MIS.Common.Query;

using Srims.Server.Business.Users;

namespace Srims.Server.Business.Common
{
    /// <summary>
    /// 视图
    /// </summary>
    public partial class View
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

        private string _Name;
        private ViewType _Type;
        private string _Definition;
        private int _Order;
        private bool _IsPublic;
        private int? _UserID;
        private EntityRef<User> _User;

        #endregion

        #region 属性

        /// <summary>
        /// 取得或设置名称
        /// </summary>
        public string Name
        {
            get { return _Name; }
            set { _Name = value; }
        }
        /// <summary>
        /// 取得或设置视图类型
        /// </summary>
        public ViewType Type
        {
            get { return _Type; }
            set { _Type = value; }
        }
        /// <summary>
        /// 取得或设置定义
        /// </summary>
        public string Definition
        {
            get { return _Definition; }
            set { _Definition = value; }
        }
        /// <summary>
        /// 取得或设置顺序
        /// </summary>
        public int Order
        {
            get { return _Order; }
            set { _Order = value; }
        }
        /// <summary>
        /// 取得或设置是否公开
        /// </summary>
        public bool IsPublic
        {
            get { return _IsPublic; }
            set { _IsPublic = value; }
        }
        /// <summary>
        /// 取得对应用户的ID
        /// </summary>
        public int? UserID
        {
            get { return _UserID; }
        }
        /// <summary>
        /// 取得对应的用户
        /// </summary>
        public User User
        {
            get { return _User.Entity; }
            set
            {
                _User.Entity = value;
                _UserID = value == null ? null : new int?(value.ID);
            }
        }

        #endregion
    }
}
