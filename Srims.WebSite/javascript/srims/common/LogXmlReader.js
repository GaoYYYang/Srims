
if (!Srims.common) 
    Ext.namespace('Srims.common');

Srims.common.LogXmlReader = Ext.extend(Srims.data.XmlReader, {
    constructor: function(){
        Srims.common.LogXmlReader.superclass.constructor.call(this, Srims.common.Log);
    }
});
