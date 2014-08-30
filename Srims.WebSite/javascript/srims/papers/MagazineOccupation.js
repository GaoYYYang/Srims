
if (!Srims.papers) 
    Ext.namespace("Srims.papers");

Srims.papers.MagazineOccupation = Ext.data.Record.create([{
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
    name: 'expertDepartment',
    type: 'string',
    mapping: 'ExpertDepartment'
}, {
    name: 'magazineID',
    type: 'int',
    mapping: 'MagazineID'
}, {
    name: 'magazineName',
    type: 'string',
    mapping: 'MagazineName'
}, {
    name: 'magazineISSN',
    type: 'string',
    mapping: 'MagazineISSN'
}, {
    name: 'magazinePublishCompanyCity',
    type: 'string',
    mapping: 'MagazinePublishCompanyCity'
}, {
    name: 'occupation',
    type: 'string',
    mapping: 'Occupation'
}, {
    name: 'engageStartYear',
    type: 'int',
    mapping: 'EngageStartYear'
}, {
    name: 'engageEndYear',
    type: 'string',
    mapping: 'EngageEndYear'
}, {
    name: 'hasPermission_EditMagazineOccupation',
    type: 'boolean',
    mapping: 'HasPermission_EditMagazineOccupation',
    convert: Boolean.toBoolean
}, {
    name: 'canEdit_MagazineOccupation',
    type: 'boolean',
    mapping: 'CanEdit_MagazineOccupation',
    convert: Boolean.toBoolean
}])

Srims.data.Entity.apply(Srims.papers.MagazineOccupation);
