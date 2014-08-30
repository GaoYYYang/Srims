
if (!Srims.finance) 
    Ext.namespace("Srims.finance");
//finance
Srims.finance.listFinance = function(){
    Srims.finance._listFinance('FinanceInforList', '经费到帐信息列表', 'icon-finance');
}
Srims.finance._listFinance = function(id, name, iconCls, queryParams){
    var panelId = 'FinanceGridPanel_' + id;
    var financeStore = undefined;
    var panel = Srims.WorkSpace.active(panelId);
    var queryParams = {};
    if (panel) {
        financeStore = panel.getStore();
        financeStore.load();
    }
    else {
        financeStore = new Srims.fund.FinanceStore(Srims.service.fund.FinanceService + '/Query', queryParams);
        panel = new Srims.fund.FinanceGridPanel(panelId, financeStore, name, iconCls, queryParams, true);
        panel.getStore().load();
        
        Srims.WorkSpace.addPanel(panel);
    }
}
Srims.finance.invoiceFinance = function(finance, store){
    var Id = "InvoiceFinanceWindow";
    var window = Ext.getCmp(id);
    if (!window) {
        var window = new Srims.finance.FinanceInvoiceEditWindow(Id, finance, store);
    }
    window.show();
}
Srims.finance.deleteInvoice = function(finance, store){
    Ext.MessageBox.confirm('删除发票信息', '你确定要删除这个发票信息吗？', function(buttonId){
        if (buttonId == 'yes') {
            var params = {};
            params.financeID = finance.get('id');
            
            Ext.Ajax.request({
                url: Srims.service.fund.FinanceService + '/DeleteInvoice',
                params: params,
                scope: this,
                success: function(){
                    store.load();
                }
            });
        }
    }, this);
}
//voucher
Srims.finance.listVoucherFinance = function(){

    Srims.finance._listVoucherFinance('VoucherFinanceList', '凭单财务状态列表', 'icon-voucher-finance-state');
}
Srims.finance._listVoucherFinance = function(id, name, iconCls, queryParams){
    var panelId = 'VoucherGridPanel_' + id;
    var voucherStore = undefined;
    var panel = Srims.WorkSpace.active(panelId);
    var queryParams = {};
    queryParams.voucherState = Srims.fund.FinanceVoucherState;
    if (panel) {
        voucherStore = panel.getStore();
        voucherStore.load();
    }
    else {
        voucherStore = new Srims.fund.VoucherStore(Srims.service.fund.VoucherService + '/Query', queryParams);
        panel = new Srims.fund.VoucherGridPanel(panelId, voucherStore, name, iconCls, queryParams, true);
        panel.getStore().load();
        
        Srims.WorkSpace.addPanel(panel);
    }
}
Srims.finance.allocateVoucher = function(voucher, store){
    var Id = "VoucherFinanceAllocateWindow";
    var window = Ext.getCmp(id);
    if (!window) {
        var window = new Srims.finance.VoucherFinanceAllocateWindow(Id, voucher, store);
    }
    window.show();
}
//financebak
Srims.finance.listFinanceBak = function(){
    Srims.finance._listFinanceBak('FinanceBakList', '财务经费到帐信息列表', 'icon-finance');
}
Srims.finance._listFinanceBak = function(id, name, iconCls, queryParams){
    var panelId = 'FinanceGridPanel_' + id;
    var financeBakStore = undefined;
    var panel = Srims.WorkSpace.active(panelId);
    var queryParams = {};
    if (panel) {
        financeBakStore = panel.getStore();
        financeBakStore.load();
    }
    else {
        financeBakStore = new Srims.finance.FinanceBakStore(Srims.service.fund.FinanceBakService + '/Query', queryParams);
        panel = new Srims.finance.FinanceBakGridPanel(panelId, financeBakStore, name, iconCls, queryParams);
        panel.getStore().load();
        
        Srims.WorkSpace.addPanel(panel);
    }
}
//export
Srims.finance.exportFinanceBak = function(queryParams){
    var windowId = 'FinanceBakExportWindow';
    //生成新Store
    var exportParams = Srims.exportAction.setExportQueryParams(undefined, queryParams);
    var queryUrl = Srims.service.fund.FinanceBakService + '/Query';
    var items = [];
    items[items.length] = new Srims.component.ExportWindow_EntityColumnForm('', Srims.finance.FinanceBakExport_Column.basic);
    
    Srims.exportAction.showExportWindow(windowId, queryUrl, exportParams, items, '财务经费到帐信息');
}
Srims.finance.exportSignInVoucher = function(queryParams){
    var windowId = 'SignInVoucherExportWindow';
    //生成新Store
    queryParams.voucherState = 'SignIn,Allocated';
    var exportParams = Srims.exportAction.setExportQueryParams(undefined, queryParams);
    var queryUrl = Srims.service.fund.VoucherService + '/Query';
    var items = [];
    items[items.length] = new Srims.component.ExportWindow_EntityColumnForm('', Srims.finance.VoucherExport_Column.basic);
    
    Srims.exportAction.showExportWindow(windowId, queryUrl, exportParams, items, '已签收凭单');
}
