
if (!Srims.stamp)
    Ext.namespace('Srims.stamp');

Srims.stamp.StampApplicationTypeXmlReader = Ext.extend(Srims.data.XmlReader, {
    constructor: function() {
        Srims.stamp.StampApplicationTypeXmlReader.superclass.constructor.call(this, Srims.stamp.StampApplicationType);
    }
});
