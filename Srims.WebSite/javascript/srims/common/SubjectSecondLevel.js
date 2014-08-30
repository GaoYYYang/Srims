if (!Srims.common)
    Ext.namespace('Srims.common');

Srims.common.SubjectSecondLevel = Ext.data.Record.create([{
    name: 'id',
    type: 'int',
    mapping: 'ID'
}, {
    name: 'name',
    type: 'string',
    mapping: 'Name'
}, {
    name: 'code',
    type: 'string',
    mapping: 'Code'
}, {
    name: 'childCode',
    type: 'string',
    mapping: 'ChildCode'
}, {
    name: 'subjectFirstLevelId',
    type: 'string',
    mapping: 'SubjectFirstLevelID'
}, {
    name: 'subjectFirstLevelName',
    type: 'string',
    mapping: 'SubjectFirstLevelName'
}]);
    Srims.data.Entity.apply(Srims.common.SubjectSecondLevel);
