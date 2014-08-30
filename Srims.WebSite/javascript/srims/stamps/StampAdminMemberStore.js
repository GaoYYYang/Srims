
if (!Srims.stamp)
    Ext.namespace('Srims.stamp');

Srims.stamp.StampAdminMemberStore = Ext.extend(Srims.data.XmlStore, {
    constructor: function(stampApplicationType, sign) {
        if (sign) {
            var load_url = Srims.service.stamp.StampFirstAdminService + '/Query';
        }
        else {
            var load_url = Srims.service.stamp.StampSecondAdminService + '/Query';
        }
        var params = {};
   
        if (stampApplicationType.get('id') != undefined) {
            params["stampApplicationTypeID"] = stampApplicationType.get('id');
        }
        Srims.stamp.StampAdminMemberStore.superclass.constructor.call(this, new Srims.stamp.StampAdminMemberXmlReader(), load_url, params);
    }
});
