using System;
using System.Collections.Generic;
using System.Data.Linq;
using System.Linq;
using System.Text;

using MIS.Common;
using MIS.Common.Validate;
using MIS.Common.Query;

using Srims.Server.Business.Fund;
using Srims.Server.Business.Common;

namespace Srims.Server.Business.Fund
{
    /// <summary>
    /// 凭单项目-外协分配
    /// </summary>
    public partial class VoucherOut
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

        private int _VoucherID;
        private EntityRef<Voucher> _Voucher;
        private long _Amount;
        private string _Corporation;
        private int? _OutsourcingID;
        private EntityRef<Outsourcing> _Outsourcing;

        #endregion

        #region 属性

        /// <summary>
        /// 取得对应对应凭单的ID
        /// </summary>
        public int VoucherID
        {
            get { return _VoucherID; }
        }
        /// <summary>
        /// 取得对应的对应凭单
        /// </summary>
        public Voucher Voucher
        {
            get { return _Voucher.Entity; }
            set
            {
                _Voucher.Entity = value;
                _VoucherID = value == null ? 0 : value.ID;
            }
        }
        /// <summary>
        /// 取得或设置数额
        /// </summary>
        public long Amount
        {
            get { return _Amount; }
            set { _Amount = value; }
        }
        /// <summary>
        /// 取得或设置企业名称
        /// </summary>
        public string Corporation
        {
            get { return _Corporation; }
            set { _Corporation = value; }
        }
        /// <summary>
        /// 取得对应外协的ID
        /// </summary>
        public int? OutsourcingID
        {
            get { return _OutsourcingID; }
        }

        #endregion
    }
}
