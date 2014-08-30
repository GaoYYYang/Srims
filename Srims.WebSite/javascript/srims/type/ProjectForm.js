
if (!Srims.type) 
    Ext.namespace('Srims.type');

Ext.namespace('Srims.type.ProjectFrom');

Srims.type.ProjectFrom.NineSevenThreePlan = 'NineSevenThreePlan';
Srims.type.ProjectFrom.CountryScienceAndTechnologyPlan = 'CountryScienceAndTechnologyPlan';
Srims.type.ProjectFrom.Country863Plan = 'Country863Plan';
Srims.type.ProjectFrom.CounrtyNatualScienceFund = 'CounrtyNatualScienceFund';
Srims.type.ProjectFrom.DepartMentInChargeScienceAndTechnology = 'DepartMentInChargeScienceAndTechnology';
Srims.type.ProjectFrom.CountryDepartOfPlanAndScienceAndTechnology = 'CountryDepartOfPlanAndScienceAndTechnology';
Srims.type.ProjectFrom.CounntryEconomyScienceAndTechnology = 'CounntryEconomyScienceAndTechnology';
Srims.type.ProjectFrom.StateDepartMentScienceAndTechnology = 'StateDepartMentScienceAndTechnology';
Srims.type.ProjectFrom.ProvinceScienceAndTechnology = 'ProvinceScienceAndTechnology';
Srims.type.ProjectFrom.CorporationAndCareerDepartmentDelegate = 'CorporationAndCareerDepartmentDelegate';
Srims.type.ProjectFrom.InternationalCorporation = 'InternationalCorporation';
Srims.type.ProjectFrom.PersonizeProject = 'PersonizeProject';
Srims.type.ProjectFrom.other = 'other';
Srims.type.ProjectFrom.NationalSocialScienceFundProjectSeparateDisciplines = 'NationalSocialScienceFundProjectSeparateDisciplines';
Srims.type.ProjectFrom.NationalSocialScienceFundProject = 'NationalSocialScienceFundProject';
Srims.type.ProjectFrom.OtherCentralSocialSpecialProjects = 'OtherCentralSocialSpecialProjects';
Srims.type.ProjectFrom.AncientBooksoftheNationalUniversitiesCommission = 'AncientBooksoftheNationalUniversitiesCommission';
Srims.type.ProjectFrom.MinistryOfEducationHumanitiesAndSocialScienceResearchProject = 'MinistryOfEducationHumanitiesAndSocialScienceResearchProject';
Srims.type.ProjectFrom.NationalPlanningOfficeOfEducation = 'NationalPlanningOfficeOfEducation';
Srims.type.ProjectFrom.ProvinceSocialScienceFundProject = 'ProvinceSocialScienceFundProject';
Srims.type.ProjectFrom.OtherGovernmentProjects = 'OtherGovernmentProjects';
Srims.type.ProjectFrom.EducationDepartmentOfProvince = 'EducationDepartmentOfProvince';
Srims.type.ProjectFrom.SchoolSocialScienceFundProject = 'SchoolSocialScienceFundProject';

Srims.type.projectFromRender = function(value, metadata){
    switch (value) {
        case 'NineSevenThreePlan':
            return '973计划';
        case 'CountryScienceAndTechnologyPlan':
            return '国家科技攻关计划';
        case 'Country863Plan':
            return '863';
        case 'CounrtyNatualScienceFund':
            return '国家自然科学基金';
        case 'DepartMentInChargeScienceAndTechnology':
            return '主管部门科技项目';
        case 'CountryDepartOfPlanAndScienceAndTechnology':
            return '国家计委和科技部其他项目';
        case 'CounntryEconomyScienceAndTechnology':
            return '国家经贸委科技项目';
        case 'StateDepartMentScienceAndTechnology':
            return '国务院其他部门科技项目';
        case 'ProvinceScienceAndTechnology':
            return '省市自治区科技计划项目';
        case 'CorporationAndCareerDepartmentDelegate':
            return '企事业单位委托项目';
        case 'InternationalCorporation':
            return '国际合作项目';
        case 'PersonizeProject':
            return '自选课题';
        case 'other':
            return '其他科技项目';
        case 'NationalSocialScienceFundProjectSeparateDisciplines':
            return '国家社科基金单列学科项目';
        case 'NationalSocialScienceFundProject':
            return '国家社科基金项目';
        case 'OtherCentralSocialSpecialProjects':
            return '中央其他部门社科专门项目';
        case 'AncientBooksoftheNationalUniversitiesCommission':
            return '全国高校古籍整理研究工作委员会';
        case 'MinistryOfEducationHumanitiesAndSocialScienceResearchProject':
            return '教育部人文社科研究项目';
        case 'NationalPlanningOfficeOfEducation':
            return '全国教育科学规划办公室';
        case 'ProvinceSocialScienceFundProject':
            return '省市自治区社科基金项目';
        case 'OtherGovernmentProjects':
            return '地市厅局等政府部门项目';
        case 'EducationDepartmentOfProvince':
            return '省教育厅社科项目';
        case 'SchoolSocialScienceFundProject':
            return '学校社科项目';
        default:
            return '未知';
    }
}
Srims.type.projectFormStore = [['NineSevenThreePlan', '973计划'], ['CountryScienceAndTechnologyPlan', '国家科技攻关计划'], ['Country863Plan', '863'], ['CounrtyNatualScienceFund', '国家自然科学基金'], ['DepartMentInChargeScienceAndTechnology', '主管部门科技项目'], ['CountryDepartOfPlanAndScienceAndTechnology', '国家计委和科技部其他项目'], ['CounntryEconomyScienceAndTechnology', '国家经贸委科技项目'], ['StateDepartMentScienceAndTechnology', '国务院其他部门科技项目'], ['ProvinceScienceAndTechnology', '省市自治区科技计划项目'], ['CorporationAndCareerDepartmentDelegate', '企事业单位委托项目'], ['InternationalCorporation', '国际合作项目'], ['PersonizeProject', '自选课题'], ['other', '其他科技项目'], 
['NationalSocialScienceFundProjectSeparateDisciplines', '国家社科基金单列学科项目'],
 ['NationalSocialScienceFundProject', '国家社科基金项目'], 
 ['OtherCentralSocialSpecialProjects', '中央其他部门社科专门项目'], 
 ['AncientBooksoftheNationalUniversitiesCommission', '全国高校古籍整理研究工作委员会'], 
 ['MinistryOfEducationHumanitiesAndSocialScienceResearchProject', '教育部人文社科研究项目'], 
 ['NationalPlanningOfficeOfEducation', '全国教育科学规划办公室'],
  ['ProvinceSocialScienceFundProject', '省市自治区社科基金项目'], 
 ['OtherGovernmentProjects', '地市厅局等政府部门项目'],
  ['EducationDepartmentOfProvince', '省教育厅社科项目'],
   ['SchoolSocialScienceFundProject', '学校社科项目'], 
	  [['Unknown'], ['未知']]];
