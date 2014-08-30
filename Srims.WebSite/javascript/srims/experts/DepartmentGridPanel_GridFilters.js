
if (!Srims.experts) 
    Ext.namespace('Srims.experts');

Srims.experts.DepartmentGridPanel_GridFilters = function(){
    Srims.experts.DepartmentGridPanel_GridFilters.superclass.constructor.call(this, {
        filters: [{
            type: 'string',
            dataIndex: 'name'
        }, {
            type: 'string',
            dataIndex: 'code'
        }]
    });
}
Ext.extend(Srims.experts.DepartmentGridPanel_GridFilters, Ext.grid.GridFilters);
