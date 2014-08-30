
if (!Srims.stamp)
    Ext.namespace('Srims.stamp');

Srims.stamp.StampApplicationTypeGroupStore = Ext.extend(Srims.data.XmlStore, {
    constructor: function(load_url, params) {
        Srims.stamp.StampApplicationTypeGroupStore.superclass.constructor.call(this, new Srims.stamp.StampApplicationTypeGroupXmlReader(), load_url, params);
    }
});
