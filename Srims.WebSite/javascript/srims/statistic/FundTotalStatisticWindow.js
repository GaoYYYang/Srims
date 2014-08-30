
if (!Srims.statistic) 
    Ext.namespace('Srims.statistic');

Srims.statistic.FundTotalWindow = function(id){
    var iconCls = 'icon-statistic-fund-total';
    var title = '总经费统计';
    var url = Srims.service.statistic.StatisticsService + '/FundTotal';
    var dimension = Srims.statistic.FundTotalWindow.dimension;
    var renderer = 'Money.render'
    Srims.statistic.FundTotalWindow.superclass.constructor.call(this, id, iconCls, title, url, dimension, renderer, undefined, Srims.common.ViewType.ProjectFundTotalStatic);
}
Ext.extend(Srims.statistic.FundTotalWindow, Srims.statistic.ProjectStatisticWindow);

Srims.statistic.FundTotalWindow.dimension = new Array(['开始时间', 'StartDate'], ['负责人', 'Principal'], ['项目类型', 'ProjectType'], ['项目状态', 'ProjectState']);
Srims.statistic.FundTotalWindow.dimension.sizes = new Array();
Srims.statistic.FundTotalWindow.dimension.sizes[0] = new Array(['年', 'Year'], ['年月', 'YearMonth'], ['年月日', 'YearMonthDay']);
Srims.statistic.FundTotalWindow.dimension.sizes[1] = new Array(['专家', 'Expert'], ['学院', 'College']);
Srims.statistic.FundTotalWindow.dimension.sizes[2] = new Array(['等级', 'Rank'], ['类型', 'Type']);
Srims.statistic.FundTotalWindow.dimension.sizes[3] = new Array(['状态', 'State']);


