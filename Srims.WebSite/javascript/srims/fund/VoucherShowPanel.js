
if (!Srims.fund)
    Ext.namespace("Srims.fund");

Srims.fund.VoucherShowPanel = function(panelId, voucher, store, isFinanceManage,fundAllocation) {

    this._id = panelId;
    this._voucher = voucher;
    this._store = store;

    this._basicForm = new Srims.fund.VoucherShowPanel_BasicForm(voucher);
    this._stateHistoryForm = new Srims.fund.VoucherShowPanel_StateHistoryForm(voucher);
    this._voucherOutForm = new Srims.fund.VoucherShowPanel_VoucherOutForm(voucher);
    this._fundAllocationForm = new Srims.fund.VoucherShowPanel_FundAllocationForm(voucher);
    this._financeForm = new Srims.fund.VoucherShowPanel_FinanceForm(voucher);
    this._toolBar = new Srims.fund.VoucherShowPanel_ToolBar(voucher, this._store, this._id, isFinanceManage, this);

    var user = Srims.currentLoginLog.user;
    this._isExpert = user.userRoleType == 'Expert' ? true : false;

    var items = [];
    if (this._isExpert)
        items = [this._basicForm, this._voucherOutForm, this._stateHistoryForm];
    else
        items = [this._basicForm, this._voucherOutForm, this._fundAllocationForm, this._financeForm, this._stateHistoryForm];

    Srims.fund.VoucherShowPanel.superclass.constructor.call(this, {
        id: this._id,
        style: 'padding:5px; width:1200px',
        frame: true,
        closable: true,
        deferHeight: false,
        buttonAlign: 'center',
        title: '凭单' + this._voucher.get('voucherNumber'),
        iconCls: 'icon-show',
        tbar: this._isExpert ? undefined : this._toolBar,
        items: items
    });
    this.resetValues = function(voucher) {
        var fundAllocation = Srims.fund.getFundAllocationFromVoucher(voucher,fundAllocation);
        var finance = Srims.fund.getFinanceFromVoucher(voucher);
        this._basicForm.resetValues(voucher);
        this._fundAllocationForm.resetComponnentsValue(fundAllocation);
        this._financeForm.resetComponnentsValue(finance);
    }
}
Ext.extend(Srims.fund.VoucherShowPanel, Ext.Panel, {});
