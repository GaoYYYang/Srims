
if (!Srims.experts)
    Ext.namespace('Srims.experts');


Srims.experts.ExpertGridPanel_ToolBar = function(expertStore, selection, panelId, queryParams) {
    this._panelId = panelId;
    this._store = expertStore;
    this._selection = selection;
    this._expert = selection.getSelected();
    this._gridPanel = Ext.getCmp(panelId);

    var user = Srims.currentLoginLog.user;

    //controlls
    this._buttonNew = new Ext.Toolbar.Button({
        iconCls: 'icon-new',
        text: '添加专家',
        handler: function() {
            Srims.experts.ExpertAction.newExpert();
        },
        hidden: !user.hasPermission_EditExpert,
        tooltip: '<b>新建专家</b><br/>输入专家基本信息以新建专家'
    })
    this._buttonShow = new Ext.Toolbar.Button({
        iconCls: 'icon-show',
        text: '查看',
        selection: this._selection,
        store: this._store,
        handler: function() {
            if (this.selection.getCount() == 0)
                return;
            Srims.experts.ExpertAction.showExpert(this.selection.getSelected(), this.store);
        },
        hidden: true,
        tooltip: '<b>查看专家</b><br/>显示专家的相关信息'
    })
    this._buttonDelete = new Ext.Toolbar.Button({
        iconCls: 'icon-delete',
        text: '删除',
        selection: this._selection,
        store: this._store,
        handler: function() {
            Srims.experts.ExpertAction.DeleteExpert(this.selection.getSelected(), this.store);
        },
        hidden: true,
        tooltip: '<b>查询专家</b><br/>查询相关专家'
    })
    this._buttonQuery = new Ext.Toolbar.Button({
        iconCls: 'icon-expert-query',
        text: '查询',
        panelId: this._panelId,
        store: this._store,
        handler: function() {
            Srims.experts.ExpertAction.showExpertQueryPanel(this.store, queryParams, Ext.getCmp(this.panelId));
        },
        hidden: !(user.hasPermission_ShowExpert || user.hasPermission_EditExpert || user.hasPermission_EditExpertLinkWay),
        tooltip: '<b>查询专家</b><br/>查询相关专家'
    })
    this._buttonExport = new Ext.Toolbar.Button({
        text: '导出',
        iconCls: 'icon-export',
        minWidth: 60,
        grid: this._gridPanel,
        store: this._store,
        handler: function() {
            Srims.experts.ExpertAction.exportExpert(this.store.lastOptions.params, queryParams);
        },
        hidden: !(user.hasPermission_ShowExpert || user.hasPermission_EditExpert || user.hasPermission_EditExpertLinkWay),
        tooltip: '<b>导出专家</b><br/>导出所查询的专家'
    })
    this._buttonImport = new Ext.Toolbar.Button({
        iconCls: 'icon-import',
        text: '导入',
        minWidth: 60,
        store: this._store,
        handler: function() {
            Srims.experts.ExpertAction.showImportExpertWindow(this.store);
        },
        tooltip: '<b>专家导入</b><br/>将专家从excel表导入到数据库中'
    });
    this._buttonUpdate = new Ext.Toolbar.Button({
        iconCls: 'icon-import',
        text: '更新',
        minWidth: 60,
        store: this._store,
        handler: function() {
            Srims.experts.ExpertAction.showUpdateExpertWindow(this.store);
        },
        tooltip: '<b>专家更新</b><br/>将专家从excel表更新到数据库中'
    });
    this._buttonUpdateIDCard = new Ext.Toolbar.Button({
        iconCls: 'icon-import',
        text: '更新身份证',
        minWidth: 60,
        store: this._store,
        handler: function() {
            Srims.experts.ExpertAction.showUpdateExpertIDCardWindow(this.store);
        },
        hidden: !user.isSuper,
        tooltip: '<b>专家更新身份证</b><br/>将专家从excel表更新到数据库中'
    });
    this._buttonImportAuto = new Ext.Toolbar.Button({
        iconCls: 'icon-finance-auto-import',
        text: '自动从人事处导入专家',
        minWidth: 60,
        store: this._store,
        handler: function() {
            Srims.experts.atuoImportExpert(this.store);
        },
        tooltip: '<b>自动从人事处导入专家</b>、'
    });
    this._buttonRefresh = new Ext.Toolbar.Button({
        iconCls: 'icon-refresh',
        text: '刷新',
        minWidth: 60,
        store: this._store,
        handler: function() {
            this.store.load();
        },
        tooltip: '<b>刷新列表</b><br/>更新专家列表'
    })
    this._buttonReset = new Ext.Toolbar.Button({
        iconCls: 'icon-reset',
        text: '重置',
        minWidth: 60,
        store: this._store,
        panelId: this._panelId,
        handler: function() {
            //清空查询条件
            var params = ['token'];
            Srims.SetQueryParams.clearParams(queryParams, params);
            this.store.load();
            //清空筛选条件
            var filters = Ext.getCmp(this.panelId)._filters;
            filters.clearFilters();
        },
        tooltip: '<b>重置列表</b><br/>清空查询条件，重置列表'
    })

    Srims.experts.ExpertGridPanel_ToolBar.superclass.constructor.call(this, {
        items: [this._buttonNew, this._buttonQuery, this._buttonExport, this._buttonImport, this._buttonUpdate, this._buttonUpdateIDCard, this._buttonImportAuto, this._buttonShow, this._buttonDelete, /*this._buttonEdit, this._buttonEditLinkWay,*/new Ext.Toolbar.Fill(), this._buttonRefresh, this._buttonReset]
    })

    //根据用户权限显示按钮
    var user = Srims.currentLoginLog.user;
    this._buttonNew.setVisible(user.hasPermission_EditExpert);
    this._buttonImport.setVisible(user.hasPermission_EditExpert);
    this._buttonImportAuto.setVisible(user.hasPermission_EditExpert);

    //initial
    this._selection.buttonShow = this._buttonShow;
    this._selection.buttonDelete = this._buttonDelete;

    //event methods
    this._onSelection_selectionChange = function(selection) {
        var buttonShow = selection.buttonShow;
        var buttonDelete = selection.buttonDelete;

        if (selection.getCount() == 0) {
            buttonShow.hide();
            buttonDelete.hide();
            return;
        }
        var expert = selection.getSelected();

        buttonShow.setVisible(expert.get('hasPermission_ShowExpert'));
        buttonShow.setDisabled(!expert.get('canShowExpert'));
        buttonDelete.setVisible(expert.get('hasPermission_EditExpert'));
        buttonDelete.setDisabled(!expert.get('canEditExpert'));
    }

    //event
    this._selection.on('selectionchange', this._onSelection_selectionChange);
}
Ext.extend(Srims.experts.ExpertGridPanel_ToolBar, Ext.Toolbar);
