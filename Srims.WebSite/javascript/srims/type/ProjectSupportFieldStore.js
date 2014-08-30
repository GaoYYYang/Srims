
if (!Srims.type) 
    Ext.namespace('Srims.type');

Srims.type.ProjectSupportFieldStore = Ext.extend(Srims.data.XmlStore, {
    constructor: function(){
    
        var load_url = Srims.service.type.ProjectSupportFieldService + '/Query';
        Srims.type.ProjectSupportFieldStore.superclass.constructor.call(this, new Srims.type.ProjectSupportFieldXmlReader(), load_url);
    }
});
