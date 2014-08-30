
if (!Srims.fund) 
    Ext.namespace("Srims.fund");

Srims.fund.FundDescendStateHistory = Ext.data.Record.create([{
    name: 'id',
    type: 'int',
    mapping: 'ID'
}, {
    name: 'dateTime',
    type: 'date',
    mapping: 'DateTime'
}, {
    name: 'operator',
    type: 'string',
    mapping: 'Operator'
}, {
    name: 'remark',
    type: 'string',
    mapping: 'Remark'
}, {
    name: 'state',
    type: 'string',
    mapping: 'State'
}]);

Srims.data.Entity.apply(Srims.fund.FundDescendStateHistory);

