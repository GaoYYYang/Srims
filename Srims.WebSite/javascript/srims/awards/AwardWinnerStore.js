
if (!Srims.awards)
    Ext.namespace("Srims.awards");

Srims.awards.AwardWinnerStore = Ext.extend(Srims.data.XmlStore, {
    constructor: function(awardId) {
        Srims.awards.AwardWinnerStore.superclass.constructor.call(this, new Srims.awards.AwardWinnerXmlReader(), Srims.service.awards.AwardWinnerService + '/GetByAwardID', {
            awardId: awardId
        });
    }
});
