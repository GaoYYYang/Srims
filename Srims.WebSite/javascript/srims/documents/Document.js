
if (!Srims.documents) 
    Ext.namespace('Srims.documents');

Srims.documents.Document = Ext.data.Record.create([{
    name: 'id',
    type: 'int',
    mapping: 'ID'
}, {
    name: 'author',
    type: 'string',
    mapping: 'Author'
}, {
    name: 'censor',
    type: 'string',
    mapping: 'Censor'
}, {
    name: 'censorDateTime',
    type: 'date',
    mapping: 'CensorDateTime'
}, {
    name: 'deadline',
    type: 'date',
    mapping: 'Deadline'
}, {
    name: 'isRequire',
    type: 'boolean',
    mapping: 'IsRequire',
    convert: Boolean.toBoolean
}, {
    name: 'documentResource',
    type: 'string',
    mapping: 'DocumentResource'
}, {
    name: 'name',
    type: 'string',
    mapping: 'Name'
}, {
    name: 'state',
    type: 'string',
    mapping: 'State'
}, {
    name: 'submitDateTime',
    type: 'date',
    mapping: 'SubmitDateTime'
}, {
    name: 'projectName',
    type: 'string',
    mapping: 'ProjectName'
}, {
    name: 'projectIsHorizontal',
    type: 'boolean',
    mapping: 'ProjectIsHorizontal',
    convert: Boolean.toBoolean
}, {
    name: 'projectID',
    type: 'int',
    mapping: 'ProjectID'
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
}])

Srims.data.Entity.apply(Srims.documents.Document);
