if (!Srims.patents)
    Ext.namespace("Srims.patents");

Srims.patents.PatentAgencyXmlReader = Ext.extend(Srims.data.XmlReader, {
    constructor: function() {
        Srims.patents.PatentAgencyXmlReader.superclass.constructor.call(this, Srims.patents.PatentAgency);
    }
});

