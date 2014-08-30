
if (!Srims.data)
    Ext.namespace('Srims.data');
if (!Srims.stamp)
    Ext.namespace('Srims.stamp');

Srims.stamp.StampApplicationTypeGroup = Ext.data.Record.create([{
    name: 'id',
    type: 'int',
    mapping: 'ID'
}, {
    name: 'name',
    type: 'string',
    mapping: 'Name'
}, {
    name: 'can_Delete',
    type: 'boolean',
    mapping: 'Can_Delete',
    convert: Boolean.toBoolean
}]);
    Srims.data.Entity.apply(Srims.stamp.StampApplicationTypeGroup);
