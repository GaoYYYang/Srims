
if (!Srims.data) 
    Ext.namespace('Srims.data');
if (!Srims.experts) 
    Ext.namespace('Srims.experts');

Srims.experts.ExpertProject = Ext.data.Record.create([{
    name: 'id',
    type: 'int',
    mapping: 'ID'
}, {
    name: 'number',
    type: 'string',
    mapping: 'Number'
}, {
    name: 'name',
    type: 'string',
    mapping: 'Name'
}, {
    name: 'principal',
    type: 'string',
    mapping: 'Principal'
}, {
    name: 'rank',
    type: 'string',
    mapping: 'Rank'
}, {
    name: 'type',
    type: 'string',
    mapping: 'Type'
}, {
    name: 'level',
    type: 'string',
    mapping: 'Level'
}, {
    name: 'fundReceived',
    type: 'int',
    mapping: 'FundReceived'
}, {
    name: 'fundTotal',
    type: 'int',
    mapping: 'FundTotal'
}, {
    name: 'startDate',
    type: 'date',
    mapping: 'StartDate'
}, {
    name: 'endDate',
    type: 'date',
    mapping: 'EndDate'
}, {
    name: 'order',
    type: 'int',
    mapping: 'Order'
}, {
    name: 'canShow',
    type: 'boolean',
    mapping: 'CanShow',
    convert: Boolean.toBoolean
}])
Srims.data.Entity.apply(Srims.experts.ExpertProject);
