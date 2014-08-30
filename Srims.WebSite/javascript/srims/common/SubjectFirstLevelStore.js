if (!Srims.common)
    Ext.namespace('Srims.common');

Srims.common.SubjectFirstLevelStore = Ext.extend(Srims.data.XmlStore, {
    constructor: function(load_url, params) {
        Srims.common.SubjectFirstLevelStore.superclass.constructor.call(this, new Srims.common.SubjectFirstLevelXmlReader(), load_url, params);
    }
});
