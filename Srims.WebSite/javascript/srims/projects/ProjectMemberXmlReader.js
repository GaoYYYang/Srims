
if (!Srims.projects) 
    Ext.namespace('Srims.projects');

Srims.projects.ProjectMemberXmlReader = Ext.extend(Srims.data.XmlReader, {
    constructor: function(){
        Srims.projects.ProjectMemberXmlReader.superclass.constructor.call(this, Srims.projects.ProjectMember);
    }
});

