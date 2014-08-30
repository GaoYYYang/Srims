using System;
using System.Collections.Generic;
using System.Data.Linq;
using System.Linq;
using System.Text;

using MIS.Common;
using MIS.Common.Validate;
using MIS.Common.Query;

namespace Srims.Server.Business.Fund
{
    /// <summary>
    /// 账本号计数器
    /// </summary>
    public partial class AccountBookNumberCount
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

        private string _CharacterNumber;
        private int _Count;

        #endregion

        #region 属性

        /// <summary>
        /// 取得或设置特征码
        /// </summary>
        /// <remarks>账本号的6-10位</remarks>
        public string CharacterNumber
        {
            get { return _CharacterNumber; }
            set { _CharacterNumber = value; }
        }
        /// <summary>
        /// 取得或设置数目
        /// </summary>
        public int Count
        {
            get { return _Count; }
            set { _Count = value; }
        }

        #endregion
    }
}
