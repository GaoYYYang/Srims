
if (!Srims.papers) 
    Ext.namespace('Srims.papers');

Srims.papers.LiberalArtsPaperAuthorXmlReader = Ext.extend(Srims.data.XmlReader, {
    constructor: function(){
    Srims.papers.LiberalArtsPaperAuthorXmlReader.superclass.constructor.call(this, Srims.papers.LiberalArtsPaperAuthor);
    }
});
