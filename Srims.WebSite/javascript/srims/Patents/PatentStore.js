
if (!Srims.patents)
    Ext.namespace("Srims.patents");

Srims.patents.PatentStore = Ext.extend(Srims.data.XmlStore, {
    constructor: function(load_url, params) {
        Srims.patents.PatentStore.superclass.constructor.call(this, new Srims.patents.PatentXmlReader(), load_url, params);
    }
});








