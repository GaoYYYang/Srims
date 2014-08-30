
if (!Srims.finance) 
    Ext.namespace("Srims.finance");

Srims.finance.FinanceBak = Ext.data.Record.create([{
    name: 'id',
    type: 'int',
    mapping: 'ID'
}, {
    name: 'receivedDate',
    type: 'date',
    mapping: 'ReceivedDate'
}, {
    name: 'voucherNumber',
    type: 'string',
    mapping: 'VoucherNumber'
}, {
    name: 'amount',
    type: 'int',
    mapping: 'Amount'
}, {
    name: 'abstract',
    type: 'string',
    mapping: 'Abstract'
}]);

Srims.data.Entity.apply(Srims.finance.FinanceBak);
