if (!Srims.performance)
    Ext.namespace('Srims.performance');

Srims.performance.PerformanceAllocationCorrectWindow = function(fundAllocation) {

	this._fundAllocation = fundAllocation;

	this._buttonClose = new Ext.Button({
		minWidth: 70,
		text: '关 闭',
		window: this,
		handler: function() {
			var window = this.window;
			window.close();
		}
	});
	var load_url = Srims.service.fund.VoucherService + '/GetByFundAllocation';
	this._store = new Srims.fund.VoucherStore(load_url, {
		fundAllocationId: this._fundAllocation.get('id')
	});
	this._selections = new Ext.grid.RowSelectionModel();
	this._columnModel = new Ext.grid.ColumnModel([{
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
		id: 'voucherState',
		header: "状态",
		dataIndex: 'voucherState',
		hidden: false,
		renderer: Srims.fund.VoucherStateRender
	}]);
	this._tbar = new Srims.performance.VoucherGridPanel_ToolBar(this._selections, this._store, undefined, undefined, false, true, fundAllocation, false, true);

	this._gridPanelVoucher = new Ext.grid.GridPanel({
		store: this._store,
		colModel: this._columnModel,
		enableColumnHide: false,
		enableColumnMove: true,
		enableHdMenu: false,
		border: false,
		tbar: this._tbar,
		sm: this._selections,
		width: 700,
		height: 200,
		autoExpand: true,
		autoExpandColumn: 'voucherState',
		stripeRows: true,
		loadMask: true,
		stateful: false,
		viewConfig: {
			autoFill: true,
			scrollOffset: 0,
			forceFit: true,
			emptyText: '没有凭单信息'
		}
	});

	this._store.load();
	function onCellDblClick(grid, rowIndex, columnIndex, e) {
		var voucher = grid.getStore().getAt(rowIndex);
		if (!voucher.get('canEdit'))
			return;

		Srims.fund.editVoucher(fundAllocation, voucher);
	};

	this._gridPanelVoucher.on('celldblclick', onCellDblClick);

	Srims.performance.PerformanceAllocationCorrectWindow.superclass.constructor.call(this, {
		id: this._id,
		title: '纠正经费分配',
		autoHeight: true,
		width: 710,
		modal: true,
		deferredRender: false,
		stateful: false,
		frame: true,
		closeAction: 'close',
		layout: 'form',
		resizable: false,
		items: [this._gridPanelVoucher],
		buttons: [this._buttonClose]
	});
}
Ext.extend(Srims.performance.PerformanceAllocationCorrectWindow, Ext.Window, {})