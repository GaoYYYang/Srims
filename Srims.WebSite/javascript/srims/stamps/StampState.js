if (!Srims.stamp)
    Ext.namespace("Srims.stamp");

Ext.namespace('Srims.stamp.StampState');

Srims.stamp.StampState.UnSubmit = 'UnSubmit';
Srims.stamp.StampState.Submit = 'Submit';
Srims.stamp.StampState.CensorPass = 'CensorPass';
Srims.stamp.StampState.CensorReject = 'CensorReject';
Srims.stamp.StampState.DepartmentCensorPass = 'DepartmentCensorPass';
Srims.stamp.StampState.DepartmentCensorReject = 'DepartmentCensorReject';
Srims.stamp.StampState.Stamp = 'Stamp';
Srims.stamp.StampState.CensorPassComplete = 'CensorPassComplete';
Srims.stamp.StampState.WaitDepartmentCensor = 'WaitDepartmentCensor';

Srims.stamp.StampStateRender = function(value, metadata) {
    switch (value) {
        case 'UnSubmit':
            return '未提交';
        case 'Submit':
            return '已提交';
        case 'CensorPass':
            return '初审通过';
        case 'CensorReject':
            return '初审驳回';
        case 'Stamp':
            return '已盖章';
        case 'DepartmentCensorPass':
            return '部门审核通过';
        case 'DepartmentCensorReject':
            return '部门审核驳回';
        case 'CensorPassComplete':
            return '初审最终完成';
        case 'WaitDepartmentCensor':
            return '提交部门审核';

        default:
            return '未提交';
    }
}
Srims.stamp.StampStateStore = [['UnSubmit', '未提交'], ['Submit', '已提交'], ['CensorPass', '初审通过'], ['CensorPassComplete', '初审最终完成'], ['CensorReject', '初审驳回'], ['Stamp', '已盖章'], ['WaitDepartmentCensor', '提交部门审核'], ['DepartmentCensorPass', '部门审核通过'], ['DepartmentCensorReject', '部门审核驳回']];