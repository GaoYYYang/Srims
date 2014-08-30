/**
* @author dulintao
*/
if (!Srims.performance)
    Ext.namespace('Srims.performance');
Srims.performance.PerformanceAllocationGridPanel_GridFilters = function() {
    Srims.performance.PerformanceGridPanel_GridFilters.superclass.constructor.call(this, {
        filters: [{
            type: 'string',
            dataIndex: 'projectName'
        }, {
            type: 'string',
            dataIndex: 'typeName'
        }, {
            type: 'string',
            dataIndex: 'projectPricinpalName'
        }
        
]
    });
}
Ext.extend(Srims.performance.PerformanceAllocationGridPanel_GridFilters, Ext.grid.GridFilters);