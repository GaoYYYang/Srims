/**
 * @author dulintao
 */
if (!Srims.common)
	Ext.namespace('Srims.common');
Srims.common.OutsourcingGridPanel_GridFilters = function() {
	Srims.common.OutsourcingGridPanel_GridFilters.superclass.constructor.call(
			this, {
	filters: [
				{
							type : 'string',
							dataIndex : 'name'
			}, 
			{
			    type: 'string',
			    dataIndex: 'legalRepresentativeName'
			}, 
//			{
//							type : 'date',
//							dataIndex: 'createDateTime'
//							},  
						{
			    type: 'string',
			    dataIndex: 'isVerify'
			    }]
			});
}
Ext.extend(Srims.common.OutsourcingGridPanel_GridFilters, Ext.grid.GridFilters);