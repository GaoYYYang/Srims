
if (!Srims.fund) 
    Ext.namespace('Srims.fund');

Srims.fund.VoucherOut = Ext.data.Record.create([{
    name: 'id',
    type: 'int',
    mapping: 'ID'
}, {
    name: 'alamount',
    type: 'int',
    mapping: 'AlAmount'
}, {
    name: 'plamount',
    type: 'int',
    mapping: 'PlAmount'
}, {
    name: 'amount',
    type: 'int',
    mapping: 'Amount'
}, {
    name: 'corporation',
    type: 'string',
    mapping: 'Corporation'
}, {
    name: 'voucherID',
    type: 'int',
    mapping: 'VoucherID'
    }, {
    name: 'outsourcingID',
    type: 'int',
    mapping: 'OutsourcingID'
}]);

Srims.data.Entity.apply(Srims.fund.VoucherOut);


