
if (!Srims.bases) 
    Ext.namespace('Srims.bases');

Srims.bases.Base = Ext.data.Record.create([{
    name: 'id',
    type: 'int',
    mapping: 'ID'
}, {
    name: 'name',
    type: 'string',
    mapping: 'Name'
}, {
    name: 'academyDirectorID',
    type: 'int',
    mapping: 'AcademyDirectorID'
}, {
    name: 'academyDirectorName',
    type: 'string',
    mapping: 'AcademyDirectorName'
}, {
    name: 'address',
    type: 'string',
    mapping: 'Address'
}, {
    name: 'administration',
    type: 'string',
    mapping: 'Administration'
}, {
    name: 'directorID',
    type: 'int',
    mapping: 'DirectorID'
}, {
    name: 'directorName',
    type: 'string',
    mapping: 'DirectorName'
}, {
    name: 'fax',
    type: 'string',
    mapping: 'Fax'
}, {
    name: 'phone',
    type: 'string',
    mapping: 'Phone'
}, {
    name: 'rank',
    type: 'string',
    mapping: 'Rank'
}, {
    name: 'zip',
    type: 'string',
    mapping: 'Zip'
}, {
    name: 'isDirectorSchoolExpert',
    type: 'boolean',
    mapping: 'IsDirectorSchoolExpert',
    convert: Boolean.toBoolean
}, {
    name: 'isAcademyDirectorSchoolExpert',
    type: 'boolean',
    mapping: 'IsAcademyDirectorSchoolExpert',
    convert: Boolean.toBoolean
}, {
    name: 'hasPermission_Delete',
    type: 'boolean',
    mapping: 'HasPermission_Delete',
    convert: Boolean.toBoolean
}, {
    name: 'hasPermission_Edit',
    type: 'boolean',
    mapping: 'HasPermission_Edit',
    convert: Boolean.toBoolean
}, {
    name: 'hasPermission_Show',
    type: 'boolean',
    mapping: 'HasPermission_Show',
    convert: Boolean.toBoolean
}, {
    name: 'canDelete',
    type: 'boolean',
    mapping: 'CanDelete',
    convert: Boolean.toBoolean
}, {
    name: 'canShow',
    type: 'boolean',
    mapping: 'CanShow',
    convert: Boolean.toBoolean
}, {
    name: 'canEdit',
    type: 'boolean',
    mapping: 'CanEdit',
    convert: Boolean.toBoolean
}]);
Srims.data.Entity.apply(Srims.bases.Base);
