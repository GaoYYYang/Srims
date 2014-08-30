
if (!Srims.patents)
    Ext.namespace("Srims.patents");

Srims.patents.PatentAgencyGridPanel_ToolBar = function(grid, selection, store, panelId, queryParams) {
    //fields
    this._grid = grid;
    this._panelId = panelId;
    this._selection = selection;
    this._store = store;
    this._queryParams = queryParams;

    //controls
    this._buttonNew = new Ext.Toolbar.Button({
        iconCls: 'icon-new',
        text: '添加',
        minWidth: 60,
        panelId: this._panelId,
        hidden: false,
        handler: function() {
            Srims.patents.showNewPatentAgencyWindow(this.panelId + '_NewWindow');
        },
        tooltip: '<b>添加专利代理机构</b><br/>输入专利代理机构信息'
    });
    this._buttonEdit = new Ext.Toolbar.Button({
        iconCls: 'icon-edit',
        text: '编辑',
        minWidth: 60,
        selection: this._selection,
        handler: function() {
            if (this.selection.getCount() == 0)
                return;
            Srims.patents.showEditPatentAgencyWindow(this.selection.getSelected());
        },
        hidden: true,
        tooltip: '<b>编辑专利代理机构</b><br/>编辑选中专利代理机构的信息'
    });
    this._buttonDelete = new Ext.Toolbar.Button({
        iconCls: 'icon-delete',
        text: '删除',
        minWidth: 60,
        selection: this._selection,
        store: this._store,
        handler: function() {
            if (this.selection.getCount() == 0)
                return;

            Srims.patents.deletePatentAgency(this.selection.getSelected(), this.store);
        },
        hidden: true,
        tooltip: '<b>删除专利代理机构</b>'
    });
    this._buttonRefresh = new Ext.Toolbar.Button({
        iconCls: 'icon-refresh',
        text: '刷新',
        minWidth: 60,
        store: this._store,
        handler: function() {
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
        handler: function() {
            //清空查询条件
            var params = ['token'];
            Srims.SetQueryParams.clearParams(queryParams, params);
            store.load();
        },
        tooltip: '<b>重置列表</b><br/>清空查询条件，重置列表'
    });

    //根据用户权限显示查询按钮
    var user = Srims.currentLoginLog.user;
    this._buttonNew.setVisible(user.hasPermission_ManagePatent);

    Srims.patents.PatentAgencyGridPanel_ToolBar.superclass.constructor.call(this, {
        items: [this._buttonNew, this._buttonEdit, this._buttonDelete, new Ext.Toolbar.Fill(), this._buttonRefresh, this._buttonReset]
    });

    //initial

    this._selection.buttonEdit = this._buttonEdit;
    this._selection.buttonDelete = this._buttonDelete;

    //event methods
    this._onSelection_selectionChagne = function(selection) {
        var buttonEdit = selection.buttonEdit;
        var buttonDelete = selection.buttonDelete;
        if (selection.getCount() == 0) {
            buttonEdit.hide();
            buttonDelete.hide();
            return;
        }

        var patentAgency = selection.getSelected();
        //根据权限显示按钮
        buttonEdit.setVisible(patentAgency.get('hasPermission_EditPatentAgency'));
        buttonEdit.setDisabled(!patentAgency.get('canEditPatentAgency'));

        buttonDelete.setVisible(patentAgency.get('hasPermission_EditPatentAgency'));
        buttonDelete.setDisabled(!patentAgency.get('canEditPatentAgency'));

    }
    //event
    this._selection.on('selectionchange', this._onSelection_selectionChagne);
}
Ext.extend(Srims.patents.PatentAgencyGridPanel_ToolBar, Ext.Toolbar);
