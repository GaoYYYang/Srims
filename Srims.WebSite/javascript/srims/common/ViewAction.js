
if (!Srims.common) 
    Ext.namespace('Srims.common');

Srims.common.newView = function(viewType, viewDefination){
    var windowId = 'NewViewDefineWindow' + viewType;
    var window = Ext.getCmp(windowId);
    
    if (!window) {
        var view = new Srims.common.View({
            type: viewType,
            definition: viewDefination
        });
        window = new Srims.common.ViewDefineWindow(windowId, view, undefined);
    }
    
    window.show();
}
Srims.common.renameView = function(view, store){
    var windowId = 'EditViewDefineWindow' + view.get('id');
    var window = Ext.getCmp(windowId);
    
    if (!window) {
        window = new Srims.common.ViewDefineWindow(windowId, view, store);
    }
    
    window.show();
}
Srims.common.showViewWindow = function(viewType){
    var windowId = 'viewWindow' + viewType;
    var window = Ext.getCmp(windowId);
    
    if (!window) {
        var store = new Srims.common.ViewStore(Srims.service.common.ViewService + '/GetByUser', {
            viewType: viewType
        });
        window = new Srims.common.ViewShowWindow(windowId, store, viewType);
    }
    window.show();
}
Srims.common.deleteView = function(view, store){
    Ext.Ajax.request({
        url: Srims.service.common.ViewService + '/Delete',
        params: {
            viewId: view.get('id')
        },
        scope: this,
        success: function(){
            store.load();
        }
    });
}
Srims.common.exportViewResult = function(view){
    Srims.common.doStaticViewAction(view, true);
};
Srims.common.doViewAction = function(view){
    if (Array.itemIsExistInArray(Srims.common.staticViewType, view.get('type'))) 
        Srims.common.doStaticViewAction(view, false);
    if (Array.itemIsExistInArray(Srims.common.queryType, view.get('type'))) 
        Srims.common.doQueryViewAction(view);
}

Srims.common.doStaticViewAction = function(view, isExport){
    Srims.common._loadingAnimation = new Ext.LoadMask(Ext.getBody(), {
        msg: '正在进行统计：' + view.get('name') + '...'
    });
    Srims.common._loadingAnimation.show();
    Ext.Ajax.request({
        url: Srims.common.ViewType.getStaticSubUrl(view.get('type')),
        params: Ext.util.JSON.decode(view.get('definition')),
        scope: this,
        success: function(response){
            Srims.common.staticResponseFunction(response, view, isExport);
            Srims.common._loadingAnimation.hide();
        }
    });
}
Srims.common.staticResponseFunction = function(response, view, isExport){
    var title = view.get('name');
    var iconCls = Srims.common.ViewType.getResultShowIconCls(view.get('type'));
    var renderer = Srims.common.ViewType.getStaticRender(view.get('type'));
    
    if (isExport) 
        Srims.statistic.exportToExcel(title, response, renderer);
    else 
        Srims.statistic.showResult(title, iconCls, response, renderer);
}

Srims.common.doQueryViewAction = function(view){
    var store = Srims.common.viewTypeStore(view.get('type'), Ext.util.JSON.decode(view.get('definition')));
    var title = view.get('name');
    var iconCls = Srims.common.ViewType.getResultShowIconCls(view.get('type'));
    var panelId = 'queryView_' + view.get('type') + '_' + view.get('id');
    var panel = Srims.WorkSpace.active(panelId);
    var viewType = view.get('type');
    
    if (panel) 
        return;
    
    if (viewType == Srims.common.ViewType.VerticalProjectQuery) 
        panel = new Srims.projects.ProjectGridPanel(panelId, store, title, iconCls, false, undefined, undefined, Ext.util.JSON.decode(view.get('definition')));
    if (viewType == Srims.common.ViewType.HorizontalProjectQuery) 
        panel = new Srims.projects.ProjectGridPanel(panelId, store, title, iconCls, true, undefined, undefined, Ext.util.JSON.decode(view.get('definition')));
    if (viewType == Srims.common.ViewType.PaperQuery)
        panel = new Srims.papers.PaperGridPanel(panelId, store, title, iconCls, Ext.util.JSON.decode(view.get('definition')));
    if (viewType == Srims.common.ViewType.LiberalArtsPaperQuery)
        panel = new Srims.papers.LiberalArtsPaperGridPanel(panelId, store, title, iconCls, Ext.util.JSON.decode(view.get('definition')));   
    if (viewType == Srims.common.ViewType.PatentQuery) 
        panel = new Srims.patents.PatentGridPanel(panelId, store, title, iconCls, Ext.util.JSON.decode(view.get('definition')));
    if (viewType == Srims.common.ViewType.AwardQuery) 
        panel = new Srims.awards.AwardGridPanel(panelId, store, title, iconCls, Ext.util.JSON.decode(view.get('definition')));
    if (viewType == Srims.common.ViewType.ExpertQuery) 
        panel = new Srims.experts.ExpertGridPanel(panelId, store, title, iconCls, Ext.util.JSON.decode(view.get('definition')));
    
    Srims.WorkSpace.addPanel(panel);
    store.load();
}
