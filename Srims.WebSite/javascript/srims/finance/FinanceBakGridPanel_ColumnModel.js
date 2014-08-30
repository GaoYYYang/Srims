
if (!Srims.finance) 
    Ext.namespace('Srims.finance');

Srims.finance.FinanceBakGridPanel_ColumnModel = function(){
    Srims.finance.FinanceBakGridPanel_ColumnModel.superclass.constructor.call(this, [{
        header: 'id',
        dataIndex: 'ID',
        sortable: false,
        hidden: true
    }, {
        header: '到款时间',
        dataIndex: 'receivedDate',
        width: 100,
        sortable: true,
        renderer: Date.render
    }, {
        header: '凭单号',
        dataIndex: 'voucherNumber',
        sortable: true,
        width: 80
    }, {
        header: '金额(万元)',
        dataIndex: 'amount',
        sortable: true,
        width: 80,
        renderer: Money.render
    }, {
        header: '说明',
        dataIndex: 'abstract',
        width: 150
    }])
}
Ext.extend(Srims.finance.FinanceBakGridPanel_ColumnModel, Ext.grid.ColumnModel)
