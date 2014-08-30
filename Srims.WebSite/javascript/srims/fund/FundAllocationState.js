
if (!Srims.fund) 
    Ext.namespace('Srims.fund');

Ext.namespace('Srims.fund.fundAllocationState');

Srims.fund.fundAllocationState.UnSubmit = 'UnSubmit';
Srims.fund.fundAllocationState.WaitingCensor = 'WaitingCensor';
Srims.fund.fundAllocationState.Reject = 'Reject';
Srims.fund.fundAllocationState.Passed = 'Passed';
Srims.fund.fundAllocationState.Canceled = 'Canceled';

Srims.fund.fundAllocationStateRender = function(value){
    switch (value) {
        case 'UnSubmit':
            return '未提交/待分配';
        case 'WaitingCensor':
            return '等待审核';
        case 'Reject':
            return '审核驳回';
        case 'Passed':
            return '审核通过';
        case 'Canceled':
            return '作废';
        default:
            return '未知';
    }
}
Srims.fund.fundAllocationStateFilterItems = [{
    id: 'UnSubmit',
    text: '未提交'
}, {
    id: 'WaitingCensor',
    text: '等待审核'
}, {
    id: 'Reject',
    text: '审核驳回'
}, {
    id: 'Passed',
    text: '审核通过'
}, {
    id: 'Canceled',
    text: '作废'
}];

Srims.fund.fundAllocationStore = [['UnSubmit', '未提交'], ['WaitingCensor', '等待审核'], ['Reject', '审核驳回'], ['Passed', '审核通过'], ['Canceled', '作废']];
