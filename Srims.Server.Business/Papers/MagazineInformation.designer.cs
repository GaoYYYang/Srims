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
    /// 杂志信息
    /// </summary>
    public partial class MagazineInformation
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
        private int? _Year;
        private int? _SubAirer;
        private int? _InfluenceFactor;
        private int? _CiteFrequency;
        private int? _InstantExponent;
        private int? _PaperCount;
        private string _CiteHalfLife;

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
        /// 取得或设置年份
        /// </summary>
        public int? Year
        {
            get { return _Year; }
            set { _Year = value; }
        }
        /// <summary>
        /// 取得或设置分区
        /// </summary>
        public int? SubAirer
        {
            get { return _SubAirer; }
            set { _SubAirer = value; }
        }
        /// <summary>
        /// 取得或设置影响因子
        /// </summary>
        public int? InfluenceFactor
        {
            get { return _InfluenceFactor; }
            set { _InfluenceFactor = value; }
        }
        /// <summary>
        /// 取得或设置被引频次
        /// </summary>
        public int? CiteFrequency
        {
            get { return _CiteFrequency; }
            set { _CiteFrequency = value; }
        }
        /// <summary>
        /// 取得或设置即时指数
        /// </summary>
        public int? InstantExponent
        {
            get { return _InstantExponent; }
            set { _InstantExponent = value; }
        }
        /// <summary>
        /// 取得或设置论文数
        /// </summary>
        public int? PaperCount
        {
            get { return _PaperCount; }
            set { _PaperCount = value; }
        }
        /// <summary>
        /// 取得或设置引用半衰期
        /// </summary>
        public string CiteHalfLife
        {
            get { return _CiteHalfLife; }
            set { _CiteHalfLife = value; }
        }

        #endregion
    }
}
