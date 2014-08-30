
if (!Srims.type)
	Ext.namespace('Srims.type');

Srims.type.ManagementFeesGridPanel = function(id, store, title, iconCls,
		queryParams) {
	
	// fields
	this._store = store;
	this._store.grid = this;

	this._selections = new Ext.grid.RowSelectionModel();

	// controls
	this._columnModel = new Srims.type.ManagementFeesGridPanel_ColumnModel();// 位于文件ManagementFeesGridPanel_ColumnModel.js中
	this._toolbar = new Srims.type.ManagementFeesGridPanel_ToolBar(
			this._selections, this._store, id, queryParams);// 位于文件ManagementFeesGridPanel_ToolBar.js中
	this._filter = new Srims.type.ManagementFeesGridPanel_GridFilter();// 位于文件ManagementFeesGridPanel_GridFilter.js中

	// constructor
	var params = {};
	params.sm = this._selections;
	params.store = this._store;
	params.id = id;
	params.title = title;
	params.iconCls = iconCls;
	params.colModel = this._columnModel;
	params.tbar = this._toolbar;
	params.plugins = this._filter;
	params.defaultBBar = true;

	Srims.type.ManagementFeesGridPanel.superclass.constructor
			.call(this, params);

	// event
    this.on('celldblclick', onCellDblClick);

	// private methods
	function onCellDblClick(grid, rowIndex, columnIndex, e) {
		var managementFee = grid.getStore().getAt(rowIndex);
		Srims.type.showManagementFee(managementFee, grid._store);
	}
}
Ext.extend(Srims.type.ManagementFeesGridPanel, Srims.component.GridPanel);