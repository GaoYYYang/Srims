
if (!Srims.stamp) 
    Ext.namespace("Srims.stamp");

Srims.stamp.Stuff = Ext.data.Record.create([{
    name: 'id',
    type: 'int',
    mapping: 'ID'
}, {
    name: 'stampApplicationID',
    type: 'int',
    mapping: 'StampApplicationID'
}, {
    name: 'stuffType',
    type: 'string',
    mapping: 'StuffType'
}, {
    name: 'stuffName',
    type: 'string',
    mapping: 'StuffName'
}, {
    name: 'stampTypes',
    type: 'string',
    mapping: 'StampTypes'
}, {
    name: 'stuffDocument',
    type: 'string',
    mapping: 'StuffDocument'
}, {
    name: 'haspermission_Edit',
    type: 'boolean',
    mapping: 'Haspermission_Edit',
    convert: Boolean.toBoolean
}, {
    name: 'hasPermission_ManageStampType',
    type: 'boolean',
    mapping: 'HasPermission_ManageStampType',
    convert: Boolean.toBoolean
}, {
    name: 'canEdit',
    type: 'boolean',
    mapping: 'CanEdit',
    convert: Boolean.toBoolean
}, {
    name: 'canManageStampType',
    type: 'boolean',
    mapping: 'CanManageStampType',
    convert: Boolean.toBoolean
}]);
Srims.data.Entity.apply(Srims.stamp.Stuff);
