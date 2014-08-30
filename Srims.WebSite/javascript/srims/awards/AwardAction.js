
if (!Srims.awards) 
    Ext.namespace("Srims.awards");

//列表显示
Srims.awards.listAward = function(showQueryWindow, ShowNewWindow){
    Srims.awards._listAward('AwardList', '奖励列表', 'icon-award-list', showQueryWindow, ShowNewWindow);
};

//列表显示
Srims.awards._listAward = function(id, name, iconCls, showQueryWindow, ShowNewWindow){

    var panelId = 'AwardGridPanel_' + id;
    var awardStore = undefined;
    var panel = Srims.WorkSpace.active(panelId);
    var queryParams = {};
    
    if (panel) {
        awardStore = panel.getAwardStore();
        awardStore.load();
    }
    else {
        awardStore = new Srims.awards.AwardStore(Srims.service.awards.AwardService + '/Query', queryParams);
        panel = new Srims.awards.AwardGridPanel(panelId, awardStore, name, iconCls, queryParams);
        panel.getAwardStore().load();
        Srims.WorkSpace.addPanel(panel);
    }
    //查询
    if (showQueryWindow) {
        queryParams = awardStore.getExtraParams();
        Srims.awards.showAwardQueryWindow(panelId + '_QueryWindow', awardStore, queryParams, panel);
    }
    //新建
    if (ShowNewWindow) {
        Srims.awards.showNewAwardWindow(panelId + '_NewAwardWindow');
    }
};

//显示查询窗口
Srims.awards.showAwardQueryWindow = function(id, store, queryParams, gridPanel){
    var window = Ext.getCmp(id);
    if (!window) 
        window = new Srims.awards.AwardQueryWindow(id, store, queryParams);
    
    gridPanel.queryWindow = window;
    window.show();
    
    var map = new Ext.KeyMap(id, {
        key: 13,
        fn: function(){
            if (!window.hidden) 
                window.query(window._buttonQuery);
        }
    });
};

//从store导出所查询到的奖励
Srims.awards.exportAward = function(filterParams, queryParams){
    var windowId = 'AwardExportWindow';
    //生成新Store
    var exportParams = Srims.exportAction.setExportQueryParams(filterParams, queryParams);
    var queryUrl = Srims.service.awards.AwardService + '/Query';
    var items = [];
    items[0] = new Srims.component.ExportWindow_EntityColumnForm('', Srims.awards.AwardExportColumns);
    
    Srims.exportAction.showExportWindow(windowId, queryUrl, exportParams, items, 'Awards');
};

//显示奖励详细信息
Srims.awards.showAward = function(award, store){
    var panelId = 'AwardShowPanel' + award.get('id');
    if (Srims.WorkSpace.active(panelId)) 
        return;
    var panel = new Srims.awards.AwardShowPanel(panelId, award, store);
    Srims.WorkSpace.addPanel(panel);
};

//删除奖励
Srims.awards.deleteAward = function(award, store){
    Ext.MessageBox.confirm('删除奖励', '你确定要删除这个奖励吗？', function(buttonId){
        if (buttonId == 'yes') {
            var _params = {};
            _params.awardID = award.get('id');
            
            var panelID = 'AwardShowPanel' + award.get('id');
            var awardEditWindowID = 'AwardGridPanel_AwardList_EditAwardWindow' + award.get('id');
            var winnerManageWindowID = 'AwardWinnerManageWindow' + award.get('id');
            
            Ext.Ajax.request({
                url: Srims.service.awards.AwardService + '/DeleteAward',
                params: _params,
                scope: this,
                success: function(){
                    //从列表中删除时，关闭相应的查看页面 编辑窗口  获奖人管理窗口 。
                    if (Ext.getCmp(panelID)) 
                        Srims.WorkSpace.getWorkSpace().remove(Ext.getCmp(panelID), true);
                    if (Ext.getCmp(awardEditWindowID)) 
                        Ext.getCmp(awardEditWindowID).close();
                    if (Ext.getCmp(winnerManageWindowID)) 
                        Ext.getCmp(winnerManageWindowID).close();
                    store.load();
                }
            });
        }
    }, this);
};

//新建奖励
Srims.awards.showNewAwardWindow = function(id){
    var award = new Srims.awards.Award({});
    var window = Ext.getCmp(id);
    
    if (!window) 
        window = new Srims.awards.AwardEditWindow(id, award);
    window.show();
};

//编辑奖励
Srims.awards.showEditAwardWindow = function(award){
    var ID = 'AwardGridPanel_AwardList_EditAwardWindow' + award.get('id');
    var window = Ext.getCmp(ID);
    
    if (!window) 
        window = new Srims.awards.AwardEditWindow(ID, award);
    window.show();
};
//成员管理
Srims.awards.showAwardWinnerManageWindow = function(award){
    var ID = 'AwardWinnerManageWindow' + award.get('id');
    var window = Ext.getCmp(ID);
    
    if (!window) 
        window = new Srims.awards.AwardWinnerManageWindow(ID, award);
    if (window) {
        awardWinnerStore = window.getAwardWinnerStore();
        awardWinnerStore.load();
    }
    window.show();
};
//添加成员
Srims.awards.addWinner = function(award, store, isExpert){
    var ID = 'addWinner' + award.get('id');
    var window = Ext.getCmp(ID);
    var awardWinner = new Srims.awards.AwardWinner({});
    
    if (!window) 
        window = new Srims.awards.AwardWinnerManageWindow_AddWinner(award, awardWinner, store, isExpert);
    window.show();
};

//编辑成员 
Srims.awards.editWinner = function(winner, award, store, isExpert){
    var ID = 'editWinner' + award.get('id') + winner.get('id');
    var window = Ext.getCmp(ID);
    
    if (!window) 
        window = new Srims.awards.AwardWinnerManageWindow_AddWinner(award, winner, store, isExpert);
    window.show();
};

//删除成员
Srims.awards.deleteWinner = function(awardWinner, store, award){
    Ext.MessageBox.confirm('删除获奖者', '你确定要删除这个获奖者吗？', function(buttonId){
        if (buttonId == 'yes') {
            var _params = {};
            _params.awardWinnerID = awardWinner.get('id');
            _params.awardID = award.get('id');
            
            Ext.Ajax.request({
                url: Srims.service.awards.AwardWinnerService + '/DeleteAwardWinner',
                params: _params,
                scope: this,
                success: function(){
                    //从获奖人管理窗口中删除获奖人时，相应奖励列表、奖励显示、获奖人管理窗口都更新。 
                    Srims.awards.listAward(false, false);
                    var showPanelID = 'AwardShowPanel' + award.get('id');
                    if (Ext.getCmp(showPanelID)) {
                        Srims.WorkSpace.getWorkSpace().remove(Ext.getCmp(showPanelID), true);
                        Srims.awards.showAward(award);
                    }
                    store.load();
                }
            });
        }
    }, this);
};
Srims.awards.showAwardDocumentManageWindow = function(award){
    var windowId = 'AwardDocumentManageWindow' + award.get('id');
    var window = Ext.getCmp(windowId);
    
    if (!window) {
        window = new Srims.documents.AwardDocumentManageWindow(windowId, award);
    }
    
    window.show();
}
Srims.awards.showAwardDocumentUploadWindow = function(award, store){
    var windowId = 'AwardDocumentUploadeWindow' + award.get('id');
    var window = Ext.getCmp(windowId);
    
    if (!window) {
        window = new Srims.documents.AwardDocumentUploadWindow(windowId, award, store);
    }
    
    window.show();
}
Srims.awards.downLoadAwardDocument = function(awardDocument){
    var awardDocumentResource = awardDocument.get('resource');
    Srims.documents.downLoadResource(awardDocumentResource, '/GetAwardDocument');
}
Srims.awards.deleteAwardDocument = function(awardDocument, store){
    Srims.documents.deleteResource(awardDocument.get('resource'), awardDocument.get('id'), Srims.service.documents.AwardDocumentService + '/Delete', store, '成功删除奖励文档', '成功删除奖励文档');
}
Srims.awards.censorPassAwardDoucment = function(awardDocument, store){
    Srims.awards.saveForChangeState(awardDocument, Srims.CensorState.passed, store, '/CensorPass', undefined);
}
Srims.awards.showAwardDocumentCensorRejctWindow = function(awardDocuemnt, store){
    var windowId = 'AwardDocumentCensorRejectWindow' + awardDocuemnt.get('id');
    var window = Ext.getCmp(windowId);
    
    if (!window) {
        window = new Srims.documents.AwardDocumentCensorRejectWindow(windowId, awardDocuemnt, store);
    }
    
    window.show();
}
Srims.awards.censorRejectAwardDocument = function(awardDocument, store, remark){
    Srims.awards.saveForChangeState(awardDocument, Srims.CensorState.reject, store, '/CensorReject', remark);
}
Srims.awards.saveForChangeState = function(awardDocument, state, store, subUrl, remark){
    var params = {};
    params.awardDocumentId = awardDocument.get('id');
    if (remark != undefined) 
        params.remark = remark;
    
    Ext.Ajax.request({
        url: Srims.service.documents.AwardDocumentService + subUrl,
        params: params,
        success: function(){
        
            Srims.Poll.startPollAction(Srims.Poll.getPollAction_WaitingCensorAwardDocument);
            store.load();
        }
    });
}
Srims.awards.listWaitingCensorDocument = function(){
    var panelId = 'WaitingCensorAwardDocumentListPanel';
    var panel = Srims.WorkSpace.active(panelId);
    
    if (!panel) {
        var load_url = Srims.service.documents.AwardDocumentService + '/GetWaitingCensor';
        var store = new Srims.documents.AwardDocumentStore(load_url, undefined);
        
        panel = new Srims.documents.AwardDocumentGridPanel(panelId, undefined, true, store);
        Srims.WorkSpace.addPanel(panel);
        
        store.load();
    }
}
Srims.awards.showImportWindow = function(store){
    var windowId = 'AwardImportWindow';
    var window = Ext.getCmp(windowId);
    
    if (!window) 
        window = new Srims.component.ImportWindow(windowId, store, Srims.service.awards.AwardService + '/Import', '导入奖励数据', false);
    
    window.show();
}
