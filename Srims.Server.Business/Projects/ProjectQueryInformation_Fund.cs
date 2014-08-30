using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

using MIS.Common;

namespace Srims.Server.Business.Projects
{
    /// <summary>
    /// 项目查询信息--经费信息
    /// </summary>
    public class ProjectQueryInformation_Fund
    {
        /// <summary>
        /// 取得或设置查询的经费来源
        /// </summary>
        public string[] FundFroms { get; set; }
        /// <summary>
        /// 取得或设置查询的总经费
        /// </summary>
        public Range<long> FundTotal { get; set; }
        /// <summary>
        /// 取得或设置查询的合同额
        /// </summary>
        public Range<long> FundContract { get; set; }
        /// <summary>
        /// 取得或设置查询的到账经费
        /// </summary>
        public Range<long> FundReceived { get; set; }
        /// <summary>
        /// 取得或设置项目是否借过款
        /// </summary>
        public bool? IsBorrowMoney { get; set; }
        /// <summary>
        /// 取得或设置项目是否还款完毕
        /// </summary>
        public bool? IsNotReturnAll { get; set; }
    }
}
