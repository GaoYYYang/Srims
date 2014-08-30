using System;
using System.Collections.Generic;
using System.Data.Linq;
using System.Linq;
using System.Text;

using MIS.Common;
using MIS.Common.Validate;
using MIS.Common.Query;

using Srims.Server.Business.Patents;
using Srims.Server.Business.Experts;

namespace Srims.Server.Business.Patents
{
    /// <summary>
    /// 专利发明人
    /// </summary>
    public partial class PatentInventer
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

        private int _PatentID;
        private EntityRef<Patent> _Patent;
        private int? _ExpertID;
        private EntityRef<Expert> _Expert;
        private string _Name;
        private int _Order;
        private bool _IsPrincipal;

        #endregion

        #region 属性

        /// <summary>
        /// 取得对应对应专利的ID
        /// </summary>
        public int PatentID
        {
            get { return _PatentID; }
        }
        /// <summary>
        /// 取得对应的对应专利
        /// </summary>
        public Patent Patent
        {
            get { return _Patent.Entity; }
            set
            {
                _Patent.Entity = value;
                _PatentID = value == null ? 0 : value.ID;
            }
        }
        /// <summary>
        /// 取得对应对应专家的ID
        /// </summary>
        public int? ExpertID
        {
            get { return _ExpertID; }
        }
        /// <summary>
        /// 取得对应的对应专家
        /// </summary>
        public Expert Expert
        {
            get { return _Expert.Entity; }
            set
            {
                _Expert.Entity = value;
                _ExpertID = value == null ? null : new int?(value.ID);
            }
        }
        /// <summary>
        /// 取得或设置姓名
        /// </summary>
        public string Name
        {
            get { return _Name; }
            set { _Name = value; }
        }
        /// <summary>
        /// 取得或设置位次
        /// </summary>
        public int Order
        {
            get { return _Order; }
            set { _Order = value; }
        }
        /// <summary>
        /// 取得或设置是否负责人
        /// </summary>
        public bool IsPrincipal
        {
            get { return _IsPrincipal; }
            set { _IsPrincipal = value; }
        }

        #endregion
    }
}
