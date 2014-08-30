
if (!Srims.stamp) 
    Ext.namespace('Srims.stamp');

Srims.stamp.StuffStampXmlReader = Ext.extend(Srims.data.XmlReader, {
    constructor: function(){
        Srims.stamp.StuffStampXmlReader.superclass.constructor.call(this, Srims.stamp.StuffStamp);
    }
});
