
if (!Srims.common) 
    Ext.namespace('Srims.common');

Srims.common.OutsourcingCompanyManageType = new Ext.data.Record.create([{
    name: 'id',
    type: 'int',
    mapping: 'ID'
}, {
    name: 'name',
    type: 'string',
    mapping: 'Name'
}, {
    name: 'type',
    type: 'int',
    mapping: 'Type'
}])
Srims.data.Entity.apply(Srims.common.OutsourcingCompanyManageType);
