using System;
using System.Collections.Generic;
using System.Data.Linq;
using System.Linq;
using System.Text;

using MIS.Common;
using MIS.Common.Validate;
using MIS.Common.Query;

using Srims.Server.Business.Experts;

namespace Srims.Server.Business.Experts
{
    /// <summary>
    /// 专家成果统计
    /// </summary>
    public partial class ExpertAchieveStatistic
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

        private int _ExpertID;
        private EntityRef<Expert> _Expert;
        private long? _FundTotal;
        private int? _ProjectCount;
        private int? _PaperCount;
        private int? _PatentCount;
        private int? _AwardCount;

        #endregion

        #region 属性

        /// <summary>
        /// 取得对应对应专家的ID
        /// </summary>
        public int ExpertID
        {
            get { return _ExpertID; }
        }
        /// <summary>
        /// 取得对应的对应专家
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
        /// 取得或设置经费总额
        /// </summary>
        public long? FundTotal
        {
            get { return _FundTotal; }
            set { _FundTotal = value; }
        }
        /// <summary>
        /// 取得或设置项目数目
        /// </summary>
        public int? ProjectCount
        {
            get { return _ProjectCount; }
            set { _ProjectCount = value; }
        }
        /// <summary>
        /// 取得或设置论文数目
        /// </summary>
        public int? PaperCount
        {
            get { return _PaperCount; }
            set { _PaperCount = value; }
        }
        /// <summary>
        /// 取得或设置专利数目
        /// </summary>
        public int? PatentCount
        {
            get { return _PatentCount; }
            set { _PatentCount = value; }
        }
        /// <summary>
        /// 取得或设置奖励数目
        /// </summary>
        public int? AwardCount
        {
            get { return _AwardCount; }
            set { _AwardCount = value; }
        }

        #endregion
    }
}
