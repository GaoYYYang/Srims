
if (!Srims.users) 
    Ext.namespace('Srims.users');

Srims.users.UserTemporaryPermissionStore = Ext.extend(Srims.data.XmlStore, {
    constructor: function(load_url, params){
        Srims.users.UserTemporaryPermissionStore.superclass.constructor.call(this, new Srims.users.UserTemporaryPermissionXmlReader(), load_url, params);
    }
});
