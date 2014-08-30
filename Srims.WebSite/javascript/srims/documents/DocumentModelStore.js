
if (!Srims.documents) 
    Ext.namespace('Srims.documents');

Srims.documents.DocumentModelStore = Ext.extend(Srims.data.XmlStore, {
    constructor: function(load_url, params){
        Srims.documents.DocumentModelStore.superclass.constructor.call(this, new Srims.documents.DocumentModelXmlReader(), load_url, params);
    }
});
