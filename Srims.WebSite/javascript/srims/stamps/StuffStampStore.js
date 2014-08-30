
if (!Srims.stamp) 
    Ext.namespace('Srims.stamp');

Srims.stamp.StuffStampStore = Ext.extend(Srims.data.XmlStore, {
    constructor: function(stuffId){
        Srims.stamp.StuffStampStore.superclass.constructor.call(this, new Srims.stamp.StuffStampXmlReader(), Srims.service.stamp.StuffStampService + '/GetByStampStuffID', {
            stuffID: stuffId
        });
    }
});
