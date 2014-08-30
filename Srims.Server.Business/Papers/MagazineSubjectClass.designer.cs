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
    /// 杂志学科分类信息
    /// </summary>
    public partial class MagazineSubjectClass
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

        private int _MagazineID;
        private EntityRef<Magazine> _Magazine;
        private string _SubjectClass;

        #endregion

        #region 属性

        /// <summary>
        /// 取得对应杂志的ID
        /// </summary>
        public int MagazineID
        {
            get { return _MagazineID; }
        }
        /// <summary>
        /// 取得对应的杂志
        /// </summary>
        public Magazine Magazine
        {
            get { return _Magazine.Entity; }
            set
            {
                _Magazine.Entity = value;
                _MagazineID = value == null ? 0 : value.ID;
            }
        }
        /// <summary>
        /// 取得或设置学科分类
        /// </summary>
        public string SubjectClass
        {
            get { return _SubjectClass; }
            set { _SubjectClass = value; }
        }

        #endregion
    }
}
