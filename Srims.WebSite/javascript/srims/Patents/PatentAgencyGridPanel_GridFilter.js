
if (!Srims.patents) 
    Ext.namespace('Srims.patents');

Srims.patents.PatentAgencyGridPanel_GridFilter = function(){
    Srims.patents.PatentAgencyGridPanel_GridFilter.superclass.constructor.call(this, {
        filters: [{
            type: 'string',
            dataIndex: 'agencyName'
        }, {
            type: 'string',
            dataIndex: 'contract'
        }]
    });
}
Ext.extend(Srims.patents.PatentAgencyGridPanel_GridFilter, Ext.grid.GridFilters);
