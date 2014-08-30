
if (!Srims.documents) 
    Ext.namespace('Srims.documents');

Srims.documents.ContractXmlReader = Ext.extend(Srims.data.XmlReader, {
    constructor: function(){
        Srims.documents.ContractXmlReader.superclass.constructor.call(this, Srims.documents.Contract);
    }
});
