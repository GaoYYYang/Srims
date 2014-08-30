
if (!Srims.fund) 
    Ext.namespace("Srims.fund");

Srims.fund.listWaitingCensorFundAllocation_Horizontal = function(){
    Srims.fund.listFundAllocation('fundAllocationGridPanel_WaitingCensor_Horizontal', '审核横向经费分配', 'icon-fund-allocation-waiting-censor-horizontal-project', true, Srims.fund.fundAllocationState.WaitingCensor);
}
Srims.fund.listWaitingCensorFundAllocation_Vertical = function(){
    Srims.fund.listFundAllocation('fundAllocationGridPanel_WaitingCensor_Vertical', '审核纵向经费分配', 'icon-fund-allocation-waiting-censor-vertical-project', false, Srims.fund.fundAllocationState.WaitingCensor);
}
Srims.fund.listFundAllcation = function(){
    Srims.fund.listFundAllocation('fundAllocationGridPanel_All', '经费分配记录', 'icon-fund-allocation-list', undefined, undefined);
}

Srims.fund.listFundAllocation = function(panelId, title, iconcls, isHorizontal, state){
    var fundAllocationStore = undefined;
    var panel = Srims.WorkSpace.active(panelId);
    var queryParams = {};
    
    if (!panel) {
        queryParams = getFundAllocationQueryParams(isHorizontal, state);
        fundAllocationStore = new Srims.fund.FundAllocationStore(Srims.service.fund.FundAllocationService + '/Query', queryParams);
        panel = new Srims.fund.FundAllocationGridPanel(panelId, fundAllocationStore, title, iconcls, queryParams);
        panel.getStore().load();
        
        Srims.WorkSpace.addPanel(panel);
    }
}
function getFundAllocationQueryParams(isHorizontal, state){
    var params = {};
    
    if (state != undefined) 
        params.fundAllocationState = state;
    if (isHorizontal != undefined) 
        params.isHorizontal = isHorizontal;
    
    return params;
}

Srims.fund.showFundAllocationQueryWindow = function(id, store, queryParams, gridPanel){
    var window = Ext.getCmp(id);
    if (!window) {
        var window = new Srims.fund.FundAllocationQueryWindow(id, store, queryParams);
    }
    gridPanel.queryWindow = window;
    window.show();
    
    new Ext.KeyMap(id, {
        key: 13,
        scope: this,
        fn: function(){
            if (!window.hidden) 
                window.query(window._buttonQuery);
        }
    });
}
Srims.fund.showFundAllocationOutWindow = function(fundAllocation) {
    var windowId = 'fundAllocaitonOutWindow';
    var window = Ext.getCmp(windowId);
    if (!window) {
        var window = new Srims.fund.FundAllocationOutWindow(windowId, fundAllocation);
    }
    window.show();

}
Srims.fund.showFundAllocationInfoByFundDescend = function(fundDescend){
    Ext.Ajax.request({
        url: Srims.service.fund.FundAllocationService + '/GetByFundDescend',
        params: {
            fundDescendId: fundDescend.get('id')
        },
        success: function(response){
        
            var store = new Ext.data.Store({
                data: response.responseXML,
                reader: new Srims.fund.FundAllocationXmlReader()
            });
            
            var fundAllocation = store.getAt(0);
            Srims.fund.showFundAllocationInfo(fundAllocation);
        }
    });
}
Srims.fund.showFundAllocationInfo = function(fundAllocation){
    var panelId = 'showFundAllocation' + fundAllocation.get('id');
    var panel = Srims.WorkSpace.active(panelId);
    
    if (!panel) {
        panel = new Srims.fund.FundAllocationShowPanel(panelId, fundAllocation);
        Srims.WorkSpace.addPanel(panel);
    }
}
Srims.fund.showFundAllocationCensorWindow = function(fundAllocation, isCensorPass){
    var windowId = isCensorPass ? 'fundAllocationCensorPassWindow' + fundAllocation.get('id') : 'fundAllocationCensorRejectWindow' + fundAllocation.get('id');
    var window = Ext.getCmp(id);
    
    if (!window) {
        var window = new Srims.fund.FundAllocationCensorWindow(id, fundAllocation, isCensorPass);
    }
    window.show();
}
Srims.fund.submitFundAllocation = function(fundAllocation, panel){
    var isHorizontal = fundAllocation.get('isHorizontal');
    var poolAction = [];
    var user = Srims.currentLoginLog.user;
    if (user.userRoleType != 'Expert') 
        poolAction[poolAction.length] = isHorizontal ? Srims.Poll.getPollAction_WaitingCensorHorizontalProjectFundAllocation : Srims.Poll.getPollAction_WaitingCensorVerticalProjectFundAllocation;
    
    Srims.fund.SaveFundAllocationForChangeState(fundAllocation, '/Submit', undefined, poolAction, undefined, panel);
}
Srims.fund.undoSubmitFundAllocation = function(fundAllocation,panel){
    var isHorizontal = fundAllocation.get('isHorizontal');
    var poolAction = [];
    var user = Srims.currentLoginLog.user;
    if (user.userRoleType != 'Expert') 
        poolAction[poolAction.length] = isHorizontal ? Srims.Poll.getPollAction_WaitingCensorHorizontalProjectFundAllocation : Srims.Poll.getPollAction_WaitingCensorVerticalProjectFundAllocation;
    
    Srims.fund.SaveFundAllocationForChangeState(fundAllocation, '/UndoSubmit', undefined, poolAction, undefined, panel);
}
Srims.fund.censorPassFundAllocation = function(fundAllocation, remark, censorWindow){
    var isHorizontal = fundAllocation.get('isHorizontal');
    var poolAction = [];
    var user = Srims.currentLoginLog.user;
    if (user.userRoleType != 'Expert') {
        poolAction[poolAction.length] = isHorizontal ? Srims.Poll.getPollAction_WaitingCensorHorizontalProjectFundAllocation : Srims.Poll.getPollAction_WaitingCensorVerticalProjectFundAllocation;
        poolAction[poolAction.length] = isHorizontal ? Srims.Poll.getPollAction_WaitingAllocationHorizontalProjectFundDescend : Srims.Poll.getPollAction_WaitingAllocationVerticalProjectFundDescend;
    }
    Srims.fund.SaveFundAllocationForChangeState(fundAllocation, '/CensorPass', remark, poolAction, censorWindow, undefined);
}
Srims.fund.censorRejectFundAllocation = function(fundAllocation, remark, censorWindow){
    var isHorizontal = fundAllocation.get('isHorizontal');
    var poolAction = [];
    var user = Srims.currentLoginLog.user;
    if (user.userRoleType != 'Expert') 
        poolAction[poolAction.length] = isHorizontal ? Srims.Poll.getPollAction_WaitingCensorHorizontalProjectFundAllocation : Srims.Poll.getPollAction_WaitingCensorVerticalProjectFundAllocation;
    
    Srims.fund.SaveFundAllocationForChangeState(fundAllocation, '/CensorReject', remark, poolAction, censorWindow, undefined);
}
Srims.fund.cancelFundAllocation = function(fundAllocation, remark){
    var isHorizontal = fundAllocation.get('isHorizontal');
    var poolAction = [];
    var user = Srims.currentLoginLog.user;
    if (user.userRoleType != 'Expert') 
        poolAction[poolAction.length] = isHorizontal ? Srims.Poll.getPollAction_WaitingAllocationHorizontalProjectFundDescend : Srims.Poll.getPollAction_WaitingAllocationVerticalProjectFundDescend;
    
    Srims.fund.SaveFundAllocationForChangeState(fundAllocation, '/Cancel', remark, poolAction, undefined, undefined);
}
Srims.fund.SaveFundAllocationForChangeState = function(fundAllocation, subUrl, remark, pollAction, censorWindow, expertGuidPanel){
    var params = {};
    params.fundAllocationId = fundAllocation.get('id');
    if (remark != undefined) 
        params.remark = remark;
    
    Ext.Ajax.request({
        url: Srims.service.fund.FundAllocationService + subUrl,
        params: params,
        success: function(){
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
            if (expertGuidPanel) 
            {
                if(fundAllocation.get('state') == Srims.fund.fundAllocationState.WaitingCensor)
                    fundAllocation.panel.refresh();
                else
                    Srims.expertGuide.next(expertGuidPanel);
             }
        }
    });
}
Srims.fund.clearFundMemberAccountBookNumber = function(fundMember, store){
    Ext.Ajax.request({
        url: Srims.service.fund.FundMemberService + '/ClearAccountBookNumber',
        params: {
            fundMemberId: fundMember.get('id')
        },
        success: function(){
            store.load();
        }
    });
}
Srims.fund.CorrectAllocationDateTime = function(fundAllocation){
    var windowId = 'fundAllocationCorrectDateTimeWindow' + fundAllocation.get('id');
    var window = Ext.getCmp(id);
    
    if (!window) {
        var window = new Srims.fund.FundAllocationCorrectDateTimeWindow(fundAllocation);
    }
    window.show();
}
Srims.fund.CorrectAllocation = function(fundAllocation){
    var windowId = 'fundAllocationCorrectWindow' + fundAllocation.get('id');
    var window = Ext.getCmp(id);
    
    if (!window) {
        var window = new Srims.fund.FundAllocationCorrectWindow(fundAllocation);
    }
    window.show();
}



