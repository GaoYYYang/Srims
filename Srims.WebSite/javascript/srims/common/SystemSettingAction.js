
if (!Srims.common) 
    Ext.namespace('Srims.common');

Srims.common.systemSettingWindows = function(){
    var id = 'SystemSet';
    var window = Ext.getCmp(id);
    
    if (!window) {
        systemSettingStore = new Srims.common.SystemSettingStore(Srims.service.common.SystemSettingService + '/Query');
        systemSettingStore.window = window;
        systemSettingStore.on('load', function(){
            this.window = new Srims.common.SystemSettingWindow(this.getAt(0));
            this.window.show();
        })
        systemSettingStore.load();
    }
    else 
        window.show();
};
