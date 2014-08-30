
if (!Srims.experts) 
    Ext.namespace('Srims.experts');

Srims.experts.ExpertGridPanel_GridFilters = function(){
    Srims.experts.ExpertGridPanel_GridFilters.superclass.constructor.call(this, {
        filters: [{
            type: 'string',
            dataIndex: 'name'
        }, {
            type: 'string',
            dataIndex: 'number'
        }, {
            type: 'string',
            dataIndex: 'college'
        }]
    })
};
Ext.extend(Srims.experts.ExpertGridPanel_GridFilters, Ext.grid.GridFilters);
