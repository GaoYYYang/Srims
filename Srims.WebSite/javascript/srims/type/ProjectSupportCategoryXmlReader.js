
if (!Srims.type) 
    Ext.namespace('Srims.type');

Srims.type.ProjectSupportCategoryXmlReader = Ext.extend(Srims.data.XmlReader, {
    constructor: function(){
        Srims.type.ProjectSupportCategoryXmlReader.superclass.constructor.call(this, Srims.type.ProjectSupportCategory);
    }
});
