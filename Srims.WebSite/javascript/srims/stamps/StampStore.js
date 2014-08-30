
if (!Srims.stamp) 
    Ext.namespace('Srims.stamp');

Srims.stamp.StampStore = Ext.extend(Srims.data.XmlStore, {
    constructor: function(params, url){
        Srims.stamp.StampStore.superclass.constructor.call(this, new Srims.stamp.StampXmlReader(), url, params);
    }
});
