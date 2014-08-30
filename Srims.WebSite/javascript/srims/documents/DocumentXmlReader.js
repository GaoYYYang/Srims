
if (!Srims.documents) 
    Ext.namespace('Srims.documents');

Srims.documents.DocumentXmlReader = Ext.extend(Srims.data.XmlReader, {
    constructor: function(){
        Srims.documents.DocumentXmlReader.superclass.constructor.call(this, Srims.documents.Document);
    }
});
