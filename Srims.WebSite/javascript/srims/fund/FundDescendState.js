
if (!Srims.fund) 
    Ext.namespace('Srims.fund');

Ext.namespace('Srims.fund.fundDescendState');

Srims.fund.fundDescendState.WaitingCensor = 'WaitingCensor';
Srims.fund.fundDescendState.Reject = 'Reject';
Srims.fund.fundDescendState.Passed = 'Passed';
Srims.fund.fundDescendState.AllocationCompleted = 'AllocationCompleted';

Srims.fund.fundDescendStateRender = function(value){
    switch (value) {
        case 'WaitingCensor':
            return '等待审核';
        case 'Reject':
            return '审核驳回';
        case 'Passed':
            return '待分配';
        case 'AllocationCompleted':
            return '分配完成';
        default:
            return '未知';
    }
}
