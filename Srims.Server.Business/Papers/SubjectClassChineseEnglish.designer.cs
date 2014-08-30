using System;
using System.Collections.Generic;
using System.Data.Linq;
using System.Linq;
using System.Text;

using MIS.Common;
using MIS.Common.Validate;
using MIS.Common.Query;

namespace Srims.Server.Business.Papers
{
    /// <summary>
    /// 学科分类中英文对照表
    /// </summary>
    public partial class SubjectClassChineseEnglish
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

        private string _ChineseName;
        private string _EnglishName;

        #endregion

        #region 属性

        /// <summary>
        /// 取得或设置中文名
        /// </summary>
        public string ChineseName
        {
            get { return _ChineseName; }
            set { _ChineseName = value; }
        }
        /// <summary>
        /// 取得或设置英文名
        /// </summary>
        public string EnglishName
        {
            get { return _EnglishName; }
            set { _EnglishName = value; }
        }

        #endregion
    }
}
