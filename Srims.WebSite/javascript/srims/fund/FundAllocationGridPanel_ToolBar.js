
if (!Srims.fund) 
    Ext.namespace('Srims.fund');

Srims.fund.FundAllocationGridPanel_ToolBar = function(selection, store, panelId, queryParams){

    //fields
    this._panelId = panelId;
    this._selection = selection;
    this._store = store;
    
    //controls
    this._buttonQuery = new Ext.Toolbar.Button({
        iconCls: 'icon-query',
        text: '查询',
        minWidth: 60,
        panelId: this._panelId,
        store: this._store,
        handler: function(){
            Srims.fund.showFundAllocationQueryWindow(this.panelId + '_QueryWindow', this.store, queryParams, Ext.getCmp(this.panelId));
        },
        tooltip: '<b>经费分配查询</b><br/>对经费分配信息进行查询'
    });
    this._buttonShow = new Ext.Toolbar.Button({
        iconCls: 'icon-show',
        text: '查看',
        minWidth: 60,
        selection: this._selection,
        handler: function(){
            if (this.selection.getCount() == 0) 
                return;
            
            Srims.fund.showFundAllocationInfo(this.selection.getSelected());
        },
        hidden: true,
        tooltip: '<b>查看分配</b><br/>显示所选经费分配的详细信息'
    });
    this._buttonRefresh = new Ext.Toolbar.Button({
        iconCls: 'icon-refresh',
        text: '刷新',
        minWidth: 60,
        store: this._store,
        handler: function(){
            this.store.load();
        },
        tooltip: '<b>刷新列表</b><br/>更新经费分配列表'
    });
    
    this._buttonReset = new Ext.Toolbar.Button({
        iconCls: 'icon-reset',
        text: '重置',
        minWidth: 60,
        store: this._store,
        panelId: this._panelId,
        handler: function(){
            //清空查询条件
            var params = ['token', 'fundAllocationState', 'isHorizontal', 'IsStatistic'];
            Srims.SetQueryParams.clearParams(queryParams, params);
            this.store.load();
        },
        tooltip: '<b>重置列表</b><br/>清空查询条件，重置列表'
    });
    
    var items = [this._buttonQuery, this._buttonShow, new Ext.Toolbar.Fill(), this._buttonRefresh, this._buttonReset];
    
    Srims.fund.FundAllocationGridPanel_ToolBar.superclass.constructor.call(this, {
        items: items
    });
    
    var user = Srims.currentLoginLog.user;
    this._buttonQuery.setVisible(user.userRoleType != 'Expert');
    
    //initial
    this._selection.buttonShow = this._buttonShow;
    
    //event methods
    this._onSelection_selectionChagne = function(selection){
        var buttonShow = selection.buttonShow;
        
        if (selection.getCount() == 0) {
            buttonShow.hide();
            return;
        }
        
        var fundAllocation = selection.getSelected();
        
        buttonShow.setVisible(true);
        buttonShow.setDisabled(false);
    }
    
    //events
    this._selection.on('selectionchange', this._onSelection_selectionChagne);
}
Ext.extend(Srims.fund.FundAllocationGridPanel_ToolBar, Ext.Toolbar);
