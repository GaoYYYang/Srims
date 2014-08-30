
if (!Srims.type)
	Ext.namespace("Srims.type");

Srims.type.ManagementFeesGridPanel_GridFilter = function() {
	Srims.type.ManagementFeesGridPanel_GridFilter.superclass.constructor.call(
			this, {
				filters : [{
							type : 'string',
							dataIndex : 'type'
						}]
			});
}
Ext.extend(Srims.type.ManagementFeesGridPanel_GridFilter,Ext.grid.GridFilters);