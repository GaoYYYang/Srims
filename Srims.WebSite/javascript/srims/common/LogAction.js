
if (!Srims.common) 
    Ext.namespace('Srims.common');

//日志设置
Srims.common.LogSet = function(){
    var panelId = 'LogSet';
    var panel = Srims.WorkSpace.active(panelId);
    if (!panel) {
        systemSettingStore = new Srims.common.SystemSettingStore(Srims.service.common.SystemSettingService + '/Query');
        systemSettingStore.panel = panel;
        systemSettingStore.on('load', function(){
            this.panel = new Srims.common.LogSetPanel(panelId, this.getAt(0));
            Srims.WorkSpace.addPanel(this.panel);
        })
        
        systemSettingStore.load();
    }
}, //显示该条日志的详细信息
 Srims.common.showLog = function(log, store){
    var panelId = 'LogShowPanel' + log.get('id');
    if (Srims.WorkSpace.active(panelId)) 
        return;
    var panel = new Srims.common.LogShowPanel(panelId, log, store);
    Srims.WorkSpace.addPanel(panel);
};

Srims.common.showLogQueryWindow = function(id, store, queryParams, gridPanel){
    var window = Ext.getCmp(id);
    if (!window) 
        window = new Srims.common.LogQueryWindow(id, store, queryParams);
    
    gridPanel.queryWindow = window;
    window.show();
    window.center();
    
    var map = new Ext.KeyMap(id, {
        key: 13,
        fn: function(){
            if (!window.hidden) 
                window.query(window._buttonQuery);
        }
    });
}
