
if (!Srims.stamp)
    Ext.namespace('Srims.stamp');

Srims.stamp.StampApplicationTypeStoreForGroup = Ext.extend(Srims.data.XmlStore, {
    constructor: function(load_url, params) {
        var load_url = Srims.service.stamp.StampApplicationTypeService + '/Query';
        Srims.stamp.StampApplicationTypeStoreForGroup.superclass.constructor.call(this, new Srims.stamp.StampApplicationTypeXmlReader(), load_url, params);
    }
});
