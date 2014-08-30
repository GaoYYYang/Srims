
if (!Srims.performance)
    Ext.namespace("Srims.performance");

Srims.performance.PerformanceAllocationShowPanel_StateHistoryForm = function(performance) {

    var load_url = Srims.service.performance.PerformanceAllocationStateHistoryService + '/GetByPerformanceAllocation';
    this._store = new Srims.performance.PerformanceAllocationStateHistoryStore(load_url, {
        performanceID: performance.get('id')
    });
    this._columnModel = new Srims.performance.PerformanceAllocationStateHistoryGridPanel_ColumnModel();

    this._gridPanelFundAllocationStateHistory = new Ext.grid.GridPanel({
        store: this._store,
        colModel: this._columnModel,
        enableColumnHide: false,
        enableColumnMove: true,
        enableHdMenu: false,
        border: false,
        width: 700,
        autoExpand: true,
        autoExpandColumn: 'accountBookNumber',
        stripeRows: true,
        loadMask: true,
        autoHeight: true,
        stateful: false,
        viewConfig: {
            autoFill: true,
            scrollOffset: 0,
            forceFit: true,
            emptyText: '没有状态历史信息'
        }
    });

    Srims.performance.PerformanceAllocationShowPanel_StateHistoryForm.superclass.constructor.call(this, {
        collapsible: true,
        title: '绩效分配状态历史信息',
        frame: true,
        labelWidth: 100,
        bodyStyle: 'padding:5px 5px 0',
        style: 'margin-bottom: 2px',
        defaultType: 'textfield',
        titleCollapse: true,
        items: [this._gridPanelFundAllocationStateHistory]
    });

    this._store.load();
}
Ext.extend(Srims.performance.PerformanceAllocationShowPanel_StateHistoryForm, Ext.form.FormPanel, {});

