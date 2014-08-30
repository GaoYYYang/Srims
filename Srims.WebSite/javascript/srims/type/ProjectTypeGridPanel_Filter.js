
if (!Srims.type) 
    Ext.namespace("Srims.type");

Srims.type.ProjectTypeGridPanel_GridFilters = function(){
    Srims.type.ProjectTypeGridPanel_GridFilters.superclass.constructor.call(this, {
        filters: [{
            type: 'list',
            labelField: 'value',
            dataIndex: 'projectRank',
            store: new Srims.data.IDValueRecordStore(Srims.service.type.ProjectRankService + '/GetAllRanksForFilter'),
            phpMode: true
        }]
    });
}
Ext.extend(Srims.type.ProjectTypeGridPanel_GridFilters, Ext.grid.GridFilters);
