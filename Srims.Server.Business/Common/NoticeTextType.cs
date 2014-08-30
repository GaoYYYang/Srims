using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Srims.Server.Business.Common
{
    /// <summary>
    /// 提示文本类型
    /// </summary>
    public enum NoticeTextType
    {
        /// <summary>
        /// 未知类型
        /// </summary>
        Unknown = 0,
        /// <summary>
        /// 项目研究类型
        /// </summary>
        ProjectResearchType = 2,
        /// <summary>
        /// 项目合作类型
        /// </summary>
        ProjectCooperationType = 3,
        /// <summary>
        /// 项目审核驳回理由
        /// </summary>
        ProjectCensorRejectReason = 4,
        /// <summary>
        /// 民族
        /// </summary>
        Nation = 8,
        /// <summary>
        /// 政治面貌
        /// </summary>
        Policy = 9,
        /// <summary>
        /// 文档名称
        /// </summary>
        DocumentName = 10,
        /// <summary>
        /// 基地主管部门
        /// </summary>
        BaseAdministration = 11,
        /// <summary>
        /// 基地级别
        /// </summary>
        BaseRank = 12,
        /// <summary>
        /// 奖励级别
        /// </summary>
        AwardRank = 13,
        /// <summary>
        /// 奖励等级
        /// </summary>
        AwardClass = 14,
        /// <summary>
        /// 专利国别
        /// </summary>
        PatentCountry = 15,
        /// <summary>
        /// 论文级别
        /// </summary>
        PaperRank = 16,
        /// <summary>
        /// 专利分类
        /// </summary>
        PatentCategory = 17,
        /// <summary>
        /// 奖励参与类型
        /// </summary>
        AwardAttendType = 18,
        /// <summary>
        /// 奖励种类
        /// </summary>
        AwardClassification = 20,
        /// <summary>
        /// 奖励授奖单位
        /// </summary>
        AwardAuthorisedUnit = 21,
        /// <summary>
        /// 专家学历
        /// </summary>
        AcaedemyDegree = 22,
        /// <summary>
        /// 专家职称
        /// </summary>
        ExpertPost = 23,
        /// <summary>
        /// 外语语种
        /// </summary>
        ForeignLanguage = 24,
        /// <summary>
        /// 熟练程度
        /// </summary>
        LanguageLevel = 25,
        /// <summary>
        /// 学科等级
        /// </summary>
        SubjectRank = 26,
        /// <summary>
        /// 学科分类
        /// </summary>
        SubjectClass = 27,
        /// <summary>
        /// 所属实验室
        /// </summary>
        Lab = 28,
        /// <summary>
        /// 发票类型
        /// </summary>
        InvoiceType = 29,
        /// <summary>
        /// 经费下拨驳回理由
        /// </summary>
        FundDescendRejectReason = 30,
        /// <summary>
        /// 文档模板名称
        /// </summary>
        DocumentModelName = 31,
        /// <summary>
        /// 盖章事由
        /// </summary>
        StampReason = 32,
        /// <summary>
        /// 文印驳回理由
        /// </summary>
        StampRejectReason = 33,
        /// <summary>
        /// 盖章材料类型
        /// </summary>
        StuffType = 34,
        /// <summary>
        /// 奖励名称
        /// </summary>
        AwardName = 35,
        /// <summary>
        /// 奖励文档名称
        /// </summary>
        AwardDocumentName = 36,
        /// <summary>
        /// 杂志任职职务
        /// </summary>
        MagazineOccupation = 37,
        /// <summary>
        /// 绩效分配最小额度
        /// </summary>
        PerformanceAllocation=38,
        /// <summary>
        /// 文印管理员
        /// </summary>
        Administrator = 39,
    }
}
