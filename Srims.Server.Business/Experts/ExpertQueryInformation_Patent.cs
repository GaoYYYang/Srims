using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

using MIS.Common;

using Srims.Server.Business;
using Srims.Server.Business.Patents;

namespace Srims.Server.Business.Experts
{
    /// <summary>
    /// 专家查询信息——专利信息
    /// </summary>
    public class ExpertQueryInformation_Patent
    {
        /// <summary>
        /// 位次
        /// </summary>
        public Range<Int32> InventOrder { get; set; }
        /// <summary>
        /// 申请时间
        /// </summary>
        public Range<DateTime> ApplicationDateTime { get; set; }
        /// <summary>
        /// 授权时间
        /// </summary>
        public Range<DateTime> AuthorizeDateTime { get; set; }
        /// <summary>
        /// 法律状态
        /// </summary>
        public PatentLawState[] LawStates { get; set; }
        /// <summary>
        /// 专利类型
        /// </summary>
        public PatentType[] Types { get; set; }
        /// <summary>
        /// 是否已授权
        /// </summary>
        public bool? IsAccredited { get; set; }
        /// <summary>
        /// 专利数目
        /// </summary>
        public Range<Int32> Count { get; set; }
    }
}
