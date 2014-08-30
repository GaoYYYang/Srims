
if (!Srims.projects)
    Ext.namespace('Srims.projects');

Srims.projects.RecoveryProjectGridPanel_GridFilters = function() {
    Srims.projects.RecoveryProjectGridPanel_GridFilters.superclass.constructor.call(this, {
        filters: [{
            type: 'string',
            dataIndex: 'name'
        }, {
            type: 'string',
            dataIndex: 'principal'
        }, {
            type: 'string',
            dataIndex: 'name'
}]
        });
    }
    Ext.extend(Srims.projects.RecoveryProjectGridPanel_GridFilters, Ext.grid.GridFilters);
