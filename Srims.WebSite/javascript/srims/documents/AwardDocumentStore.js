
if (!Srims.documents) 
    Ext.namespace('Srims.documents');

Srims.documents.AwardDocumentStore = Ext.extend(Srims.data.XmlStore, {
    constructor: function(load_url, params){
        Srims.documents.AwardDocumentStore.superclass.constructor.call(this, new Srims.documents.AwardDocumentXmlReader(), load_url, params);
    }
});
