using System;
using System.Collections.Generic;
using System.Data.Linq;
using System.Linq;
using System.Text;

using MIS.Common;
using MIS.Common.Validate;
using MIS.Common.Query;

namespace Srims.Server.Business.Users
{
    /// <summary>
    /// 权限
    /// </summary>
    public partial class Permission
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

        private PermissionItem _PermissionItem;
        private PermissionOperation _PermissionOperation;
        private int? _Params;
        private DateTime _AccreditDateTime;
        private DateTime? _EndDateTime;

        #endregion

        #region 属性

        /// <summary>
        /// 取得或设置权限分类
        /// </summary>
        public PermissionItem PermissionItem
        {
            get { return _PermissionItem; }
            set { _PermissionItem = value; }
        }
        /// <summary>
        /// 取得或设置权限操作
        /// </summary>
        public PermissionOperation PermissionOperation
        {
            get { return _PermissionOperation; }
            set { _PermissionOperation = value; }
        }
        /// <summary>
        /// 取得或设置参数
        /// </summary>
        /// <remarks>当权限类型为院系管理员（枚举值为3）时，参数值为学院的ID，否则为项目类型的ID</remarks>
        public int? Params
        {
            get { return _Params; }
            set { _Params = value; }
        }
        /// <summary>
        /// 取得或设置授权时间
        /// </summary>
        public DateTime AccreditDateTime
        {
            get { return _AccreditDateTime; }
            set { _AccreditDateTime = value; }
        }
        /// <summary>
        /// 取得或设置终止时间
        /// </summary>
        public DateTime? EndDateTime
        {
            get { return _EndDateTime; }
            set { _EndDateTime = value; }
        }

        #endregion
    }
}
