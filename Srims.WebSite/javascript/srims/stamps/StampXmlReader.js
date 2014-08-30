
if (!Srims.stamp) 
    Ext.namespace('Srims.stamp');

Srims.stamp.StampXmlReader = Ext.extend(Srims.data.XmlReader, {
    constructor: function(){
        Srims.stamp.StampXmlReader.superclass.constructor.call(this, Srims.stamp.Stamp);
    }
});
