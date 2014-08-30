
if (!Srims.users) 
    Ext.namespace('Srims.users');

Srims.users.UserRoleXmlReader = Ext.extend(Srims.data.XmlReader, {
    constructor: function(){
        Srims.users.UserRoleXmlReader.superclass.constructor.call(this, Srims.users.UserRole);
    }
});

