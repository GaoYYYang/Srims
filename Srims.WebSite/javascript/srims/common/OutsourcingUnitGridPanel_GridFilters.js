/**
 * @author dulintao
 */
if (!Srims.common)
	Ext.namespace('Srims.common');
Srims.common.OutsourcingUnitGridPanel_GridFilters = function() {
	Srims.common.OutsourcingUnitGridPanel_GridFilters.superclass.constructor.call(
			this, {
				filters : [{
							type : 'string',
							dataIndex : 'name'
						}, {
							type : 'date',
							dataIndex : 'createDateTime'
						}, {
							type : 'string',
							dataIndex : 'director'
						}]
			});
}
Ext.extend(Srims.common.OutsourcingUnitGridPanel_GridFilters, Ext.grid.GridFilters);