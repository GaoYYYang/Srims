
if (!Srims.users) 
    Ext.namespace('Srims.users');

Srims.users.UserTemporaryPermissionXmlReader = Ext.extend(Srims.data.XmlReader, {
    constructor: function(){
        Srims.users.UserTemporaryPermissionXmlReader.superclass.constructor.call(this, Srims.users.UserTemporaryPermission);
    }
});
