if (!Srims.common)
    Ext.namespace('Srims.common');

Srims.common.SubjectSecondLevelStore = Ext.extend(Srims.data.XmlStore, {
    constructor: function(load_url, params) {
    Srims.common.SubjectSecondLevelStore.superclass.constructor.call(this, new Srims.common.SubjectSecondLevelXmlReader(), load_url, params);
    }
});
