
if (!Srims.projects) 
    Ext.namespace('Srims.projects');

Srims.projects.ProjectStore = Ext.extend(Srims.data.XmlStore, {
    constructor: function(load_url, params){
        Srims.projects.ProjectStore.superclass.constructor.call(this, new Srims.projects.ProjectXmlReader(), load_url, params);
    },
});

Srims.projects.ProjectSimpleStore = Ext.extend(Srims.data.XmlStore, {
    constructor: function(load_url, params){
        Srims.projects.ProjectSimpleStore.superclass.constructor.call(this, new Srims.projects.ProjectSimpleXmlReader(), load_url, params);
    }
});
