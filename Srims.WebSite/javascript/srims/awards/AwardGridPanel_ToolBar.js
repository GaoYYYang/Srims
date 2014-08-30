
if (!Srims.awards) 
    Ext.namespace("Srims.awards");

Srims.awards.AwardGridPanel_ToolBar = function(grid, selection, store, panelId, queryParams){
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
            Srims.awards.showAwardQueryWindow(this.panelId + '_QueryWindow', this.store, queryParams, Ext.getCmp(this.panelId));
        },
        tooltip: '<b>奖励查询</b><br/>对奖励的信息进行复杂查询'
    });
    this._buttonImport = new Ext.Toolbar.Button({
        iconCls: 'icon-import',
        text: '导入',
        minWidth: 60,
        store: this._store,
        handler: function(){
            Srims.awards.showImportWindow(this.store);
        },
        tooltip: '<b>奖励导入</b><br/>将奖励从excel表导入到数据库中'
    });
    this._buttonNew = new Ext.Toolbar.Button({
        iconCls: 'icon-new',
        text: '添加',
        minWidth: 60,
        panelId: this._panelId,
        handler: function(){
            Srims.awards.showNewAwardWindow(this.panelId + '_NewWindow');
        },
        hidden: true,
        tooltip: '<b>添加奖励</b><br/>输入奖励信息以添加奖励'
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
            Srims.awards.showAward(this.selection.getSelected(), this.store);
        },
        hidden: true,
        tooltip: '<b>查看奖励</b><br/>显示所选奖励的详细信息'
    });
    this._buttonEdit = new Ext.Toolbar.Button({
        iconCls: 'icon-edit',
        text: '编辑',
        minWidth: 60,
        selection: this._selection,
        handler: function(){
            if (this.selection.getCount() == 0) 
                return;
            Srims.awards.showEditAwardWindow(this.selection.getSelected());
        },
        hidden: true,
        tooltip: '<b>编辑奖励</b><br/>编辑选中奖励的信息'
    });
    this._buttonWinnerManage = new Ext.Toolbar.Button({
        iconCls: 'icon-member-manage',
        text: '获奖人管理',
        minWidth: 60,
        selection: this._selection,
        handler: function(){
            if (this.selection.getCount() == 0) 
                return;
            
            Srims.awards.showAwardWinnerManageWindow(this.selection.getSelected());
        },
        hidden: true,
        tooltip: '<b>奖励成员管理</b><br/>管理选中奖励的奖励成员'
    });
    this._buttonDocumentManage = new Ext.Toolbar.Button({
        iconCls: 'icon-award-document-manage',
        text: '文档管理',
        minWidth: 60,
        selection: this._selection,
        handler: function(){
            if (this.selection.getCount() == 0) 
                return;
            
            Srims.awards.showAwardDocumentManageWindow(this.selection.getSelected());
        },
        hidden: true,
        tooltip: '<b>奖励文档管理</b><br/>管理选中奖励的奖励文档'
    });
    this._buttonDelete = new Ext.Toolbar.Button({
        iconCls: 'icon-delete',
        text: '删除',
        minWidth: 60,
        selection: this._selection,
        handler: function(){
            if (this.selection.getCount() == 0) 
                return;
            Srims.awards.deleteAward(this.selection.getSelected(), store);
        },
        hidden: true,
        tooltip: '<b>删除奖励</b>'
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
            //清空筛选条件
            var filters = Ext.getCmp(panelId)._filters;
            filters.clearFilters();
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
            Srims.awards.exportAward(this.store.lastOptions.params, queryParams);
        },
        tooltip: '<b>导出奖励</b><br/>导出所查询的奖励'
    });
    
    //根据用户权限显示查询按钮
    var user = Srims.currentLoginLog.user;
    this._buttonQuery.setVisible(user.userRoleType == 'Administrator');
    this._buttonNew.setVisible(user.hasPermission_editLiteralAward || user.hasPermission_editScienceAward);
    
    Srims.awards.AwardGridPanel_ToolBar.superclass.constructor.call(this, {
        items: [this._buttonQuery, this._buttonNew, this._buttonShow, this._buttonEdit, this._buttonWinnerManage, this._buttonDocumentManage, this._buttonDelete, new Ext.Toolbar.Fill(), this._buttonRefresh, this._buttonReset, this._buttonExport]
    });
    
    //initial
    this._selection.buttonShow = this._buttonShow;
    this._selection.buttonNew = this._buttonNew;
    this._selection.buttonEdit = this._buttonEdit;
    this._selection.buttonWinnerManage = this._buttonWinnerManage;
    this._selection.buttonDelete = this._buttonDelete;
    this._selection.buttonDocumentManage = this._buttonDocumentManage;
    
    //event methods
    this._onSelection_selectionChagne = function(selection){
        var buttonShow = selection.buttonShow;
        var buttonNew = selection.buttonNew;
        var buttonEdit = selection.buttonEdit;
        var buttonWinnerManage = selection.buttonWinnerManage;
        var buttonDelete = selection.buttonDelete;
        var buttonDocumentManage = selection.buttonDocumentManage;
        
        if (selection.getCount() == 0) {
            buttonShow.hide();
            buttonNew.hide();
            buttonEdit.hide();
            buttonWinnerManage.hide();
            buttonDelete.hide();
            buttonDocumentManage.hide();
            return;
        }
        
        var award = selection.getSelected();
        //根据权限显示按钮
        buttonShow.setVisible(award.get('hasPermission_ShowAward'));
        buttonShow.setDisabled(!award.get('canShowAward'));
        
        buttonEdit.setVisible(award.get('hasPermission_EditAward'));
        buttonEdit.setDisabled(!award.get('canEditAward'));
        
        buttonWinnerManage.setVisible(award.get('hasPermission_EditAward'));
        buttonWinnerManage.setDisabled(!award.get('canEditAward'));
        
        buttonDelete.setVisible(award.get('hasPermission_EditAward'));
        buttonDelete.setDisabled(!award.get('canEditAward'));
        
        buttonDocumentManage.setVisible(award.get('hasPermission_ShowAwardDocument'));
        buttonDocumentManage.setDisabled(!award.get('canShowAwardDocument'));
    }
    //event
    this._selection.on('selectionchange', this._onSelection_selectionChagne);
}
Ext.extend(Srims.awards.AwardGridPanel_ToolBar, Ext.Toolbar);










