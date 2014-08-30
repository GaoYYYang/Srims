if (!Srims.stamp)
    Ext.namespace('Srims.stamp');

Srims.stamp.StateStateHistoryColumnModel = function() {
    Srims.stamp.StateStateHistoryColumnModel.superclass.constructor.call(this, [{
        header: "id",
        hidden: true
    }, {
        header: "状态",
        dataIndex: 'state',
        width: 80,
        renderer: Srims.stamp.StampStateRender
    }, {
        header: "状态时间",
        dataIndex: 'dateTime',
        width: 80,
        sortable: true,
        hidden: false
    }, {
        header: "操作人",
        dataIndex: 'operator',
        width: 80
    }, {
        header: "备注",
        dataIndex: 'remark',
        width: 80
}])
    }
    Ext.extend(Srims.stamp.StateStateHistoryColumnModel, Ext.grid.ColumnModel);