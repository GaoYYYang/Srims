
if (!Srims.documents) 
    Ext.namespace('Srims.documents');

Srims.documents.DocumentModelXmlReader = Ext.extend(Srims.data.XmlReader, {
    constructor: function(){
        Srims.documents.DocumentModelXmlReader.superclass.constructor.call(this, Srims.documents.DocumentModel);
    }
});
