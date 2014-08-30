
if (!Srims.finance) 
    Ext.namespace('Srims.finance');

Srims.finance.FinanceBakGridPanel_ToolBar = function(store, panelId, queryParams){

    //fields
    this._panelId = panelId;
    this._store = store;
    
    //control
    this._buttonExport = new Ext.Toolbar.Button({
        iconCls: 'icon-export',
        text: '导出',
        minWidth: 60,
        panelId: this._panelId,
        store: this._store,
        handler: function(){
            Srims.finance.exportFinanceBak(queryParams);
        },
        tooltip: '<b>导出财务经费到帐信息</b><br/>导出财务经费到帐信息'
    });
    
    var user = Srims.currentLoginLog.user;
    this._buttonExport.setVisible(user.isSurper || user.hasPermission_ExportFinanceData);
    
    Srims.finance.FinanceBakGridPanel_ToolBar.superclass.constructor.call(this, {
        items: [this._buttonExport]
    });
    
}
Ext.extend(Srims.finance.FinanceBakGridPanel_ToolBar, Ext.Toolbar);
