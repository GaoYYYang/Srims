
if (!Srims.projects) 
    Ext.namespace('Srims.projects');

Srims.projects.ProjectHistoryStateXmLReader = Ext.extend(Srims.data.XmlReader, {
    constructor: function(){
        Srims.projects.ProjectHistoryStateXmLReader.superclass.constructor.call(this, Srims.projects.ProjectHistoryState);
    }
});
