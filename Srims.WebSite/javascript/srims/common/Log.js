
if (!Srims.common) 
    Ext.namespace('Srims.common');

Srims.common.Log = Ext.data.Record.create([{
    name: 'id',
    type: 'int',
    mapping: 'ID'
}, {
    name: 'dateTime',
    type: 'string',
    mapping: 'DataTime'
}, {
    name: 'user',
    type: 'string',
    mapping: 'User'
}, {
    name: 'userIP',
    type: 'string',
    mapping: 'UserIP'
}, {
    name: 'action',
    type: 'string',
    mapping: 'Action'
}, {
    name: 'description',
    type: 'string',
    mapping: 'Description'
},{
    name: 'logType',
    type: 'string',
    mapping: 'LogType'
},{
    name: 'logTypeUser',
    type: 'string',
    mapping: 'LogTypeUser'
},{
    name: 'logTypeProject',
    type: 'string',
    mapping: 'LogTypeProject'
}]);
Srims.data.Entity.apply(Srims.common.Log);
