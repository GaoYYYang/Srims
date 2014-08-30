if (!Srims.common)
    Ext.namespace('Srims.common');

Srims.common.SubjectSecondLevelGridPanel_GridFilters = function() {
    Srims.common.SubjectSecondLevelGridPanel_GridFilters.superclass.constructor.call(this, {
        filters: [{
            type: 'string',
            dataIndex: 'name'
        }, {
            type: 'string',
            dataIndex: 'subjectFirstLevelName'
        }, {
            type: 'string',
            dataIndex: 'code'
}]
        });
    }
    Ext.extend(Srims.common.SubjectSecondLevelGridPanel_GridFilters, Ext.grid.GridFilters);
