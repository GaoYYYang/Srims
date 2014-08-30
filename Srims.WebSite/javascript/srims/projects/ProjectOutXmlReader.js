if (!Srims.projects)
    Ext.namespace('Srims.projects');

Srims.projects.ProjectOutXmlReader = Ext.extend(Srims.data.XmlReader, {
    constructor: function() {
    Srims.projects.ProjectOutXmlReader.superclass.constructor.call(this, Srims.projects.ProjectOut);
    }
});
