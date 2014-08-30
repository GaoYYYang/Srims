if (!Srims.data)
    Ext.namespace('Srims.data');
if (!Srims.awards)
    Ext.namespace("Srims.awards");

Srims.awards.AwardWinner = Ext.data.Record.create([{
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
    name: 'number',
    type: 'string',
    mapping: 'Number'
}
]);
Srims.data.Entity.apply(Srims.awards.AwardWinner);
