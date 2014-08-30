/**
 * @author dulintao
 */
if (!Srims.common)
	Ext.namespace('Srims.common');

Srims.common.OutsourcingUnitGridPanel_ToolBar = function(store, selection,
		queryParams, panelID) {
	this._store = store;
	this._panelID = panelID;
	this._selection = selection;
	this._buttonNew = new Ext.Toolbar.Button({
				iconCls : 'icon-new',
				text : '新建',
				minWidth : 60,
				selection : this._selection,
				store:this._store,
				handler : function() {
					Srims.common.NewOutsourcingUnit(this.store);
				},
				tooltip : '<b>新建外协单位</b><br/>填写相应外协单位信息建立新的外协单位'
			});
	this._buttonShow = new Ext.Toolbar.Button({
				iconCls : 'icon-show',
				text : '查看',
				minWidth : 60,
				selection : this._selection,
				store : this._store,
				handler : function() {
					if (this.selection.getCount() == 0)
						return;
					Srims.common.ShowOutsourcing(this.selection.getSelected(),this.store);
				},
				hidden : true,
				tooltip : '<b>查看外协单位<b/><br/>显示所选外协单位的详细信息'
			});
	this._buttonEdit = new Ext.Toolbar.Button({
				iconCls : 'icon-edit',
				text : '编辑',
				minWidth : 60,
				selection : this._selection,
				handler : function() {
					if (this.selection.getCount() == 0)
						return;
					Srims.common.EditOutsourcing(this.selection.getSelected());
				},
				hidden : true,
				tooltip : '<b>编辑</b><br/>编辑所选外协单位'
			});
	this._buttonDelete = new Ext.Toolbar.Button({
		iconCls : 'icon-delete',
		text : '删除',
		minWidth : 60,
		selection : this._selection,
		store:this._store,
		handler : function() {
			if (this.selection.getCount == 0)
				return;
			Srims.common.DeleteOutsourcing(this.selection.getSelected(),this.store);
		},
		hidden : true,
		tooltip : '<b>删除</b><br/>删除所选外协单位'
	});
	this._buttonRefresh = new Ext.Toolbar.Button({
				iconCls : 'icon-refresh',
				text : '刷新',
				minWidth : 60,
				store : this._store,
				handler : function() {
					this.store.load();
				},
				tooltip : '<b>刷新列表</b><br/>更新外协单位列表'
			});
	Srims.common.OutsourcingUnitGridPanel_ToolBar.superclass.constructor.call(this,
			{
				items : [this._buttonNew, this._buttonShow, this._buttonEdit,
						this._buttonDelete, new Ext.Toolbar.Fill(), this._buttonRefresh]
			});
	// initial
	this._selection.buttonShow = this._buttonShow;
	this._selection.buttonEdit = this._buttonEdit;
	this._selection.buttonDelete = this._buttonDelete;
	// event methods
	this._onSelection_selectionChange = function(selection) {
		var buttonShow = selection.buttonShow;
		var buttonEdit = selection.buttonEdit;
		var buttonDelete = selection.buttonDelete;
		if (selection.getCount() == 0) {
			buttonShow.hide();
			buttonEdit.hide();
			buttonDelete.hide();
			return;
		}
		var outsourcing = selection.getSelected();
		buttonShow.show();
		buttonEdit.setVisible(outsourcing.get('hasPermission_Edit'));
		buttonEdit.setDisabled(!outsourcing.get('canEdit'));
		buttonDelete.setVisible(outsourcing.get('hasPermission_Delete'));
		buttonDelete.setDisabled(!outsourcing.get('canDelete'));
	}
	this._selection.on('selectionchange', this._onSelection_selectionChange);
}
Ext.extend(Srims.common.OutsourcingUnitGridPanel_ToolBar, Ext.Toolbar);