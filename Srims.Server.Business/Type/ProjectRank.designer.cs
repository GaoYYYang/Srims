using System;
using System.Collections.Generic;
using System.Data.Linq;
using System.Linq;
using System.Text;

using MIS.Common;
using MIS.Common.Validate;
using MIS.Common.Query;

namespace Srims.Server.Business.Type
{
    /// <summary>
    /// 项目级别
    /// </summary>
    public partial class ProjectRank
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
        private bool _IsHorizontal;
        private bool _IsAvailable;

        #endregion

        #region 属性

        /// <summary>
        /// 取得或设置级别名称
        /// </summary>
        public string Name
        {
            get { return _Name; }
            set { _Name = value; }
        }
        /// <summary>
        /// 取得或设置是否横向项目
        /// </summary>
        public bool IsHorizontal
        {
            get { return _IsHorizontal; }
            set { _IsHorizontal = value; }
        }
        /// <summary>
        /// 取得或设置是否有效
        /// </summary>
        public bool IsAvailable
        {
            get { return _IsAvailable; }
            set { _IsAvailable = value; }
        }

        #endregion
    }
}
