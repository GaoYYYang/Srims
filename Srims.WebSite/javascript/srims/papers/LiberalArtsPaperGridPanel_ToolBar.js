
if (!Srims.papers) 
    Ext.namespace('Srims.papers');

Srims.papers.LiberalArtsPaperGridPanel_ToolBar = function(selection, store, grid, panelId, isMagazineQuery, queryParams) {

    //fields
    this._panelId = panelId;
    this._selection = selection;
    this._isMagazineQuery = isMagazineQuery;
    this._store = store;
    this._queryParams = queryParams;
    this._grid = grid;
    
    //controls
    this._buttonQuery = new Ext.Toolbar.Button({
        iconCls: 'icon-query',
        text: '查询',
        minWidth: 60,
        selection: this._selection,
        panelId: this._panelId,
        store: this._store,
        isMagazineQuery: this._isMagazineQuery,
        handler: function(){
        Srims.papers.showLiberalArtsPaperQueryWindow(this.panelId + '_QueryWindow', this.store, this.isMagazineQuery, queryParams, Ext.getCmp(this.panelId));
        },
        tooltip: '<b>论文查询</b><br/>对论文信息进行复杂查询'
    });
    this._buttonImport = new Ext.Toolbar.Button({
        iconCls: 'icon-import',
        text: '导入',
        minWidth: 60,
        store: this._store,
        handler: function(){
        Srims.papers.showLiberalArtsImportWindow(this.store);
        },
        tooltip: '<b>论文导入</b><br/>将论文从excel表导入到数据库中'
    });
    this._buttonNew = new Ext.Toolbar.Button({
        iconCls: 'icon-new',
        text: '添加',
        minWidth: 60,
        selection: this._selection,
        handler: function(){
        Srims.papers.newLiberalArtsPaper();
        },
        tooltip: '<b>添加论文</b><br/>输入论文信息以添加论文'
    });
    this._buttonShow = new Ext.Toolbar.Button({
        iconCls: 'icon-show',
        text: '查看',
        minWidth: 60,
        store: this._store,
        selection: this._selection,
        handler: function(){
            if (this.selection.getCount() == 0) 
                return;

            Srims.papers.showLiberalArtsPaper(this.selection.getSelected(), this.store);
        },
        hidden: true,
        tooltip: '<b>查看论文</b><br/>显示所选论文的详细信息'
    });
    this._buttonEdit = new Ext.Toolbar.Button({
        iconCls: 'icon-edit',
        text: '编辑',
        minWidth: 60,
        selection: this._selection,
        handler: function(){
            if (this.selection.getCount() == 0) 
                return;
            Srims.papers.editLiberalArtsPaper(this.selection.getSelected());
        },
        hidden: true,
        tooltip: '<b>编辑论文</b><br/>编辑选中论文的基本、杂志、作者等信息'
    });
    this._buttonPaperAuthorManage = new Ext.Toolbar.Button({
        iconCls: 'icon-member-manage',
        text: '文科论文作者管理',
        minWidth: 60,
        selection: this._selection,
        handler: function(){
            if (this.selection.getCount() == 0) 
                return;
            Srims.papers.showLiberalArtsPaperAuthorManageWindow(this.selection.getSelected());
        },
        hidden: true,
        tooltip: '<b>编辑论文作者信息</b><br/>编辑选中论文的作者信息'
    });
    this._buttonDelete = new Ext.Toolbar.Button({
        iconCls: 'icon-delete',
        text: '删除',
        minWidth: 60,
        store: this._store,
        selection: this._selection,
        handler: function(){
            if (this.selection.getCount() == 0) 
                return;
            Srims.papers.deleteLiberalArtsPaper(this.selection.getSelected());
        },
        hidden: true,
        tooltip: '<b>删除论文</b>'
    });
    this._buttonRefresh = new Ext.Toolbar.Button({
        iconCls: 'icon-refresh',
        text: '刷新',
        minWidth: 60,
        store: this._store,
        handler: function(){
            this.store.load();
        },
        tooltip: '<b>刷新列表</b><br/>更新论文列表'
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
    this._buttonExport = new Ext.Toolbar.Button({
        text: '导出',
        iconCls: 'icon-export',
        minWidth: 60,
        grid: this._grid,
        store: this._store,
        params: this._queryParams,
        handler: function(){
            Srims.papers.exportLiberalArtsPaper(this.store.lastOptions.params, this.params);
        }
    });
    var user = Srims.currentLoginLog.user;
    //  this._buttonQuery.setVisible(user.userRoleType == 'Administrator');
    this._buttonNew.setVisible(user.hasPermission_EditPaper);
    this._buttonImport.setVisible(user.hasPermission_EditPaper);

    Srims.papers.LiberalArtsPaperGridPanel_ToolBar.superclass.constructor.call(this, {
        items: [this._buttonQuery, this._buttonImport, this._buttonExport, this._buttonNew, this._buttonShow, this._buttonEdit, this._buttonPaperAuthorManage, this._buttonDelete, new Ext.Toolbar.Fill(), this._buttonRefresh, this._buttonReset]
    });
    
    //initial
    this._selection.buttonShow = this._buttonShow;
    this._selection.buttonEdit = this._buttonEdit;
    this._selection.buttonDelete = this._buttonDelete;
    this._selection.buttonPaperAuthorManage = this._buttonPaperAuthorManage;
    
    //event methods
    this._onSelection_selectionChagne = function(selection){
        var buttonShow = selection.buttonShow;
        var buttonEdit = selection.buttonEdit;
        var buttonDelete = selection.buttonDelete;
        var buttonPaperAuthorManage = selection.buttonPaperAuthorManage;
        
        if (selection.getCount() == 0) {
            buttonShow.hide();
            buttonEdit.hide();
            buttonDelete.hide();
            buttonPaperAuthorManage.hide();
            return;
        }
        
        var paper = selection.getSelected();
        
        buttonShow.setVisible(paper.get('hasPermission_Show'));
        buttonShow.setDisabled(!paper.get('canShow'));
        
        buttonEdit.setVisible(paper.get('hasPermission_Edit'));
        buttonEdit.setDisabled(!paper.get('canEdit'));
        
        buttonDelete.setVisible(paper.get('hasPermission_Edit'));
        buttonDelete.setDisabled(!paper.get('canEdit'));
        
        buttonPaperAuthorManage.setVisible(paper.get('hasPermission_EditPaperAuhtor'));
        buttonPaperAuthorManage.setDisabled(!paper.get('canEditPaperAuthor'));
    }
    
    //events
    this._selection.on('selectionchange', this._onSelection_selectionChagne);
}
Ext.extend(Srims.papers.LiberalArtsPaperGridPanel_ToolBar, Ext.Toolbar);

