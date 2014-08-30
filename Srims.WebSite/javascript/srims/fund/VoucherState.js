
if (!Srims.fund) 
    Ext.namespace("Srims.fund");

Ext.namespace('Srims.fund.VoucherState');

Srims.fund.VoucherState.UnPrinted = 'UnPrinted';
Srims.fund.VoucherState.NotSignIn = 'NotSignIn';
Srims.fund.VoucherState.SignIn = 'SignIn';
Srims.fund.VoucherState.Allocated = 'Allocated';

Srims.fund.VoucherStateRender = function(value, metadata){
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
Srims.fund.FinanceVoucherState = "NotSignIn,SignIn,Allocated";
Srims.fund.VoucherStateFilterItems = [{
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

Srims.fund.VoucherStateStore = [['UnPrinted', '未打印'], ['NotSignIn', '已打印/未签收'], ['SignIn', '签收/未分配'], ['Allocated', '已分配']];
Srims.fund.VoucherStateForFinanceStore = [['NotSignIn', '已打印/未签收'], ['SignIn', '签收/未分配'], ['Allocated', '已分配']];
