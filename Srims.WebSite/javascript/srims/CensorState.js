Srims.CensorState = new function(){
};

Srims.CensorState.unSubmited='UnSubmited';
Srims.CensorState.waitingCensor='WaitingCensor';
Srims.CensorState.reject='Reject';
Srims.CensorState.passed='Passed';
Srims.CensorState.canceled='Canceled';

Srims.CensorState.Render = function(value){
    switch (value) {
        case 'UnSubmited':
            return '未提交';
        case 'WaitingCensor':
            return '等待审核';
        case 'Reject':
            return '审核驳回';
        case 'Passed':
            return '审核通过';
        case 'Canceled':
            return '作废';
        default:
            return '<span class="error">未知</span>';
    }
};
