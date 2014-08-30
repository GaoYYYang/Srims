
if (!Srims.common) 
    Ext.namespace('Srims.common');

Srims.common.LogStore = Ext.extend(Srims.data.XmlStore, {
    constructor: function(load_url, params){
        Srims.common.LogStore.superclass.constructor.call(this, new Srims.common.LogXmlReader(), load_url, params);
    }
});
