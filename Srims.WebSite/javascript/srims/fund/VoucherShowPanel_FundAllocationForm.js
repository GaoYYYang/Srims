
if (!Srims.fund)
    Ext.namespace("Srims.fund");

Srims.fund.VoucherShowPanel_FundAllocationForm = function(voucher) {
    this._voucher = voucher;
    this._voucherFundAllocation = Srims.fund.getFundAllocationFromVoucher(this._voucher, this._fundAllocations);
    return new Srims.fund.FundAllocationShowPanel_BasicForm(this._voucherFundAllocation, true);
}
Srims.fund.getFundAllocationFromVoucher = function(voucher) {
    var fundAllocation = new Srims.fund.FundAllocation({});
    fundAllocation.set('allocationDateTime', voucher.get('fundAllocationDateTime'));
    fundAllocation.set('allocationTotal', voucher.get('fundAllocationAllocationTotal'));
    fundAllocation.set('allocationIn', voucher.get('fundAllocationAllocationIn'));
    fundAllocation.set('allocationOut', voucher.get('fundAllocationAllocationOut'));
    fundAllocation.set('allocationHardware', voucher.get('fundAllocationHardware'));


    fundAllocation.set('overheadExpenses', voucher.get('fundAllocationOverheadExpenses'));

    fundAllocation.set('dateTime', voucher.get('fundAllocationStateDateTime'));
    fundAllocation.set('operator', voucher.get('fundAllocationStateOperator'));
    fundAllocation.set('remark', voucher.get('fundAllocationStateRemark'));
    fundAllocation.set('state', voucher.get('fundAllocationState'));
    fundAllocation.set('overheadExpensesOut', voucher.get('fundAllocationOverheadExpensesOut'));
    fundAllocation.set('projectName', voucher.get('projectName'));
    fundAllocation.set('projectTypeName', voucher.get('projectType'));
    fundAllocation.set('projectPricinpalName', voucher.get('projectPrincipal'));

    fundAllocation.set('overheadPerformancePay', voucher.get('overheadPerformancePay'));
    fundAllocation.set('overheadExpensesMiddle', voucher.get('fundAllocationOverheadExpensesMiddle'));
    fundAllocation.set('overheadExpensesExpert', voucher.get('fundAllocationOverheadExpensesExpert'));
    fundAllocation.set('overheadExpensesIn', voucher.get('fundAllocationOverheadExpensesIn'));
    return fundAllocation;
}
