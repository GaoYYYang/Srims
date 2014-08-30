
if (!Srims.stamp)
    Ext.namespace('Srims.stamp');

Srims.stamp.StampApplicationTypeStore = Ext.extend(Srims.data.XmlStore, {
    constructor: function(load_url, params) {
        Srims.stamp.StampApplicationTypeStore.superclass.constructor.call(this, new Srims.stamp.StampApplicationTypeXmlReader(), load_url, params);
    }
});
