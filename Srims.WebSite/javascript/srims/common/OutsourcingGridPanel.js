/**
* @author dulintao
*/
if (!Srims.common)
    ext.namespace('Srims.common');
Srims.common.OutsourcingGridPanel = function(id, outsourcingStore, title,
		iconCls, queryParams) {
    // fields
    this._id = id;
    this._outsourcingStore = outsourcingStore;
    this._outsourcingStore.grid = this;

    // public method
    this.GetOutsourcingStore = function() {
        return this._outsourcingStore;
    };

    // controls
    this._selections = new Ext.grid.RowSelectionModel();

    this._columnModel = new Srims.common.OutsourcingPanel_ColumnModel(); // 位于文件outsourcingPanel_ColumnModel.js
    this._filters = new Srims.common.OutsourcingGridPanel_GridFilters(); // 位于文件outsourcingGridPanel_GridFilters.js
    this._toolbar = new Srims.common.OutsourcingGridPanel_ToolBar(
			this._outsourcingStore, this._selections, queryParams, id); // 位于文件outsourcingGridPanel_ToolBar.js
    this._view = new Ext.grid.GridView({
        forceFit: true,
        ignoreAdd: true,
        emptyText: '没有满足条件的外协单位'
    });
    // constructor
    Srims.common.OutsourcingGridPanel.superclass.constructor.call(this, {
        id: id,
        stateful: true,
        store: this._outsourcingStore,
        sm: this._selections,
        enableColumnHide: true,
        enableColumnMove: true,
        border: false,
        title: title,
        iconCls: iconCls,
        region: 'center',
        closable: true,
        loadMask: true,
        plugins: this._filters,
        colModel: this._columnModel,
        view: this._view,
        tbar: this._toolbar,
        bbar: new Ext.PagingToolbar({
            pageSize: 40,
            store: this._outsourcingStore,
            plugins: this._filters,
            displayInfo: true,
            displayMsg: '当前是第{0}条-第{1}条，共{2}条',
            emptyMsg: '没有可以显示的记录'
        })
    });
    this._outsourcingStore.load();
    // event
    this.on('celldblclick', onCellDblClick);
    // private methods
    function onCellDblClick(grid, rowIndex, columnIndex, e) {
        var outsourcing = grid.getStore().getAt(rowIndex);
        Srims.common.ShowOutsourcing(outsourcing, this._outsourcingStore);
    }
}
Ext.extend(Srims.common.OutsourcingGridPanel, Ext.grid.GridPanel);