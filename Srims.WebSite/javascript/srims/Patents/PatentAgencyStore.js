if (!Srims.patents)
    Ext.namespace("Srims.patents");

Srims.patents.PatentAgencyStore = Ext.extend(Srims.data.XmlStore, {
    constructor: function(load_url, params) {
        Srims.patents.PatentAgencyStore.superclass.constructor.call(this, new Srims.patents.PatentAgencyXmlReader(), load_url, params);
    }
});


