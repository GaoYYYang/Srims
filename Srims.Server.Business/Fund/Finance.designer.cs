using System;
using System.Collections.Generic;
using System.Data.Linq;
using System.Linq;
using System.Text;

using MIS.Common;
using MIS.Common.Validate;
using MIS.Common.Query;

namespace Srims.Server.Business.Fund
{
    /// <summary>
    /// 经费到账记录(暂存)
    /// </summary>
    public partial class Finance
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

        private string _Abstract;
        private DateTime _ReceivedDate;
        private string _VoucherNumber;
        private long _Amount;
        private long _DescendAmount;
        private bool _IsInvoiced;
        private string _InvoiceType;
        private string _InvoiceNumber;
        private DateTime? _InvoiceTime;
        private int? _OldID;
        private string _Remarks;

        #endregion

        #region 属性

        /// <summary>
        /// 取得或设置描述
        /// </summary>
        public string Abstract
        {
            get { return _Abstract; }
            set { _Abstract = value; }
        }
        /// <summary>
        /// 取得或设置到款日期
        /// </summary>
        public DateTime ReceivedDate
        {
            get { return _ReceivedDate; }
            set { _ReceivedDate = value; }
        }
        /// <summary>
        /// 取得或设置凭单号
        /// </summary>
        public string VoucherNumber
        {
            get { return _VoucherNumber; }
            set { _VoucherNumber = value; }
        }
        /// <summary>
        /// 取得或设置到款金额
        /// </summary>
        public long Amount
        {
            get { return _Amount; }
            set { _Amount = value; }
        }
        /// <summary>
        /// 取得或设置已下拨经费
        /// </summary>
        public long DescendAmount
        {
            get { return _DescendAmount; }
            set { _DescendAmount = value; }
        }
        /// <summary>
        /// 取得或设置是否已开发票
        /// </summary>
        public bool IsInvoiced
        {
            get { return _IsInvoiced; }
            set { _IsInvoiced = value; }
        }
        /// <summary>
        /// 取得或设置发票类型
        /// </summary>
        public string InvoiceType
        {
            get { return _InvoiceType; }
            set { _InvoiceType = value; }
        }
        /// <summary>
        /// 取得或设置发票号
        /// </summary>
        public string InvoiceNumber
        {
            get { return _InvoiceNumber; }
            set { _InvoiceNumber = value; }
        }
        /// <summary>
        /// 取得或设置开发票日期
        /// </summary>
        public DateTime? InvoiceTime
        {
            get { return _InvoiceTime; }
            set { _InvoiceTime = value; }
        }
        /// <summary>
        /// 取得或设置原系统ID
        /// </summary>
        public int? OldID
        {
            get { return _OldID; }
            set { _OldID = value; }
        }
        /// <summary>
        /// 取得或设置备注
        /// </summary>
        public string Remarks
        {
            get { return _Remarks; }
            set { _Remarks = value; }
        }

        #endregion
    }
}
