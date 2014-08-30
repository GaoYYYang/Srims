
if (!Srims.common) 
    Ext.namespace('Srims.common');

Srims.common.SubjectFirstLevel = Ext.data.Record.create([{
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
}]);
Srims.data.Entity.apply(Srims.common.SubjectFirstLevel);

Srims.common.SubjectFirstLevelStoreForApply = function(){
    Srims.common.SubjectFirstLevelStoreForApply.superclass.constructor.call(this, {
        url: Srims.service.common.SubjectService + '/GetSubjectFirstLevel',
        reader: new Ext.data.XmlReader({
            record: 'Record',
            id: 'ID'
        }, Srims.common.SubjectFirstLevel)
    });
}
Ext.extend(Srims.common.SubjectFirstLevelStoreForApply, Ext.data.Store);

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

Srims.common.SubjectSecondLevelStoreForApply = function(){
    Srims.common.SubjectSecondLevelStoreForApply.superclass.constructor.call(this, {
        url: Srims.service.common.SubjectService + '/GetSubjectSecondLevel',
        reader: new Ext.data.XmlReader({
            record: 'Record',
            id: 'ID'
        }, Srims.common.SubjectSecondLevel),
        autoLoad: false
    });
}
Ext.extend(Srims.common.SubjectSecondLevelStoreForApply, Ext.data.Store);
