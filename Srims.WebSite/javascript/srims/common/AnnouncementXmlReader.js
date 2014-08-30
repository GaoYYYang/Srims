
if (!Srims.common) 
    Ext.namespace('Srims.common');

Srims.common.AnnouncementXmlReader = Ext.extend(Srims.data.XmlReader, {
    constructor: function(){
        Srims.common.AnnouncementXmlReader.superclass.constructor.call(this, Srims.common.Announcement);
    }
});
