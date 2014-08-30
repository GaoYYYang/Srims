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
    /// 到帐下拨关联
    /// </summary>
    public partial class FinanceFundDescend
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

        private int _FinanceID;
        private EntityRef<Finance> _Finance;
        private int _FundDescendID;
        private EntityRef<FundDescend> _FundDescend;
        private long _Amount;
        private bool _IsReturn;
        private DateTime _OperateDateTime;
        private string _Operator;

        #endregion

        #region 属性

        /// <summary>
        /// 取得对应对应经费到帐的ID
        /// </summary>
        public int FinanceID
        {
            get { return _FinanceID; }
        }
        /// <summary>
        /// 取得对应的对应经费到帐
        /// </summary>
        public Finance Finance
        {
            get { return _Finance.Entity; }
            set
            {
                _Finance.Entity = value;
                _FinanceID = value == null ? 0 : value.ID;
            }
        }
        /// <summary>
        /// 取得对应对应经费下拨的ID
        /// </summary>
        public int FundDescendID
        {
            get { return _FundDescendID; }
        }
        /// <summary>
        /// 取得对应的对应经费下拨
        /// </summary>
        public FundDescend FundDescend
        {
            get { return _FundDescend.Entity; }
            set
            {
                _FundDescend.Entity = value;
                _FundDescendID = value == null ? 0 : value.ID;
            }
        }
        /// <summary>
        /// 取得或设置金额
        /// </summary>
        public long Amount
        {
            get { return _Amount; }
            set { _Amount = value; }
        }
        /// <summary>
        /// 取得或设置是否作为还款记录
        /// </summary>
        public bool IsReturn
        {
            get { return _IsReturn; }
            set { _IsReturn = value; }
        }
        /// <summary>
        /// 取得或设置操作时间
        /// </summary>
        public DateTime OperateDateTime
        {
            get { return _OperateDateTime; }
            set { _OperateDateTime = value; }
        }
        /// <summary>
        /// 取得或设置操作人
        /// </summary>
        public string Operator
        {
            get { return _Operator; }
            set { _Operator = value; }
        }

        #endregion
    }
}
