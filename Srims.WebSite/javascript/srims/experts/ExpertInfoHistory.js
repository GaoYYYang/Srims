
if (!Srims.data) 
    Ext.namespace('Srims.data');
if (!Srims.experts) 
    Ext.namespace('Srims.experts');

Srims.experts.ExpertInfoHistory = Ext.data.Record.create([{
    name: 'id',
    type: 'int',
    mapping: 'ID'
}, {
    name: 'expertID',
    type: 'int',
    mapping: 'ExpertID'
}, {
    name: 'expertName',
    type: 'string',
    mapping: 'ExpertName'
}, {
    name: 'propertyName',
    type: 'string',
    mapping: 'PropertyName'
}, {
    name: 'propertyValueType',
    type: 'string',
    mapping: 'PropertyValueType'
}, {
    name: 'propertyValue',
    type: 'string',
    mapping: 'PropertyValue'
}, {
    name: 'propertyValueRender',
    type: 'string',
    mapping: 'PropertyValueRender'
}, {
    name: 'propertyOldValue',
    type: 'string',
    mapping: 'PropertyOldValue'
}, {
    name: 'hasPermission_CensorReject',
    type: 'boolean',
    mapping: 'HasPermission_CensorReject',
    convert: Boolean.toBoolean
}, {
    name: 'hasPermission_CensorPass',
    type: 'boolean',
    mapping: 'HasPermission_CensorPass',
    convert: Boolean.toBoolean
}, {
    name: 'canCensorReject',
    type: 'boolean',
    mapping: 'CanCensorReject',
    convert: Boolean.toBoolean
}, {
    name: 'hasPermission_Show',
    type: 'boolean',
    mapping: 'HasPermission_Show',
    convert: Boolean.toBoolean
}, {
    name: 'canShow',
    type: 'boolean',
    mapping: 'CanShow',
    convert: Boolean.toBoolean
}, {
    name: 'canCensorPass',
    type: 'boolean',
    mapping: 'CanCensorPass',
    convert: Boolean.toBoolean
}])
Srims.data.Entity.apply(Srims.experts.ExpertInfoHistory);
