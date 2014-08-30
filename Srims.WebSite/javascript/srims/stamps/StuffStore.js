if (!Srims.stamp) 
    Ext.namespace('Srims.stamp');

Srims.stamp.StuffStore = Ext.extend(Srims.data.XmlStore, {
    constructor: function(stampApplicationId){
        Srims.stamp.StuffStore.superclass.constructor.call(this, new Srims.stamp.StuffXmlReader(), Srims.service.stamp.StuffService + '/GetByStampID', {
            stampApplicationID: stampApplicationId
        });
    }
});