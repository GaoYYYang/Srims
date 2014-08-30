
if (!Srims.stamp)
    Ext.namespace('Srims.stamp');

Srims.stamp.StampAdminMemberXmlReader = Ext.extend(Srims.data.XmlReader, {
    constructor: function() {
        Srims.stamp.StampAdminMemberXmlReader.superclass.constructor.call(this, Srims.stamp.StampAdminMember);
    }
});

