
if (!Srims.users) 
    Ext.namespace('Srims.users');

Srims.users.UserTemporaryPermission = Ext.data.Record.create([{
    name: 'id',
    mapping: 'ID',
    type: 'int'
}, {
    name: 'permissionID',
    mapping: 'PermissionID',
    type: 'int'
}, {
    name: 'permissionName',
    mapping: 'PermissionName',
    type: 'string'
}, {
    name: 'accreditDateTime',
    mapping: 'AccreditDateTime',
    type: 'date'
}, {
    name: 'endDateTime',
    mapping: 'EndDateTime',
    type: 'date'
}]);
