if (!Srims.fund)
	Ext.namespace('Srims.fund');

Srims.fund.FundDescendGridPanel_ColumnModel = function(isBorrow, isNotNeedProjectName, isShowFinanceInfo) {
	Srims.fund.FundDescendGridPanel_ColumnModel.superclass.constructor.call(this, [{
		header: 'id',
		dataIndex: 'ID',
		sortable: false,
		hidden: true
	},{
		header: isBorrow ? '借款项目' : '下拨项目',
		dataIndex: 'projectName',
		sortable: false,
		hidden: isNotNeedProjectName,
		width: 300
	},{
		header: '项目负责人',
		dataIndex: 'projectPrincipalName',
		sortable: false,
		hidden: isNotNeedProjectName
	},{
		header: isBorrow ? '借款金额（万元）' : '下拨金额(万元)',
		dataIndex: 'amount',
		sortable: true,
		renderer: Money.render
	},{
		header: '经费凭单号',
		dataIndex: 'financeVoucherNumber',
		sortable: false,
		hidden: !isShowFinanceInfo
	},{
		header: '经费说明',
		dataIndex: 'financeAbstract',
		sortable: false,
		hidden: !isShowFinanceInfo,
		width: 200
	},{
		header: isBorrow ? '借款时间' : '下拨时间',
		dataIndex: 'descendDateTime',
		sortable: true,
		renderer: Date.render
	},{
		header: isBorrow ? '已还金额' : '实到金额(万元)',
		dataIndex: 'receivedAmount',
		sortable: true,
		renderer: Money.render
	},{
		id: 'operator',
		header: isBorrow ? '借款人' : '下拨人',
		dataIndex: 'operator'
	},{
		header: '当前状态',
		dataIndex: 'state',
		renderer: Srims.fund.fundDescendStateRender
	}])
}
Ext.extend(Srims.fund.FundDescendGridPanel_ColumnModel, Ext.grid.ColumnModel)