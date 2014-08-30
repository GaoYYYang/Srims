
if (!Srims.patents)
    Ext.namespace("Srims.patents");

Srims.patents.PatentInventerXmlReader = Ext.extend(Srims.data.XmlReader, {
    constructor: function() {
        Srims.patents.PatentInventerXmlReader.superclass.constructor.call(this, Srims.patents.PatentInventer);
    }
});








