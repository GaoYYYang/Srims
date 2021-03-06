using System;
using System.Collections.Generic;
using System.Data.Linq;
using System.Linq;
using System.Text;

using MIS.Common;
using MIS.Common.Validate;
using MIS.Common.Query;

using Srims.Server.Business.Common;

namespace Srims.Server.Business.Common
{
    /// <summary>
    /// 二级学科
    /// </summary>
    public partial class SubjectSecondLevel
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
        private int _SubjectFirstLevelID;
        private EntityRef<SubjectFirstLevel> _SubjectFirstLevel;
        private string _ChildCode;
        private string _Code;

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
        /// 取得对应一级学科的ID
        /// </summary>
        public int SubjectFirstLevelID
        {
            get { return _SubjectFirstLevelID; }
        }
        /// <summary>
        /// 取得对应的一级学科
        /// </summary>
        public SubjectFirstLevel SubjectFirstLevel
        {
            get { return _SubjectFirstLevel.Entity; }
            set
            {
                _SubjectFirstLevel.Entity = value;
                _SubjectFirstLevelID = value == null ? 0 : value.ID;
            }
        }
        /// <summary>
        /// 取得或设置子代码
        /// </summary>
        public string ChildCode
        {
            get { return _ChildCode; }
            set { _ChildCode = value; }
        }
        /// <summary>
        /// 取得或设置代码
        /// </summary>
        public string Code
        {
            get { return _Code; }
            set { _Code = value; }
        }

        #endregion
    }
}
