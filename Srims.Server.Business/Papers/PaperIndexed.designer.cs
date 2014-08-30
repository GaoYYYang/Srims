using System;
using System.Collections.Generic;
using System.Data.Linq;
using System.Linq;
using System.Text;

using MIS.Common;
using MIS.Common.Validate;
using MIS.Common.Query;

using Srims.Server.Business.Papers;

namespace Srims.Server.Business.Papers
{
    /// <summary>
    /// 论文收录信息
    /// </summary>
    public partial class PaperIndexed
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

        private int _PaperID;
        private EntityRef<Paper> _Paper;
        private PaperIndexedType _Indexed;

        #endregion

        #region 属性

        /// <summary>
        /// 取得对应论文的ID
        /// </summary>
        public int PaperID
        {
            get { return _PaperID; }
        }
        /// <summary>
        /// 取得对应的论文
        /// </summary>
        public Paper Paper
        {
            get { return _Paper.Entity; }
            set
            {
                _Paper.Entity = value;
                _PaperID = value == null ? 0 : value.ID;
            }
        }
        /// <summary>
        /// 取得或设置收录
        /// </summary>
        public PaperIndexedType Indexed
        {
            get { return _Indexed; }
            set { _Indexed = value; }
        }

        #endregion
    }
}
