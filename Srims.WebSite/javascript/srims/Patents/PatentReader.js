
if (!Srims.patents)
    Ext.namespace("Srims.patents");

Srims.patents.PatentXmlReader = Ext.extend(Srims.data.XmlReader, {
    constructor: function() {
        Srims.patents.PatentXmlReader.superclass.constructor.call(this, Srims.patents.Patent);
    }
});







