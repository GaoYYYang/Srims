
if (!Srims.performance)
    Ext.namespace("Srims.performance");

Ext.namespace('Srims.performance.VoucherState');

Srims.performance.VoucherState.UnPrinted = 'UnPrinted';
Srims.performance.VoucherState.NotSignIn = 'NotSignIn';
Srims.performance.VoucherState.SignIn = 'SignIn';
Srims.performance.VoucherState.Allocated = 'Allocated';

Srims.performance.VoucherStateRender = function(value) {
    switch (value) {
        case 'UnPrinted':
            return '审核通过/未打印';
        case 'NotSignIn':
            return '已打印/未签收';
        case 'SignIn':
            return '签收/未分配';
        case 'Allocated':
            return '已分配';
        case 'WaitingCensor':
            return '未审核';
        case 'Canceled':
            return '作废';
        case 'Reject':
            return '审核驳回';
        default:
            return '未知';
    }
}
Srims.performance.FinanceVoucherState = "NotSignIn,SignIn,Allocated";
Srims.performance.VoucherStateFilterItems = [{
    id: 'UnPrinted',
    text: '未打印'
}, {
    id: 'NotSignIn',
    text: '已打印/未签收'
}, {
    id: 'SignIn',
    text: '签收/未分配'
}, {
    id: 'Allocated',
    text: '已分配'
}];

    Srims.performance.VoucherStateStore = [['UnPrinted', '未打印'], ['NotSignIn', '已打印/未签收'], ['SignIn', '签收/未分配'], ['Allocated', '已分配']];
    Srims.performance.VoucherStateForFinanceStore = [['NotSignIn', '已打印/未签收'], ['SignIn', '签收/未分配'], ['Allocated', '已分配']];
