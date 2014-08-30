
if (!Srims.documents) 
    Ext.namespace('Srims.documents');

Srims.documents.AwardDocumentXmlReader = Ext.extend(Srims.data.XmlReader, {
    constructor: function(){
        Srims.documents.AwardDocumentXmlReader.superclass.constructor.call(this, Srims.documents.AwardDocument);
    }
});
