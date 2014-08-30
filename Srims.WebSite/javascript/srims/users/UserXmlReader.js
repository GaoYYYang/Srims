
if (!Srims.users) 
    Ext.namespace('Srims.users');

Srims.users.UserXmlReader = Ext.extend(Srims.data.XmlReader, {
    constructor: function(){
        Srims.users.UserXmlReader.superclass.constructor.call(this, Srims.users.User);
    }
});
