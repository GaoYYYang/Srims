
if (!Srims.data) 
    Ext.namespace('Srims.data');
if (!Srims.patents) 
    Ext.namespace("Srims.patents");

Srims.patents.PatentAgency = Ext.data.Record.create([{
    name: 'agencyName',
    type: 'string',
    mapping: 'AgencyName'
}, {
    name: 'id',
    type: 'int',
    mapping: 'ID'
}, {
    name: 'contract',
    type: 'string',
    mapping: 'Contract'
}, {
    name: 'hasPermission_EditPatentAgency',
    type: 'boolean',
    mapping: 'HasPermission_EditPatentAgency',
    convert: Boolean.toBoolean
}, {
    name: 'canEditPatentAgency',
    type: 'boolean',
    mapping: 'CanEditPatentAgency',
    convert: Boolean.toBoolean
}]);
Srims.data.Entity.apply(Srims.patents.PatentAgency);
