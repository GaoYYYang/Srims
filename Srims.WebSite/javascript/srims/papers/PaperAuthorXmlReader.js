
if (!Srims.papers) 
    Ext.namespace('Srims.papers');

Srims.papers.PaperAuthorXmlReader = Ext.extend(Srims.data.XmlReader, {
    constructor: function(){
        Srims.papers.PaperAuthorXmlReader.superclass.constructor.call(this, Srims.papers.PaperAuthor);
    }
});
