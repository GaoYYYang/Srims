
if (!Srims.experts)
    Ext.namespace('Srims.experts');

Srims.experts.ExpertInfoHistoryStore = Ext.extend(Srims.data.XmlStore, {
    constructor: function(load_url, params) {
        Srims.experts.ExpertInfoHistoryStore.superclass.constructor.call(this, new Srims.experts.ExpertInfoHistoryXmlReader(), load_url, params);
    }
});
