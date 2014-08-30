
if (!Srims.papers) 
    Ext.namespace('Srims.papers');

Srims.papers.PaperStore = Ext.extend(Srims.data.XmlStore, {
    constructor: function(load_url, params){
        Srims.papers.PaperStore.superclass.constructor.call(this, new Srims.papers.PaperXmlReader(), load_url, params);
    }
});
