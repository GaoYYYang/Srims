
if (!Srims.statistic) 
    Ext.namespace('Srims.statistic');

Srims.statistic.statisticProjectCount = function(){
    var actionParams = {};
    actionParams.name = 'ProjectCount';
    actionParams.window = Srims.statistic.ProjectCountStatisticWindow;
    actionParams.hasManagePermission = Srims.currentUser.hasPermission_ProjectCountStatisticViewManage;
    
    var id = 'window_statistic_project_count';
    Srims.statistic._showStatisticWindow(id, Srims.statistic.ProjectCountStatisticWindow);
}
Srims.statistic.statisticFundTotal = function(){
    var id = 'window_statistic_fund_total';
    Srims.statistic._showStatisticWindow(id, Srims.statistic.FundTotalWindow);
}
Srims.statistic.statisticFundDescend = function(){
    var id = 'window_statistic_fund_descend';
    Srims.statistic._showStatisticWindow(id, Srims.statistic.FundDescendWindow);
}
Srims.statistic.statisticVoucher = function(){
    var id = 'window_statistic_voucher';
    Srims.statistic._showStatisticWindow(id, Srims.statistic.VoucherWindow);
}
Srims.statistic.statisticPaper = function(){
    var id = 'window_statistic_paper';
    Srims.statistic._showStatisticWindow(id, Srims.statistic.PaperStatisticWindow);
}
Srims.statistic.statisticPatent = function(){
    var id = 'window_statistic_patent';
    Srims.statistic._showStatisticWindow(id, Srims.statistic.PatentStatisticWindow);
}
Srims.statistic.statisticAward = function(){
    var id = 'window_statistic_award';
    Srims.statistic._showStatisticWindow(id, Srims.statistic.AwardStatisticWindow);
}
Srims.statistic._showStatisticWindow = function(id, window){
    var win = Ext.getCmp(id);
    if (!win) 
        win = new window(id);
    win.show();
}

Srims.statistic.showLoadingAnimation = function(name){
    Srims.statistic._loadingAnimation = new Ext.LoadMask(Ext.getBody(), {
        msg: '正在进行' + name + '...'
    });
    Srims.statistic._loadingAnimation.show();
};

Srims.statistic.showResult = function(title, iconCls, response, renderer){

    if (String.isEmpty(response.responseText)) {
        Srims.statistic._hideLoadingAnimation();
        Ext.Msg.show({
            title: '无数据',
            msg: '统计结果中不包含任何数据。请核对统计条件。',
            buttons: Ext.Msg.OK,
            mode: true
        });
        return;
    }
    
    var store = Srims.statistic._getStore(response);
    
    var params = {};
    params.store = store;
    params.title = title;
    params.iconCls = iconCls;
    params.colModel = Srims.statistic._getColumnModel(response.responseXML, renderer);
    var girdPanel = new Srims.component.GridPanel(params);
    
    Srims.WorkSpace.addPanel(girdPanel);
    
    Srims.statistic._hideLoadingAnimation();
}
Srims.statistic.exportToExcel = function(title, response, renderer){

    if (String.isEmpty(response.responseText)) {
        Srims.statistic._hideLoadingAnimation();
        Ext.Msg.show({
            title: '无数据',
            msg: '统计结果中不包含任何数据。请核对统计条件。',
            buttons: Ext.Msg.OK,
            mode: true
        });
        return;
    }
    
    var store = Srims.statistic._getStore(response);
    var columns = Srims.statistic._getExportColumns(response.responseXML, renderer);
    
    Srims.exportAction.exportToExcel(store, columns, title);
    
    Srims.statistic._hideLoadingAnimation();
}

Srims.statistic._getStore = function(response){
    var responseXML = response.responseXML;
    var record = Srims.statistic._getRecord(responseXML);
    var store = new Srims.statistic.Store(record);
    
    store.loadData(responseXML);
    return store;
}

Srims.statistic._getRecord = function(responseXML){

    var domQuery = Ext.DomQuery;
    var columnNodes = domQuery.select('Statistic/Columns/Column', responseXML);
    
    var recordString = 'Ext.data.Record.create([';
    for (var i = 0; i < columnNodes.length; i++) {
        var columnName = domQuery.selectValue('/Name', columnNodes[i]);
        var columnType = i == 0 ? 'string' : 'int';
        
        recordString = i == 0 ? recordString : recordString + ',';
        recordString = recordString + String.format('{name: \'{0}\', type: \'{1}\', mapping: \'{0}\'}', columnName, columnType);
    }
    
    recordString = recordString + ']);';
    
    //alert(recordString);
    return eval(recordString);
}
Srims.statistic._getColumnModel = function(responseXML, renderer){
    var domQuery = Ext.DomQuery;
    var columnNodes = domQuery.select('Statistic/Columns/Column', responseXML);
    
    var columnModelString = 'new Ext.grid.ColumnModel(['
    
    for (var i = 0; i < columnNodes.length; i++) {
        columnModelString = i == 0 ? columnModelString : columnModelString + ',';
        var renderString = (i == 0 || String.isEmpty(renderer)) ? '' : ',renderer:' + renderer;
        
        columnName = domQuery.selectValue('/Name', columnNodes[i])
        columnTitle = domQuery.selectValue('/Title', columnNodes[i])
        columnModelString = columnModelString + String.format('{header: \'{0}\',dataIndex:\'{1}\' , sortable: true {2}}', columnTitle, columnName, renderString);
    }
    
    columnModelString = columnModelString + ']);';
    
    //alert(columnModelString);
    return eval(columnModelString)
}
Srims.statistic._getExportColumns = function(responseXML, renderer){
    var domQuery = Ext.DomQuery;
    var columnNodes = domQuery.select('Statistic/Columns/Column', responseXML);
    
    var column = {};
    column.Name = [];
    column.BoxLabel = [];
    column.Renderer = [];
    
    for (var i = 0; i < columnNodes.length; i++) {
        var renderString = (i == 0 || String.isEmpty(renderer)) ? '' : renderer;
        
        columnName = domQuery.selectValue('/Name', columnNodes[i])
        columnTitle = domQuery.selectValue('/Title', columnNodes[i])
        
        column.Name = column.Name.concat(columnName);
        column.BoxLabel = column.BoxLabel.concat(columnTitle);
        column.Renderer = column.Renderer.concat(eval(renderString));
    }
    
    return column;
}

Srims.statistic._hideLoadingAnimation = function(){
    if (Srims.statistic._loadingAnimation) 
        Srims.statistic._loadingAnimation.hide();
}

