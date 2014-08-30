
if (!Srims.statistic) 
    Ext.namespace('Srims.statistic');

Srims.statistic.FundDescendWindow = function(id){
    var iconCls = 'icon-statistic-fund-descend';
    var title = '经费到账统计';
    var url = Srims.service.statistic.StatisticsService + '/FundDescend';
    var dimension = Srims.statistic.FundDescendWindow.dimension;
    var renderer = 'Money.render'
    var additonalPanel = new Srims.statistic.FundDescendDateTimeForm();
    
    Srims.statistic.FundDescendWindow.superclass.constructor.call(this, id, iconCls, title, url, dimension, renderer, additonalPanel, Srims.common.ViewType.FundDescendStatic);
}
Ext.extend(Srims.statistic.FundDescendWindow, Srims.statistic.ProjectStatisticWindow);

Srims.statistic.FundDescendWindow.dimension = new Array(['到账时间', 'FinanceDateTime'], ['下拨时间', 'DescendDateTime'], ['负责人', 'Principal'], ['项目类型', 'ProjectType'], ['项目开始时间', 'StartDate']);
Srims.statistic.FundDescendWindow.dimension.sizes = new Array();
Srims.statistic.FundDescendWindow.dimension.sizes[0] = new Array(['年', 'Year'], ['年月', 'YearMonth'], ['年月日', 'YearMonthDay']);
Srims.statistic.FundDescendWindow.dimension.sizes[1] = new Array(['年', 'Year'], ['年月', 'YearMonth'], ['年月日', 'YearMonthDay']);
Srims.statistic.FundDescendWindow.dimension.sizes[2] = new Array(['专家', 'Expert'], ['学院', 'College']);
Srims.statistic.FundDescendWindow.dimension.sizes[3] = new Array(['等级', 'Rank'], ['类型', 'Type']);
Srims.statistic.FundDescendWindow.dimension.sizes[4] = new Array(['年', 'Year'], ['年月', 'YearMonth'], ['年月日', 'YearMonthDay']);
