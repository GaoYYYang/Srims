
if (!Srims.type) 
    Ext.namespace('Srims.type');

Srims.type.ProjectSupportCategory = Ext.data.Record.create([{
    name: 'id',
    type: 'int',
    mapping: 'ID'
}, {
    name: 'name',
    type: 'string',
    mapping: 'Name'
}, {
    name: 'isGetOverheadExpense',
    type: 'boolean',
    mapping: 'IsGetOverheadExpense',
    convert: Boolean.toBoolean
}, {
    name: 'projectType',
    type: 'string',
    mapping: 'ProjectType'
}, {
    name: 'isAvailable',
    type: 'boolean',
    mapping: 'IsAvailable',
    convert: Boolean.toBoolean
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
Srims.data.Entity.apply(Srims.type.ProjectSupportCategory);
