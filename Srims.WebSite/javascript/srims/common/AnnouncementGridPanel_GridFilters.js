/**
 * @author dulintao
 */
if (!Srims.common) 
    Ext.namespace('Srims.common');

Srims.common.AnnouncementGridPanel_GridFilters = function(){
    Srims.common.AnnouncementGridPanel_GridFilters.superclass.constructor.call(this, {
        filters: [{
            type: 'string',
            dataIndex: 'userName'
        }, {
            type: 'date',
            dataIndex: 'dateTime'
        }, {
            type: 'list',
            dataIndex: 'state',
            options: Srims.common.AnnouncementState.filterItems,
            phpMode: true
        }]
    });
}
Ext.extend(Srims.common.AnnouncementGridPanel_GridFilters, Ext.grid.GridFilters);