using System;
using System.Collections.Generic;
using System.Data.Linq;
using System.Linq;
using System.Text;

using MIS.Common;
using MIS.Common.Validate;
using MIS.Common.Query;

using Srims.Server.Business.Users;

namespace Srims.Server.Business.Stamps
{
    /// <summary>
    /// 印章
    /// </summary>
    public partial class Stamp
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

        private string _Type;
        private int _OwnerID;
        private EntityRef<User> _Owner;
        private bool _IsDelete;

        #endregion

        #region 属性

        /// <summary>
        /// 取得或设置章型
        /// </summary>
        public string Type
        {
            get { return _Type; }
            set { _Type = value; }
        }
        /// <summary>
        /// 取得对应拥有者的ID
        /// </summary>
        public int OwnerID
        {
            get { return _OwnerID; }
        }
        /// <summary>
        /// 取得对应的拥有者
        /// </summary>
        public User Owner
        {
            get { return _Owner.Entity; }
            set
            {
                _Owner.Entity = value;
                _OwnerID = value == null ? 0 : value.ID;
            }
        }
        /// <summary>
        /// 取得或设置是否删除
        /// </summary>
        public bool IsDelete
        {
            get { return _IsDelete; }
            set { _IsDelete = value; }
        }

        #endregion
    }
}
