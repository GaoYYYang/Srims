
if (!Srims.fund) 
    Ext.namespace('Srims.fund');

Srims.fund.FinanceSelectGridPanel_ColumnModel = function(sm){
    Srims.fund.FinanceSelectGridPanel_ColumnModel.superclass.constructor.call(this, [sm, {
        header: 'id',
        dataIndex: 'ID',
        sortable: false,
        hidden: true
    }, {
        header: '到账凭单号',
        dataIndex: 'voucherNumber',
        sortable: true
    }, {
        header: '到款时间',
        dataIndex: 'receivedDate',
        sortable: true,
        renderer: Date.render
    }, {
        header: '金额(万元)',
        dataIndex: 'amount',
        sortable: true,
        renderer: Money.render
    }, {
        header: '已下拨金额(万元)',
        dataIndex: 'descendAmount',
        sortable: true,
        renderer: Money.render
    }, {
        id: 'abstract',
        header: '说明',
        dataIndex: 'abstract',
        width: 300
    }])
}
Ext.extend(Srims.fund.FinanceSelectGridPanel_ColumnModel, Ext.grid.ColumnModel)
