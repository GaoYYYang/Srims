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
    /// 资源
    /// </summary>
    public partial class Resource
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

        private Guid _Guid;
        private string _Type;
        private byte[] _Content;

        #endregion

        #region 属性

        /// <summary>
        /// 取得或设置Guid
        /// </summary>
        public Guid Guid
        {
            get { return _Guid; }
            set { _Guid = value; }
        }
        /// <summary>
        /// 取得或设置类型
        /// </summary>
        /// <remarks>文件扩展名</remarks>
        public string Type
        {
            get { return _Type; }
            set { _Type = value; }
        }
        /// <summary>
        /// 取得或设置内容
        /// </summary>
        public byte[] Content
        {
            get { return _Content; }
            set { _Content = value; }
        }

        #endregion
    }
}
