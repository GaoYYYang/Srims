
if (!Srims.data) 
    Ext.namespace('Srims.data');
if (!Srims.common) 
    Ext.namespace('Srims.common');

Srims.common.Announcement = Ext.data.Record.create([{
    name: 'id',
    type: 'int',
    mapping: 'ID'
}, {
    name: 'title',
    type: 'string',
    mapping: 'Title'
}, {
    name: 'dateTime',
    type: 'date',
    mapping: 'DateTime'
}, {
    name: 'userName',
    type: 'string',
    mapping: 'UserName'
}, {
    name: 'content',
    type: 'string',
    mapping: 'Content'
}, {
    name: 'state',
    type: 'string',
    mapping: 'State'
}, {
    name: 'hasPermission_Edit',
    type: 'boolean',
    mapping: 'HasPermission_Edit',
    convert: Boolean.toBoolean
}, {
    name: 'hasPermission_Delete',
    type: 'boolean',
    mapping: 'HasPermission_Delete',
    convert: Boolean.toBoolean
}, {
    name: 'canEdit',
    type: 'boolean',
    mapping: 'CanEdit',
    convert: Boolean.toBoolean
}, {
    name: 'canDelete',
    type: 'boolean',
    mapping: 'CanDelete',
    convert: Boolean.toBoolean
}]);
Srims.data.Entity.apply(Srims.common.Announcement);
