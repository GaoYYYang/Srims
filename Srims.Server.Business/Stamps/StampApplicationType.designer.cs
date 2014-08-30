using System;
using System.Collections.Generic;
using System.Data.Linq;
using System.Linq;
using System.Text;

using MIS.Common;
using MIS.Common.Validate;
using MIS.Common.Query;

using Srims.Server.Business.Stamps;

namespace Srims.Server.Business.Stamps
{
    /// <summary>
    /// 文印申请类型
    /// </summary>
    public partial class StampApplicationType
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
        private int _StampApplicationTypeGroupID;
        private EntityRef<StampApplicationTypeGroup> _StampApplicationTypeGroup;
        private bool _IsTwiceCancer;
        private bool _IsProjectRelated;

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
        /// 取得对应对应组的ID
        /// </summary>
        public int StampApplicationTypeGroupID
        {
            get { return _StampApplicationTypeGroupID; }
        }
        /// <summary>
        /// 取得对应的对应组
        /// </summary>
        public StampApplicationTypeGroup StampApplicationTypeGroup
        {
            get { return _StampApplicationTypeGroup.Entity; }
            set
            {
                _StampApplicationTypeGroup.Entity = value;
                _StampApplicationTypeGroupID = value == null ? 0 : value.ID;
            }
        }
        /// <summary>
        /// 取得或设置是否二级审核
        /// </summary>
        public bool IsTwiceCancer
        {
            get { return _IsTwiceCancer; }
            set { _IsTwiceCancer = value; }
        }
        /// <summary>
        /// 取得或设置是否与项目相关
        /// </summary>
        public bool IsProjectRelated
        {
            get { return _IsProjectRelated; }
            set { _IsProjectRelated = value; }
        }

        #endregion
    }
}
