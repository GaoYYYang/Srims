if (!Srims.type)
	Ext.namespace('Srims.type');

Srims.type.ManagementFeesGridPanel_ColumnModel = function() {
	Srims.type.ManagementFeesGridPanel_ColumnModel.superclass.constructor.call(
			this, [{
						header : 'id',
						dataIndex : 'id',
						hidden : true,
						hideable : false
					}, {
						header : '管理费收取类别',
						dataIndex : 'type',
						sortable : true,
						hidden : false
					}, {
						header : '经费额度（万元）',
						dataIndex : 'fundtotal',
						sortable : true,
						renderer : Money.render,
						hidden : false
					}, {
						header : '管理费',
						dataIndex : 'fee',
						renderer: ExpenseRate.render,
						hidden : false
					}, {
						header : '绩效工资',
						dataIndex : 'performancepay',
						sortable : true,
						renderer: ExpenseRate.render,
						hidden : false
					}, {
						header : '备注',
						dataIndex : 'remark',
						flex : 1,
						hidden : false
					}])
}
Ext
		.extend(Srims.type.ManagementFeesGridPanel_ColumnModel,
				Ext.grid.ColumnModel);