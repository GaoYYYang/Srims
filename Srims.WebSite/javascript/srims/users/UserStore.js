
if (!Srims.users) 
    Ext.namespace('Srims.users');

Srims.users.UserStore = Ext.extend(Srims.data.XmlStore, {
    constructor: function(load_url, params){
        Srims.users.UserStore.superclass.constructor.call(this, new Srims.users.UserXmlReader(), load_url, params);
    }
});
