
if (!Srims.stamp)
    Ext.namespace('Srims.stamp');

Srims.stamp.StampApplicationTypeGroupXmlReader = Ext.extend(Srims.data.XmlReader, {
    constructor: function() {
        Srims.stamp.StampApplicationTypeGroupXmlReader.superclass.constructor.call(this, Srims.stamp.StampApplicationTypeGroup);
    }
});
