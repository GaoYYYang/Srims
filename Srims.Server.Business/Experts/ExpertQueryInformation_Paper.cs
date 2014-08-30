using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

using MIS.Common;

using Srims.Server.Business;
using Srims.Server.Business.Papers;

namespace Srims.Server.Business.Experts
{
    /// <summary>
    /// 专家查询信息——论文信息
    /// </summary>
    public class ExpertQueryInformation_Paper
    {
        /// <summary>
        /// 作者位次
        /// </summary>
        public Range<Int32> AuthorOrder { get; set; }
        /// <summary>
        /// 影响因子
        /// </summary>
        public Range<Int32> InfluenceFactor { get; set; }
        /// <summary>
        /// 发表年份
        /// </summary>
        public Range<Int32> PulishDateTimeYear { get; set; }
        /// <summary>
        /// 是否通讯作者
        /// </summary>
        public bool? IsLinkMan { get; set; }
        /// <summary>
        /// 论文收录
        /// </summary>
        public PaperIndexedType[] Indexed { get; set; }
        /// <summary>
        /// 论文数目
        /// </summary>
        public Range<Int32> Count { get; set; }
    }
}
