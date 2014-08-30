
if (!Srims.fund) 
    Ext.namespace("Srims.fund");

Srims.fund.listFinance = function(){
    Srims.fund._listFinance('FinanceList', '经费到帐计划列表', 'icon-fund-finance');
}
Srims.fund._listFinance = function(id, name, iconCls, queryParams){
    var panelId = 'FinanceGridPanel_' + id;
    var financeStore = undefined;
    var panel = Srims.WorkSpace.active(panelId);
    var queryParams = {};
    queryParams.isDescendAll = false;
    
    if (panel) {
        financeStore = panel.getStore();
        financeStore.load();
    }
    else {
        financeStore = new Srims.fund.FinanceStore(Srims.service.fund.FinanceService + '/Query', queryParams);
        panel = new Srims.fund.FinanceGridPanel(panelId, financeStore, name, iconCls, queryParams, false);
        panel.getStore().load();
        
        Srims.WorkSpace.addPanel(panel);
    }
}
Srims.fund.showFinanceQueryWindow = function(id, store, queryParams, gridPanel){
    var window = Ext.getCmp(id);
    if (!window) 
        window = new Srims.fund.FinanceQueryWindow(id, store, queryParams);
    
    gridPanel.queryWindow = window;
    window.show();
    
    var map = new Ext.KeyMap(id, {
        key: 13,
        fn: function(){
            if (!window.hidden) 
                window.query(window._buttonQuery);
        }
    });
}
Srims.fund.newFinance = function(store){
    var Id = "NewFinanceWindow";
    var window = Ext.getCmp(id);
    if (!window) {
        var finance = new Srims.fund.Finance({});
        var window = new Srims.fund.FinanceEditWindow(Id, finance, store);
    }
    window.show();
}
Srims.fund.deleteFinance = function(finance, store){
    Ext.MessageBox.confirm('删除经费到帐', '你确定要删除这个经费到帐信息吗？', function(buttonId){
        if (buttonId == 'yes') {
            var params = {};
            params.financeID = finance.get('id');
            
            Ext.Ajax.request({
                url: Srims.service.fund.FinanceService + '/Delete',
                params: params,
                scope: this,
                success: function(){
                    store.load();
                }
            });
        }
    }, this);
}
Srims.fund.atuoImportFinance = function(store){
    var loadingAnimation = new Ext.LoadMask(Ext.getBody(), {
        msg: '正在从财务处下载数据，请耐心等待...'
    });
    loadingAnimation.show();
    
    Ext.Ajax.request({
        url: Srims.service.fund.FinanceService + '/AutoImportFinance',
        scope: this,
        success: function(){
            store.load();
            loadingAnimation.hide();
        }
    });
}
Srims.fund.showVouchers = function(finance){
    var windowId = "financeVouchersShowWindow_" + finance.get('id');
    var window = Ext.getCmp(windowId);
    
    if (!window) 
        window = new Srims.fund.FinanceVouchersShowWindow(windowId, finance);
    
    window.show();
}

Srims.fund.showImportArtsWindow = function(store){
    var windowId = 'ArtsImportWindow';
    var window = Ext.getCmp(windowId);
    
    if (!window) 
        window = new Srims.component.ImportWindow(windowId, store, Srims.service.fund.FinanceService + '/Import', '文科项目数据导入', false);
    
    window.show();
}

Srims.fund.showImportFinanceWindow = function(store) {
    var windowId = 'FinanceImportWindow';
    var window = Ext.getCmp(windowId);

    if (!window)
        window = new Srims.component.ImportWindow(windowId, store, Srims.service.fund.FinanceService + '/ImportFinance', '暂存数据导入', false);

    window.show();
}