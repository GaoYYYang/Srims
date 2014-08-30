
if (!Srims.type) 
    Ext.namespace('Srims.type');

Srims.type.ProjectSupportSubFieldStore = Ext.extend(Srims.data.XmlStore, {
    constructor: function(){
    
        var load_url = Srims.service.type.ProjectSupportSubFieldService + '/Query';
        Srims.type.ProjectSupportSubFieldStore.superclass.constructor.call(this, new Srims.type.ProjectSupportSubFieldXmlReader(), load_url);
    }
});
