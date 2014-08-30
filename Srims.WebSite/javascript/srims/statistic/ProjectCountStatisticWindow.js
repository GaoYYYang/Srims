
if (!Srims.statistic) 
    Ext.namespace('Srims.statistic');

Srims.statistic.ProjectCountStatisticWindow = function(id){
    var iconCls = 'icon-statistic-project-count';
    var title = '项目数目统计';
    var url = Srims.service.statistic.StatisticsService + '/ProjectCount';
    var dimension = Srims.statistic.ProjectCountStatisticWindow.dimension;
    Srims.statistic.ProjectCountStatisticWindow.superclass.constructor.call(this, id, iconCls, title, url, dimension, undefined, undefined, Srims.common.ViewType.ProjectCountStatic);
}
Ext.extend(Srims.statistic.ProjectCountStatisticWindow, Srims.statistic.ProjectStatisticWindow);

Srims.statistic.ProjectCountStatisticWindow.dimension = new Array(['开始时间', 'StartDate'], ['负责人', 'Principal'], ['项目类型', 'ProjectType'], ['项目状态', 'ProjectState']);
Srims.statistic.ProjectCountStatisticWindow.dimension.sizes = new Array();
Srims.statistic.ProjectCountStatisticWindow.dimension.sizes[0] = new Array(['年', 'Year'], ['年月', 'YearMonth'], ['年月日', 'YearMonthDay']);
Srims.statistic.ProjectCountStatisticWindow.dimension.sizes[1] = new Array(['专家', 'Expert'], ['学院', 'College']);
Srims.statistic.ProjectCountStatisticWindow.dimension.sizes[2] = new Array(['等级', 'Rank'], ['类型', 'Type']);
Srims.statistic.ProjectCountStatisticWindow.dimension.sizes[3] = new Array(['状态', 'State']);


