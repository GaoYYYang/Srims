
if (!Srims.fund) 
    Ext.namespace('Srims.fund');

Srims.fund.FinanceGridPanel_GridFilters = function(){
    Srims.fund.FinanceGridPanel_GridFilters.superclass.constructor.call(this, {
        filters: [{
            type: 'date',
            dataIndex: 'receivedDate'
        }, {
            type: 'string',
            dataIndex: 'voucherNumber'
        }, {
            type: 'numeric',
            money: true,
            dataIndex: 'amount'
        }, {
            type: 'numeric',
            money: true,
            dataIndex: 'descendAmount'
        }, {
            type: 'bool',
            dataIndex: 'isInvoiced'
        }, {
            type: 'string',
            dataIndex: 'abstract'
        }, {
            type: 'string',
            dataIndex: 'invoiceType'
        }, {
            type: 'date',
            dataIndex: 'invoiceTime'
        }, {
            type: 'string',
            dataIndex: 'invoiceNumber'
        }]
    });
}
Ext.extend(Srims.fund.FinanceGridPanel_GridFilters, Ext.grid.GridFilters);
