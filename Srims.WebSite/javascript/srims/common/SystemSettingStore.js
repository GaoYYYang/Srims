
if (!Srims.common) 
    Ext.namespace('Srims.common');

Srims.common.SystemSettingStore = Ext.extend(Srims.data.XmlStore, {
    constructor: function(load_url, params){
        Srims.common.SystemSettingStore.superclass.constructor.call(this, new Srims.common.SystemSettingXmlReader(), load_url, params);
    }
});
