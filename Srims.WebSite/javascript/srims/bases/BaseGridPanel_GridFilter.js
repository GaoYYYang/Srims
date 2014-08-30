
if (!Srims.bases) 
    Ext.namespace("Srims.bases");

Srims.bases.BaseGridPanel_GridFilters = function(){
    Srims.bases.BaseGridPanel_GridFilters.superclass.constructor.call(this, {
        filters: [{
            type: 'string',
            dataIndex: 'name'
        }, {
            type: 'string',
            dataIndex: 'rank'
        }]
    });
}
Ext.extend(Srims.bases.BaseGridPanel_GridFilters, Ext.grid.GridFilters);

