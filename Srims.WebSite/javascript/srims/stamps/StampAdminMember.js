if (!Srims.stamp)
    Ext.namespace('Srims.stamp');

Srims.stamp.StampAdminMember = Ext.data.Record.create([{
    name: 'id',
    type: 'int',
    mapping: 'ID'
}, {
    name: 'userName',
    type: 'string',
    mapping: 'UserName'
}]);
    Srims.data.Entity.apply(Srims.stamp.StampAdminMember);