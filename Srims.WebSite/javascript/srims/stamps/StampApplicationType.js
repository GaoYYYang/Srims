
if (!Srims.data)
    Ext.namespace('Srims.data');
if (!Srims.stamp)
    Ext.namespace('Srims.stamp');

Srims.stamp.StampApplicationType = Ext.data.Record.create([{
    name: 'id',
    type: 'int',
    mapping: 'ID'
}, {
    name: 'stampApplicationTypeGroupID',
    type: 'string',
    mapping: 'StampApplicationTypeGroupID'
}, {
    name: 'stampApplicationTypeGroupName',
    type: 'string',
    mapping: 'StampApplicationTypeGroupName'
}, {
    name: 'name',
    type: 'string',
    mapping: 'Name'
}, {
    name: 'isTwiceCancer',
    type: 'boolean',
    mapping: 'IsTwiceCancer',
    convert: Boolean.toBoolean
}, {
    name: 'isProjectRelated',
    type: 'boolean',
    mapping: 'IsProjectRelated',
    convert: Boolean.toBoolean
}, {
    name: 'can_Delete',
    type: 'boolean',
    mapping: 'Can_Delete',
    convert: Boolean.toBoolean
}]);
    Srims.data.Entity.apply(Srims.stamp.StampApplicationType);
