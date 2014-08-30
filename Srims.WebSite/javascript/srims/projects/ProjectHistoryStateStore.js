
if (!Srims.projects) 
    Ext.namespace('Srims.projects');

Srims.projects.ProjectHistoryStateStore = Ext.extend(Srims.data.XmlStore, {
    constructor: function(project){
    
        var load_url = Srims.service.projects.StateHistoryService + '/GetByProjectID';
        var params = {};
        if (project.get('id') != undefined) {
            params["projectId"] = project.isNew() ? 0 : project.get('id')
        }
        Srims.projects.ProjectHistoryStateStore.superclass.constructor.call(this, new Srims.projects.ProjectHistoryStateXmLReader(), load_url, params);
    }
});
