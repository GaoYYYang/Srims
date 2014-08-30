/**
* @author gy
*/
if (!Srims.common)
    Ext.namespace('Srims.common');
Srims.common.OutsourcingShowPanel_AllocationInfo_GridFilters = function() {
    Srims.common.OutsourcingShowPanel_AllocationInfo_GridFilters.superclass.constructor.call(
			this, {
    filters: [{
        type: 'string',
        dataIndex: 'name'
    }, {
        type: 'string',
        dataIndex: 'number'
    }, {
        type: 'string',
        dataIndex: 'principal'
    }, {
        type: 'date',
        dataIndex: 'startDate'
    }, {
        type: 'date',
        dataIndex: 'endDate'
    },  {
        type: 'string',
        dataIndex: 'typeName'
    }, {
        type: 'string',
        dataIndex: 'typeShortName'
}]
			    });
}
Ext.extend(Srims.common.OutsourcingShowPanel_AllocationInfo_GridFilters, Ext.grid.GridFilters);