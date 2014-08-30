using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Srims.Server.Business.Common
{
    /// <summary>
    /// 视图类型
    /// </summary>
    public enum ViewType
    {
        /// <summary>
        /// 未知
        /// </summary>
        Unknown = 0,
        /// <summary>
        /// 项目数目统计
        /// </summary>
        ProjectCountStatic = 1,
        /// <summary>
        /// 项目总经费统计
        /// </summary>
        ProjectFundTotalStatic = 2,
        /// <summary>
        /// 经费到帐统计
        /// </summary>
        FundDescendStatic = 3,
        /// <summary>
        /// 经费分配统计
        /// </summary>
        FundAllocationStatic = 4,
        /// <summary>
        /// 论文统计
        /// </summary>
        PaperStatic = 5,
        /// <summary>
        /// 专利统计
        /// </summary>
        PatentStatic = 6,
        /// <summary>
        /// 奖励统计
        /// </summary>
        AwardStatic = 7,
        /// <summary>
        /// 纵向项目查询
        /// </summary>
        VerticalProjectQuery = 8,
        /// <summary>
        /// 横向项目查询
        /// </summary>
        HorizontalProjectQuery = 9,
        /// <summary>
        /// 论文查询
        /// </summary>
        PaperQuery = 10,
        /// <summary>
        /// 专利查询
        /// </summary>
        PatentQuery = 11,
        /// <summary>
        /// 奖励查询
        /// </summary>
        AwardQuery = 12,
        /// <summary>
        /// 专家查询
        /// </summary>
        ExpertQuery = 13,
      
    }
}
