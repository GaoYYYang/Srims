
if (!Srims.type) 
    Ext.namespace('Srims.type');

Srims.type.ProjectTypeStore = Ext.extend(Srims.data.XmlStore, {
    constructor: function(load_url, params){
        Srims.type.ProjectTypeStore.superclass.constructor.call(this, new Srims.type.ProjectTypeXmlReader(), load_url, params);
    }
});
