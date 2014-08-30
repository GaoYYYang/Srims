
if (!Srims.statistic) 
    Ext.namespace('Srims.statistic');

Srims.statistic.VoucherWindow = function(id){
    var iconCls = 'icon-statistic-voucher';
    var title = '经费分配（凭单）统计';
    var url = Srims.service.statistic.StatisticsService + '/Voucher';
    var dimension = Srims.statistic.VoucherWindow.dimension;
    var renderer = 'Money.render'
    var additonalPanel = new Srims.statistic.VoucherInformationForm();
    
    Srims.statistic.VoucherWindow.superclass.constructor.call(this, id, iconCls, title, url, dimension, renderer, additonalPanel, Srims.common.ViewType.FundAllocationStatic);
}
Ext.extend(Srims.statistic.VoucherWindow, Srims.statistic.ProjectStatisticWindow);

Srims.statistic.VoucherWindow.dimension = new Array(['分配（审核通过）时间', 'DateTime'], ['专家', 'Expert'], ['项目类型', 'ProjectType'], ['项目开始时间', 'StartDate'], ['经费到帐时间', 'FinanceDateTime']);
Srims.statistic.VoucherWindow.dimension.sizes = new Array();
Srims.statistic.VoucherWindow.dimension.sizes[0] = new Array(['年', 'Year'], ['年月', 'YearMonth'], ['年月日', 'YearMonthDay']);
Srims.statistic.VoucherWindow.dimension.sizes[1] = new Array(['专家', 'Expert'], ['学院', 'College']);
Srims.statistic.VoucherWindow.dimension.sizes[2] = new Array(['等级', 'Rank'], ['类型', 'Type']);
Srims.statistic.VoucherWindow.dimension.sizes[3] = new Array(['年', 'Year'], ['年月', 'YearMonth'], ['年月日', 'YearMonthDay']);
Srims.statistic.VoucherWindow.dimension.sizes[4] = new Array(['年', 'Year'], ['年月', 'YearMonth'], ['年月日', 'YearMonthDay']);


