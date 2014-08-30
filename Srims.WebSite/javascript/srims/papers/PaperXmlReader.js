
if (!Srims.papers) 
    Ext.namespace('Srims.papers');

Srims.papers.PaperXmlReader = Ext.extend(Srims.data.XmlReader, {
    constructor: function(){
        Srims.papers.PaperXmlReader.superclass.constructor.call(this, Srims.papers.Paper);
    }
});
