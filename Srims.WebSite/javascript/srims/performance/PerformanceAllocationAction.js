
if (!Srims.performance)
    Ext.namespace('Srims.performance');

Srims.performance.listWaitingCensorPerformance_Horizontal = function() {
    Srims.performance.listPerformanceAllocation('performanceAllocationGridPanel_WaitingCensor_Horizontal', '审核横向绩效分配', 'icon-fund-allocation-waiting-censor-horizontal-project', true, Srims.performance.performanceAllocationState.WaitingCensor, false);
}
Srims.performance.listWaitingCensorPerformance_Vertical = function() {
    Srims.performance.listPerformanceAllocation('performanceAllocationGridPanel_WaitingCensor_Vertical', '审核纵向绩效分配', 'icon-fund-allocation-waiting-censor-vertical-project', false, Srims.performance.performanceAllocationState.WaitingCensor, false);
}


Srims.performance.listAllPerformanceAllocation = function() {
    Srims.performance.listPerformanceAllocation('performanceAllocationGridPanel_All', '绩效分配记录', 'icon-fund-allocation-list', undefined, undefined);
}
//carlsirce2013.5.14 加入未分配绩效分配
Srims.performance.listUnallocatedPerformanceAllocation = function() {
    Srims.performance.listPerformanceAllocation('performanceAllocationGridPanel_Unallocated', '未分配课题组间接费用及绩效', 'icon-fund-allocation-list', undefined, "UnSubmit,Reject", true);
}
Srims.performance.listPerformanceAllocation = function(panelId, title, iconcls, isHorizontal, state, isCheckBox) {
    var fundAllocationStore = undefined;
    var panel = Srims.WorkSpace.active(panelId);
    var queryParams = {};

    if (!panel) {
        queryParams = getFundAllocationQueryParams(isHorizontal, state);
        fundAllocationStore = new Srims.performance.PerformanceAllocationStore(Srims.service.performance.PerformanceAllocationService + '/Query', queryParams);
        panel = new Srims.performance.PerformanceAllocationGridPanel(panelId, fundAllocationStore, title, iconcls, queryParams, isCheckBox);
        panel.getStore().load();

        Srims.WorkSpace.addPanel(panel);
    }
}
function getFundAllocationQueryParams(isHorizontal, state) {
    var params = {};

    if (state != undefined)
        params.performanceAllocationState = state;
    if (isHorizontal != undefined)
        params.isHorizontal = isHorizontal;

    return params;
}

Srims.performance.showFundAllocationQueryWindow = function(id, store, queryParams, gridPanel) {
    var window = Ext.getCmp(id);
    if (!window) {
        var window = new Srims.performance.PerformanceAllocationQueryWindow(id, store, queryParams);
    }
    gridPanel.queryWindow = window;
    window.show();

    new Ext.KeyMap(id, {
        key: 13,
        scope: this,
        fn: function() {
            if (!window.hidden)
                window.query(window._buttonQuery);
        }
    });
}
Srims.performance.showPerformanceAllocationInfoByPerformanceAllocation = function(performanceAllocation) {
    Srims.performance.showPerformanceAllocationInfo(performanceAllocation);
}
Srims.performance.showPerformanceAllocationInfo = function(performanceAllocation) {
    var panelId = 'showPerformanceAllocation' + performanceAllocation.get('id');
    var panel = Srims.WorkSpace.active(panelId);

    if (!panel) {
        panel = new Srims.performance.PerformanceAllocationShowPanel(panelId, performanceAllocation);
        Srims.WorkSpace.addPanel(panel);
    }
}
Srims.performance.showFundAllocationCensorWindow = function(fundAllocation, isCensorPass) {
    var windowId = isCensorPass ? 'performanceAllocationCensorPassWindow' + fundAllocation.get('id') : 'performanceAllocationCensorRejectWindow' + fundAllocation.get('id');
    var window = Ext.getCmp(id);

    if (!window) {
        var window = new Srims.performance.PerformanceAllocationCensorWindow(id, fundAllocation, isCensorPass);
    }
    window.show();
}
Srims.performance.submitPerformanceAllocation = function(performanceAllocation, panel) {
    var isHorizontal = performanceAllocation.get('isHorizontal');
    var poolAction = [];
    var user = Srims.currentLoginLog.user;
    poolAction[poolAction.length] = isHorizontal ? Srims.Poll.getPollAction_WaitingCensorHorizontalProjectFundAllocation : Srims.Poll.getPollAction_WaitingCensorVerticalProjectFundAllocation;

    Srims.performance.SaveFundAllocationForChangeState(performanceAllocation, '/Submit', undefined, poolAction, undefined, panel);
}
Srims.performance.undoSubmitFundAllocation = function(fundAllocation, panel) {
    var isHorizontal = fundAllocation.get('isHorizontal');
    var poolAction = [];
    var user = Srims.currentLoginLog.user;
    poolAction[poolAction.length] = isHorizontal ? Srims.Poll.getPollAction_WaitingCensorHorizontalProjectFundAllocation : Srims.Poll.getPollAction_WaitingCensorVerticalProjectFundAllocation;

    Srims.performance.SaveFundAllocationForChangeState(fundAllocation, '/UndoSubmit', undefined, poolAction, undefined, panel);
}
Srims.performance.censorPassFundAllocation = function(fundAllocation, remark, censorWindow) {
    var isHorizontal = fundAllocation.get('isHorizontal');
    var poolAction = [];
    var user = Srims.currentLoginLog.user;
    poolAction[poolAction.length] = isHorizontal ? Srims.Poll.getPollAction_WaitingCensorHorizontalProjectFundAllocation : Srims.Poll.getPollAction_WaitingCensorVerticalProjectFundAllocation;
    poolAction[poolAction.length] = isHorizontal ? Srims.Poll.getPollAction_WaitingAllocationHorizontalProjectFundDescend : Srims.Poll.getPollAction_WaitingAllocationVerticalProjectFundDescend;
    Srims.performance.SaveFundAllocationForChangeState(fundAllocation, '/CensorPass', remark, poolAction, censorWindow, undefined);
}
Srims.performance.censorRejectFundAllocation = function(fundAllocation, remark, censorWindow) {
    var isHorizontal = fundAllocation.get('isHorizontal');
    var poolAction = [];
    var user = Srims.currentLoginLog.user;
    poolAction[poolAction.length] = isHorizontal ? Srims.Poll.getPollAction_WaitingCensorHorizontalProjectFundAllocation : Srims.Poll.getPollAction_WaitingCensorVerticalProjectFundAllocation;

    Srims.performance.SaveFundAllocationForChangeState(fundAllocation, '/CensorReject', remark, poolAction, censorWindow, undefined);
}
Srims.performance.cancelFundAllocation = function(fundAllocation, remark) {
    var isHorizontal = fundAllocation.get('isHorizontal');
    var poolAction = [];
    var user = Srims.currentLoginLog.user;
    poolAction[poolAction.length] = isHorizontal ? Srims.Poll.getPollAction_WaitingAllocationHorizontalProjectFundDescend : Srims.Poll.getPollAction_WaitingAllocationVerticalProjectFundDescend;

    Srims.performance.SaveFundAllocationForChangeState(fundAllocation, '/Cancel', remark, poolAction, undefined, undefined);
}
Srims.performance.SaveFundAllocationForChangeState = function(fundAllocation, subUrl, remark, pollAction, censorWindow, expertGuidPanel) {
    var params = {};
    params.performanceAllocationId = fundAllocation.get('id');
    if (remark != undefined)
        params.remark = remark;

    Ext.Ajax.request({
        url: Srims.service.performance.PerformanceAllocationService + subUrl,
        params: params,
        success: function() {
            if (censorWindow)
                censorWindow.close();

            if (pollAction != null)
                for (var i = 0; i < pollAction.length; i++)
                Srims.Poll.startPollAction(pollAction[i]);

            var panelId = fundAllocation.get('isHorizontal') ? 'fundAllocationGridPanel_WaitingCensor_Horizontal' : 'fundAllocationGridPanel_WaitingCensor_Vertical';
            var panel = Ext.getCmp(panelId);
            if (panel)
                panel.getStore().load();

            if (!expertGuidPanel)
                fundAllocation.panel.refresh();
            //仅用于专家向导
            if (expertGuidPanel) {
                if (fundAllocation.get('state') == Srims.fund.fundAllocationState.WaitingCensor)
                    fundAllocation.panel.refresh();
                else
                    Srims.expertGuide.next(expertGuidPanel);
            }
        }
    });
}
Srims.performance.clearFundMemberAccountBookNumber = function(fundMember, store) {
    Ext.Ajax.request({
        url: Srims.service.fund.FundMemberService + '/ClearAccountBookNumber',
        params: {
            fundMemberId: fundMember.get('id')
        },
        success: function() {
            store.load();
        }
    });
}
Srims.performance.CorrectAllocationDateTime = function(fundAllocation) {
    var windowId = 'fundAllocationCorrectDateTimeWindow' + fundAllocation.get('id');
    var window = Ext.getCmp(id);

    if (!window) {
        var window = new Srims.fund.FundAllocationCorrectDateTimeWindow(fundAllocation);
    }
    window.show();
}
Srims.performance.CorrectAllocation = function(fundAllocation) {
    var windowId = 'fundAllocationCorrectWindow' + fundAllocation.get('id');
    var window = Ext.getCmp(id);

    if (!window) {
        var window = new Srims.fund.FundAllocationCorrectWindow(fundAllocation);
    }
    window.show();
}


Srims.performance.showFundAllocationPerformanceWindow = function(performanceAllocation) {
    var windowId = 'fundAllocaitonPerformanceWindow';
    var window = Ext.getCmp(windowId);
    if (!window) {
        var window = new Srims.performance.PerformanceAllocationWindow(windowId, performanceAllocation);
    }
    window.show();

}
Srims.performance.showPerformanceAllocationInfo = function(performanceAllocation) {
    var panelId = 'showPerformanceAllocation' + performanceAllocation.get('id');
    var panel = Srims.WorkSpace.active(panelId);

    if (!panel) {
        panel = new Srims.performance.PerformanceAllocationShowPanel(panelId, performanceAllocation);
        Srims.WorkSpace.addPanel(panel);
    }
}