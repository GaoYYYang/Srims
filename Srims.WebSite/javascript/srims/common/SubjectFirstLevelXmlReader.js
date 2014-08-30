if (!Srims.common)
    Ext.namespace('Srims.common');

Srims.common.SubjectFirstLevelXmlReader = Ext.extend(Srims.data.XmlReader, {
    constructor: function() {
        Srims.common.SubjectFirstLevelXmlReader.superclass.constructor.call(this, Srims.common.SubjectFirstLevel);
    }
});
