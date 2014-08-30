
if (!Srims.documents) 
    Ext.namespace('Srims.documents');

Srims.documents.ContractStore = Ext.extend(Srims.data.XmlStore, {
    constructor: function(load_url, params){
        Srims.documents.ContractStore.superclass.constructor.call(this, new Srims.documents.ContractXmlReader(), load_url, params);
    }
});
