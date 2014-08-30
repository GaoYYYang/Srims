
if (!Srims.users) 
    Ext.namespace('Srims.users');

Srims.users.UserRole = new Ext.data.Record.create([{
    name: 'id',
    type: 'int',
    mapping: 'ID'
}, {
    name: 'name',
    type: 'string',
    mapping: 'Name'
}, {
    name: 'type',
    type: 'int',
    mapping: 'Type'
}])
Srims.data.Entity.apply(Srims.users.UserRole);
