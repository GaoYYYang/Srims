
if (!Srims.common) 
    Ext.namespace('Srims.common');

Srims.common.LogGridPanel_GridFilters = function(){
    Srims.common.LogGridPanel_GridFilters.superclass.constructor.call(this, {
        filters: [{
            type: 'string',
            dataIndex: 'user'
        }, {
            type: 'date',
            dataIndex: 'dateTime'
        }]
    });
}
Ext.extend(Srims.common.LogGridPanel_GridFilters, Ext.grid.GridFilters);
