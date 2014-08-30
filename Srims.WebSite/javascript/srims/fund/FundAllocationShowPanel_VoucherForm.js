if (!Srims.fund)
	Ext.namespace("Srims.fund");

Srims.fund.FundAllocationShowPanel_VoucherForm = function(fundAllocation, isExpertGuid) {

	var load_url = Srims.service.fund.VoucherService + '/GetByFundAllocation';
	this._store = new Srims.fund.VoucherStore(load_url, {
		fundAllocationId: fundAllocation.get('id')
	});
	this._selections = new Ext.grid.RowSelectionModel();
	this._columnModel = new Ext.grid.ColumnModel([{
		header: "id",
		dataIndex: 'id',
		hidden: true,
		hideable: false
	},{
		header: "凭单号",
		dataIndex: 'voucherNumber',
		hidden: isExpertGuid
	},{
		header: "经费成员",
		dataIndex: 'expertName'
	},{
		header: "金额(万元)",
		dataIndex: 'amount',
		renderer: Money.render
	},{
		header: "直接费用(万元)",
		dataIndex: 'allocationIn',
		renderer: Money.render
//	},{
//		header: "绩效金额(万元)",
//		dataIndex: 'performancePay',
//		renderer: Money.render
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
		hidden: isExpertGuid,
		renderer: Srims.fund.VoucherStateRender
	}]);
	this._tbar = new Srims.fund.VoucherGridPanel_ToolBar(this._selections, this._store, undefined, undefined, false, true, fundAllocation, isExpertGuid, false);

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
		autoExpand: true,
		autoExpandColumn: 'voucherState',
		style: isExpertGuid == true ? 'padding:10px' : '',
		stripeRows: true,
		loadMask: true,
		autoHeight: true,
		stateful: false,
		viewConfig: {
			autoFill: true,
			scrollOffset: 0,
			forceFit: true,
			emptyText: '没有凭单信息'
		}
	});

	Srims.fund.FundAllocationShowPanel_VoucherForm.superclass.constructor.call(this, {
		collapsible: true,
		title: '经费分配凭单信息',
		frame: true,
		labelWidth: 100,
		layout: 'form',
		bodyStyle: 'padding:0 5px 0',
		style: 'margin-bottom: 2px',
		defaultType: 'textfield',
		titleCollapse: true,
		items: [this._gridPanelVoucher]
	});

	this._store.load();
	//仅专家向导使用
	this._gridPanelVoucher.form = this;
	this._gridPanelVoucher.refresh = function() {

		Ext.Ajax.request({
			url: Srims.service.fund.FundAllocationService + '/GetById',
			params: {
				fundAllocationId: this.fundAllocation.get('id')
			},
			scope: this,
			success: function(response) {
				var store = new Ext.data.Store({
					data: response.responseXML,
					reader: new Srims.fund.FundAllocationXmlReader()
				});
				var currentFundAllocation = store.getAt(0);
				this._fundAllocation = currentFundAllocation;
				currentFundAllocation.panel = this;

				this.getStore().load();
				this.form._tbar.resetComponentFundAllocation(currentFundAllocation);
				if (currentFundAllocation.get('canAllocation')) {
					this.button.panel.next();
					this.button.setText('分配');
				} else if(currentFundAllocation.get('canSubmit'))
					this.button.setText('提交');
				else
					this.button.setText('撤销提交');
			}
		});
	}
	function onCellDblClick(grid, rowIndex, columnIndex, e) {
		var voucher = grid.getStore().getAt(rowIndex);
		if (!voucher.get('canEdit'))
			return;

//Srims.fund.editVoucher(fundAllocation, voucher);//Srims.fund.showVoucher(fundAllocation, voucher,false);
	};

	this._gridPanelVoucher.on('celldblclick', onCellDblClick);
}
Ext.extend(Srims.fund.FundAllocationShowPanel_VoucherForm, Ext.form.FormPanel, {});