using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

using MIS.Common;

using Srims.Server.Business;
using Srims.Server.Business.Projects;

namespace Srims.Server.Business.Experts
{
    /// <summary>
    /// 专家查询信息——项目信息
    /// </summary>
    public class ExpertQueryInformation_Project
    {
        /// <summary>
        /// 取得或设置项目级别
        /// </summary>
        public ProjectLevel[] ProjectLevels { get; set; }
        /// <summary>
        /// 取得或设置项目的开始日期
        /// </summary>
        public Range<DateTime> StartDate { get; set; }
        /// <summary>
        /// 取得或设置项目的结束日期
        /// </summary>
        public Range<DateTime> EndDate { get; set; }
        /// <summary>
        /// 取得或设置项目状态
        /// </summary>
        public ProjectState[] ProjectStates { get; set; }
        /// <summary>
        /// 取得或设置是否涉密
        /// </summary>
        public bool? IsSecret { get; set; }
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
        /// 取得或设置项目等级
        /// </summary>
        public string[] projectRanks { get; set; }
        /// <summary>
        /// 取得或设置项目类别
        /// </summary>
        public string[] projectTypes { get; set; }
        /// <summary>
        /// 项目数目
        /// </summary>
        public Range<Int32> Count { get; set; }
    }
}
