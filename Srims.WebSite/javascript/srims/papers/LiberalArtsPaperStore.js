if (!Srims.papers)
    Ext.namespace('Srims.papers');

Srims.papers.LiberalArtsPaperStore = Ext.extend(Srims.data.XmlStore, {
    constructor: function(load_url, params) {
    Srims.papers.LiberalArtsPaperStore.superclass.constructor.call(this, new Srims.papers.LiberalArtsPaperXmlReader(), load_url, params);
    }
});
