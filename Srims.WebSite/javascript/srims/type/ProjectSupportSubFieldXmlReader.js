
if (!Srims.type) 
    Ext.namespace('Srims.type');

Srims.type.ProjectSupportSubFieldXmlReader = Ext.extend(Srims.data.XmlReader, {
    constructor: function(){
        Srims.type.ProjectSupportSubFieldXmlReader.superclass.constructor.call(this, Srims.type.ProjectSupportSubField);
    }
});
