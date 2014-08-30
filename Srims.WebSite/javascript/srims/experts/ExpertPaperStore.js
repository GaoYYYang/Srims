
if (!Srims.experts) 
    Ext.namespace('Srims.experts');

Srims.experts.ExpertPaperStore = Ext.extend(Srims.data.XmlStore, {
    constructor: function(load_url, params){
        Srims.experts.ExpertPaperStore.superclass.constructor.call(this, new Srims.experts.ExpertPaperXmlReader(), load_url, params);
    }
})
