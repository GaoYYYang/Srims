
if (!Srims.performance)
    Ext.namespace("Srims.performance");

Srims.performance.PerformanceVoucherStateHistory = Ext.data.Record.create([{
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

    Srims.data.Entity.apply(Srims.performance.PerformanceVoucherStateHistory);
