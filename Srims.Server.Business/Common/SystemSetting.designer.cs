using System;
using System.Collections.Generic;
using System.Data.Linq;
using System.Linq;
using System.Text;

using MIS.Common;
using MIS.Common.Validate;
using MIS.Common.Query;

namespace Srims.Server.Business.Common
{
    /// <summary>
    /// 系统设置
    /// </summary>
    public partial class SystemSetting
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

        private int? _FundOutRatio;
        private int _HorizontalVoucher;
        private int _VerticalVoucher;
        private int _HorizontalPerformanceVoucher;
        private int _VPV;
        private int _DefaultOverheadExpenseInRateHorizonal;
        private int _DefaultOverheadExpenseOutRateHorizonal;
        private int _DefaultOverheadExpenseInRateVertical;
        private int _DefaultOverheadExpenseOutRateVertical;
        private string _LogType;
        private string _EmailAddress;
        private string _SmtpHost;
        private int? _SmtpPort;
        private string _SmtpPassword;
        private string _SmtpUsername;
        private string _FinanceWebAddress;
        private string _ExpertWebAddress;
        private string _WindowsServiceType;
        private string _PaperDescription;

        #endregion

        #region 属性

        /// <summary>
        /// 取得或设置外协经费在总经费中最大比例
        /// </summary>
        /// <remarks>表示百分比</remarks>
        public int? FundOutRatio
        {
            get { return _FundOutRatio; }
            set { _FundOutRatio = value; }
        }
        /// <summary>
        /// 取得或设置横向凭单数目
        /// </summary>
        public int HorizontalVoucher
        {
            get { return _HorizontalVoucher; }
            set { _HorizontalVoucher = value; }
        }
        /// <summary>
        /// 取得或设置纵向凭单数目
        /// </summary>
        public int VerticalVoucher
        {
            get { return _VerticalVoucher; }
            set { _VerticalVoucher = value; }
        }
        /// <summary>
        /// 取得或设置横向绩效凭单数目
        /// </summary>
        public int HorizontalPerformanceVoucher
        {
            get { return _HorizontalPerformanceVoucher; }
            set { _HorizontalPerformanceVoucher = value; }
        }
        /// <summary>
        /// 取得或设置纵向绩效凭单数目
        /// </summary>
        public int VPV
        {
            get { return _VPV; }
            set { _VPV = value; }
        }
        /// <summary>
        /// 取得或设置默认横向校内管理费率
        /// </summary>
        /// <remarks>表示百分比</remarks>
        public int DefaultOverheadExpenseInRateHorizonal
        {
            get { return _DefaultOverheadExpenseInRateHorizonal; }
            set { _DefaultOverheadExpenseInRateHorizonal = value; }
        }
        /// <summary>
        /// 取得或设置默认横向校外管理费率
        /// </summary>
        /// <remarks>表示百分比</remarks>
        public int DefaultOverheadExpenseOutRateHorizonal
        {
            get { return _DefaultOverheadExpenseOutRateHorizonal; }
            set { _DefaultOverheadExpenseOutRateHorizonal = value; }
        }
        /// <summary>
        /// 取得或设置默认纵向校内管理费率（非预算制）
        /// </summary>
        /// <remarks>表示百分比</remarks>
        public int DefaultOverheadExpenseInRateVertical
        {
            get { return _DefaultOverheadExpenseInRateVertical; }
            set { _DefaultOverheadExpenseInRateVertical = value; }
        }
        /// <summary>
        /// 取得或设置默认纵向校外管理费率（非预算制）
        /// </summary>
        /// <remarks>表示百分比</remarks>
        public int DefaultOverheadExpenseOutRateVertical
        {
            get { return _DefaultOverheadExpenseOutRateVertical; }
            set { _DefaultOverheadExpenseOutRateVertical = value; }
        }
        /// <summary>
        /// 取得或设置日志类型
        /// </summary>
        /// <remarks>以逗号为分隔，描述不同的日志类型</remarks>
        public string LogType
        {
            get { return _LogType; }
            set { _LogType = value; }
        }
        /// <summary>
        /// 取得或设置邮件地址
        /// </summary>
        public string EmailAddress
        {
            get { return _EmailAddress; }
            set { _EmailAddress = value; }
        }
        /// <summary>
        /// 取得或设置SMTP域
        /// </summary>
        public string SmtpHost
        {
            get { return _SmtpHost; }
            set { _SmtpHost = value; }
        }
        /// <summary>
        /// 取得或设置SMTP端口
        /// </summary>
        public int? SmtpPort
        {
            get { return _SmtpPort; }
            set { _SmtpPort = value; }
        }
        /// <summary>
        /// 取得或设置SMTP密码
        /// </summary>
        public string SmtpPassword
        {
            get { return _SmtpPassword; }
            set { _SmtpPassword = value; }
        }
        /// <summary>
        /// 取得或设置SMTP用户名
        /// </summary>
        public string SmtpUsername
        {
            get { return _SmtpUsername; }
            set { _SmtpUsername = value; }
        }
        /// <summary>
        /// 取得或设置财务处网址
        /// </summary>
        public string FinanceWebAddress
        {
            get { return _FinanceWebAddress; }
            set { _FinanceWebAddress = value; }
        }
        /// <summary>
        /// 取得或设置人事处网址
        /// </summary>
        public string ExpertWebAddress
        {
            get { return _ExpertWebAddress; }
            set { _ExpertWebAddress = value; }
        }
        /// <summary>
        /// 取得或设置Windows服务类型
        /// </summary>
        /// <remarks>以逗号隔开，表示不同的日志类型</remarks>
        public string WindowsServiceType
        {
            get { return _WindowsServiceType; }
            set { _WindowsServiceType = value; }
        }
        /// <summary>
        /// 取得或设置论文库说明文字
        /// </summary>
        public string PaperDescription
        {
            get { return _PaperDescription; }
            set { _PaperDescription = value; }
        }

        #endregion
    }
}
