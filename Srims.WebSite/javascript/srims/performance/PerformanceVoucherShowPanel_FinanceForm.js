
if (!Srims.performance)
    Ext.namespace("Srims.performance");

Srims.performance.PerformanceVoucherShowPanel_FinanceForm = function(voucher) {
    this._voucher = voucher;
    this._voucherFinance = Srims.performance.getFinanceFromVoucher(this._voucher);
    this._isBorrow = voucher.get('isBorrow');
    return new Srims.fund.FinanceShowForm(this._voucherFinance, this._isBorrow);
}
Srims.performance.getFinanceFromVoucher = function(voucher) {
    var finance = new Srims.fund.Finance({});
    finance.set('amount', voucher.get('financeAmount'));
    finance.set('receivedDate', voucher.get('financeReceivedDate'));
    finance.set('voucherNumber', voucher.get('financeVoucherNumber'));
    finance.set('abstract', voucher.get('financeAbstract'));

    return finance;
}
