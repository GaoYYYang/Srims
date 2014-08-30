
if (!Srims.patents) 
    Ext.namespace("Srims.patents");

Srims.patents.PatentGridPanel_ToolBar = function(grid, selection, store, panelId, queryParams){
    //fields
    this._grid = grid;
    this._panelId = panelId;
    this._selection = selection;
    this._store = store;
    this._queryParams = queryParams;
    
    //controls
    this._buttonQuery = new Ext.Toolbar.Button({
        iconCls: 'icon-query',
        text: '查询',
        minWidth: 60,
        selection: this._selection,
        panelId: this._panelId,
        store: this._store,
        handler: function(){
            Srims.patents.showPatentQueryWindow(this.panelId + '_QueryWindow', this.store, queryParams, Ext.getCmp(this.panelId));
        },
        tooltip: '<b>专利查询</b><br/>对专利的信息进行复杂查询'
    });
    this._buttonNew = new Ext.Toolbar.Button({
        iconCls: 'icon-new',
        text: '添加',
        minWidth: 60,
        panelId: this._panelId,
        hidden: true,
        handler: function(){
            Srims.patents.showNewPatentWindow(this.panelId + '_NewWindow');
        },
        hidden: true,
        tooltip: '<b>添加专利</b><br/>输入专利信息以添加专利'
    });
    this._buttonImport = new Ext.Toolbar.Button({
        iconCls: 'icon-import',
        text: '导入',
        minWidth: 60,
        store: this._store,
        handler: function(){
            Srims.patents.showImportPatentWindow(this.store);
        },
        tooltip: '<b>专利导入</b><br/>将专利从excel表导入到数据库中'
    });
    this._buttonShow = new Ext.Toolbar.Button({
        iconCls: 'icon-show',
        text: '查看',
        minWidth: 60,
        selection: this._selection,
        store: this._store,
        handler: function(){
            if (this.selection.getCount() == 0) 
                return;
            Srims.patents.showPatent(this.selection.getSelected(), this.store);
        },
        hidden: true,
        tooltip: '<b>查看专利</b><br/>显示所选专利的详细信息'
    });
    this._buttonEdit = new Ext.Toolbar.Button({
        iconCls: 'icon-edit',
        text: '编辑',
        minWidth: 60,
        selection: this._selection,
        handler: function(){
            if (this.selection.getCount() == 0) 
                return;
            Srims.patents.showEditPatentWindow(this.selection.getSelected());
        },
        hidden: true,
        tooltip: '<b>编辑专利</b><br/>编辑选中专利的信息'
    });
    this._buttonInventerManage = new Ext.Toolbar.Button({
        iconCls: 'icon-member-manage',
        text: '发明人管理',
        minWidth: 60,
        selection: this._selection,
        handler: function(){
            if (this.selection.getCount() == 0) 
                return;
            Srims.patents.showPatentInventerManageWindow(this.selection.getSelected());
        },
        hidden: true,
        tooltip: '<b>专利发明者管理</b><br/>管理选中专利的发明人员'
    });
    this._buttonDelete = new Ext.Toolbar.Button({
        iconCls: 'icon-delete',
        text: '删除',
        minWidth: 60,
        selection: this._selection,
        store: this._store,
        handler: function(){
            if (this.selection.getCount() == 0) 
                return;
            Srims.patents.deletePatent(this.selection.getSelected(), this.store);
        },
        hidden: true,
        tooltip: '<b>删除专利</b>'
    });
    this._buttonRefresh = new Ext.Toolbar.Button({
        iconCls: 'icon-refresh',
        text: '刷新',
        minWidth: 60,
        store: this._store,
        handler: function(){
            this.store.load();
        },
        tooltip: '<b>刷新列表</b><br/>更新项目列表'
    });
    this._buttonReset = new Ext.Toolbar.Button({
        iconCls: 'icon-reset',
        text: '重置',
        menuAlign: 'right',
        minWidth: 60,
        store: this._store,
        panelId: this._panelId,
        handler: function(){
            //清空查询条件
            var params = ['token'];
            Srims.SetQueryParams.clearParams(queryParams, params);
            store.load();
        },
        tooltip: '<b>重置列表</b><br/>清空查询条件，重置列表'
    });
    this._buttonExport = new Ext.Toolbar.Button({
        text: '导出',
        iconCls: 'icon-export',
        minWidth: 60,
        grid: this._grid,
        store: this._store,
        handler: function(){
            Srims.patents.exportPatent(this.store.lastOptions.params, queryParams);
        },
        tooltip: '<b>导出专利</b><br/>导出所查询的专利'
    });
    
    
    //根据用户权限显示查询按钮
    var user = Srims.currentLoginLog.user;
    this._buttonQuery.setVisible(user.userRoleType == 'Administrator');
    
    Srims.patents.PatentGridPanel_ToolBar.superclass.constructor.call(this, {
        items: [this._buttonQuery, this._buttonNew, this._buttonImport, this._buttonShow, this._buttonEdit, this._buttonInventerManage, this._buttonDelete, new Ext.Toolbar.Fill(), this._buttonRefresh, this._buttonReset, this._buttonExport]
    });
    
    var user = Srims.currentLoginLog.user;
    this._buttonImport.setVisible(user.hasPermission_EditPatent);
    this._buttonNew.setVisible(user.hasPermission_EditPatent);
    
    //initial
    this._selection.buttonShow = this._buttonShow;
    this._selection.buttonEdit = this._buttonEdit;
    this._selection.buttonInventerManage = this._buttonInventerManage;
    this._selection.buttonDelete = this._buttonDelete;
    
    //event methods
    this._onSelection_selectionChagne = function(selection){
        var buttonShow = selection.buttonShow;
        var buttonEdit = selection.buttonEdit;
        var buttonInventerManage = selection.buttonInventerManage;
        var buttonDelete = selection.buttonDelete;
        if (selection.getCount() == 0) {
            buttonShow.hide();
            buttonEdit.hide();
            buttonInventerManage.hide();
            buttonDelete.hide();
            return;
        }
        
        var patent = selection.getSelected();
        //根据权限显示按钮
        buttonShow.setVisible(patent.get('hasPermission_ShowPatent'));
        buttonShow.setDisabled(!patent.get('canShowPatent'));
        buttonEdit.setVisible(patent.get('hasPermission_EditPatent'));
        buttonEdit.setDisabled(!patent.get('canEditPatent'));
        buttonInventerManage.setVisible(patent.get('hasPermission_EditPatent'));
        buttonInventerManage.setDisabled(!patent.get('canEditPatent'));
        buttonDelete.setVisible(patent.get('hasPermission_EditPatent'));
        buttonDelete.setDisabled(!patent.get('canEditPatent'));
        
    }
    //event
    this._selection.on('selectionchange', this._onSelection_selectionChagne);
}
Ext.extend(Srims.patents.PatentGridPanel_ToolBar, Ext.Toolbar);


