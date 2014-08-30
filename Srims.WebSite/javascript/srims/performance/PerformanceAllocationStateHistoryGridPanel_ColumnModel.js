
if (!Srims.performance)
    Ext.namespace('Srims.performance');

Srims.performance.PerformanceAllocationStateHistoryGridPanel_ColumnModel = function() {
    Srims.performance.PerformanceAllocationStateHistoryGridPanel_ColumnModel.superclass.constructor.call(this, [{
        header: "id",
        hidden: true
    }, {
        header: "状态",
        dataIndex: 'state',
        width: 80,
        renderer: Srims.performance.fundAllocationStateRender
    }, {
        header: "状态时间",
        dataIndex: 'dateTime',
        width: 100,
        renderer: Date.render
    }, {
        header: "操作人",
        dataIndex: 'operator',
        width: 80
    }, {
        id: 'remark',
        header: "备注",
        dataIndex: 'remark'
}])
    }
    Ext.extend(Srims.performance.PerformanceAllocationStateHistoryGridPanel_ColumnModel, Ext.grid.ColumnModel);

