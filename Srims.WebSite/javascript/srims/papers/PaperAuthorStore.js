
if (!Srims.papers) 
    Ext.namespace('Srims.papers');

Srims.papers.PaperAuthorStore = Ext.extend(Srims.data.XmlStore, {
    constructor: function(paperId){
        Srims.papers.PaperAuthorStore.superclass.constructor.call(this, new Srims.papers.PaperAuthorXmlReader(), Srims.service.papers.PaperAuthorService + '/GetByPaperID', {
            paperID: paperId
        });
    }
});
