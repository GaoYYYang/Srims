if (!Srims.awards)
    Ext.namespace("Srims.awards");

Srims.awards.AwardXmlReader = Ext.extend(Srims.data.XmlReader, {
    constructor: function() {
    Srims.awards.AwardXmlReader.superclass.constructor.call(this, Srims.awards.Award);
    }
});

