
if (!Srims.common) 
    Ext.namespace('Srims.common');

Srims.common.View = Ext.data.Record.create([{
    name: 'id',
    type: 'int',
    mapping: 'ID'
}, {
    name: 'name',
    type: 'string',
    mapping: 'Name'
}, {
    name: 'type',
    type: 'string',
    mapping: 'Type'
}, {
    name: 'definition',
    type: 'string',
    mapping: 'Definition'
}, {
    name: 'order',
    type: 'int',
    mapping: 'Order'
}, {
    name: 'isPublic',
    type: 'boolean',
    mapping: 'IsPublic',
    convert: Boolean.toBoolean
}, {
    name: 'userID',
    type: 'int',
    mapping: 'UserID'
}, {
    name: 'userName',
    type: 'int',
    mapping: 'UserName'
}, {
    name: 'hasPermission_Delete',
    type: 'boolean',
    mapping: 'HasPermission_Delete',
    convert: Boolean.toBoolean
}, {
    name: 'canDelete',
    type: 'boolean',
    mapping: 'CanDelete',
    convert: Boolean.toBoolean
}, {
    name: 'hasPermission_Rename',
    type: 'boolean',
    mapping: 'HasPermission_Rename',
    convert: Boolean.toBoolean
}, {
    name: 'canRename',
    type: 'boolean',
    mapping: 'CanRename',
    convert: Boolean.toBoolean
}]);
Srims.data.Entity.apply(Srims.common.View);
