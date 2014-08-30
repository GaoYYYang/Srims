
if (!Srims.stamp) 
    Ext.namespace('Srims.stamp');

Srims.stamp.StampApplicationXmlReader = Ext.extend(Srims.data.XmlReader, {
    constructor: function(){
        Srims.stamp.StampApplicationXmlReader.superclass.constructor.call(this, Srims.stamp.StampApplication);
    }
});
