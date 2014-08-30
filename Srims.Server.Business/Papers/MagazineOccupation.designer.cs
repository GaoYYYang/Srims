using System;
using System.Collections.Generic;
using System.Data.Linq;
using System.Linq;
using System.Text;

using MIS.Common;
using MIS.Common.Validate;
using MIS.Common.Query;

using Srims.Server.Business.Papers;
using Srims.Server.Business.Experts;

namespace Srims.Server.Business.Papers
{
    /// <summary>
    /// 杂志任职
    /// </summary>
    public partial class MagazineOccupation
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
        private int _ExpertID;
        private EntityRef<Expert> _Expert;
        private string _Occupation;
        private int? _EngageStartYear;
        private string _EngageEndYear;

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
        /// 取得对应专家的ID
        /// </summary>
        public int ExpertID
        {
            get { return _ExpertID; }
        }
        /// <summary>
        /// 取得对应的专家
        /// </summary>
        public Expert Expert
        {
            get { return _Expert.Entity; }
            set
            {
                _Expert.Entity = value;
                _ExpertID = value == null ? 0 : value.ID;
            }
        }
        /// <summary>
        /// 取得或设置职务
        /// </summary>
        public string Occupation
        {
            get { return _Occupation; }
            set { _Occupation = value; }
        }
        /// <summary>
        /// 取得或设置聘任起始年份
        /// </summary>
        public int? EngageStartYear
        {
            get { return _EngageStartYear; }
            set { _EngageStartYear = value; }
        }
        /// <summary>
        /// 取得或设置聘任终止年份
        /// </summary>
        public string EngageEndYear
        {
            get { return _EngageEndYear; }
            set { _EngageEndYear = value; }
        }

        #endregion
    }
}
