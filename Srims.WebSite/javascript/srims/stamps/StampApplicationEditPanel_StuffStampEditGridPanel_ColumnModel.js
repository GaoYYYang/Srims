if (!Srims.stamp)
	Ext.namespace('Srims.stamp');

Srims.stamp.StampApplicationEditPanel_StuffStampEditGridPanel_ColumnModel = function(sm) {
	Srims.stamp.StampApplicationEditPanel_StuffStampEditGridPanel_ColumnModel.superclass.constructor.call(this, [sm,{
		header: "id",
		dataIndex: 'id',
		sortable: false,
		hidden: true
	},{
		header: "图章类型",
		dataIndex: 'type',
		width: 200,
		sortable: false,
		hidden: false
	},{
		id: 'number',
		header: '数量',
		dataIndex: 'number',
		width: 200,
		sortable: false,
		editor: new Ext.form.NumberField({
			allowDecimals: false,
			allowNegative: false,
			allowBlank: false,
			minValue: 1
		})
	},{
		id: 'pagination',
		header: '盖章页',
		dataIndex: 'pagination',
		width: 200,
		sortable: false,
		editor: new Ext.form.TextField({
			allowDecimals: false,
			allowNegative: false,
			allowBlank: false,
			minValue: 1
		})
	}])
}
Ext.extend(Srims.stamp.StampApplicationEditPanel_StuffStampEditGridPanel_ColumnModel, Ext.grid.ColumnModel);