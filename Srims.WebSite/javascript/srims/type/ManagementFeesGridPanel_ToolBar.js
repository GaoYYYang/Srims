if (!Srims.type)
	Ext.namespace('Srims.type');

Srims.type.ManagementFeesGridPanel_ToolBar = function(selection, store,
		panelId, queryParams) {
	// field
	this._panelId = panelId;
	this._selection = selection;
	this._store = store;
	this._queryParams = queryParams;

	// controls

	this._buttonNew = new Ext.Toolbar.Button({
				iconCls : 'icon-new',
				text : '添加',
				minWidth : 60,
				selection : this._selection,
				store : this._store,
				handler : function() {
					Srims.type.newManagementFee(this.store);
				},
				tooltip : '<b>添加管理费收取分类</b><br/>输入管理费收取分类信息以添加类别'
			});
	this._buttonShow = new Ext.Toolbar.Button({
				iconCls : 'icon-show',
				text : '查看',
				minWidth : 60,
				store : this._store,
				selection : this._selection,
				handler : function() {
					if (this.selection.getCount() == 0)
						return;

					Srims.type.showManagementFee(this.selection.getSelected(),
							this.store);
				},
				hidden : true,
				tooltip : '<b>查管理费收取分类</b><br/>显示所选类别的详细信息'
			});
	this._buttonEdit = new Ext.Toolbar.Button({
				iconCls : 'icon-edit',
				text : '编辑',
				minWidth : 60,
				selection : this._selection,
				store : this._store,
				handler : function() {
					if (this.selection.getCount() == 0)
						return;
					Srims.type.editManagementFee(this.selection.getSelected(),
							this.store);
				},
				hidden : true,
				tooltip : '<b>编辑管理费收取分类</b><br/>编辑选中项目类别的信息'
			});
	this._buttonDelete = new Ext.Toolbar.Button({
				iconCls : 'icon-delete',
				text : '删除',
				minWidth : 60,
				store : this._store,
				selection : this._selection,
				handler : function() {
					if (this.selection.getCount() == 0)
						return;
					Srims.type.deleteManagementFee(
							this.selection.getSelected(), this.store)
				},
				hidden : true,
				tooltip : '<b>删除管理费收取分类</b>'
			});
	this._buttonRefresh = new Ext.Toolbar.Button({
				iconCls : 'icon-refresh',
				text : '刷新',
				minWidth : 60,
				store : this._store,
				handler : function() {
					this.store.load();
				},
				tooltip : '<b>刷新列表</b><br/>更新管理费收取分类列表'
			});
	this._buttonReset = new Ext.Toolbar.Button({
				iconCls : 'icon-reset',
				text : '重置',
				minWidth : 60,
				store : this._store,
				panelId : this._panelId,
				handler : function() {
					// 清空查询条件
					var params = ['token'];
					Srims.SetQueryParams.clearParams(queryParams, params);
					this.store.load();
				},
				tooltip : '<b>重置列表</b><br/>清空查询条件，重置列表'
			});

	Srims.type.ManagementFeesGridPanel_ToolBar.superclass.constructor.call(
			this, {
				items : [this._buttonNew, this._buttonShow, this._buttonEdit,
						this._buttonDelete, new Ext.Toolbar.Fill(),
						this._buttonRefresh, this._buttonReset]
			});

	// initial
	this._selection.buttonShow = this._buttonShow;
	this._selection.buttonEdit = this._buttonEdit;
	this._selection.buttonDelete = this._buttonDelete;

	// event method
	this._onSelection_selectionChagne = function(selection) {
		var buttonShow = selection.buttonShow;
		var buttonEdit = selection.buttonEdit;
		var buttonDelete = selection.buttonDelete;

		if (selection.getCount() == 0) {
			buttonShow.hide();
			buttonEdit.hide();
			buttonDelete.hide();
			return;
		}
		var managementFees = selection.getSelected();

		// 按钮显示权限未完成
		buttonShow.setVisible(true);
		buttonEdit.setVisible(true);
		buttonDelete.setVisible(true);
		// 按钮显示权限结束
	}
	// event
	this._selection.on('selectionchange', this._onSelection_selectionChagne);

}
Ext.extend(Srims.type.ManagementFeesGridPanel_ToolBar, Ext.Toolbar);