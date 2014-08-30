using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

using MIS.Common;
using MIS.Common.Query;

using Srims.Server.Business;
using Srims.Server.Business.Papers;
using Srims.Server.Business.Patents;
using Srims.Server.Business.Awards;
using Srims.Server.Business.Projects;

namespace Srims.Server.Business.Experts
{
    /// <summary>
    /// 专家查询信息
    /// </summary>
    public class ExpertQueryInformation : QueryInformation
    {
        /// <summary>
        /// 专家所有查询条件是或的关系
        /// </summary>
        public bool? IsOr { get; set; }
        /// <summary>
        /// 专家基本查询信息
        /// </summary>
        public ExpertQueryInformation_Basic Basic { get; set; }
        /// <summary>
        /// 论文查询信息
        /// </summary>
        public PaperQueryInformation PaperQueryInformation { get; set; }
        /// <summary>
        /// 论文查询信息——是否是通讯作者
        /// </summary>
        public bool? PaperQueryInformation_IsLinkMan { get; set; }
        /// <summary>
        /// 论文查询信息——作者位次
        /// </summary>
        public Range<Int32> PaperQueryInformation_Order { get; set; }
        /// <summary>
        /// 论文查询作者——论文数目
        /// </summary>
        public Range<Int32> PaperQueryInformation_Count { get; set; }
        /// <summary>
        /// 奖励查询信息
        /// </summary>
        public AwardQueryInformation AwardQueryInformation { get; set; }
        /// <summary>
        /// 奖励查询信息——获奖人位次
        /// </summary>
        public Range<Int32> AwardQueryInformation_Order { get; set; }
        /// <summary>
        /// 奖励查询信息——奖励数目
        /// </summary>
        public Range<Int32> AwardQueryInformation_Count { get; set; }
        /// <summary>
        /// 专利查询信息
        /// </summary>
        public PatentQueryInformation PatentQueryInformation { get; set; }
        /// <summary>
        /// 专利查询信息——是否是专利负责人
        /// </summary>
        public bool? PatentQueryInformation_IsPrincipal { get; set; }
        /// <summary>
        /// 专利查询信息——专利发明人位次
        /// </summary>
        public Range<Int32> PatentQueryInformation_Order { get; set; }
        /// <summary>
        /// 专利查询信息——专利数目
        /// </summary>
        public Range<Int32> PatentQueryInformation_Count { get; set; }
        /// <summary>
        /// 项目查询信息
        /// </summary>
        public ProjectQueryInformation ProjectQueryInformation { get; set; }
        /// <summary>
        /// 项目查询信息——项目数目
        /// </summary>
        public Range<Int32> ProjectQueryInformation_Count { get; set; }
        /// <summary>
        /// 项目查询信息——经费数额
        /// </summary>
        public Range<long> ProjectQueryInformation_Fund_Count { get; set; }
        /// <summary>
        /// 项目查询信息——项目数目与经费数额是否或的关系
        /// </summary>
        public bool? IsProjectCountOrFundTotal { get; set; }
        /// <summary>
        /// 排序信息
        /// </summary>
        public SortInfo sortInfo { get; set; }
    }
}
