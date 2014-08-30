
if (!Srims.common) 
    Ext.namespace('Srims.common');


Srims.common.SubjectFirstLevel = Ext.data.Record.create([{
    name: 'id',
    type: 'int',
    mapping: 'ID'
}, {
    name: 'name',
    type: 'string',
    mapping: 'Name'
}, {
    name: 'code',
    type: 'string',
    mapping: 'Code'
}]);
Srims.data.Entity.apply(Srims.common.SubjectFirstLevel);
