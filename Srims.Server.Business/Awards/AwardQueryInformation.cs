using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

using MIS.Common.Query;

namespace Srims.Server.Business.Awards
{
    /// <summary>
    /// 奖励查询信息
    /// </summary>
    public class AwardQueryInformation : QueryInformation
    {
        /// <summary>
        /// 取得或设置奖励基本查询信息
        /// </summary>
        public AwardQueryInformation_Basic BasicInformation { get; set; }
        /// <summary>
        /// 取得或设置奖励的获奖人查询信息
        /// </summary>
        public AwardQueryInformation_Winner WinnerInformation { get; set; }
        /// <summary>
        /// 取得或设置查询的排序方式
        /// </summary>
        public SortInfo SortInfo { get; set; }
    }
}
