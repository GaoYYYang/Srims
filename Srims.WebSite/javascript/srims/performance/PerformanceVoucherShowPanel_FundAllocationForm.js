
if (!Srims.performance)
    Ext.namespace("Srims.performance");

Srims.performance.PerformanceVoucherShowPanel_FundAllocationForm = function(voucher) {
    this._voucher = voucher;
    this._voucherFundAllocation = Srims.performance.getFundAllocationFromVoucher(this._voucher);
    return new Srims.performance.PerformanceAllocationShowPanel_BasicForm(this._voucherFundAllocation);
}
Srims.performance.getFundAllocationFromVoucher = function(voucher) {
    var fundAllocation = new Srims.performance.PerformanceAllocation({});
    fundAllocation.set('allocationDateTime', voucher.get('fundAllocationDateTime'));
    fundAllocation.set('performanceTotal', voucher.get('totalPerformancePay'));
    fundAllocation.set('performancePay', voucher.get('allocatedPerformancePay'));

    fundAllocation.set('dateTime', voucher.get('fundAllocationStateDateTime'));
    fundAllocation.set('operator', voucher.get('fundAllocationStateOperator'));
    fundAllocation.set('remark', voucher.get('fundAllocationStateRemark'));
    fundAllocation.set('state', voucher.get('fundAllocationState'));

    fundAllocation.set('projectName', voucher.get('projectName'));
    fundAllocation.set('projectTypeName', voucher.get('projectType'));
    fundAllocation.set('projectPricinpalName', voucher.get('projectPrincipal'));
    fundAllocation.set('arrivedOverheadexpensesExpert', voucher.get('performanceAllocationExpertTotal'));
    fundAllocation.set('arrivedPerformance', voucher.get('performanceAllocationArrivedPerformance'));

    return fundAllocation;
}
