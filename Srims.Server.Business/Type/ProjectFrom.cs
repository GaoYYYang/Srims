using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Srims.Server.Business.Type
{
    /// <summary>
    /// 项目来源
    /// </summary>
    public enum ProjectFrom
    {
        /// <summary>
        /// 未知
        /// </summary>
        Unknown = 0,
        /// <summary>
        /// 973计划
        /// </summary>
        NineSevenThreePlan = 1,
        /// <summary>
        ///国家科技攻关计划
        /// </summary>
        CountryScienceAndTechnologyPlan = 2,
        /// <summary>
        /// 863
        /// </summary>
        Country863Plan = 3,
        /// <summary>
        /// 国家自然科学基金
        /// </summary>
        CounrtyNatualScienceFund = 4,
        /// <summary>
        /// 主管部门科技项目
        /// </summary>
        DepartMentInChargeScienceAndTechnology = 5,
        /// <summary>
        /// 国家计委和科技部其他项目
        /// </summary>
        CountryDepartOfPlanAndScienceAndTechnology = 6,
        /// <summary>
        /// 国家经贸委科技项目
        /// </summary>
        CounntryEconomyScienceAndTechnology = 7,
        /// <summary>
        /// 国务院其他部门科技项目
        /// </summary>
        StateDepartMentScienceAndTechnology = 8,
        /// <summary>
        /// 省市自治区科技计划项目
        /// </summary>
        ProvinceScienceAndTechnology = 9,
        /// <summary>
        /// 企事业单位委托项目
        /// </summary>
        CorporationAndCareerDepartmentDelegate = 10,
        /// <summary>
        /// 国际合作项目
        /// </summary>
        InternationalCorporation = 11,
        /// <summary>
        /// 自选课题
        /// </summary>
        PersonizeProject = 12,
        /// <summary>
        /// 其他科技项目
        /// </summary>
        other = 13,
        /// <summary>
        /// 国家社科基金单列学科项目
        /// </summary>
        NationalSocialScienceFundProjectSeparateDisciplines = 14,
        /// <summary>
        /// 国家社科基金项目
        /// </summary>
        NationalSocialScienceFundProject = 15,
        /// <summary>
        /// 中央其他部门社科专门项目
        /// </summary>
        OtherCentralSocialSpecialProjects = 16,
        /// <summary>
        /// 全国高校古籍整理研究工作委员会
        /// </summary>
        AncientBooksoftheNationalUniversitiesCommission = 17,
        /// <summary>
        /// 教育部人文社科研究项目
        /// </summary>
        MinistryOfEducationHumanitiesAndSocialScienceResearchProject = 18,
        /// <summary>
        /// 全国教育科学规划办公室
        /// </summary>
        NationalPlanningOfficeOfEducation = 19,
        /// <summary>
        /// 省市自治区社科基金项目
        /// </summary>
        ProvinceSocialScienceFundProject = 20,
        /// <summary>
        /// 地市厅局等政府部门项目
        /// </summary>
        OtherGovernmentProjects = 21,
        /// <summary>
        /// 省教育厅社科项目
        /// </summary>
        EducationDepartmentOfProvince = 22,
        /// <summary>
        /// 学校社科项目
        /// </summary>
        SchoolSocialScienceFundProject = 23,
    }
}
