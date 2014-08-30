using System;
using System.Collections.Generic;
using System.Data.Linq;
using System.Linq;
using System.Text;

using MIS.Common;
using MIS.Common.Validate;
using MIS.Common.Query;

namespace Srims.Server.Business.Patents
{
    /// <summary>
    /// 专利代理机构
    /// </summary>
    public partial class PatentAgency
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
        private string _Contract;

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
        /// 取得或设置联系方式
        /// </summary>
        public string Contract
        {
            get { return _Contract; }
            set { _Contract = value; }
        }

        #endregion
    }
}
