if (!Srims.fund)
	Ext.namespace('Srims.fund');

Srims.fund.FinanceVouchersShowWindow_VoucherGridPanel_ColumnModel = function() {
	Srims.fund.FinanceVouchersShowWindow_VoucherGridPanel_ColumnModel.superclass.constructor.call(this, [{
		header: "id",
		dataIndex: 'id',
		hidden: true,
		hideable: false
	},{
		header: "凭单号",
		dataIndex: 'voucherNumber'
	},{
		header: "经费成员",
		dataIndex: 'expertName'
	},{
		header: "金额(万元)",
		dataIndex: 'amount',
		renderer: Money.render
	},{
		header: "校内金额(万元)",
		dataIndex: 'allocationIn',
		renderer: Money.render
	},{
		header: "外协金额(万元)",
		dataIndex: 'allocationOut',
		renderer: Money.render
	},{
		header: "账本号",
		dataIndex: 'accountBookNumber'
	},{
		header: "分配时间",
		dataIndex: 'fundAllocationDateTime',
		renderer: Date.render
	},{
		id: 'voucherState',
		header: "状态",
		dataIndex: 'voucherState',
		renderer: Srims.fund.VoucherStateRender
	}]);
}
Ext.extend(Srims.fund.FinanceVouchersShowWindow_VoucherGridPanel_ColumnModel, Ext.grid.ColumnModel);