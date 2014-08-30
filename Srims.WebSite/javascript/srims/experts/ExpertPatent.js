
if (!Srims.data) 
    Ext.namespace('Srims.data');
if (!Srims.experts) 
    Ext.namespace('Srims.experts');

Srims.experts.ExpertPatent = Ext.data.Record.create([{
    name: 'id',
    type: 'int',
    mapping: 'ID'
}, {
    name: 'name',
    type: 'string',
    mapping: 'Name'
}, {
    name: 'number',
    type: 'string',
    mapping: 'Number'
}, {
    name: 'lawState',
    type: 'string',
    mapping: 'LawState'
}, {
    name: 'type',
    type: 'string',
    mapping: 'Type'
}, {
    name: 'order',
    type: 'int',
    mapping: 'Order'
}, {
    name: 'principal',
    type: 'string',
    mapping: 'Principal'
}, {
    name: 'authorizeDateTime',
    type: 'date',
    mapping: 'AuthorizeDateTime'
}, {
    name: 'canShowPatent',
    type: 'boolean',
    mapping: 'CanShowPatent',
    convert: Boolean.toBoolean
}])
Srims.data.Entity.apply(Srims.experts.ExpertPatent);
