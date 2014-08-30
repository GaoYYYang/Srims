
if (!Srims.bases) 
    Ext.namespace('Srims.bases');

Srims.bases.listBase = function(isShowNewWindow){
    Srims.bases._listBase('BaseList', '基地列表', 'icon-base-list', isShowNewWindow);
};

//列表显示
Srims.bases._listBase = function(id, name, iconCls, ShowNewWindow){

    var panelId = 'BaseGridPanel_' + id;
    var baseStore = undefined;
    var panel = Srims.WorkSpace.active(panelId);
    var queryParams = {};
    
    if (panel) {
        baseStore = panel.getBaseStore();
        baseStore.load();
    }
    else {
        baseStore = new Srims.bases.BaseStore(Srims.service.bases.BaseService + '/Query', queryParams);
        panel = new Srims.bases.BaseGridPanel(panelId, baseStore, name, iconCls, queryParams);
        panel.getBaseStore().load();
        Srims.WorkSpace.addPanel(panel);
    }
    //新建
    if (ShowNewWindow) {
        Srims.bases.newBase('NewBaseWindow');
    }
};
Srims.bases.newBase = function(){
    var windowId = 'new_base_window';
    
    var base = new Srims.bases.Base({});
    base.set('isDirectorSchoolExpert', true);
    base.set('isAcademyDirectorSchoolExpert', true);
    
    var window = Ext.getCmp(windowId);
    if (!window) 
        window = new Srims.bases.BaseEditWindow(windowId, base);
    
    window.show();
}
Srims.bases.showBase = function(currentBase){
    var panelId = 'BaseShowPanel' + currentBase.get('id');
    if (Srims.WorkSpace.active(panelId)) {
        Ext.getCmp(panelId).reset(currentBase);
        return;
    }
    var panel = new Srims.bases.BaseShowPanel(panelId, currentBase);
    
    Srims.WorkSpace.addPanel(panel);
}
Srims.bases.editBase = function(currentBase){
    var windowId = 'baseEditwindow_' + currentBase.get('id');
    
    var window = Ext.getCmp(windowId);
    if (!window) 
        window = new Srims.bases.BaseEditWindow(windowId, currentBase);
    
    window.show();
}
Srims.bases.deleteBase = function(currentBase){
    Ext.Ajax.request({
        url: Srims.service.bases.BaseService + '/Delete',
        params: {
            baseId: currentBase.get('id')
        },
        scope: this,
        success: function(response){
            Srims.bases.listBase(false);
            if (currentBase.showPanel) 
                Srims.WorkSpace.getWorkSpace().remove(currentBase.showPanel);
        }
    })
}
