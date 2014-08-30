
if (!Srims.stamp) 
    Ext.namespace('Srims.stamp');

Srims.stamp.StuffXmlReader = Ext.extend(Srims.data.XmlReader, {
    constructor: function(){
        Srims.stamp.StuffXmlReader.superclass.constructor.call(this, Srims.stamp.Stuff);
    }
});