
if (!Srims.projects)
    Ext.namespace('Srims.projects');

Srims.projects.ProjectExport_Column = function() {
}

Srims.projects.ProjectExport_Column.basic = [['Name', '项目名称', , '100'], ['Number', '项目编号', , '100'], ['State', '项目状态', 'enum', '100'],
    ['Principal', '项目负责人', , '100'], ['PrincipalNumber', '负责人工作证号', , '100'], ['PrincipalCollege', '所属学院', , '100'], ['PrincipalDelegate', '委托负责人', , '100'], ['Level', '项目等级', 'enum', '100'],
    ['SubjectName', '所属学科', , '100'], ['ResearchType', '研究类型', , '100'], ['CooperationType', '合作类型', , '100'], ['StartDate', '开始日期', 'Date', '80'],
    ['EndDate', '结束日期', 'Date', '80'], ['IsSecret', '是否涉密', 'Boolean', '20'], ['BaseName', '基地名称', , '100'], ['Creator', '创建人', , '100'],
    ['CreateDate', '创建时间', 'Date', '80'], ['CorporationPlace', '公司地址', , '100'], ['Remark', '备注', , '100'], ['TaskComingFrom', '委托单位', , '100']];

Srims.projects.ProjectExport_Column.Type = [['RankName', '等级名称', , '100'], ['TypeName', '类型名称', , '100'], ['SupportCategoryName', '资助类别', , '100'],
    ['SupportFieldName', '资助领域', , '100'], ['SupportSubFieldName', '资助子领域', , '100']];

Srims.projects.ProjectExport_Column.fund = [['FundContract', '合同额', 'moneyRender', '80'], ['FundTotal', '到校经费', 'moneyRender', '80'],
    ['FundPlanIn', '计划校内分配', 'moneyRender', '80'], ['FundPlanOut', '计划外协分配', 'moneyRender', '80'], ['FundPlanHardware', '计划硬件分配', 'moneyRender', '80'],
    ['FundReceived', '已到经费', 'moneyRender', '80'], ['FundAlreadyTotal', '已分配经费', 'moneyRender', '80'], ['FundAlreadyIn', '已校内分配', 'moneyRender', '80'],
    ['FundAlreadyOut', '已外协分配', 'moneyRender', '80'], ['FundAlreadyHardware', '已硬件分配', 'moneyRender', '80'], ['FundFrom', '经费来源', , '100'],
    ['FundFromUnit', '来款单位', , '100'], ['FundFromUnitAddress', '来款单位地址', , '100'],
    ['OverheadExpenseOutTotal', '外协管理费总额', 'moneyRender', '80'], ['OverheadExpensesAlreadyIn', '已收校内管理费', 'moneyRender', '80'],
    ['OverheadExpensesAlreadyOut', '已收外协管理费', 'moneyRender', '80'], ['IndirectCosts', '项目总间接费用', 'moneyRender', '80'], ['ProjectPerformancePay', '项目总绩效', 'moneyRender', '80'],
    ['OverheadExpenseInTotal', '校内管理费', 'moneyRender', '80'], ['PerformancePay', '校内绩效', 'moneyRender', '80'], ['PerformancePayStandard', '校内基准绩效', 'moneyRender', '80'],
    ['OverheadExpensesInStandard', '校内基准间接费用', 'moneyRender', '80'], ['EquipmentCost', '设备购置费', 'moneyRender', '80'], ['ProjectAccountNumber', '账本号', '', '80']
    , ['OutsourcingPlanAmountString', '外协计划分配', '', '100'], ['OutsourcingAlreadyAmountString', '外协已分配', '', '100'], ['AllocatedPerformance', '实发绩效', 'moneyRender', '80']];

