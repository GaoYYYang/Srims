using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

using MIS.Common;

using Srims.Server.Business;
using Srims.Server.Business.Awards;

namespace Srims.Server.Business.Experts
{
    /// <summary>
    /// 专家查询信息——奖励信息
    /// </summary>
    public class ExpertQueryInformation_Award
    {
        /// <summary>
        /// 获奖人位次
        /// </summary>
        public Range<Int32> WinnerOrder { get; set; }
        /// <summary>
        /// 获奖年份
        /// </summary>
        public Range<Int32> Year { get; set; }
        /// <summary>
        /// 获奖级别
        /// </summary>
        public string[] Ranks { get; set; }
        /// <summary>
        /// 获奖等级
        /// </summary>
        public string[] Classes { get; set; }
        /// <summary>
        /// 奖励数目
        /// </summary>
        public Range<Int32> Count { get; set; }
    }
}
