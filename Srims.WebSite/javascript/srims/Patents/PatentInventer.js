
if (!Srims.data)
    Ext.namespace('Srims.data');
if (!Srims.patents)
    Ext.namespace("Srims.patents");

Srims.patents.PatentInventer = Ext.data.Record.create([{
    name: 'id',
    type: 'int',
    mapping: 'ID'
}, {
    name: 'name',
    type: 'string',
    mapping: 'Name'
}, {
    name: 'order',
    type: 'int',
    mapping: 'Order'
}, {
    name: 'expertID',
    type: 'int',
    mapping: 'ExpertID'
}, {
    name: 'patentID',
    type: 'int',
    mapping: 'PatentID'
}, {
    name: 'expertNumber',
    type: 'string',
    mapping: 'ExpertNumber'
}, {
    name: 'isPrincipal',
    type: 'boolean',
    mapping: 'IsPrincipal',
    convert: Boolean.toBoolean
}
]);
Srims.data.Entity.apply(Srims.patents.PatentInventer);



