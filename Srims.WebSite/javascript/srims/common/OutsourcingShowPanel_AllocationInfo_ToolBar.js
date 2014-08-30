
if (!Srims.common)
    Ext.namespace('Srims.common');

Srims.common.OutsourcingShowPanel_AllocationInfo_ToolBar = function(panelId, store, queryParams, outsourcing) {

    //fields
    this._GridID = panelId;
    this._panelId = panelId + '_AllocationInfo_Toolbar';
    this._store = store;
    this._queryParams = queryParams;
    this._outsourcing = outsourcing;
    //controls
    this._buttonQuery = new Ext.Toolbar.Button({
        iconCls: 'icon-query',
        text: '查询',
        minWidth: 60,
        outsourcing: this._outsourcing,
        queryParams: this._queryParams,
        panelId: this._GridID,
        store: this._store,
        handler: function() {
            Srims.common.showOutsourcingShowPanel_AllocationInfo_QueryWindow(panelId + '_QueryWindow', this.store, queryParams, Ext.getCmp(panelId), outsourcing);
        },
        tooltip: '<b>项目类别查询</b><br/>对项目类别进行查询'
    });
    this._buttonRefresh = new Ext.Toolbar.Button({
        iconCls: 'icon-refresh',
        text: '刷新',
        minWidth: 60,
        store: this._store,
        handler: function() {
            this.store.load();
        },
        tooltip: '<b>刷新列表</b><br/>更新项目分类列表'
    });
    this._buttonReset = new Ext.Toolbar.Button({
        iconCls: 'icon-reset',
        text: '重置',
        minWidth: 60,
        store: this._store,
        outsourcing:this._outsourcing,
        panelId: this._panelId,
        handler: function() {
            //清空查询条件
            var params = ['token','ID'];
            Srims.SetQueryParams.clearParams(queryParams, params);
            this.store.load();
        },
        tooltip: '<b>重置列表</b><br/>清空查询条件，重置列表'
    });
    var user = Srims.currentLoginLog.user;
    this._buttonQuery.setVisible(user.userRoleType == 'Administrator');

    Srims.common.OutsourcingShowPanel_AllocationInfo_ToolBar.superclass.constructor.call(this, {
        items: [this._buttonQuery, new Ext.Toolbar.Fill(), this._buttonRefresh, this._buttonReset]
    });

}
Ext.extend(Srims.common.OutsourcingShowPanel_AllocationInfo_ToolBar, Ext.Toolbar);
