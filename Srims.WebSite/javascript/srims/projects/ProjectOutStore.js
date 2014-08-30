if (!Srims.projects)
    Ext.namespace("Srims.projects");

Srims.projects.ProjectOutStore = Ext.extend(Srims.data.XmlStore, {
    constructor: function(load_url, params) {
    Srims.projects.ProjectOutStore.superclass.constructor.call(this, new Srims.projects.ProjectOutXmlReader(), load_url, params);
    }
});
