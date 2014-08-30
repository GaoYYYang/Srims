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
    /// 材料章型
    /// </summary>
    public partial class StuffStamp
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

        private int _StuffID;
        private EntityRef<Stuff> _Stuff;
        private int _StampID;
        private EntityRef<Stamp> _Stamp;
        private int _Number;
        private string _Pagination;
        private bool _IsStamped;

        #endregion

        #region 属性

        /// <summary>
        /// 取得对应盖章材料的ID
        /// </summary>
        public int StuffID
        {
            get { return _StuffID; }
        }
        /// <summary>
        /// 取得对应的盖章材料
        /// </summary>
        public Stuff Stuff
        {
            get { return _Stuff.Entity; }
            set
            {
                _Stuff.Entity = value;
                _StuffID = value == null ? 0 : value.ID;
            }
        }
        /// <summary>
        /// 取得对应图章的ID
        /// </summary>
        public int StampID
        {
            get { return _StampID; }
        }
        /// <summary>
        /// 取得对应的图章
        /// </summary>
        public Stamp Stamp
        {
            get { return _Stamp.Entity; }
            set
            {
                _Stamp.Entity = value;
                _StampID = value == null ? 0 : value.ID;
            }
        }
        /// <summary>
        /// 取得或设置数量
        /// </summary>
        public int Number
        {
            get { return _Number; }
            set { _Number = value; }
        }
        /// <summary>
        /// 取得或设置盖章页
        /// </summary>
        public string Pagination
        {
            get { return _Pagination; }
            set { _Pagination = value; }
        }
        /// <summary>
        /// 取得或设置已盖章
        /// </summary>
        public bool IsStamped
        {
            get { return _IsStamped; }
            set { _IsStamped = value; }
        }

        #endregion
    }
}
