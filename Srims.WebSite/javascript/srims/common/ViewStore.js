
if (!Srims.common) 
    Ext.namespace('Srims.common');

Srims.common.ViewStore = Ext.extend(Srims.data.XmlStore, {
    constructor: function(load_url, params){
        Srims.common.ViewStore.superclass.constructor.call(this, new Srims.common.ViewXmlReader(), load_url, params);
    }
});
