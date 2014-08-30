
if (!Srims.data) 
    Ext.namespace('Srims.data');
if (!Srims.experts) 
    Ext.namespace('Srims.experts');

Srims.experts.ExpertAward = Ext.data.Record.create([{
    name: 'id',
    type: 'int',
    mapping: 'ID'
}, {
    name: 'name',
    type: 'string',
    mapping: 'Name'
}, {
    name: 'year',
    type: 'int',
    mapping: 'Year'
}, {
    name: 'rank',
    type: 'string',
    mapping: 'Rank'
}, {
    name: 'class',
    type: 'string',
    mapping: 'Class'
}, {
    name: 'order',
    type: 'int',
    mapping: 'Order'
}, {
    name: 'project',
    type: 'string',
    mapping: 'Project'
}, {
    name: 'canShowAward',
    type: 'boolean',
    mapping: 'CanShowAward',
    convert: Boolean.toBoolean
}])
Srims.data.Entity.apply(Srims.experts.ExpertAward);
