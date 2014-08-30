
if (!Srims.experts) 
    Ext.namespace('Srims.experts');

Srims.experts.ExpertLiberalArtsPaperStore = Ext.extend(Srims.data.XmlStore, {
    constructor: function(load_url, params){
    Srims.experts.ExpertLiberalArtsPaperStore.superclass.constructor.call(this, new Srims.experts.ExpertLiberalArtsPaperXmlReader(), load_url, params);
    }
})
