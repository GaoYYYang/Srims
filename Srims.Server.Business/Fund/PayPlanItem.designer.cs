using System;
using System.Collections.Generic;
using System.Data.Linq;
using System.Linq;
using System.Text;

using MIS.Common;
using MIS.Common.Validate;
using MIS.Common.Query;

using Srims.Server.Business.Fund;

namespace Srims.Server.Business.Fund
{
    /// <summary>
    /// 项目付款计划
    /// </summary>
    public partial class PayPlanItem
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

        private int _ProjectInfo_FundID;
        private EntityRef<ProjectInfo_Fund> _ProjectInfo_Fund;
        private DateTime _DateTime;
        private long _Amount;

        #endregion

        #region 属性

        /// <summary>
        /// 取得对应对应项目经费的ID
        /// </summary>
        public int ProjectInfo_FundID
        {
            get { return _ProjectInfo_FundID; }
        }
        /// <summary>
        /// 取得对应的对应项目经费
        /// </summary>
        public ProjectInfo_Fund ProjectInfo_Fund
        {
            get { return _ProjectInfo_Fund.Entity; }
            set
            {
                _ProjectInfo_Fund.Entity = value;
                _ProjectInfo_FundID = value == null ? 0 : value.ID;
            }
        }
        /// <summary>
        /// 取得或设置到款时间
        /// </summary>
        public DateTime DateTime
        {
            get { return _DateTime; }
            set { _DateTime = value; }
        }
        /// <summary>
        /// 取得或设置到款数额
        /// </summary>
        public long Amount
        {
            get { return _Amount; }
            set { _Amount = value; }
        }

        #endregion
    }
}
