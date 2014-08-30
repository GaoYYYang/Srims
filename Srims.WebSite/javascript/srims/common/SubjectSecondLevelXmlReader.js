if (!Srims.common)
    Ext.namespace('Srims.common');


Srims.common.SubjectSecondLevelXmlReader = Ext.extend(Srims.data.XmlReader, {
    constructor: function() {
        Srims.common.SubjectSecondLevelXmlReader.superclass.constructor.call(this, Srims.common.SubjectSecondLevel);
    }
});
