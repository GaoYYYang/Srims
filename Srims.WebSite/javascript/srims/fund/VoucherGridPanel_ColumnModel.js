if (!Srims.fund)
	Ext.namespace('Srims.fund');
Srims.fund.VoucherGridPanel_ColumnModel_Renderer = function(value, metadata, record) {

	if (record.get('isRead') == false)
		metadata.css = "voucher_unread " + metadata.css;

	return value;
};
Srims.fund.VoucherGridPanel_ColumnModel = function(isFinanceManage, isExpert) {
	Srims.fund.VoucherGridPanel_ColumnModel.superclass.constructor.call(this, [{
		header: "id",
		dataIndex: 'id',
		hidden: true,
		hideable: false,
		renderer: function(value, metadata, record) {
			if (isExpert && record.get('isRead') == false)
				Srims.fund.VoucherGridPanel_ColumnModel_Renderer(value, metadata, record);
			return value;
		}
	},{
		header: "凭单号",
		dataIndex: 'voucherNumber',
		sortable: true,
		width: 40,
		hidden: false,
		renderer: function(value, metadata, record) {
			if (isExpert && record.get('isRead') == false)
				Srims.fund.VoucherGridPanel_ColumnModel_Renderer(value, metadata, record);
			return value;
		}
	},{
		header: "专家",
		dataIndex: 'expertName',
		sortable: true,
		width: 30,
		hidden: false,
		renderer: function(value, metadata, record) {
			if (isExpert && record.get('isRead') == false)
				Srims.fund.VoucherGridPanel_ColumnModel_Renderer(value, metadata, record);
			return value;
		}
	},{
		header: "项目名称",
		dataIndex: 'projectName',
		sortable: true,
		hidden: false,
		width: 90,
		renderer: function(value, metadata, record) {
			if (isExpert && record.get('isRead') == false)
				Srims.fund.VoucherGridPanel_ColumnModel_Renderer(value, metadata, record);
			return value;
		}
	},{
		header: "金额(万元)",
		dataIndex: 'amount',
		width: 40,
		sortable: true,
		hidden: false,
		renderer: function(value, metadata, record) {
			if (isExpert && record.get('isRead') == false)
				Srims.fund.VoucherGridPanel_ColumnModel_Renderer(value, metadata, record);
			return Money.render(value);
		}
	},{
		header: "状态",
		dataIndex: 'voucherState',
		width: 40,
		sortable: true,
		hidden: false,
		renderer: function(value, metadata, record) {
			if (isExpert && record.get('isRead') == false)
				Srims.fund.VoucherGridPanel_ColumnModel_Renderer(value, metadata, record);
			return Srims.fund.VoucherStateRender(value);
		}
	},{
		header: "财务分配时间",
		dataIndex: 'financeAllocationDateTime',
		width: 20,
		sortable: true,
		hidden: !isFinanceManage,
		renderer: function(value, metadata, record) {
			if (isExpert && record.get('isRead') == false)
				Srims.fund.VoucherGridPanel_ColumnModel_Renderer(value, metadata, record);
			return Date.render(value);
		}
	},{
		header: "制单号",
		dataIndex: 'financeNumber',
		width: 40,
		sortable: true,
		hidden: !isFinanceManage,
		renderer: function(value, metadata, record) {
			if (isExpert && record.get('isRead') == false)
				Srims.fund.VoucherGridPanel_ColumnModel_Renderer(value, metadata, record);
			return value;
		}
	},{
		header: "账本号",
		dataIndex: 'accountBookNumber',
		width: 40,
		sortable: true,
		hidden: true,
		renderer: function(value, metadata, record) {
			if (isExpert && record.get('isRead') == false)
				Srims.fund.VoucherGridPanel_ColumnModel_Renderer(value, metadata, record);
			return value;
		}
	},{
		header: "硬件费(万元)",
		dataIndex: 'allocationHardware',
		width: 40,
		sortable: true,
		hidden: true,
		renderer: function(value, metadata, record) {
			if (isExpert && record.get('isRead') == false)
				Srims.fund.VoucherGridPanel_ColumnModel_Renderer(value, metadata, record);
			return Money.render(value);
		}
	},{
		header: "校内分配(万元)",
		dataIndex: 'allocationIn',
		width: 40,
		sortable: true,
		hidden: true,
		renderer: function(value, metadata, record) {
			if (isExpert && record.get('isRead') == false)
				Srims.fund.VoucherGridPanel_ColumnModel_Renderer(value, metadata, record);
			return Money.render(value);
		}
	},{
		header: "绩效账本号",
		dataIndex: 'performanceAccountBookNumber',
		width: 40,
		sortable: true,
		hidden: true,
		renderer: function(value, metadata, record) {
			if (isExpert && record.get('isRead') == false)
				Srims.fund.VoucherGridPanel_ColumnModel_Renderer(value, metadata, record);
			return value;
		}
	},{
		header: "绩效分配(万元)",
		dataIndex: 'performancePay',
		width: 40,
		sortable: true,
		hidden: false,
		renderer: function(value, metadata, record) {
			if (isExpert && record.get('isRead') == false)
				Srims.fund.VoucherGridPanel_ColumnModel_Renderer(value, metadata, record);
			return Money.render(value);
		}
	},{
		header: "外协分配(万元)",
		dataIndex: 'allocationOut',
		width: 40,
		sortable: true,
		hidden: true,
		renderer: function(value, metadata, record) {
			if (isExpert && record.get('isRead') == false)
				Srims.fund.VoucherGridPanel_ColumnModel_Renderer(value, metadata, record);
			return Money.render(value);
		}
	},{
		header: "已读",
		dataIndex: 'isRead',
		width: 40,
		sortable: true,
		hidden: true,
		renderer: function(value, metadata, record) {
			if (isExpert && record.get('isRead') == false)
				Srims.fund.VoucherGridPanel_ColumnModel_Renderer(value, metadata, record);
			return Boolean.render(value);
		}
	},{
		header: "校内分配管理费(万元)",
		dataIndex: 'overheadExpensesIn',
		width: 40,
		sortable: true,
		hidden: true,
		renderer: function(value, metadata, record) {
			if (isExpert && record.get('isRead') == false)
				Srims.fund.VoucherGridPanel_ColumnModel_Renderer(value, metadata, record);
			return Money.render(value);
		}
	},{
		header: "外协分配管理费(万元)",
		dataIndex: 'overheadExpensesOut',
		width: 40,
		sortable: true,
		hidden: true,
		renderer: function(value, metadata, record) {
			if (isExpert && record.get('isRead') == false)
				Srims.fund.VoucherGridPanel_ColumnModel_Renderer(value, metadata, record);
			return Money.render(value);
		}
	},{
		header: "绩效管理费(万元)",
		dataIndex: 'overheadPerformancePay',
		width: 40,
		sortable: true,
		hidden: true,
		renderer: function(value, metadata, record) {
			if (isExpert && record.get('isRead') == false)
				Srims.fund.VoucherGridPanel_ColumnModel_Renderer(value, metadata, record);
			return Money.render(value);
		}
	},{
		header: "管理费(万元)",
		dataIndex: 'overheadExpenses',
		width: 40,
		sortable: true,
		hidden: true,
		renderer: function(value, metadata, record) {
			if (isExpert && record.get('isRead') == false)
				Srims.fund.VoucherGridPanel_ColumnModel_Renderer(value, metadata, record);
			return Money.render(value);
		}
	}]);

	this.defaultSortable = false;
}
Ext.extend(Srims.fund.VoucherGridPanel_ColumnModel, Ext.grid.ColumnModel);