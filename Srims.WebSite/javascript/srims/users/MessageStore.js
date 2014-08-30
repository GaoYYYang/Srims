
if (!Srims.users) 
    Ext.namespace('Srims.users');

Srims.users.MessageStore = Ext.extend(Srims.data.XmlStore, {
    constructor: function(load_url, params){
        Srims.users.MessageStore.superclass.constructor.call(this, new Srims.users.MessageXmlReader(), load_url, params);
    }
});