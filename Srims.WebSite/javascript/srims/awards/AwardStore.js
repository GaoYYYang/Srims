
if (!Srims.awards)
    Ext.namespace("Srims.awards");

Srims.awards.AwardStore = Ext.extend(Srims.data.XmlStore, {
    constructor: function(load_url, params) {
        Srims.awards.AwardStore.superclass.constructor.call(this, new Srims.awards.AwardXmlReader(), load_url, params);
    }
});


