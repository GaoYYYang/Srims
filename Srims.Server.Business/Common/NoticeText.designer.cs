using System;
using System.Collections.Generic;
using System.Data.Linq;
using System.Linq;
using System.Text;

using MIS.Common;
using MIS.Common.Validate;
using MIS.Common.Query;

namespace Srims.Server.Business.Common
{
    /// <summary>
    /// 提示文本
    /// </summary>
    public partial class NoticeText
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

        private string _Value;
        private string _ValueSpell;
        private NoticeTextType _Type;

        #endregion

        #region 属性

        /// <summary>
        /// 取得或设置缩写
        /// </summary>
        /// <remarks>拼音首字母</remarks>
        public string ValueSpell
        {
            get { return _ValueSpell; }
            set { _ValueSpell = value; }
        }
        /// <summary>
        /// 取得或设置提示文本类型
        /// </summary>
        public NoticeTextType Type
        {
            get { return _Type; }
            set { _Type = value; }
        }

        #endregion
    }
}
