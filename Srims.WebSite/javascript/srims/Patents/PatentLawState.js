
if (!Srims.patents)
    Ext.namespace("Srims.patents");

Ext.namespace('Srims.patents.PatentLawState');

Srims.patents.PatentLawState.Unknown = 'Unknown';
Srims.patents.PatentLawState.PCT = 'PCT';
Srims.patents.PatentLawState.Reject = 'Reject';
Srims.patents.PatentLawState.Cancel = 'Cancel';
Srims.patents.PatentLawState.Publish = 'Publish';
Srims.patents.PatentLawState.Censor = 'Censor';
Srims.patents.PatentLawState.TreatCancel = 'TreatCancel';
Srims.patents.PatentLawState.AcceptCase = 'AcceptCase';
Srims.patents.PatentLawState.Accredit = 'Accredit';
Srims.patents.PatentLawState.Abandon = 'Abandon';
Srims.patents.PatentLawState.Resume = 'Resume';
Srims.patents.PatentLawState.End = 'End';

Srims.patents.PatentLawStateRender = function(value, metadata) {
    switch (value) {
        case 'PCT':
            return 'PCT阶段';
        case 'Reject':
            return '驳回';
        case 'Cancel':
            return '撤回';
        case 'Publish':
            return '公开';
        case 'Censor':
            return '实审';
        case 'TreatCancel':
            return '视为撤回';
        case 'AcceptCase':
            return '受理';
        case 'Accredit':
            return '授权';
        case 'Abandon':
            return '专利权放弃';
        case 'Resume':
            return '专利权恢复';
        case 'End':
            return '专利权终止';
        default:
            return '未知';
    }
}


Srims.patents.PatentLawStateStore = [['PCT', 'PCT阶段'], ['Reject', '驳回'],
['Cancel', '撤回'], ['Publish', '公开'],
['Censor', '实审'], ['TreatCancel', '视为撤回'],
['AcceptCase', '受理'], ['Accredit', '授权'],
['Abandon', '专利权放弃'], ['Resume', '专利权恢复'],
['End', '专利权终止'], ['Unknown', '未知']];








