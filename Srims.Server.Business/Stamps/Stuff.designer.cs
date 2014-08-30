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
    /// 盖章材料
    /// </summary>
    public partial class Stuff
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

        private int _StampApplicationID;
        private EntityRef<StampApplication> _StampApplication;
        private string _StuffName;
        private string _StuffType;
        private Guid _StuffDocument;

        #endregion

        #region 属性

        /// <summary>
        /// 取得对应文印申请的ID
        /// </summary>
        public int StampApplicationID
        {
            get { return _StampApplicationID; }
        }
        /// <summary>
        /// 取得对应的文印申请
        /// </summary>
        public StampApplication StampApplication
        {
            get { return _StampApplication.Entity; }
            set
            {
                _StampApplication.Entity = value;
                _StampApplicationID = value == null ? 0 : value.ID;
            }
        }
        /// <summary>
        /// 取得或设置材料名称
        /// </summary>
        public string StuffName
        {
            get { return _StuffName; }
            set { _StuffName = value; }
        }
        /// <summary>
        /// 取得或设置材料类型
        /// </summary>
        public string StuffType
        {
            get { return _StuffType; }
            set { _StuffType = value; }
        }
        /// <summary>
        /// 取得或设置材料文档
        /// </summary>
        public Guid StuffDocument
        {
            get { return _StuffDocument; }
            set { _StuffDocument = value; }
        }

        #endregion
    }
}
