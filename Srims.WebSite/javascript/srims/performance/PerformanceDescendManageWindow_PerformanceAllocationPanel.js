
if (!Srims.performance)
    Ext.namespace('Srims.performance');

Srims.performance.PerformanceAllocationManageWindow_PerformanceAllocationPanel = function(performance, window) {

    this._performance = performance;
    params = {
        performanceId: performance.get('id')
    }
    this._store = new Srims.performance.PerformanceAllocationStore(Srims.service.performance.PerformanceAllocationService + '/GetByPerformance', params);
    this._store.window = window;
    this._store.performance = performance;

    this._selections = new Ext.grid.RowSelectionModel();
    this._columnModel = new Srims.performance.PerformanceAllocationGridPanel_ColumnModel(false, this._selections);
    this._toolBar = new Srims.performance.PerformanceAllocationGridPanel_ToolBar(this._selections, this._store, id, params, true, this);

    var params = {};
    params.sm = this._selections;
    params.store = this._store;
    params.colModel = this._columnModel;
    params.height = 160;
    params.tbar = this._toolBar;
    params.defaultBBar = false;

    this._gridPanelPerformanceAllocation = new Srims.component.GridPanel(params);

    Srims.performance.PerformanceAllocationManageWindow_PerformanceAllocationPanel.superclass.constructor.call(this, {
        collapsible: true,
        title: '课题组间接费用和绩效记录',
        frame: true,
        style: 'margin-bottom: 2px',
        defaultType: 'textfield',
        titleCollapse: false,
        items: [this._gridPanelPerformanceAllocation]
    });
    this._store.load();

    this._gridPanelPerformanceAllocation.window = window;
    this._gridPanelPerformanceAllocation.on('celldblclick', onCellDblClick);
    //private methods
    function onCellDblClick(grid, rowIndex, columnIndex, e) {
        var performanceAllocation = grid.getStore().getAt(rowIndex);
        Srims.performance.showperformanceAllocationInfoByperformanceAllocation(performanceAllocation);
        window.hide();
    }
}
Ext.extend(Srims.performance.PerformanceAllocationManageWindow_PerformanceAllocationPanel, Ext.FormPanel, {});

