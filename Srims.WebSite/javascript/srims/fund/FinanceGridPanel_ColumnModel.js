
if (!Srims.fund) 
    Ext.namespace('Srims.fund');

Srims.fund.FinanceGridPanel_ColumnModel = function(isFinanceManage, isExpertGuid){
    Srims.fund.FinanceGridPanel_ColumnModel.superclass.constructor.call(this, [{
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
        header: '已下拨金额(万元)',
        dataIndex: 'descendAmount',
        sortable: true,
        width: 80,
        renderer: Money.render,
        hidden: isFinanceManage
    }, {
        header: '发票类型',
        dataIndex: 'invoiceType',
        sortable: true,
        width: 100
    }, {
        header: '发票时间',
        dataIndex: 'invoiceTime',
        renderer: Date.render,
        sortable: true,
        width: 80
    }, {
        header: '发票号',
        dataIndex: 'invoiceNumber',
        sortable: true,
        width: 80
    }, {
        header: '说明',
        dataIndex: 'abstract',
        width: 150
		}, {
        header: '备注',
        dataIndex: 'remarks',
        width: 150
    }])
}
Ext.extend(Srims.fund.FinanceGridPanel_ColumnModel, Ext.grid.ColumnModel)
