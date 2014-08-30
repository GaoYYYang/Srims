if (!Srims.common)
    Ext.namespace('Srims.common');

Srims.common.SubjectFirstLevelGridPanel_GridFilters = function() {
    Srims.common.SubjectFirstLevelGridPanel_GridFilters.superclass.constructor.call(this, {
        filters: [{
            type: 'string',
            dataIndex: 'name'
        }, {
            type: 'string',
            dataIndex: 'code'
}]
        });
    }
    Ext.extend(Srims.common.SubjectFirstLevelGridPanel_GridFilters, Ext.grid.GridFilters);