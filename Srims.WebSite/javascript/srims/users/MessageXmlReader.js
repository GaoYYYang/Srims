
if (!Srims.users) 
    Ext.namespace('Srims.users');

Srims.users.MessageXmlReader = Ext.extend(Srims.data.XmlReader, {
    constructor: function(){
        Srims.users.MessageXmlReader.superclass.constructor.call(this, Srims.users.Message);
    }
});
