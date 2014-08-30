using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

using Srims.Server.Business.Experts;

namespace Srims.Server.Business.Awards
{
    /// <summary>
    /// 奖励查询信息--获奖人信息
    /// </summary>
    public class AwardQueryInformation_Winner
    {
        /// <summary>
        /// 获奖人姓名
        /// </summary>
        public string AwardWinnerName { get; set; }
        /// <summary>
        /// 座次
        /// </summary>
        public int? AwardWinnerOrder { get; set; }
        /// <summary>
        /// 作者信息
        /// </summary>
        public ExpertQueryInformation_Basic WinnerQueryInformation { get; set; }
    }
}
