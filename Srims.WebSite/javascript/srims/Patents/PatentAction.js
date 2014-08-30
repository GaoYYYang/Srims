

if (!Srims.patents) 
    Ext.namespace("Srims.patents");

//列表显示
Srims.patents.listPatent = function(showQueryWindow, ShowNewWindow){
    Srims.patents._listPatent('PatentList', '专利列表', 'icon-patent-list', showQueryWindow, ShowNewWindow);
};

Srims.patents._listPatent = function(id, name, iconCls, showQueryWindow, ShowNewWindow){
    var panelId = 'PatentGridPanel_' + id;
    var patentStore = undefined;
    var panel = Srims.WorkSpace.active(panelId);
    var queryParams = {};
    
    if (panel) {
        patentStore = panel.getPatentStore();
        patentStore.load();
    }
    else {
        patentStore = new Srims.patents.PatentStore(Srims.service.patents.PatentService + '/Query', queryParams);
        panel = new Srims.patents.PatentGridPanel(panelId, patentStore, name, iconCls, queryParams);
        panel.getPatentStore().load();
        Srims.WorkSpace.addPanel(panel);
    }
    //查询
    if (showQueryWindow) {
        queryParams = patentStore.getExtraParams();
        Srims.patents.showPatentQueryWindow(panelId + '_QueryWindow', patentStore, queryParams, panel);
    }
    //新建
    if (ShowNewWindow) {
        Srims.patents.showNewPatentWindow(panelId + '_NewPatentWindow');
    }
};

//从store导出所查询到的专利
Srims.patents.exportPatent = function(filterParams, queryParams){
    var windowId = 'PatentExportWindow';
    //生成新Store
    var exportParams = Srims.exportAction.setExportQueryParams(filterParams, queryParams);
    var queryUrl = Srims.service.patents.PatentService + '/Query';
    var items = [];
    items[0] = new Srims.component.ExportWindow_EntityColumnForm('基本信息', Srims.patents.PatentExport_Column.basic);
    items[1] = new Srims.component.ExportWindow_EntityColumnForm('发明人', Srims.patents.PatentExport_Column.inventer);
    items[2] = new Srims.component.ExportWindow_EntityColumnForm('代理机构', Srims.patents.PatentExport_Column.agency);
    
    Srims.exportAction.showExportWindow(windowId, queryUrl, exportParams, items, 'Patent');
};

//显示专利的详细信息
Srims.patents.showPatent = function(patent, store){
    var panelId = 'PatentShowPanel' + patent.get('id');
    if (Srims.WorkSpace.active(panelId)) 
        return;
    var panel = new Srims.patents.PatentShowPanel(panelId, patent, store);
    Srims.WorkSpace.addPanel(panel);
};

//显示查询窗口
Srims.patents.showPatentQueryWindow = function(id, store, queryParams, gridPanel){
    var window = Ext.getCmp(id);
    if (!window) 
        window = new Srims.patents.PatentQueryWindow(id, store, queryParams);
    
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

//新建专利
Srims.patents.showNewPatentWindow = function(id){
    var patent = new Srims.patents.Patent({});
    var window = Ext.getCmp(id);
    
    if (!window) 
        window = new Srims.patents.PatentEditWindow(id, patent);
    window.show();
};

//编辑专利
Srims.patents.showEditPatentWindow = function(patent){
    var ID = 'PatentGridPanel_PatentList_EditPatentWindow' + patent.get('id');
    var window = Ext.getCmp(ID);
    
    if (!window) 
        window = new Srims.patents.PatentEditWindow(ID, patent);
    window.show();
};

//删除专利
Srims.patents.deletePatent = function(patent, store){
    Ext.MessageBox.confirm('删除专利', '你确定要删除这个专利吗？', function(buttonId){
        if (buttonId == 'yes') {
            var _params = {};
            _params.patentID = patent.get('id');
            
            var panelID = 'PatentShowPanel' + patent.get('id');
            var patentEditWindowID = 'PatentGridPanel_PatentList_EditPatentWindow' + patent.get('id');
            var patentInventerWindowID = 'PatentInventerManageWindow' + patent.get('id');
            
            Ext.Ajax.request({
                url: Srims.service.patents.PatentService + '/DeletePatent',
                params: _params,
                scope: this,
                success: function(){
                    //从列表中删除时，关闭相应的查看页面 编辑窗口  发明人管理窗口 。
                    if (Ext.getCmp(panelID)) 
                        Srims.WorkSpace.getWorkSpace().remove(Ext.getCmp(panelID), true);
                    if (Ext.getCmp(patentEditWindowID)) 
                        Ext.getCmp(patentEditWindowID).close();
                    if (Ext.getCmp(patentInventerWindowID)) 
                        Ext.getCmp(patentInventerWindowID).close();
                    store.load();
                }
            });
        }
    }, this);
};


//成员管理
Srims.patents.showPatentInventerManageWindow = function(patent){
    var ID = 'PatentInventerManageWindow' + patent.get('id');
    var window = Ext.getCmp(ID);
    
    if (!window) 
        window = new Srims.patents.PatentInventerManageWindow(ID, patent);
    else 
        window.getPatentInventerStore().load();
    
    window.show();
};
//添加成员
Srims.patents.addInventer = function(patent, store, isExpert, hasPrincipal){
    var ID = 'addWinner' + patent.get('id');
    var window = Ext.getCmp(ID);
    var patentInventer = new Srims.patents.PatentInventer({});
    
    if (!window) 
        window = new Srims.patents.PatentInventerManageWindow_AddInventer(patent, patentInventer, store, isExpert);
    window.show();
};

//编辑成员
Srims.patents.editInventer = function(inventer, patent, store, isExpert, hasPrincipal){
    var ID = 'editInventer' + patent.get('id') + inventer.get('id');
    var window = Ext.getCmp(ID);
    
    if (!window) 
        window = new Srims.patents.PatentInventerManageWindow_AddInventer(patent, inventer, store, isExpert);
    window.show();
};

//删除成员
Srims.patents.deleteInventer = function(patentInventer, store, patent){
    Ext.MessageBox.confirm('删除专利发明者', '你确定要删除这个发明者吗？', function(buttonId){
        if (buttonId == 'yes') {
            var _params = {};
            _params.patentInventerID = patentInventer.get('id');
            _params.patentID = patent.get('id');
            
            Ext.Ajax.request({
                url: Srims.service.patents.PatentInventerService + '/DeletePatentInventer',
                params: _params,
                scope: this,
                success: function(){
                    //从获奖人管理窗口中删除发明人时，相应专利列表、专利显示、发明人管理窗口都更新。
                    Srims.patents.listPatent(false, false);
                    var showPanelID = 'PatentShowPanel' + patent.get('id');
                    if (Ext.getCmp(showPanelID)) {
                        Srims.WorkSpace.getWorkSpace().remove(Ext.getCmp(showPanelID), true);
                        Srims.patents.showPatent(patent);
                    }
                    store.load();
                }
            });
        }
    }, this);
};
Srims.patents.showImportPatentWindow = function(store){
    var windowId = 'PatentImportWindow';
    var window = Ext.getCmp(windowId);
    
    if (!window) 
        window = new Srims.component.ImportWindow(windowId, store, Srims.service.patents.PatentService + '/Import', '导入专利数据', false);
    
    window.show();
}





