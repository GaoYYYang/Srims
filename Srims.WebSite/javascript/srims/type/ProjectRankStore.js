
if (!Srims.type) 
    Ext.namespace('Srims.type');

Srims.type.ProjectRankStore = Ext.extend(Srims.data.XmlStore, {
    constructor: function(load_url){
        Srims.type.ProjectRankStore.superclass.constructor.call(this, new Srims.type.ProjectRankXmlReader(), load_url);
    }
});
