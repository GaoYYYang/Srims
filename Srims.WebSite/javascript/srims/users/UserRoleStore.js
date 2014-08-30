 
if (!Srims.users) 
    Ext.namespace('Srims.users');

Srims.users.UserRoleStore = Ext.extend(Srims.data.XmlStore, {
    constructor: function(load_url, params){
        Srims.users.UserRoleStore.superclass.constructor.call(this, new Srims.users.UserRoleXmlReader(), load_url, params);
    }
});
