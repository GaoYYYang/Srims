
if (!Srims.papers)
    Ext.namespace('Srims.papers');

Srims.papers.LiberalArtsPaperXmlReader = Ext.extend(Srims.data.XmlReader, {
    constructor: function() {
    Srims.papers.LiberalArtsPaperXmlReader.superclass.constructor.call(this, Srims.papers.LiberalArtsPaper);
    }
});
