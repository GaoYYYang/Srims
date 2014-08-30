
if (!Srims.documents) 
    Ext.namespace('Srims.documents');

Srims.documents.Contract = Ext.data.Record.create([{
    name: 'id',
    type: 'int',
    mapping: 'ID'
}, {
    name: 'contractNumber',
    type: 'string',
    mapping: 'ContractNumber'
}, {
    name: 'type',
    type: 'string',
    mapping: 'Type'
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
    name: 'projectId',
    type: 'int',
    mapping: 'ProjectId'
}, {
    name: 'contractResource',
    type: 'string',
    mapping: 'ContractResource'
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

Srims.data.Entity.apply(Srims.documents.Contract);
