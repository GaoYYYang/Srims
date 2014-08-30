
if (!Srims.stamp) 
    Ext.namespace('Srims.stamp');

Srims.stamp.StampApplicationStore = Ext.extend(Srims.data.XmlStore, {
    constructor: function(load_url, params){
        Srims.stamp.StampApplicationStore.superclass.constructor.call(this, new Srims.stamp.StampApplicationXmlReader(), load_url, params);
    }
});
