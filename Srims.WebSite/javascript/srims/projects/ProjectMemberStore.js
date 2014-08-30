
if (!Srims.projects) 
    Ext.namespace('Srims.projects');

Srims.projects.ProjectMemberStore = Ext.extend(Srims.data.XmlStore, {
    constructor: function(project){
        var load_url = Srims.service.projects.ProjectMemberService + '/GetByProjectID';
        var params = {};
        if (project.get('id') != undefined) {
            params["projectId"] = project.get('id');
        }
        Srims.projects.ProjectMemberStore.superclass.constructor.call(this, new Srims.projects.ProjectMemberXmlReader(), load_url, params);
    }
});
