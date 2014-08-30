using System;
using System.Collections.Generic;
using System.Data.Linq;
using System.Linq;
using System.Text;

using MIS.Common;
using MIS.Common.Validate;
using MIS.Common.Query;

namespace Srims.Server.Business.Experts
{
    /// <summary>
    /// 专家职称和等级
    /// </summary>
    public partial class ExpertPostAndLevel
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

        private string _PostName;
        private int _PostLevel;

        #endregion

        #region 属性

        /// <summary>
        /// 取得或设置职称名称
        /// </summary>
        public string PostName
        {
            get { return _PostName; }
            set { _PostName = value; }
        }
        /// <summary>
        /// 取得或设置职称等级
        /// </summary>
        public int PostLevel
        {
            get { return _PostLevel; }
            set { _PostLevel = value; }
        }

        #endregion
    }
}
