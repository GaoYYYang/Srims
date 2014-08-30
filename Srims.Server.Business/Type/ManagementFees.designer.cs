using System;
using System.Collections.Generic;
using System.Data.Linq;
using System.Linq;
using System.Text;

using MIS.Common;
using MIS.Common.Validate;
using MIS.Common.Query;

namespace Srims.Server.Business.Type
{
    /// <summary>
    /// 管理费比例
    /// </summary>
    public partial class ManagementFees
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

        private string _Type;
        private long _FundTotal;
        private int _Fee;
        private int _PerformancePay;
        private string _Remark;

        #endregion

        #region 属性

        /// <summary>
        /// 取得或设置管理费收取类别
        /// </summary>
        public string Type
        {
            get { return _Type; }
            set { _Type = value; }
        }
        /// <summary>
        /// 取得或设置经费额度
        /// </summary>
        public long FundTotal
        {
            get { return _FundTotal; }
            set { _FundTotal = value; }
        }
        /// <summary>
        /// 取得或设置上缴学校管理费
        /// </summary>
        public int Fee
        {
            get { return _Fee; }
            set { _Fee = value; }
        }
        /// <summary>
        /// 取得或设置绩效工资
        /// </summary>
        public int PerformancePay
        {
            get { return _PerformancePay; }
            set { _PerformancePay = value; }
        }
        /// <summary>
        /// 取得或设置备注
        /// </summary>
        public string Remark
        {
            get { return _Remark; }
            set { _Remark = value; }
        }

        #endregion
    }
}
