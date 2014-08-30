
if (!Srims.papers) 
    Ext.namespace('Srims.papers');

Srims.papers.listMagazine = function(showQueryWindow){
    Srims.papers._listMagazine('MagazineList', '杂志列表', 'icon-magazine-list', showQueryWindow);
}

Srims.papers._listMagazine = function(id, name, iconCls, showQueryWindow){
    var panelId = 'MagazineGridPanel_' + id;
    var magazineStore = undefined;
    var panel = Srims.WorkSpace.active(panelId);
    var queryParams = {};
    
    if (panel) {
        magazineStore = panel.getStore();
        magazineStore.load();
    }
    else {
        magazineStore = new Srims.papers.MagazineStore(Srims.service.papers.MagazineService + '/Query', queryParams);
        panel = new Srims.papers.MagazineGridPanel(panelId, magazineStore, name, iconCls, queryParams);
        panel.getStore().load();
        
        Srims.WorkSpace.addPanel(panel);
    }
    if (showQueryWindow) {
        Srims.papers.showMagazineQueryWindow(panelId + '_QueryWindow', magazineStore, true, queryParams, panel);
    }
}
Srims.papers.listMagazineOccupation = function(){
    Srims.papers._listMagazineOccupation('MagazineOccupationList', '杂志任职列表', 'icon-magazine-Occupation');
}

Srims.papers._listMagazineOccupation = function(id, name, iconCls){
    var panelId = 'MagazineOccupationGridPanel_' + id;
    var magazineOccupationStore = undefined;
    var panel = Srims.WorkSpace.active(panelId);
    
    if (panel) {
        magazineOccupationStore = panel.getStore();
        magazineOccupationStore.load();
    }
    else {
        magazineOccupationStore = new Srims.papers.MagazineOccupationStore(Srims.service.papers.MagazineOccupationService + '/Query');
        panel = new Srims.papers.MagazineOccupationManageGridPanel(panelId, magazineOccupationStore, name, iconCls);
        panel.getStore().load();
        
        Srims.WorkSpace.addPanel(panel);
    }
}
Srims.papers.showMagazineQueryWindow = function(id, store, isMagazineQuery, queryParams, gridPanel){
    var window = Ext.getCmp(id);
    if (!window) 
        window = new Srims.papers.MagazineQueryWindow(id, store, isMagazineQuery, queryParams);
    
    gridPanel.queryWindow = window;
    window.show();
    
    var map = new Ext.KeyMap(id, {
        key: 13,
        fn: function(){
            if (!window.hidden) 
                window.query(window._buttonQuery);
        }
    });
}
Srims.papers.showMagazine = function(magazine, store){
    var panelId = 'MagazineShowPanel' + magazine.get('id');
    if (Srims.WorkSpace.active(panelId)) 
        return;
    var panel = new Srims.papers.MagazineShowPanel(panelId, magazine, store);
    Srims.WorkSpace.addPanel(panel);
}
Srims.papers.newMagazine = function(){
    var Id = "NewMagazineWindow";
    var window = Ext.getCmp(id);
    if (!window) {
        var magazine = new Srims.papers.Magazine({});
        var window = new Srims.papers.MagazineEditWindow(Id, magazine);
    }
    window.show();
}
Srims.papers.editMagazine = function(magazine){
    var Id = "MagazineEditWindow" + magazine.get('id');
    var window = Ext.getCmp(id);
    if (!window) 
        var window = new Srims.papers.MagazineEditWindow(Id, magazine);
    window.show();
}
Srims.papers.deleteMagazine = function(magazine, store){
    Ext.MessageBox.confirm('删除杂志', '你确定要删除这个杂志吗？', function(buttonId){
        if (buttonId == 'yes') {
            var params = {};
            params.magazineID = magazine.get('id');
            
            Ext.Ajax.request({
                url: Srims.service.papers.MagazineService + '/Delete',
                params: params,
                scope: this,
                success: function(){
                    var panelId = "MagazineShowPanel" + magazine.get('id');
                    closePanel(panelId);
                    var windowId = "MagazineEditWindow" + magazine.get('id');
                    closeWindow(windowId);
                    var windowId = "MagazineYearInforManageWindow_" + magazine.get('id');
                    closeWindow(windowId);
                    var windowId = "MagazineOccupationManageWindow_" + magazine.get('id');
                    closeWindow(windowId);
                    Srims.papers.listMagazine(false);
                }
            });
        }
    }, this);
}
Srims.papers.showMagazineYearInforMagazineWindow = function(magazine){
    var windowId = 'MagazineYearInforManageWindow_' + magazine.get('id');
    var window = Ext.getCmp(windowId);
    if (!window) 
        window = new Srims.papers.MagazineInformationWindow(windowId, magazine);
    else 
        window._magazineInformationGridPanel.getStore().load();
    window.show();
}
Srims.papers.newMagazineInformation = function(magazine, store){
    var windowId = 'NewMagazineInformation' + magazine.get('id');
    var window = Ext.getCmp(windowId);
    if (!window) {
        var magazineInformation = new Srims.papers.MagazineInformation({});
        window = new Srims.papers.MagazineInformationEditWindow(windowId, magazineInformation, magazine, store);
    }
    window.show();
}
Srims.papers.editMagazineInformation = function(magazine, magazineInformation, store){
    var windowId = 'EditMagazineInformation' + magazineInformation.get('id');
    var window = Ext.getCmp(windowId);
    if (!window) {
        window = new Srims.papers.MagazineInformationEditWindow(windowId, magazineInformation, magazine, store);
    }
    window.show();
}
Srims.papers.deleteMagazineInformation = function(magazineInformation, store, magazine){
    Ext.MessageBox.confirm('删除杂志年度信息', '你确定要删除这项信息吗？', function(buttonId){
        if (buttonId == 'yes') {
            var params = {};
            params.magazineInforID = magazineInformation.get('id');
            
            Ext.Ajax.request({
                url: Srims.service.papers.MagazineInformationService + '/Delete',
                params: params,
                scope: this,
                success: function(){
                    var panelId = 'MagazineShowPanel' + magazine.get('id');
                    closePanel(panelId);
                    Srims.papers.showMagazine(magazine);
                    store.load();
                }
            });
        }
    }, this);
}
Srims.papers.showMagazineOccupationManageWindow = function(magazine){
    var windowId = 'MagazineOccupationManageWindow_' + magazine.get('id');
    var window = Ext.getCmp(windowId);
    if (!window) 
        window = new Srims.papers.MagazineOccupationWindow(windowId, magazine);
    else 
        window._magazineOccupationGridPanel.getStore().load();
    window.show();
}
Srims.papers.newMagazineOccupation = function(magazine, store){
    var windowId = 'NewMagazineOccupation';
    var window = Ext.getCmp(windowId);
    if (!window) {
        var magazineOccupation = new Srims.papers.MagazineOccupation({});
        window = new Srims.papers.MagazineOccupationEditWindow(windowId, magazineOccupation, magazine, store);
    }
    window.show();
}
Srims.papers.editMagazineOccupation = function(magazine, magazineOccupation, store){
    var windowId = 'EditMagazineOccupation' + magazineOccupation.get('id');
    var window = Ext.getCmp(windowId);
    if (!window) {
        window = new Srims.papers.MagazineOccupationEditWindow(windowId, magazineOccupation, magazine, store);
    }
    window.show();
}
Srims.papers.deleteMagazineOccupation = function(magazineOccupation, store, magazine){
    Ext.MessageBox.confirm('删除杂志任职信息', '你确定要删除这项信息吗？', function(buttonId){
        if (buttonId == 'yes') {
            var params = {};
            params.magazineOccupationID = magazineOccupation.get('id');
            
            Ext.Ajax.request({
                url: Srims.service.papers.MagazineOccupationService + '/Delete',
                params: params,
                scope: this,
                success: function(){
                    var panelId = 'MagazineShowPanel' + magazine.get('id');
                    closePanel(panelId);
                    Srims.papers.showMagazine(magazine);
                    store.load();
                }
            });
        }
    }, this);
}
Srims.papers.showImportMagazineWindow = function(store){
    var windowId = 'MagazineImportWindow';
    var window = Ext.getCmp(windowId);
    
    if (!window) 
        window = new Srims.component.ImportWindow(windowId, store, Srims.service.papers.MagazineService + '/Import', '导入杂志数据', false);
    
    window.show();
}
Srims.papers.showImportMagazineInformationWindow = function(store){
    var windowId = 'MagazineInformationImportWindow';
    var window = Ext.getCmp(windowId);
    
    if (!window) 
        window = new Srims.component.ImportWindow(windowId, store, Srims.service.papers.MagazineInformationService + '/Import', '导入杂志年度信息数据', true);
    
    window.show();
}
function closePanel(panelId){
    if (Srims.WorkSpace.active(panelId)) {
        var panel = Ext.getCmp(panelId);
        Srims.WorkSpace.getWorkSpace().remove(panel);
    }
}

function closeWindow(windowId){
    var window = Ext.getCmp(windowId);
    if (window) 
        window.close();
}
