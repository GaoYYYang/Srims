
if (!Srims.awards)
    Ext.namespace("Srims.awards");

Srims.awards.AwardGridPanel_GridFilters = function() {
    Srims.awards.AwardGridPanel_GridFilters.superclass.constructor.call(this, {
        filters: [{
            type: 'string',
            dataIndex: 'name'
        }, {
            type: 'string',
            dataIndex: 'remark'
        }, {
            type: 'numeric',
            dataIndex: 'year'
        }, {
            type: 'string',
            dataIndex: 'awardFirstWinnerName'
        }, {
            type: 'string',
            dataIndex: 'projectName'
        }, {
            type: 'string',
            dataIndex: 'collegeName'
        }, {
            type: 'list',
            dataIndex: 'attendType',
            store: new Srims.data.IDValueRecordStore(Srims.service.awards.AwardService + '/GetAttendTypeItems'),
            labelField: 'value',
            phpMode: true
        }, {
            type: 'list',
            dataIndex: 'authorisedUnit',
            store: new Srims.data.IDValueRecordStore(Srims.service.awards.AwardService + '/GetAuthorUnitItems'),
            labelField: 'value',
            phpMode: true
        }, {
            type: 'list',
            dataIndex: 'rank',
            store: new Srims.data.IDValueRecordStore(Srims.service.awards.AwardService + '/GetRankItems'),
            labelField: 'value',
            phpMode: true
        }, {
            type: 'list',
            dataIndex: 'class',
            store: new Srims.data.IDValueRecordStore(Srims.service.awards.AwardService + '/GetClassItems'),
            labelField: 'value',
            phpMode: true
        }, {
            type: 'list',
            dataIndex: 'classification',
            store: new Srims.data.IDValueRecordStore(Srims.service.awards.AwardService + '/GetClassificationItems'),
            labelField: 'value',
            phpMode: true

}]
        });

    }
    Ext.extend(Srims.awards.AwardGridPanel_GridFilters, Ext.grid.GridFilters);

