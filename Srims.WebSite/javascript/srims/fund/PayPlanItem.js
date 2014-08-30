
if (!Srims.fund) 
    Ext.namespace('Srims.fund');

Srims.fund.PayPlanItem = Ext.data.Record.create([{
    name: 'id',
    type: 'int',
    mapping: 'ID'
}, {
    name: 'dateTime',
    type: 'date',
    mapping: 'DateTime'
}, {
    name: 'amount',
    type: 'int',
    mapping: 'Amount'
}]);

Srims.data.Entity.apply(Srims.fund.PayPlanItem);

