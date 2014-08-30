
if (!Srims.common) 
    Ext.namespace('Srims.common');

Ext.namespace('Srims.common.ViewType');

Srims.common.ViewType.ProjectCountStatic = 'ProjectCountStatic';
Srims.common.ViewType.ProjectFundTotalStatic = 'ProjectFundTotalStatic';
Srims.common.ViewType.FundDescendStatic = 'FundDescendStatic';
Srims.common.ViewType.FundAllocationStatic = 'FundAllocationStatic';
Srims.common.ViewType.PaperStatic = 'PaperStatic';
Srims.common.ViewType.PatentStatic = 'PatentStatic';
Srims.common.ViewType.AwardStatic = 'AwardStatic';
Srims.common.ViewType.VerticalProjectQuery = 'VerticalProjectQuery';
Srims.common.ViewType.HorizontalProjectQuery = 'HorizontalProjectQuery';
Srims.common.ViewType.PaperQuery = 'PaperQuery';
Srims.common.ViewType.LiberalArtsPaperQuery = 'LiberalArtsPaperQuery';
Srims.common.ViewType.PatentQuery = 'PatentQuery';
Srims.common.ViewType.AwardQuery = 'AwardQuery';
Srims.common.ViewType.ExpertQuery = 'ExpertQuery';
Srims.common.ViewType.OutsourcingAllocationInfoQuery = 'OutsourcingAllocationInfoQuery';

Srims.common.staticViewType = ['ProjectCountStatic', 'ProjectFundTotalStatic', 'FundDescendStatic', 'FundAllocationStatic', 'PaperStatic', 'LiberalArtsPaperStatic','PatentStatic', 'AwardStatic'];
Srims.common.queryType = ['VerticalProjectQuery', 'HorizontalProjectQuery', 'PaperQuery', 'LiberalArtsPaperQuery', 'PatentQuery', 'AwardQuery', 'ExpertQuery', 'OutsourcingAllocationInfoQuery'];
//取得服务器端url
Srims.common.ViewType.getStaticSubUrl = function(value){
    switch (value) {
        case 'ProjectCountStatic':
            return Srims.service.statistic.StatisticsService + '/ProjectCount';
        case 'ProjectFundTotalStatic':
            return Srims.service.statistic.StatisticsService + '/FundTotal';
        case 'FundDescendStatic':
            return Srims.service.statistic.StatisticsService + '/FundDescend';
        case 'FundAllocationStatic':
            return Srims.service.statistic.StatisticsService + '/Voucher';
        case 'PaperStatic':
            return Srims.service.statistic.StatisticsService + '/Paper';
        case 'PatentStatic':
            return Srims.service.statistic.StatisticsService + '/Patent';
        case 'AwardStatic':
            return Srims.service.statistic.StatisticsService + '/Award';
        case 'VerticalProjectQuery':
            return Srims.service.projects.ProjectService + '/Query';
        case 'HorizontalProjectQuery':
            return Srims.service.projects.ProjectService + '/Query';
        case 'PaperQuery':
            return Srims.service.papers.PaperService + '/Query';
        case 'LiberalArtsPaperQuery':
            return Srims.service.papers.LiberalArtsPaperService + '/Query';
        case 'PatentQuery':
            return Srims.service.patents.PatentService + '/Query';
        case 'AwardQuery':
            return Srims.service.awards.AwardService + '/Query';
        case 'ExpertQuery':
            return Srims.service.experts.ExpertService + '/Query';
        case 'OutsourcingAllocationInfoQuery':
            return Srims.service.common.OutsourcingService + '/GetAllocatedInfo';
            
        default:
            return 'unknown';
    }
}
//取得视图图标
Srims.common.ViewType.getIconCls = function(value, metadata){
    switch (value) {
        case 'ProjectCountStatic':
            return 'icon-statistic-project-count';
        case 'ProjectFundTotalStatic':
            return 'icon-statistic-fund-total';
        case 'FundDescendStatic':
            return 'icon-statistic-fund-descend';
        case 'FundAllocationStatic':
            return 'icon-statistic-voucher';
        case 'PaperStatic':
            return 'icon-statistic-paper';
        case 'PatentStatic':
            return 'icon-statistic-patent';
        case 'AwardStatic':
            return 'icon-statistic-award';
        case 'VerticalProjectQuery':
            return 'icon-query';
        case 'HorizontalProjectQuery':
            return 'icon-query';
        case 'PaperQuery':
            return 'icon-query';
        case 'LiberalArtsPaperQuery':
            return 'icon-query';
        case 'PatentQuery':
            return 'icon-query';
        case 'AwardQuery':
            return 'icon-query';
        case 'ExpertQuery':
            return 'icon-query';
        case 'OutsourcingAllocationInfoQuery':
            return 'icon-query';
        default:
            return '未知';
    }
}
//取得视图结果显示图标
Srims.common.ViewType.getResultShowIconCls = function(value, metadata){
    switch (value) {
        case 'ProjectCountStatic':
            return 'icon-statistic-project-count';
        case 'ProjectFundTotalStatic':
            return 'icon-statistic-fund-total';
        case 'FundDescendStatic':
            return 'icon-statistic-fund-descend';
        case 'FundAllocationStatic':
            return 'icon-statistic-voucher';
        case 'PaperStatic':
            return 'icon-statistic-paper';
        case 'LiberalArtsPaperStatic':
            return 'icon-statistic-paper';
        case 'PatentStatic':
            return 'icon-statistic-patent';
        case 'AwardStatic':
            return 'icon-statistic-award';
        case 'VerticalProjectQuery':
            return 'icon-project-vertical-list';
        case 'HorizontalProjectQuery':
            return 'icon-project-horizontal-list';
        case 'PaperQuery':
            return 'icon-paper-list';
        case 'PatentQuery':
            return 'icon-patent-list';
        case 'AwardQuery':
            return 'icon-award-list';
        case 'ExpertQuery':
            return 'icon-expert-list';
        default:
            return '未知';
    }
}
//取得返回自定义函数
Srims.common.ViewType.getDefineSelfFunction = function(value, metadata){
    switch (value) {
        case 'ProjectCountStatic':
            return 'Srims.statistic.statisticProjectCount();';
        case 'ProjectFundTotalStatic':
            return 'Srims.statistic.statisticFundTotal();';
        case 'FundDescendStatic':
            return 'Srims.statistic.statisticFundDescend();';
        case 'FundAllocationStatic':
            return 'Srims.statistic.statisticVoucher();';
        case 'PaperStatic':
            return 'Srims.statistic.statisticPaper();';
        case 'LiberalArtsPaperStatic':
            return 'Srims.statistic.statisticLiberalArtsPaper();';
        case 'PatentStatic':
            return 'Srims.statistic.statisticPatent();';
        case 'AwardStatic':
            return 'Srims.statistic.statisticAward();';
        case 'VerticalProjectQuery':
            return 'Srims.projects.listVerticalProject(true);';
        case 'HorizontalProjectQuery':
            return 'Srims.projects.listHorizontalProject(true);';
        case 'PaperQuery':
            return 'Srims.papers.listPaper(true);';
        case 'PatentQuery':
            return 'Srims.patents.listPatent(true,false);';
        case 'AwardQuery':
            return 'Srims.awards.listAward(true,false);';
        case 'ExpertQuery':
            return 'Srims.experts.ExpertAction.listExpert(true);';
        default:
            return '未知';
    }
}
//是否能够公开
Srims.common.ViewType.isCanPublic = function(value){
    var user = Srims.currentLoginLog.user;
    switch (value) {
        case 'ProjectCountStatic':
            return user.hasPermission_ProjectCountStatisticViewManage;
        case 'ProjectFundTotalStatic':
            return user.hasPermission_FundTotalStatisticViewManage;
        case 'FundDescendStatic':
            return user.hasPermission_FundDescendStatisticViewManage;
        case 'FundAllocationStatic':
            return user.hasPermission_VoucherStatisticViewManage;
        case 'PaperStatic':
            return user.hasPermission_PaperStatisticViewManage;
        case 'LiberalArtsPaperStatic':
            return user.hasPermission_LiberalArtsPaperStatisticViewManage;
        case 'PatentStatic':
            return user.hasPermission_PatentStatisticViewManage;
        case 'AwardStatic':
            return user.hasPermission_AwardStatisticViewManage;
        default:
            return false;
    }
}
//取得统计渲染函数
Srims.common.ViewType.getStaticRender = function(value){
    switch (value) {
        case 'ProjectFundTotalStatic':
            return 'Money.render';
        case 'FundDescendStatic':
            return 'Money.render';
        case 'FundAllocationStatic':
            return 'Money.render';
        default:
            return '';
    }
}
//取得查询，store
Srims.common.viewTypeStore = function(value, queryParams){
    switch (value) {
        case 'VerticalProjectQuery':
            return new Srims.projects.ProjectStore(Srims.service.projects.ProjectService + '/Query', queryParams);
        case 'HorizontalProjectQuery':
            return new Srims.projects.ProjectStore(Srims.service.projects.ProjectService + '/Query', queryParams);
        case 'PaperQuery':
            return new Srims.papers.PaperStore(Srims.service.papers.PaperService + '/Query', queryParams);
        case 'LiberalArtsPaperQuery':
            return new Srims.papers.PaperStore(Srims.service.papers.LiberalArtsPaperService + '/Query', queryParams);
        case 'PatentQuery':
            return new Srims.patents.PatentStore(Srims.service.patents.PatentService + '/Query', queryParams);
        case 'AwardQuery':
            return new Srims.awards.AwardStore(Srims.service.awards.AwardService + '/Query', queryParams);
        case 'ExpertQuery':
            return new Srims.experts.ExpertStore(Srims.service.experts.ExpertService + '/Query', queryParams);
        default:
            return '未知';
    }
}
//渲染
Srims.common.viewTypeRender = function(value, metadata){
    switch (value) {
        case 'ProjectCountStatic':
            return '项目数目统计';
        case 'ProjectFundTotalStatic':
            return '项目总经费统计';
        case 'FundDescendStatic':
            return '项目到帐经费统计';
        case 'FundAllocationStatic':
            return '经费分配统计';
        case 'PaperStatic':
            return '论文统计';
        case 'PatentStatic':
            return '专利统计';
        case 'AwardStatic':
            return '奖励统计';
        case 'VerticalProjectQuery':
            return '纵向项目查询';
        case 'HorizontalProjectQuery':
            return '横向项目查询';
        case 'PaperQuery':
            return '论文查询';
        case 'LiberalArtsPaperQuery':
            return '文科论文查询';
        case 'PatentQuery':
            return '专利查询';
        case 'AwardQuery':
            return '奖励查询';
        case 'ExpertQuery':
            return '专家查询';
        default:
            return '未知';
    }
}


