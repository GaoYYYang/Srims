
if (!Srims.projects)
    Ext.namespace('Srims.projects');
if (!Srims.fund)
    Ext.namespace('Srims.fund');
//纵向项目列表
Srims.projects.listVerticalProject = function(showQueryWindow) {
    Srims.projects._listProject(Srims.projects.GridPanl_VerticalProjectList_ID, '纵向项目列表', false, 'icon-project-vertical-list', showQueryWindow, undefined, undefined);
}
Srims.projects.listWaitingStartCensorVerticalProject = function(showQueryWindow) {
    Srims.projects._listProject(Srims.projects.GridPanel_WaitingStartCensorVerticalProjectList_ID, '等待立项审核纵向项目列表', false, 'icon-project-vertical-censor-start', showQueryWindow, Srims.projects.ProjectState.WaitingStartCensor, undefined);
}
Srims.projects.listWaitingEndCensorVerticalProject = function(showQueryWindow) {
    Srims.projects._listProject(Srims.projects.GridPanel_WaitingEndCensorVericalProjectList_ID, '等待结项审核纵向项目列表', false, 'icon-project-vertical-censor-end', showQueryWindow, Srims.projects.ProjectState.WaitingEndCensor, undefined);
}
//横向项目列表
Srims.projects.listHorizontalProject = function(showQueryWindow) {
    Srims.projects._listProject(Srims.projects.GridPanl_HorizontalProjectList_ID, '横向项目列表', true, 'icon-project-horizontal-list', showQueryWindow, undefined, undefined);
}
Srims.projects.listWaitingStartCensorHorizontalProject = function(showQueryWindow) {
    Srims.projects._listProject(Srims.projects.GridPanel_WaitingStartCensorHorizontalProjectList_ID, '等待立项审核横向项目列表', true, 'icon-project-horizontal-censor-start', showQueryWindow, Srims.projects.ProjectState.WaitingStartCensor, undefined);
}
Srims.projects.listWaitingEndCensorHorizontalProject = function(showQueryWindow) {
    Srims.projects._listProject(Srims.projects.GridPanel_WaitingEndCensorHorizontalProjectList_ID, '等待结项审核横向项目列表', true, 'icon-project-horizontal-censor-end', showQueryWindow, Srims.projects.ProjectState.WaitingEndCensor, undefined);
}
//需添加追缴单的项目列表
Srims.projects.listRecoveryProject = function() {
    Srims.projects._listRecoveryProject(Srims.projects.GridPanl_RecoveryProjectList_ID, '间接费用调整项目列表', 'icon-project-horizontal-list', undefined);
}
//专家项目列表
Srims.projects.listMyPrincipalProject = function() {
    Srims.projects._listProject(Srims.projects.GridPanel_MyPrincipalProjectList, '我负责的项目列表', undefined, 'icon-project-my-project-principal', false, undefined, 'Principal');
}
Srims.projects.listMyParticipateProject = function() {
    Srims.projects._listProject(Srims.projects.GridPanel_MyParticipateProjectList, '我参与的项目列表', undefined, 'icon-project-my-project-join', false, undefined, 'Participate');
}
Srims.projects.listMyDelegateProject = function() {
    Srims.projects._listProject(Srims.projects.GridPanel_MyDelegateProjectList, '我被委托的项目列表', undefined, 'icon-project-my-project-delegate', false, undefined, 'Delegate');
}

Srims.projects._listRecoveryProject = function(panelId, name, iconCls, expertAttendType) {
    var projectStore = undefined;
    var panel = Srims.WorkSpace.active(panelId);
    var queryParams = {};
    if (panel)
        projectStore = panel.getStore();
    else {

        queryParams = getRecoveryProjectQueryParams(expertAttendType);
        projectStore = new Srims.projects.RecoveryProjectStore(Srims.service.projects.ProjectService + '/RecoveryQuery', queryParams);
        panel = new Srims.projects.RecoveryProjectGridPanel(panelId, projectStore, name, iconCls, expertAttendType, queryParams);
        panel.getStore().load();
        Srims.WorkSpace.addPanel(panel);
    }
}


Srims.projects._listProject = function(panelId, name, isHorizontal, iconCls, showQueryWindow, projectState, expertAttendType) {
    var projectStore = undefined;
    var panel = Srims.WorkSpace.active(panelId);
    var queryParams = {};

    if (panel)
        projectStore = panel.getStore();
    else {
        queryParams = getProjectQueryParams(isHorizontal, projectState, expertAttendType);
        projectStore = new Srims.projects.ProjectStore(Srims.service.projects.ProjectService + '/Query', queryParams);
        panel = new Srims.projects.ProjectGridPanel(panelId, projectStore, name, iconCls, isHorizontal, projectState, expertAttendType, queryParams);
        panel.getStore().load();
        Srims.WorkSpace.addPanel(panel);
    }
    if (showQueryWindow) {
        queryParams = projectStore.getExtraParams();
        Srims.projects.showProjectQueryWindow(panelId + '_QueryWindow', projectStore, isHorizontal, queryParams, panel);
    }
}
function getRecoveryProjectQueryParams(expertAttendType) {
    var params = {};
    if (expertAttendType)
        params.expertAttendType = expertAttendType;
    return params;
}
function getProjectQueryParams(isHorizontal, projectState, expertAttendType) {
    var params = {};

    if (projectState) {
        params.state = projectState;
        params.isCensor = true;
    }
    if (expertAttendType)
        params.expertAttendType = expertAttendType;
    if (isHorizontal != undefined)
        params.isHorizontal = isHorizontal;

    return params;
}

Srims.projects.showProjectQueryWindow = function(id, store, isHorizontal, queryParams, gridPanel) {
    var window = Ext.getCmp(id);
    if (!window)
        window = new Srims.projects.ProjectQueryWindow(id, store, isHorizontal, queryParams);

    gridPanel.queryWindow = window;
    window.show();

    var map = new Ext.KeyMap(id, {
        key: 13,
        fn: function() {
            if (!window.hidden)
                window.query(window._buttonQuery);
        }
    });
}
Srims.projects.confirmProjectPrincipalToSendEmail = function(queryParams) {
    var projectStore = undefined;
    var panelId = 'projectGridPanel_SendEmail';
    var panel = Srims.WorkSpace.active(panelId);

    if (panel)
        Srims.WorkSpace.getWorkSpace().remove(panel);

    projectStore = new Srims.projects.ProjectSimpleStore(Srims.service.projects.ProjectService + '/QueryForEmail', queryParams);
    panel = new Srims.projects.ProjectEmailGridPanel(panelId, projectStore, '发送邮件项目列表', 'icon-email');
    panel.getStore().load();

    Srims.WorkSpace.addPanel(panel);
}
Srims.projects.exportProject = function(filterParams, queryParams) {
    var windowId = 'ProjectExportWindow';
    //生成新Store
    var exportParams = Srims.exportAction.setExportQueryParams(filterParams, queryParams);
    var queryUrl = Srims.service.projects.ProjectService + '/Query';
    var items = [];
    items[items.length] = new Srims.component.ExportWindow_EntityColumnForm('基本信息字段', Srims.projects.ProjectExport_Column.basic);
    items[items.length] = new Srims.component.ExportWindow_EntityColumnForm('类型信息字段', Srims.projects.ProjectExport_Column.Type);
    items[items.length] = new Srims.component.ExportWindow_EntityColumnForm('经费信息字段', Srims.projects.ProjectExport_Column.fund);

    Srims.exportAction.showExportWindow(windowId, queryUrl, exportParams, items, 'Project');
}
Srims.projects.newProject = function(isHorizontal) {
    var user = Srims.currentLoginLog.user;
    var userIsExpert = user.userRoleType == 'Expert';

    var startDate = new Date();
    var endDate = new Date(startDate.getFullYear() + 2, 11, 31);

    var project = new Srims.projects.Project({});
    project.set('isHorizontal', isHorizontal);
    project.set('level', Srims.projects.ProjectLevel.Perside);
    project.set('state', Srims.projects.ProjectState.WaitingStartInformation);
    project.set('startDate', startDate);
    project.set('endDate', endDate);
    if (userIsExpert)
        Srims.projects.showExpertGuidProjectEditPanel(project, userIsExpert);
    else {
        var panelId = isHorizontal ? Srims.projects.Panel_NewHorizontalProject_ID : Srims.projects.Panel_NewVerticalProject_ID;
        if (Srims.WorkSpace.active(panelId))
            return;

        var panel = new Srims.projects.ProjectEditPanel(panelId, project);
        Srims.WorkSpace.addPanel(panel);
    }
}

Srims.projects.editProject = function(project) {
    var panelId = 'ProjectEditPanel' + project.get('id');
    if (Srims.WorkSpace.active(panelId))
        return;

    var panel = new Srims.projects.ProjectEditPanel(panelId, project);
    Srims.WorkSpace.addPanel(panel);
}

Srims.projects.showProject = function(project) {
    var panelId = 'ProjectShowPanel' + project.get('id');
    if (Srims.WorkSpace.active(panelId)) {
        Ext.getCmp(panelId).resetComponentValue(project);
        return;
    }
    var panel = new Srims.projects.ProjectShowPanel(panelId, project);
    Srims.WorkSpace.addPanel(panel);
}
Srims.projects.showProject_Recovery = function(project) {

    Ext.Ajax.request({
        url: Srims.service.projects.ProjectService + '/GetById',
        params: {
            projectId: project.get('pid')
        },
        scope: this,
        success: function(response) {
            var store = new Ext.data.Store({
                data: response.responseXML,
                reader: new Srims.projects.ProjectSimpleXmlReader()
            });
            var currentProject = store.getAt(0);

            var panelId = 'ProjectShowPanel' + project.get('pid');
            if (Srims.WorkSpace.active(panelId)) {
                return;
            }
            var panel = new Srims.projects.ProjectShowPanel(panelId, currentProject);
            Srims.WorkSpace.addPanel(panel);
        }
    });
}
//编辑追缴单
Srims.projects.showRecoveryProject = function(project) {
    var panelId = 'RecoveryProjectShowPanel' + project.get('id');
    if (Srims.WorkSpace.active(panelId)) {
        return;
    }
    else {
        var panel = new Srims.projects.RecoveryProjectShowPanel(panelId, project);
        Srims.WorkSpace.addPanel(panel);
    }
}

Srims.projects.deleteProject = function(project) {
    var user = Srims.currentLoginLog.user;
    var gridPanelID;
    if (user.userRoleType == 'Expert') {
        if (user.name == project.get('principal'))
            gridPanelID = Srims.projects.GridPanel_MyPrincipalProjectList;
        else
            gridPanelID = Srims.projects.GridPanel_MyDelegateProjectList;
    }
    else
        gridPanelID = project.get('isHorizontal') ? Srims.projects.GridPanl_HorizontalProjectList_ID : Srims.projects.GridPanl_VerticalProjectList_ID;
    Srims.projects.saveForChangeState(project, Srims.projects.ProjectState.ProjectDelete, '', '/Delete', undefined, gridPanelID, '删除项目成功', '成功删除项目：' + project.get('name'));
}
Srims.projects.withDrawProject = function(project) {
    Srims.projects.endProjectUnNormal(project, Srims.projects.ProjectState.WithDraw, '/WithDraw', '撤销项目成功', '成功撤销项目：' + project.get('name'), undefined);
}
Srims.projects.terminateProject = function(project) {
    Srims.projects.endProjectUnNormal(project, Srims.projects.ProjectState.Terminate, '/Terminate', '终止项目成功', '成功终止项目：' + project.get('name'), undefined);
}
Srims.projects.endProjectUnNormal = function(project, projectState, subUrl, msg, msgInfo) {
    var gridPanelID = project.get('isHorizontal') ? Srims.projects.GridPanl_HorizontalProjectList_ID : Srims.projects.GridPanl_VerticalProjectList_ID;
    Srims.projects.saveForChangeState(project, projectState, '', subUrl, undefined, gridPanelID, msg, msgInfo, undefined);
}
Srims.projects.censorStart_Pass = function(project, isCensorDocumentAndContract) {
    Srims.projects.censorStart(project, '', Srims.projects.ProjectState.ProjectProcessing, '/CensorStartPass', '审核通过立项申请成功', '成功审核通过项目：' + project.get('name') + '的立项申请', isCensorDocumentAndContract);
}
Srims.projects.censorStart_Reject = function(project, remark, isCensorDocumentAndContract) {
    Srims.projects.censorStart(project, remark, Srims.projects.ProjectState.WaitingStartInformation, '/CensorStartReject', '审核驳回立项申请成功', '成功审核驳回项目：' + project.get('name') + '的立项申请', isCensorDocumentAndContract);
}
Srims.projects.censorEnd_Pass = function(project) {
    var _params = {};
    _params.projectID = project.get('id');

    Ext.Ajax.request({
        url: Srims.service.projects.ProjectService + '/CanEnd',
        params: _params,
        success: function(response) {

            if (Boolean.toBoolean(response.responseText)) {
                Srims.projects.censorEnd(project, '', Srims.projects.ProjectState.ProjectEnd, '/CensorEndPass', '审核通过结项申请成功', '成功审核通过项目：' + project.get('name') + '的结项申请');
            }
            else {
                Ext.Msg.show({
                    title: '不能结项',
                    msg: '该项目不能结项，请检查是否有主合同或者文档，并且都审核通过，或者经费是否分配完毕。',
                    buttons: Ext.Msg.OK,
                    icon: Ext.MessageBox.WARNING
                })
            }

        }
    });
    //添加项目结项条件
    //Srims.projects.censorEnd(project, '', Srims.projects.ProjectState.ProjectEnd, '/CensorEndPass', '审核通过结项申请成功', '成功审核通过项目：' + project.get('name') + '的结项申请');
}
Srims.projects.censortEnd_Reject = function(project, remark) {
    Srims.projects.censorEnd(project, remark, Srims.projects.ProjectState.ProjectProcessing, '/CensorEndReject', '审核驳回结项申请成功', '成功审核驳回项目：' + project.get('name') + '的结项申请');
}
Srims.projects.censorStart = function(project, remark, projectState, subUrl, msg, msgInfo, isCensorDocumentAndContract) {
    var gridPanelID = project.get('isHorizontal') ? Srims.projects.GridPanel_WaitingStartCensorHorizontalProjectList_ID : Srims.projects.GridPanel_WaitingStartCensorVerticalProjectList_ID;

    var pollActions = [];
    pollActions[pollActions.length] = project.get('isHorizontal') ? Srims.Poll.getPollAction_WaitingStartCensorHorizontalProjectCount : Srims.Poll.getPollAction_WaitingStartCensorVerticalProjectCount;
    if (isCensorDocumentAndContract) {
        pollActions[pollActions.length] = project.get('isHorizontal') ? Srims.Poll.getPollAction_WaitingCensorHorizontalProjectContractCount : Srims.Poll.getPollAction_WaitingCensorVerticalProjectContractCount;
        pollActions[pollActions.length] = project.get('isHorizontal') ? Srims.Poll.getPollAction_WaitingCensorHorizontalProjectDocumentCount : Srims.Poll.getPollAction_WaitingCensorVerticalProjectDocumentCount;
    }

    Srims.projects.saveForChangeState(project, projectState, remark, subUrl, pollActions, gridPanelID, msg, msgInfo, isCensorDocumentAndContract);
}
Srims.projects.censorEnd = function(project, remark, projectState, subUrl, msg, msgInfo) {
    var gridPanelID = project.get('isHorizontal') ? Srims.projects.GridPanel_WaitingEndCensorHorizontalProjectList_ID : Srims.projects.GridPanel_WaitingEndCensorVericalProjectList_ID;

    var pollActions = [];
    pollActions[pollActions.length] = project.get('isHorizontal') ? Srims.Poll.getPollAction_WaitingEndCensorHorizontalProjectCount : Srims.Poll.getPollAction_WaitingEndCensorVerticalProjectCount;

    Srims.projects.saveForChangeState(project, projectState, remark, subUrl, pollActions, gridPanelID, msg, msgInfo, undefined);
}
Srims.projects.submitStart = function(project) {
    Srims.projects.submitByPrincipal(project, Srims.projects.ProjectState.WaitingStartCensor, '/SubmitStart', '提交立项申请成功', '成功提交项目：' + project.get('name') + '的立项申请', undefined);
}
Srims.projects.undoStart = function(project) {
    Srims.projects.submitByPrincipal(project, Srims.projects.ProjectState.WaitingStartInformation, '/UndoSubmitStart', '撤销立项申请成功', '成功撤销项目：' + project.get('name') + '的立项申请', undefined);
}
Srims.projects.submitEnd = function(project) {
    var _params = {};
    _params.projectID = project.get('id');

    Ext.Ajax.request({
        url: Srims.service.projects.ProjectService + '/CanEnd',
        params: _params,
        success: function(response) {

            if (Boolean.toBoolean(response.responseText)) {
                Srims.projects.submitByPrincipal(project, Srims.projects.ProjectState.WaitingEndCensor, '/SubmitEnd', '提交结项申请成功', '成功提交项目：' + project.get('name') + '的结项申请', undefined);
            }
            else {
                Ext.Msg.show({
                    title: '不能提交结项申请',
                    msg: '该项目不能提交结项申请，请检查是否有主合同或者文档，并且都审核通过，或者经费是否分配完毕。',
                    buttons: Ext.Msg.OK,
                    icon: Ext.MessageBox.WARNING
                })
            }

        }
    });
    //  Srims.projects.submitByPrincipal(project, Srims.projects.ProjectState.WaitingEndCensor, '/SubmitEnd', '提交结项申请成功', '成功提交项目：' + project.get('name') + '的结项申请', undefined);
}
Srims.projects.undoEnd = function(project) {
    Srims.projects.submitByPrincipal(project, Srims.projects.ProjectState.ProjectProcessing, '/UndoSubmitEnd', '撤销结项申请成功', '成功撤销项目：' + project.get('name') + '的结项申请', undefined);
}
Srims.projects.submitByPrincipal = function(project, projectState, subUrl, msg, msgInfo) {
    var user = Srims.currentLoginLog.user;
    var gridPanelID = project.get('principalId') == user.id ? Srims.projects.GridPanel_MyPrincipalProjectList : Srims.projects.GridPanel_MyDelegateProjectList;

    Srims.projects.saveForChangeState(project, projectState, '', subUrl, undefined, gridPanelID, msg, msgInfo, undefined);
}
Srims.projects.saveForChangeState = function(project, projectState, remark, subUrl, pollActions, gridPanelID, msg, msgInfo, isCensorDocumentAndContract) {

    var _params = {};
    _params.projectID = project.get('id');
    _params.remark = remark;

    if (isCensorDocumentAndContract != undefined)
        _params.IsCensorDocumentAndContract = isCensorDocumentAndContract;

    project.beginEdit();
    project.set('state', projectState);
    project.commit();

    Ext.Ajax.request({
        url: Srims.service.projects.ProjectService + subUrl,
        params: _params,
        success: function(response) {
            //从showPanel上改变项目状态
            var showPanel = Ext.getCmp(Srims.projects.Panel_ShowProject_ID + project.get('id'));
            if (showPanel) {
                if (projectState == Srims.projects.ProjectState.ProjectDelete)
                    Srims.WorkSpace.getWorkSpace().remove(showPanel);
                else {
                    //取得项目   
                    var store = new Ext.data.Store({
                        data: response.responseXML,
                        reader: new Srims.projects.ProjectSimpleXmlReader()
                    });

                    var currentProject = store.getAt(0);
                    showPanel._formPanelBasic.resetComponentValue(currentProject);
                    showPanel._toolBar._resetButtonVisibleAndDisabled(currentProject);
                    showPanel._toolBar._resetButtonProject(currentProject);
                    showPanel._formPanelStateHistory._store.load();
                }
            }
            //执行轮询
            if (pollActions) {
                for (var i = 0; i < pollActions.length; i++)
                    Srims.Poll.startPollAction(pollActions[i]);
            }

            //刷新GridPanel
            var gridPanel = Ext.getCmp(gridPanelID);
            if (gridPanel) {
                if (projectState == Srims.projects.ProjectState.ProjectDelete)
                    Srims.WorkSpace.active(gridPanelID);
                Ext.getCmp(gridPanelID).getStore().load({
                    callback: function() {
                        Ext.Msg.show({
                            title: msg,
                            msg: msgInfo,
                            buttons: Ext.Msg.OK,
                            icon: Ext.MessageBox.INFO
                        });
                    }
                });
            }
            else {
                Ext.Msg.show({
                    title: msg,
                    msg: msgInfo,
                    buttons: Ext.Msg.OK,
                    icon: Ext.MessageBox.INFO
                });
            }
        }
    });
}
Srims.projects.rejectProjectCensor = function(project, isStart) {
    var windowId = isStart ? 'rejectProjectCensorWindow_start' + project.get('id') : 'rejectProjectCensorWindow_end' + project.get('id');

    var window = Ext.getCmp(windowId);
    if (!window)
        window = new Srims.projects.ProjectCensorRejectWindow(windowId, project, isStart);
    window.show();
}
Srims.projects.showSetDelegatePrincipalWindow = function(projects, store) {
    var windowId = 'setDelegatePrincipalWindow';

    var window = Ext.getCmp(windowId);
    if (!window)
        window = new Srims.projects.ProjectSetDelegatePrincipalWindow(windowId, projects, store);
    window.show();
}
Srims.projects.clearDeletatePrincipal = function(projects, store) {
    Srims.projects.saveDelegatePrincipal(projects, '', '/ClearDelegatePrincipal', store, '成功取消委托负责人', '成功取消项目委托负责人');
}
Srims.projects.setDeletatePrincipal = function(projects, expertId, store) {
    Srims.projects.saveDelegatePrincipal(projects, expertId, '/SetDelegatePrincipal', store, '成功指定委托负责人', '成功指定项目委托负责人');
}
Srims.projects.saveDelegatePrincipal = function(projects, expertId, subUrl, store, msg, msgInfo) {
    var projectsId = '';
    for (var i = 0; i < projects.length; i++) {
        projectsId += projects[i].get('id') + ',';
    }

    var _params = {};
    _params.projectsID = projectsId;
    _params.principalDelegateId = expertId;

    Ext.Ajax.request({
        url: Srims.service.projects.ProjectService + subUrl,
        params: _params,
        success: function(response) {
            store.load({
                callback: function() {
                    Ext.Msg.show({
                        title: msg,
                        msg: msgInfo,
                        buttons: Ext.Msg.OK,
                        icon: Ext.MessageBox.INFO
                    });
                }
            });
        }
    });
}
Srims.projects.showWaitingSetDelegateWindow = function() {
    var windowId = 'myProjectWaitingSetDelegateWindow';
    var window = Ext.getCmp(windowId);
    if (!window)
        window = new Srims.projects.ProjectWaitringSetDelegateWindow(windowId);

    window.show();
}

Srims.projects.showProjectMemberWindow = function(project) {
    var windowId = 'ProjectMemberWindow' + project.get('id');

    var window = Ext.getCmp(windowId);
    if (!window)
        window = new Srims.projects.ProjectMemberWindow(windowId, project);
    else
        window._projectMemberGridPanel.getStore().load()
    window.show();
}
Srims.projects.newProjectMember = function(project, store) {
    var windowId = 'NewProjectMemberWindow' + project.get('id');

    var window = Ext.getCmp(windowId);
    if (!window) {
        var projectMember = new Srims.projects.ProjectMember({});
        window = new Srims.projects.ProjectMemberEditWindow(windowId, projectMember, project, store);
    }
    window.show();
}
Srims.projects.editProjectMember = function(project, projectMember, store) {
    var windowId = 'EditProjectMemberWindow' + projectMember.get('id');

    var window = Ext.getCmp(windowId);
    if (!window) {
        window = new Srims.projects.ProjectMemberEditWindow(windowId, projectMember, project, store);
    }
    window.show();
}
Srims.projects.showPayPlanItemWindow = function(project) {
    var windowId = 'PayPlanItemWindow' + project.get('id');

    var window = Ext.getCmp(windowId);
    if (!window)
        window = new Srims.fund.PayPlanItemWindow(windowId, project);
    else
        window._payPlanItemGridPanel.getStore().load()
    window.show();
}
Srims.projects.newProjectPayPlanItem = function(project, store) {
    var windowId = 'NewProjectPayPlanItem' + project.get('id');

    var window = Ext.getCmp(windowId);
    if (!window) {
        var projectPayPlanItem = new Srims.fund.PayPlanItem({});
        window = new Srims.fund.PayPlanItemEditWindow(windowId, projectPayPlanItem, project, store);
    }
    window.show();
}
Srims.projects.editProjectPayPlanItem = function(project, projectPayPlanItem, store) {
    var windowId = 'EditProjectPayPlanItem' + projectPayPlanItem.get('id');

    var window = Ext.getCmp(windowId);
    if (!window) {
        window = new Srims.fund.PayPlanItemEditWindow(windowId, projectPayPlanItem, project, store);
    }
    window.show();
}
Srims.projects.showContractWindow = function(project) {
    var windowId = 'ContractWindow' + project.get('id');

    var window = Ext.getCmp(windowId);
    if (!window)
        window = new Srims.documents.ContractWindow(windowId, project)
    else
        window._contractGridPanel.getStore().load();
    window.show();
}
Srims.projects.uploadMainContract = function(project, store) {
    Srims.projects.uploadContract(project, store, true);
}
Srims.projects.uploadOutContract = function(project, store) {
    Srims.projects.uploadContract(project, store, false);
}
Srims.projects.uploadContract = function(project, store, isMain) {
    var windowId = isMain ? ('submitMainContract' + project.get('id')) : ('submitOutContract' + project.get('id'));

    var window = Ext.getCmp(windowId);
    if (!window) {
        window = new Srims.documents.ContractUploadWindow(windowId, project, store, isMain);
    }
    window.show();
}
Srims.projects.deleteContract = function(project, contract, store) {
    Srims.documents.deleteResource(contract.get('contractResource'), contract.get('id'), Srims.service.documents.ContractService + '/Delete', store, '成功删除合同', '删除合同成功');
}
Srims.projects.downLoadContract = function(contract) {
    Srims.documents.downLoadResource(contract.get('contractResource'), '/GetContract');
}
Srims.projects.censorContractPass = function(contract, store, isHorizontal) {
    Srims.projects.censorContract(contract, Srims.CensorState.passed, '/CensorPass', store, isHorizontal, undefined);
}
Srims.projects.showCensorContractRejectWindow = function(contract, store, isHorizontal) {
    var windowId = 'censorContractRejectWindow' + contract.get('id');
    var window = Ext.getCmp(windowId);
    if (!window)
        window = new Srims.documents.ContractCensorRejectWindow(windowId, contract, store, isHorizontal);

    window.show();
}
Srims.projects.censorContractReject = function(contract, store, isHorizontal, remark) {
    Srims.projects.censorContract(contract, Srims.CensorState.reject, '/CensorReject', store, isHorizontal, remark);
}
Srims.projects.censorContract = function(contract, censorState, subUrl, store, isHorizontal, remark) {
    var params = {};
    params.contractId = contract.get('id');
    if (remark != undefined)
        params.remark = remark;

    Ext.Ajax.request({
        url: Srims.service.documents.ContractService + subUrl,
        params: params,
        success: function() {
            store.load();
            isHorizontal ? Srims.Poll.startPollAction(Srims.Poll.getPollAction_WaitingCensorHorizontalProjectContractCount) : Srims.Poll.startPollAction(Srims.Poll.getPollAction_WaitingCensorVerticalProjectContractCount);
        }
    });
}
Srims.projects.listWaitingCenorHorizontalProjecctContracts = function() {
    Srims.projects.listWaitingCensorContracts('WaitingCenorHorizontalProjecctContracts', '横向项目合同审核', true, 'icon-project-horizontal-censor-contract');
}
Srims.projects.listWaitingCenorVerticalProjecctContracts = function() {
    Srims.projects.listWaitingCensorContracts('WaitingCenorVerticalProjecctContracts', '纵向项目合同审核', false, 'icon-project-vertical-censor-contract');
}
Srims.projects.listWaitingCensorContracts = function(panelId, title, isHorizontal, iconCls) {
    var contractStore = undefined;
    var panel = Srims.WorkSpace.active(panelId);
    var params = {
        isHorizontal: isHorizontal
    };
    if (panel)
        contractStore = panel.getStore();
    else {
        contractStore = new Srims.documents.ContractStore(Srims.service.documents.ContractService + '/GetWaitingCensorContracts', params);
        panel = new Srims.documents.ContractCensorGridPanel(panelId, title, contractStore, iconCls);
        panel.getStore().load();

        Srims.WorkSpace.addPanel(panel);
    }
}
Srims.projects.showDocumentWindow = function(project) {
    var windowId = 'DocumentWindow' + project.get('id');

    var window = Ext.getCmp(windowId);
    if (!window)
        window = new Srims.documents.DocumentWindow(windowId, project)
    else
        window._documentGridPanel.getStore().load();
    window.show();
}
Srims.projects.showRequireDocumentWindow = function(project, store) {
    var windowId = 'DocumentRequireWindow' + project.get('id');

    var window = Ext.getCmp(windowId);
    if (!window)
        window = new Srims.documents.DocumentRequireWindow(windowId, project, store)
    window.show();
}
Srims.projects.uploadDocument = function(project, store) {
    var windowId = 'submitDocument' + project.get('id');

    var window = Ext.getCmp(windowId);
    if (!window) {
        window = new Srims.documents.DocumentUploadWindow(windowId, project, store);
    }
    window.show();
}
Srims.projects.downLoadDocument = function(document) {
    var documentResource = document.get('documentResource');
    if (documentResource == '' || documentResource == null || documentResource == undefined) {
        Ext.Msg.show({
            title: '文档查看失败',
            msg: '该文档还没有上传',
            buttons: Ext.Msg.OK,
            icon: Ext.MessageBox.INFO
        });
        return;
    }
    Srims.documents.downLoadResource(document.get('documentResource'), '/GetDocument');
}
Srims.projects.deleteDocument = function(project, document, store) {
    Srims.documents.deleteResource(document.get('documentResource'), document.get('id'), Srims.service.documents.DocumentService + '/Delete', store, '成功删除文档', '删除文档成功');
}
Srims.projects.listWaitingCenorHorizontalProjecctDocuments = function() {
    Srims.projects.listWaitingCenorDocuments('WaitingCenorHorizontalProjecctDocuments', '横向项目文档审核', true, 'icon-project-horizontal-censor-document');
}
Srims.projects.listWaitingCenorVerticalProjecctDocuments = function() {
    Srims.projects.listWaitingCenorDocuments('WaitingCenorVerticalProjecctDocuments', '纵向项目文档审核', false, 'icon-project-vertical-censor-document');
}
Srims.projects.listWaitingCenorDocuments = function(panelId, title, isHorizontal, iconCls) {
    var documentStore = undefined;
    var panel = Srims.WorkSpace.active(panelId);
    var params = {
        isHorizontal: isHorizontal
    };

    if (panel)
        documentStore = panel.getStore();
    else {
        documentStore = new Srims.documents.DocumentStore(Srims.service.documents.DocumentService + '/GetWaitingCensorDocuments', params);
        panel = new Srims.documents.DocumentCensorGridPanel(panelId, title, documentStore, iconCls);
        panel.getStore().load();

        Srims.WorkSpace.addPanel(panel);
    }
}
Srims.projects.censorDocumentPass = function(document, store, isHorizontal) {
    Srims.projects.censorDocument(document, Srims.CensorState.passed, '/CensorPass', store, isHorizontal, undefined);
}
Srims.projects.showCensorDocumentRejectWindow = function(document, store, isHorizontal) {
    var windowId = 'censorDocumentRejectWindow' + document.get('id');
    var window = Ext.getCmp(windowId);
    if (!window)
        window = new Srims.documents.DocumentCensorRejectWindow(windowId, document, store, isHorizontal);

    window.show();
}
Srims.projects.censorDocumentReject = function(document, store, isHorizontal, remark) {
    Srims.projects.censorDocument(document, Srims.CensorState.reject, '/CensorReject', store, isHorizontal, remark);
}
Srims.projects.censorDocument = function(document, censorState, subUrl, store, isHorizontal, remark) {
    var params = {};
    params.documentId = document.get('id');
    if (remark != undefined)
        params.remark = remark;

    Ext.Ajax.request({
        url: Srims.service.documents.DocumentService + subUrl,
        params: params,
        success: function() {
            store.load();
            isHorizontal ? Srims.Poll.startPollAction(Srims.Poll.getPollAction_WaitingCensorHorizontalProjectDocumentCount) : Srims.Poll.startPollAction(Srims.Poll.getPollAction_WaitingCensorVerticalProjectDocumentCount);
        }
    });
}
Srims.projects.listMyUnsubmitDocument = function() {
    var panelId = 'MyUnsubmitDocumentGridPanel';
    var documentStore = undefined;
    var panel = Srims.WorkSpace.active(panelId);

    if (panel) {
        documentStore = panel.getStore();
        documentStore.load();
    }
    else {
        documentStore = new Srims.documents.DocumentStore(Srims.service.documents.DocumentService + '/GetExpertUnSubmitDocument');
        panel = new Srims.documents.DocumentMyUnsubmitDocumentGridPanel(panelId, '我的待提交的文档', documentStore, 'icon-expert-my-unsubmit-document');
        panel.getStore().load();

        Srims.WorkSpace.addPanel(panel);
    }
}
Srims.projects.clearProjectAccountBookNumber = function(project) {
    var windowId = 'clearProjectAccountBookNumberWindow' + project.get('id');
    var window = Ext.getCmp(windowId);

    if (!window)
        window = new Srims.projects.ProjectClearAccountBookNumberWindow(windowId, project);

    window.show();
}
Srims.projects.showHorizontalChooseWindow = function() {
    var windowId = 'horizontalChooseWindow';
    var window = Ext.getCmp(windowId);

    if (!window) {
        Ext.MessageBox.show({
            title: '项目是否涉密',
            msg: '您申请的项目是否涉密？<br />注意：如果项目信息涉密，请直接提交书面材料至科技处！',
            buttons: Ext.MessageBox.YESNO,
            scope: this,
            fn: function(button) {
            if (button == 'yes')
                Ext.MessageBox.show({
                    title: '申请涉密项目',
                    msg: '请联系科技处相关负责人！',
                    buttons: Ext.MessageBox.OK,
                    scope: this,
                    fn: function(button) {
                    }
                });
                if (button == 'no') {
                    window = new Srims.projects.ProjectRankSelectWindow(windowId);
                    window.show();
                }
            },
            icon: Ext.MessageBox.QUESTION
        });

    }
}
Srims.projects.showExpertGuidProjectEditPanel = function(project) {
    var panelId = 'ExpertGuidProjectEditPabel' + (project.get('isHorizontal') ? 'Horizontal' : 'Vertical');
    if (Srims.WorkSpace.active(panelId))
        return;

    var panel = new Srims.projects.ExpertGuidProjectEditPanel(panelId, project);
    Srims.WorkSpace.addPanel(panel);
}
Srims.projects.showImportWindow = function(store) {
    var windowId = 'ProjectImportWindow';
    var window = Ext.getCmp(windowId);

    if (!window)
        window = new Srims.component.ImportWindow(windowId, store, Srims.service.projects.ProjectService + '/Import', '导入项目数据', false);

    window.show();
}
Srims.projects.showRecoveryImportWindow = function(store) {
    var windowId = 'RecoveryImportWindow';
    var window = Ext.getCmp(windowId);

    if (!window)
        window = new Srims.component.ImportWindow(windowId, store, Srims.service.projects.ProjectService + '/ImportRecovery', '导入追缴单数据', false);

    window.show();
}
Srims.projects.printRecovery = function(recovery, store, title, message, action, methodName) {
    Ext.MessageBox.confirm(title, message, function(buttonId) {
        if (buttonId == 'yes') {
            var params = {};
            params.ID = recovery.get('id');
            Ext.Ajax.request({
                url: Srims.service.projects.ProjectService + methodName,
                params: params,
                scope: this,
                success: function(response) {
                    store.load();
                    var newstore = new Ext.data.Store({
                        data: response.responseXML,
                        reader: new Srims.projects.RecoveryProjectXmlReader()
                    });
                    if (action == 'print')
                        window.open('RecoveryPrint.aspx?RecoveryID=' + recovery.get('id'), 'newwindow', 'height=500, width=750, top=100, left=100,resizable=no,location=no, status=no');
                }
            });
        }
    }, this);
}
//对于专家提交的申请，需要管理员填写校内间接费和校内绩效
Srims.projects.completeIn = function(project, gridPanel) {
    var windowId = 'CompleteInWindow';
    var window = Ext.getCmp(windowId);

    if (!window)
        window = new Srims.projects.ProjectCompleteInWindow(windowId, project, gridPanel);

    window.show();
}