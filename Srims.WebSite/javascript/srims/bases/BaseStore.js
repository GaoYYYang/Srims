
if (!Srims.bases) 
    Ext.namespace('Srims.bases');

Srims.bases.BaseStore = Ext.extend(Srims.data.XmlStore, {
    constructor: function(load_url, params){
        Srims.bases.BaseStore.superclass.constructor.call(this, new Srims.bases.BaseXmlReader(), load_url, params);
    }
});
