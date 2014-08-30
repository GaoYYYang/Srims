
if (!Srims.fund) 
    Ext.namespace('Srims.fund');

Srims.fund.VoucherStateHistoryColumnModel = function(){
    Srims.fund.VoucherStateHistoryColumnModel.superclass.constructor.call(this, [{
        header: "id",
        hidden: true
    }, {
        header: "状态",
        dataIndex: 'state',
        width: 80,
        renderer: Srims.fund.VoucherStateRender
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
        header: "备注",
        dataIndex: 'remark'
    }])
}
Ext.extend(Srims.fund.VoucherStateHistoryColumnModel, Ext.grid.ColumnModel);
