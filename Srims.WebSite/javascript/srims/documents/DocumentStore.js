
if (!Srims.documents) 
    Ext.namespace('Srims.documents');

Srims.documents.DocumentStore = Ext.extend(Srims.data.XmlStore, {
    constructor: function(load_url, params){
        Srims.documents.DocumentStore.superclass.constructor.call(this, new Srims.documents.DocumentXmlReader(), load_url, params);
    }
});
