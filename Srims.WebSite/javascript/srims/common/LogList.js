
if (!Srims.common) 
    Ext.namespace('Srims.common');

Srims.common.listLog = function(){
    Srims.common._listLog('Log', 'icon-log-list', '日志列表');
}
Srims.common._listLog = function(id, iconCls, name){
    var panelId = 'LogPanel_' + id;
    var logStore = undefined;
    var panel = Srims.WorkSpace.active(panelId);
    var queryParams = {};
	
    if (panel) {
        logStore = panel.getLogStore();
		logStore.load();
    }
    else {
        logStore = new Srims.common.LogStore(Srims.service.common.LogService + '/Query',queryParams);
        panel = new Srims.common.LogGridPanel(panelId, logStore, name, iconCls,queryParams);
        panel.getLogStore().load();
        
        Srims.WorkSpace.addPanel(panel);
    }
}
