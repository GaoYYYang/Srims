
if (!Srims.stamp) 
    Ext.namespace('Srims.stamp');

Srims.stamp.StampStateHistoryXmlReader = Ext.extend(Srims.data.XmlReader, {
    constructor: function(){
        Srims.stamp.StampStateHistoryXmlReader.superclass.constructor.call(this, Srims.stamp.StampStateHistory);
    }
});
