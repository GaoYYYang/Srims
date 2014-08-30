
if (!Srims.performance)
    Ext.namespace("Srims.performance");

Srims.performance.PerformanceVoucherShowPanel = function(panelId, voucher, store, isFinanceManage) {

    this._id = panelId;
    this._voucher = voucher;
    this._store = store;

    this._basicForm = new Srims.performance.PerformanceVoucherShowPanel_BasicForm(voucher);
    this._stateHistoryForm = new Srims.performance.PerformanceVoucherShowPanel_StateHistoryForm(voucher);
    this._fundAllocationForm = new Srims.performance.PerformanceVoucherShowPanel_FundAllocationForm(voucher);
    //this._financeForm = new Srims.performance.PerformanceVoucherShowPanel_FinanceFor(voucher);
    this._toolBar = new Srims.performance.PerformanceVoucherShowPanel_ToolBar(voucher, this._store, this._id, isFinanceManage);

    var user = Srims.currentLoginLog.user;
    this._isExpert = user.userRoleType == 'Expert' ? true : false;

    var items = [];
    items = [this._basicForm, this._fundAllocationForm, this._stateHistoryForm];

    Srims.performance.PerformanceVoucherShowPanel.superclass.constructor.call(this, {
        id: this._id,
        style: 'padding:5px; width:1200px',
        frame: true,
        closable: true,
        deferHeight: false,
        buttonAlign: 'center',
        title: '课题组间接费用及绩效凭单' + this._voucher.get('voucherNumber'),
        iconCls: 'icon-show',
        tbar: this._isExpert ? undefined : this._toolBar,
        items: items
    });
    this.resetValues = function(voucher) {
        var fundAllocation = Srims.performance.getFundAllocationFromVoucher(voucher);
        //var finance = Srims.fund.getFinanceFromVoucher(voucher);
        this._basicForm.resetValues(voucher);
        this._fundAllocationForm.resetComponnentsValue(fundAllocation);
        //this._financeForm.resetComponnentsValue(finance);
    }
}
Ext.extend(Srims.performance.PerformanceVoucherShowPanel, Ext.Panel, {});
