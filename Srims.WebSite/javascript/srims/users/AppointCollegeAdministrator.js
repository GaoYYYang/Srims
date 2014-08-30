
if (!Srims.users) 
    Ext.namespace('Srims.users');

Srims.users.AppointCollegeAdministrator = Ext.data.Record.create([{
    name: 'deparmentID',
    mapping: 'DeparmentID',
    type: 'string'
}, {
    name: 'deparmentName',
    mapping: 'DeparmentName',
    type: 'string'
}, {
    name: 'manageAllHorizontalProjects',
    mapping: 'ManageAllHorizontalProjects',
    type: 'boolean',
    convert: Boolean.toBoolean
}, {
    name: 'manageAllVerticalProjects',
    mapping: 'ManageAllVerticalProjects',
    type: 'boolean',
    convert: Boolean.toBoolean
}, {
    name: 'manageScienceAward',
    mapping: 'ManageScienceAward',
    type: 'boolean',
    convert: Boolean.toBoolean
}, {
    name: 'manageLiteralAward',
    mapping: 'ManageLiteralAward',
    type: 'boolean',
    convert: Boolean.toBoolean
},{
    name: 'managePaper',
    mapping: 'ManagePaper',
    type: 'boolean',
    convert: Boolean.toBoolean
}, {
    name: 'managePatent',
    mapping: 'ManagePatent',
    type: 'boolean',
    convert: Boolean.toBoolean
}]);
