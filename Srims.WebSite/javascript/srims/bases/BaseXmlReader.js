
if (!Srims.bases) 
    Ext.namespace('Srims.bases');

Srims.bases.BaseXmlReader = Ext.extend(Srims.data.XmlReader, {
    constructor: function(){
        Srims.bases.BaseXmlReader.superclass.constructor.call(this, Srims.bases.Base);
    }
});
