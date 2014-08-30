Srims.Poll = new function() {
}
Srims.Poll.pollActionList = [];

Srims.Poll.getPollAction_WaitingStartCensorVerticalProjectCount = function() {
    var url = Srims.service.projects.ProjectService + '/GetWaitingStartCensorVerticalProjectCount';
    Srims.Poll.getPollAction(url, 'SpanWaitingStartCensorVerticalProjects', '审核项目立项');
}
Srims.Poll.getPollAction_WaitingStartCensorHorizontalProjectCount = function() {
    var url = Srims.service.projects.ProjectService + '/GetWaitingStartCensorHorizontalProjectCount';
    Srims.Poll.getPollAction(url, 'SpanWaitingStartCensorHorizontalProjects', '审核项目立项');
}
//审核外协单位13.3.3
Srims.Poll.getPollAction_WaitingStartCensorOutsourcingCount = function() {
    var url = Srims.service.common.OutsourcingService + '/DisVerfiy';
    Srims.Poll.getPollAction(url, 'SpanWaitingStartCensorOutsourcing', '审核项目立项：外协单位');
}
Srims.Poll.getPollAction_WaitingEndCensorVerticalProjectCount = function() {
    var url = Srims.service.projects.ProjectService + '/GetWaitingEndCensorVerticalProjectCount';
    Srims.Poll.getPollAction(url, 'SpanWaitingEndCensorVerticalProjects', '审核项目结项');
}
Srims.Poll.getPollAction_WaitingEndCensorHorizontalProjectCount = function() {
    var url = Srims.service.projects.ProjectService + '/GetWaitingEndCensorHorizontalProjectCount';
    Srims.Poll.getPollAction(url, 'SpanWaitingEndCensorHorizontalProjects', '审核项目结项');
}
Srims.Poll.getPollAction_UnreadMessagesCount = function() {
    var url = Srims.service.users.MessageService + '/GetUnReadMessageCount';
    Srims.Poll.getPollAction(url, 'SpanMessages', '短消息');
}
Srims.Poll.getPollAction_WaitingCensorVerticalProjectDocumentCount = function() {
    var url = Srims.service.documents.DocumentService + '/GetWaitingCensorDocumentsCountOfVerticalProjects';
    Srims.Poll.getPollAction(url, 'SpanWaitingCensorDocumentsOfVerticalProjects', '审核项目文档');
}
Srims.Poll.getPollAction_WaitingCensorHorizontalProjectDocumentCount = function() {
    var url = Srims.service.documents.DocumentService + '/GetWaitingCensorDocumentsCountOfHorizonalProjects';
    Srims.Poll.getPollAction(url, 'SpanWaitingCensorDocumentsOfHorizontalProjects', '审核项目文档');
}
Srims.Poll.getPollAction_WaitingCensorVerticalProjectContractCount = function() {
    var url = Srims.service.documents.ContractService + '/GetWaitingCensorContractsCountOfVerticalProjects';
    Srims.Poll.getPollAction(url, 'SpanWaitingCensorContractsOfVerticalProjects', '审核项目合同');
}
Srims.Poll.getPollAction_WaitingCensorHorizontalProjectContractCount = function() {
    var url = Srims.service.documents.ContractService + '/GetWaitingCensorContractsCountOfHorizonalProjects';
    Srims.Poll.getPollAction(url, 'SpanWaitingCensorContractsOfHorizontalProjects', '审核项目合同');
}
Srims.Poll.getPollAction_ExpertUnsubmitDocumentCount = function() {
    var url = Srims.service.documents.DocumentService + '/GetExpertUnSubmitDocumentCount';
    Srims.Poll.getPollAction(url, 'ExpertUnsubmitDocument', '待提交的文档');
}
Srims.Poll.getPollAction_WaitingCensorHorizontalProjectFundDescend = function() {
    var url = Srims.service.fund.FundDescendService + '/GetWaitingCensorFundDescendCount_Horizontal';
    Srims.Poll.getPollAction(url, 'SpanWaitingCensorHorizontalProjectFundDescend', '审核经费下拨');
}
Srims.Poll.getPollAction_WaitingAllocationVerticalProjectFundDescend = function() {
    var url = Srims.service.fund.FundDescendService + '/GetWaitingAllocationFundDescendCount_Vertical';
    Srims.Poll.getPollAction(url, 'SpanWaitingAllocationVerticalProjectFundDescend', '纵向未分配经费');
}
Srims.Poll.getPollAction_WaitingAllocationHorizontalProjectFundDescend = function() {
    var url = Srims.service.fund.FundDescendService + '/GetWaitingAllocationFundDescendCount_Horizontal';
    Srims.Poll.getPollAction(url, 'SpanWaitingAllocationHorizontalProjectFundDescend', '横向未分配经费');
}
Srims.Poll.getPollAction_MyWaitingAllocationFundDescend = function() {
    var url = Srims.service.fund.FundDescendService + '/GetMyWaitingAllocationFundDescendCount';
    Srims.Poll.getPollAction(url, 'SpanMyWaitingAllocationFundDescend', '经费分配');
}
Srims.Poll.getPollAction_WaitingCensorVerticalProjectFundAllocation = function() {
    var url = Srims.service.fund.FundAllocationService + '/GetWaitingCensorVerticalProjectFundAllcation';
    Srims.Poll.getPollAction(url, 'SpanWaitingCensorVerticalProjectFundAllocation', '审核经费分配');
}
Srims.Poll.getPollAction_WaitingCensorHorizontalProjectFundAllocation = function() {
    var url = Srims.service.fund.FundAllocationService + '/GetWaitingCensorHorizontalProjectFundAllcation';
    Srims.Poll.getPollAction(url, 'SpanWaitingCensorHorizontalProjectFundAllocation', '审核经费分配');
}
Srims.Poll.getPollAction_MyUnReadVoucher = function() {
    var url = Srims.service.fund.VoucherService + '/GetMyUnReadVoucherCount';
    Srims.Poll.getPollAction(url, 'SpanMyUnReadVoucher', '我的经费凭单');
}
Srims.Poll.getPollAction_WaitingCensorStamp = function() {
    var url = Srims.service.stamp.StampApplicationService + '/GetWaitingCensorStamp';
    Srims.Poll.getPollAction(url, 'SpanWaitingCensorStamp', '待审核文印');
}
Srims.Poll.getPollAction_WaitingDepartmentCensorStamp = function() {
    var url = Srims.service.stamp.StampApplicationService + '/GetWaitingDepartmentCensorStamp';
    Srims.Poll.getPollAction(url, 'SpanWaitingDepartmentCensorStamp', '待审核文印');
}
Srims.Poll.getPollAction_WaitingCensorAwardDocument = function() {
    var url = Srims.service.documents.AwardDocumentService + '/GetWaitingCensorCount';
    Srims.Poll.getPollAction(url, 'SpanWaitingCensorAwardDoucment', '待审核奖励文档');
}
Srims.Poll.getPollAction_WaitingCensorExpertEdit = function() {
    var url = Srims.service.experts.ExpertInfoHistoryService + '/GetWaitingCensorExpertEdit';
    Srims.Poll.getPollAction(url, 'SpanWaitingCensorExpertEdit', '审核专家编辑信息');
}

Srims.Poll.getPollAction_WaitingAllocationProjectPerformance = function() {
    var url = Srims.service.performance.PerformanceAllocationService + '/GetWaitingAllocationProjectPerformance';
    Srims.Poll.getPollAction(url, 'SpanWaitingAllocationProjectPerformance', '课题组间接费查询');
}

Srims.Poll.getPollAction_WaitingCensorVerticalProjectPerformanceAllocation = function() {
    var url = Srims.service.performance.PerformanceAllocationService + '/GetWaitingCensorVerticalProjectPerformance';
    Srims.Poll.getPollAction(url, 'SpanWaitingCensorVerticalProjectPerformanceAllocation', '审核绩效分配');
}
Srims.Poll.getPollAction_WaitingCensorHorizontalProjectPerformanceAllocation = function() {
    var url = Srims.service.performance.PerformanceAllocationService + '/GetWaitingCensorHorizontalProjectPerformance';
    Srims.Poll.getPollAction(url, 'SpanWaitingCensorHorizontalProjectPerformanceAllocation', '审核绩效分配');
}
Srims.Poll.getPollAction = function(url, domID, domText) {
    Ext.Ajax.request({
        url: url,
        method: 'POST',
        scope: this,
        success: function(response) {
            var node = Ext.DomQuery.selectNode('/Record', response.responseXML);
            var value = Ext.DomQuery.selectValue('/Count', node);
            if (Ext.getDom(domID))
                Ext.getDom(domID).innerHTML = parseInt(value, 10) > 0 ? "<span style='font-weight:bolder'>" + domText + '(' + value + ')</span>' : domText;
        }
    });
}
Srims.Poll.addPollAction = function(pollAction) {
    Srims.Poll.pollActionList[Srims.Poll.pollActionList.length] = pollAction;
}
Srims.Poll.startPolls = function() {
    for (var i = 0; i < Srims.Poll.pollActionList.length; i++) {
        this.action = {
            run: Srims.Poll.pollActionList[i],
            interval: 1000 * 60 * 5
        }
        Ext.TaskMgr.start(this.action);
    }
}
Srims.Poll.startPollAction = function(pollAction) {
    if (pollAction == undefined)
        return;
    pollAction();
};