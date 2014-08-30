
if (!Srims.papers) 
    Ext.namespace('Srims.papers');

Srims.papers.MagazineGridPanel_ToolBar = function(selection, store, panelId, isMagazineQuery, queryParams){

    //fields
    this._panelId = panelId;
    this._isMagazineQuery = isMagazineQuery;
    this._selection = selection;
    this._store = store;
    //controls
    this._buttonQuery = new Ext.Toolbar.Button({
        iconCls: 'icon-query',
        text: '查询',
        minWidth: 60,
        selection: this._selection,
        panelId: this._panelId,
        store: this._store,
        isManageQuery: this._isMagazineQuery,
        handler: function(){
            Srims.papers.showMagazineQueryWindow(this.panelId + '_QueryWindow', this.store, this.isManageQuery, queryParams, Ext.getCmp(this.panelId));
        },
        tooltip: '<b>杂志查询</b><br/>对杂志信息进行复杂查询'
    });
    this._buttonNew = new Ext.Toolbar.Button({
        iconCls: 'icon-new',
        text: '添加',
        minWidth: 60,
        selection: this._selection,
        store: this._store,
        handler: function(){
            Srims.papers.newMagazine();
        },
        tooltip: '<b>添加杂志</b><br/>输入杂志信息以添加杂志'
    });
    this._buttonImport = new Ext.Toolbar.Button({
        iconCls: 'icon-import',
        text: '导入',
        minWidth: 60,
        store: this._store,
        handler: function(){
            Srims.papers.showImportMagazineWindow(this.store);
        },
        tooltip: '<b>杂志导入</b><br/>将杂志从excel表导入到数据库中'
    });
    this._buttonImportMagazineInformation = new Ext.Toolbar.Button({
        iconCls: 'icon-import',
        text: '导入年度信息',
        minWidth: 60,
        store: this._store,
        handler: function(){
            Srims.papers.showImportMagazineInformationWindow(this.store);
        },
        tooltip: '<b>杂志年度信息导入</b><br/>将杂志的年度信息从excel表导入到数据库中'
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
            Srims.papers.showMagazine(this.selection.getSelected(), this.store);
        },
        hidden: true,
        tooltip: '<b>查看杂志</b><br/>显示所选杂志的详细信息'
    });
    this._buttonEdit = new Ext.Toolbar.Button({
        iconCls: 'icon-edit',
        text: '编辑',
        minWidth: 60,
        selection: this._selection,
        store: this._store,
        handler: function(){
            if (this.selection.getCount() == 0) 
                return;
            Srims.papers.editMagazine(this.selection.getSelected(), this.store);
        },
        hidden: true,
        tooltip: '<b>编辑杂志</b><br/>编辑选中杂志的信息'
    });
    this._buttonYearInforManage = new Ext.Toolbar.Button({
        iconCls: 'icon-edit',
        text: '年度信息管理',
        minWidth: 60,
        selection: this._selection,
        handler: function(){
            if (this.selection.getCount() == 0) 
                return;
            Srims.papers.showMagazineYearInforMagazineWindow(this.selection.getSelected());
        },
        hidden: true,
        tooltip: '<b>编辑杂志年度信息</b><br/>编辑选中杂志的年度信息'
    });
    this._buttonOccupationManage = new Ext.Toolbar.Button({
        iconCls: 'icon-edit',
        text: '任职信息管理',
        minWidth: 60,
        selection: this._selection,
        handler: function(){
            if (this.selection.getCount() == 0) 
                return;
            Srims.papers.showMagazineOccupationManageWindow(this.selection.getSelected());
        },
        hidden: true,
        tooltip: '<b>编辑杂志任职信息</b><br/>编辑选中杂志的任职信息'
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
            Srims.papers.deleteMagazine(this.selection.getSelected());
        },
        hidden: true,
        tooltip: '<b>删除杂志</b>'
    });
    this._buttonRefresh = new Ext.Toolbar.Button({
        iconCls: 'icon-refresh',
        text: '刷新',
        minWidth: 60,
        store: this._store,
        handler: function(){
            this.store.load();
        },
        tooltip: '<b>刷新列表</b><br/>更新杂志列表'
    });
    this._buttonReset = new Ext.Toolbar.Button({
        iconCls: 'icon-reset',
        text: '重置',
        minWidth: 60,
        store: this._store,
        panelId: this._panelId,
        handler: function(){
            //清空查询条件
            var params = ['token'];
            Srims.SetQueryParams.clearParams(queryParams, params);
            this.store.load();
            //清空筛选条件
            var filters = Ext.getCmp(this.panelId)._filters;
            filters.clearFilters();
        },
        tooltip: '<b>重置列表</b><br/>清空查询条件，重置列表'
    });
    var user = Srims.currentLoginLog.user;
    this._buttonQuery.setVisible(user.userRoleType == 'Administrator');
    this._buttonImport.setVisible(user.userRoleType == 'Administrator');
    this._buttonImportMagazineInformation.setVisible(user.userRoleType == 'Administrator');
    
    Srims.papers.MagazineGridPanel_ToolBar.superclass.constructor.call(this, {
        items: [this._buttonQuery, this._buttonNew, this._buttonImport, this._buttonImportMagazineInformation, this._buttonShow, this._buttonEdit, this._buttonYearInforManage, this._buttonOccupationManage, this._buttonDelete, new Ext.Toolbar.Fill(), this._buttonRefresh, this._buttonReset]
    });
    
    //initial
    this._selection.buttonShow = this._buttonShow;
    this._selection.buttonEdit = this._buttonEdit;
    this._selection.buttonDelete = this._buttonDelete;
    this._selection.buttonYearInforManage = this._buttonYearInforManage;
    this._selection.buttonOccupationManage = this._buttonOccupationManage;
    
    //event methods
    this._onSelection_selectionChagne = function(selection){
        var buttonShow = selection.buttonShow;
        var buttonEdit = selection.buttonEdit;
        var buttonDelete = selection.buttonDelete;
        var buttonYearInforManage = selection.buttonYearInforManage;
        var buttonOccupationManage = selection.buttonOccupationManage;
        
        if (selection.getCount() == 0) {
            buttonShow.hide();
            buttonEdit.hide();
            buttonDelete.hide();
            buttonYearInforManage.hide();
            buttonOccupationManage.hide();
            return;
        }
        
        var magazine = selection.getSelected();
        
        buttonShow.setVisible(magazine.get('hasPermission_Show'));
        buttonShow.setDisabled(!magazine.get('canShow'));
        
        buttonEdit.setVisible(magazine.get('hasPermission_Edit'));
        buttonEdit.setDisabled(!magazine.get('canEdit'));
        
        buttonDelete.setVisible(magazine.get('hasPermission_Edit'));
        buttonDelete.setDisabled(!magazine.get('canEdit'));
        
        buttonYearInforManage.setVisible(magazine.get('hasPermission_EditMagazineInformation'));
        buttonYearInforManage.setDisabled(!magazine.get('canEdit_MagazineInformation'));

        buttonOccupationManage.setVisible(magazine.get('hasPermission_EditMagazineOccupation'));
        buttonOccupationManage.setDisabled(!magazine.get('canEdit_MagazineOccupation'));
    }
    
    //events
    this._selection.on('selectionchange', this._onSelection_selectionChagne);
}
Ext.extend(Srims.papers.MagazineGridPanel_ToolBar, Ext.Toolbar);

