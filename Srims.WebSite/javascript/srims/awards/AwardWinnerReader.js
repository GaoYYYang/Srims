if (!Srims.awards)
    Ext.namespace("Srims.awards");

Srims.awards.AwardWinnerXmlReader = Ext.extend(Srims.data.XmlReader, {
    constructor: function() {
    Srims.awards.AwardWinnerXmlReader.superclass.constructor.call(this, Srims.awards.AwardWinner);
    }
});


