
if (!Srims.type) 
    Ext.namespace('Srims.type');

Srims.type.ProjectSupportFieldXmlReader = Ext.extend(Srims.data.XmlReader, {
    constructor: function(){
        Srims.type.ProjectSupportFieldXmlReader.superclass.constructor.call(this, Srims.type.ProjectSupportField);
    }
});
