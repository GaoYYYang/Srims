
if (!Srims.common) 
    Ext.namespace('Srims.common');

Srims.common.AnnouncementStore = Ext.extend(Srims.data.XmlStore, {
    constructor: function(load_url, params){
        Srims.common.AnnouncementStore.superclass.constructor.call(this, new Srims.common.AnnouncementXmlReader(), load_url, params);
    }
});
