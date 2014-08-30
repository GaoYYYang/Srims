
if (!Srims.papers) 
    Ext.namespace('Srims.papers');

Srims.papers.LiberalArtsPaperAuthorStore = Ext.extend(Srims.data.XmlStore, {
    constructor: function(paperId){
    Srims.papers.LiberalArtsPaperAuthorStore.superclass.constructor.call(this, new Srims.papers.LiberalArtsPaperAuthorXmlReader(), Srims.service.papers.LiberalArtsPaperAuthorService + '/GetByPaperID', {
            paperID: paperId
        });
    }
});
