
if (!Srims.common) 
    Ext.namespace('Srims.common');

Srims.common.ViewXmlReader = Ext.extend(Srims.data.XmlReader, {
    constructor: function(){
        Srims.common.ViewXmlReader.superclass.constructor.call(this, Srims.common.View);
    }
});
