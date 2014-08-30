
if (!Srims.type) 
    Ext.namespace('Srims.type');

Srims.type.ProjectSupportCategoryStore = Ext.extend(Srims.data.XmlStore, {
    constructor: function(){
    
        var load_url = Srims.service.type.ProjectSupportCategoryService + '/Query';
        Srims.type.ProjectSupportCategoryStore.superclass.constructor.call(this, new Srims.type.ProjectSupportCategoryXmlReader(), load_url);
    }
});
