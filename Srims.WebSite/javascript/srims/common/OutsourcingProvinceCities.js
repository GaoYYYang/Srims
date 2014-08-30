/**
* @author dulintao
*/
if (!Srims.data)
    Ext.namespace('Srims.data');
if (!Srims.common)
    Ext.namespace('Srims.common');

Srims.common.OutsourcingProvinceCities = Ext.data.Record.create([{
    name: 'id',
    type: 'int',
    mapping: 'ID'
}, {
    name: 'name',
    type: 'string',
    mapping: 'Name'
}]);
Srims.data.Entity.apply(Srims.common.OutsourcingProvinceCities);