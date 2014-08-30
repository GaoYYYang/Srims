
if (!Srims.stamp) 
    Ext.namespace('Srims.stamp');

Srims.stamp.StampStateHistoryStore = Ext.extend(Srims.data.XmlStore, {
    constructor: function(stampApplicationId){
        Srims.stamp.StampStateHistoryStore.superclass.constructor.call(this, new Srims.stamp.StampStateHistoryXmlReader(), Srims.service.stamp.StampStateHistoryService + '/GetByStampID', {
            stampApplicationID: stampApplicationId
        });
    }
});
