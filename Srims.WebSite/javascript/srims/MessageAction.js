//短消息使用
Srims.MessageAction = new function() {
}
//查看项目
Srims.MessageAction.response_project = undefined;
Srims.MessageAction.showDocumentManageWindow = false;
Srims.MessageAction.showContractManageWindow = false;
Srims.MessageAction.showProject = function(projectId, isShowDocumentManageWindow, isShowContractManageWindow) {
	Srims.MessageAction.showDocumentManageWindow = isShowDocumentManageWindow;
	Srims.MessageAction.showContractManageWindow = isShowContractManageWindow;

	Ext.Ajax.request({
		url: Srims.service.projects.ProjectService + '/GetById',
		params: {
			projectId: projectId
		},
		scope: this,
		success: function(response) {
			Srims.MessageAction.response_project = response;
			Srims.Load.loadProjectModule('Srims.MessageAction.showProject_Response();');
		}
	});
}
Srims.MessageAction.showProject_Response = function() {
	var store = new Ext.data.Store({
		data: Srims.MessageAction.response_project.responseXML,
		reader: new Srims.projects.ProjectSimpleXmlReader()
	});
	var project = store.getAt(0);
	Srims.projects.showProject(project);

	if (Srims.MessageAction.showDocumentManageWindow)
		Srims.projects.showDocumentWindow(project);
	if (Srims.MessageAction.showContractManageWindow)
		Srims.projects.showContractWindow(project);
}
//查看奖励文档
Srims.MessageAction.response_award = undefined;
Srims.MessageAction.showAwardDocument = function(awardId) {
	Ext.Ajax.request({
		url: Srims.service.awards.AwardService + '/GetById',
		params: {
			awardId: awardId
		},
		scope: this,
		success: function(response) {
			Srims.MessageAction.response_award = response;
			Srims.Load.loadAwardModule('Srims.MessageAction.showResponse_award();');
		}
	});
}
Srims.MessageAction.showResponse_award = function() {
	var store = new Ext.data.Store({
		data: Srims.MessageAction.response_award.responseXML,
		reader: new Srims.awards.AwardXmlReader()
	});
	var award = store.getAt(0);
	Srims.awards.showAwardDocumentManageWindow(award);
}
//查看文印
Srims.MessageAction.response_Stamp = undefined;
Srims.MessageAction.showForExpert = false;
Srims.MessageAction.isForcensor = undefined;
Srims.MessageAction.showStamp = function(stampApplicationId, showForExpert, isForcensor) {
	Srims.MessageAction.showForExpert = showForExpert;
	Srims.MessageAction.isForcensor = isForcensor;
	Ext.Ajax.request({
		url: Srims.service.stamp.StampApplicationService + '/GetById',
		params: {
			stampApplicationId: stampApplicationId
		},
		scope: this,
		success: function(response) {
			Srims.MessageAction.response_stamp = response;
			Srims.Load.loadStampModel('Srims.MessageAction.showStamp_Response()');
		}
	});
}
Srims.MessageAction.showStamp_Response = function() {
	var store = new Ext.data.Store({
		data: Srims.MessageAction.response_stamp.responseXML,
		reader: new Srims.stamp.StampApplicationXmlReader()
	});
	var stamp = store.getAt(0);
	Srims.stamp.showStampApplication(stamp, undefined, Srims.MessageAction.isForcensor);
};