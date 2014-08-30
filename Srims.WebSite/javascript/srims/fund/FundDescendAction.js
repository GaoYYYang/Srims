
if (!Srims.fund) 
    Ext.namespace("Srims.fund");

Srims.fund.listWaitingAlloactionFundDescend_Horizontal = function(){
    Srims.fund.listFundDescend('fundDescendGridPanel_WaitingAllocation_Horizontal', '横向未分配经费列表', 'icon-fund-waiting-allocation-horizontal-project', true, Srims.fund.fundDescendState.Passed, undefined, undefined, true);
}
Srims.fund.listWaitingAlloactionFundDescend_vertical = function(){
    Srims.fund.listFundDescend('fundDescendGridPanel_WaitingAllocation_Vertical', '纵向未分配经费列表', 'icon-fund-waiting-allocation-vertical-project', false, Srims.fund.fundDescendState.Passed, undefined, undefined, true);
}
Srims.fund.listWaitingCensorFundDescend_Horizontal = function(){
    Srims.fund.listFundDescend('fundDescendGridPanel_WaitingCensor_Horizontal', '横向待审核经费下拨列表', 'icon-project-horizontal-censor-fund-descend', true, Srims.fund.fundDescendState.WaitingCensor, undefined, undefined, true);
}
Srims.fund.listFundBorrow_UnCompleteReturn = function(){
    Srims.fund.listFundDescend('FundBorrow_UnCompleteReturn', '未完成还款的借款记录', 'icon-fund-lent', undefined, undefined, undefined, true, false);
}
Srims.fund.listMyFundDesend = function(){
    Srims.fund.listFundDescend('myFundDescendGridPanel', '未分配经费列表', 'icon-expert-fund-allocation', undefined, Srims.fund.fundDescendState.Passed, undefined, undefined, true);
}
Srims.fund.listMyPerformanceDesend = function() {
    Srims.fund.listPerformanceDescend('myPerformanceDescendGridPanel', '未分配课题组间接费用及绩效列表', 'icon-expert-fund-allocation', undefined, Srims.fund.fundDescendState.Passed, undefined, undefined, true);
}
Srims.fund.listMyDescendFund = function(){
    Srims.fund.listFundDescend('myDescendFundGridPanel', '我下拨但未分配的经费列表', 'icon-my-descend-fund', undefined, undefined, true, undefined, true);
}

Srims.fund.listFundDescend = function(panelId, title, iconcls, isHorizontal, state, isExpertDescend, isBorrow_UnCompleteReturn, isShowFinanceInfo){
    var fundDescendStore = undefined;
    var panel = Srims.WorkSpace.active(panelId);
    var queryParams = {};
    var isBorrow = isBorrow_UnCompleteReturn == undefined ? false : true;
    var isCensor = state == Srims.fund.fundDescendState.WaitingCensor ? true : false;
    
    if (!panel) {
        queryParams = getFundDeacendQueryParams(isHorizontal, state, isExpertDescend, isBorrow_UnCompleteReturn);
        fundDescendStore = new Srims.fund.FundDescendStore(Srims.service.fund.FundDescendService + '/Query', queryParams);
        panel = new Srims.fund.FundDescendGridPanel(panelId, fundDescendStore, title, iconcls, queryParams, isBorrow, isExpertDescend, isCensor, isShowFinanceInfo);
        panel.getStore().load();
        
        Srims.WorkSpace.addPanel(panel);
    }
    if (panel) 
        fundDescendStore = panel.getStore();
}
Srims.fund.listPerformanceDescend = function(panelId, title, iconcls, isHorizontal, state, isExpertDescend, isBorrow_UnCompleteReturn, isShowFinanceInfo) {
//    var fundDescendStore = undefined;
//    var panel = Srims.WorkSpace.active(panelId);
//    var queryParams = {};
//    var isBorrow = isBorrow_UnCompleteReturn == undefined ? false : true;
//    var isCensor = state == Srims.fund.fundDescendState.WaitingCensor ? true : false;

//    if (!panel) {
//        queryParams = getFundDeacendQueryParams(isHorizontal, state, isExpertDescend, isBorrow_UnCompleteReturn);
//        fundDescendStore = new Srims.fund.FundDescendStore(Srims.service.fund.FundDescendService + '/Query', queryParams);
//        panel = new Srims.fund.FundDescendGridPanel(panelId, fundDescendStore, title, iconcls, queryParams, isBorrow, isExpertDescend, isCensor, isShowFinanceInfo);
//        panel.getStore().load();

//        Srims.WorkSpace.addPanel(panel);
//    }
//    if (panel)
//        fundDescendStore = panel.getStore();
}
function getFundDeacendQueryParams(isHorizontal, state, isExpertDescend, isBorrow_UnCompleteReturn){
    var params = {};
    
    if (state != undefined) 
        params.fundDescendState = state;
    if (isHorizontal != undefined) 
        params.isHorizontal = isHorizontal;
    if (isExpertDescend != undefined) 
        params.isExpertDescend = isExpertDescend;
    if (isBorrow_UnCompleteReturn != undefined) 
        params.isBorrow_UnCompleteReturn = isBorrow_UnCompleteReturn;
    
    return params;
}

Srims.fund.showFundDescendQueryWindow = function(id, store, queryParams, isBorrow, gridPanel){
    var window = Ext.getCmp(id);
    if (!window) {
        var window = new Srims.fund.FundDescendQueryWindow(id, store, queryParams, isBorrow);
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
Srims.fund.showFundDescendManageWindow = function(finance, store){
    var id = 'FundDescendManageWindow' + finance.get('id');
    var window = Ext.getCmp(id);
    if (!window) 
        window = new Srims.fund.FundDescendManageWindow(id, finance, store);
    window.show();
}
Srims.fund.newFundDescend = function(finance, store, manageWindow){
    var Id = "NewFundDescendWindow" + finance.get('id');
    var window = Ext.getCmp(id);
    if (!window) {
        var fundDescend = new Srims.fund.FundDescend({});
        var window = new Srims.fund.FundDescendWindow(Id, finance, fundDescend, store, manageWindow, false);
    }
    window.show();
}
Srims.fund.editFundDescend = function(fundDescend, store){
    var Id = "editFundDescendWindow" + fundDescend.get('id');
    var window = Ext.getCmp(id);
    if (!window) 
        var window = new Srims.fund.FundDescendWindow(Id, store.finance, fundDescend, store, store.window, false);
    window.show();
}
Srims.fund.newBatchFundDescend = function(finance, store, manageWindow){
    var Id = "NewBatchFundDescendWindow" + finance.get('id');
    var window = Ext.getCmp(id);
    if (!window) 
        var window = new Srims.fund.FundBatchDescendWindow(Id, finance, store, manageWindow);
    
    window.show();
}
Srims.fund.fundDescend_delete = function(fundDescend, store){
    Srims.fund.FundDescend_ChangeState(fundDescend, store, '', '/Delete', '经费下拨删除成功', '成功删除选定的经费下拨');
}
Srims.fund.FundDesend_CenorPass = function(fundDescend, store){
    Srims.fund.FundDescend_ChangeState(fundDescend, store, '', '/CensorPass', '经费下拨审核通过成功', '成功审核通过选定的经费下拨');
}
Srims.fund.showFundDescendCensorRejectWindow = function(fundDescend, store){
    var Id = "FundDescendCensorRejectWindow" + fundDescend.get('id');
    var window = Ext.getCmp(id);
    if (!window) 
        var window = new Srims.fund.FundDescendCensorRejectWindow(Id, fundDescend, store);
    window.show();
}
Srims.fund.FundDescend_CensorReject = function(fundDescend, store, remark){
    Srims.fund.FundDescend_ChangeState(fundDescend, store, remark, '/CensorReject', '经费下拨审核驳回成功', '成功审核驳回选定的经费下拨');
}
Srims.fund.FundDescend_ChangeState = function(fundDescend, store, remark, subUrl, title, msg){
    Ext.Ajax.request({
        url: Srims.service.fund.FundDescendService + subUrl,
        params: {
            fundDescendId: fundDescend.get('id'),
            remark: remark
        },
        scope: this,
        success: function(response){
            Ext.Msg.show({
                title: title,
                msg: msg,
                buttons: Ext.Msg.OK,
                icon: Ext.MessageBox.INFO
            });
            Srims.fund.FundDescendCallBack(store.window, response, store, undefined, true);
            Srims.Poll.startPollAction(Srims.Poll.getPollAction_WaitingCensorHorizontalProjectFundDescend);
        }
    });
}
Srims.fund.FundDescendCallBack = function(manageWindow, response, store, window, isStartPoll){

    if (manageWindow) {
        var financeStore = new Ext.data.Store({
            data: response.responseXML,
            reader: new Srims.fund.FinanceSimpleXmlReader()
        });
        var currentFinace = financeStore.getAt(0);
        manageWindow._fundDescendManageWindow_FinanceInfoPanel.resetComponentValues(currentFinace);
        manageWindow.resetButtonVisibleAndDisabled(currentFinace);
    }
    
    if (store) 
        store.load();
    
    if (window) 
        window.close();
    
    if (isStartPoll) {
        Srims.Poll.startPollAction(Srims.Poll.getPollAction_WaitingAllocationVerticalProjectFundDescend);
        Srims.Poll.startPollAction(Srims.Poll.getPollAction_WaitingAllocationHorizontalProjectFundDescend);
    }
}

Srims.fund.newFundLent = function(store){
    var Id = "NewLentMoneyWindow";
    var window = Ext.getCmp(id);
    if (!window) {
        var fundDescend = new Srims.fund.FundDescend({});
        var window = new Srims.fund.FundDescendWindow(Id, undefined, fundDescend, store, undefined, true);
    }
    window.show();
}

Srims.fund.NewFundReturn = function(finance, store, manageWindow, project){
    var Id = "NewFundDescend_ReturnWindow" + finance.get('id');
    var window = Ext.getCmp(id);
    if (!window) 
        var window = new Srims.fund.FundDescend_ReturnWindow(Id, finance, store, manageWindow, project);
    
    window.show();
}
Srims.fund.deleteFundReturn = function(fundReturn, store){
    Ext.Ajax.request({
        url: Srims.service.fund.FinanceFundDescendService + '/Delete',
        params: {
            financeFundDescendId: fundReturn.get('id')
        },
        scope: this,
        success: function(response){
            store.load();
            Ext.Msg.show({
                title: '成功删除还款记录',
                msg: '成功删除选定的还款记录',
                buttons: Ext.Msg.OK,
                icon: Ext.MessageBox.INFO
            });
            
            var financeStore = new Ext.data.Store({
                data: response.responseXML,
                reader: new Srims.fund.FinanceSimpleXmlReader()
            });
            var currentFinace = financeStore.getAt(0);
            var window = store.window;
            window._fundDescendManageWindow_FinanceInfoPanel.resetComponentValues(currentFinace);
        }
    });
}
