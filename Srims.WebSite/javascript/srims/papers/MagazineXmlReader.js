if (!Srims.papers) 
    Ext.namespace('Srims.papers');

Srims.papers.MagazineXmlReader = Ext.extend(Srims.data.XmlReader, {
    constructor: function(){
        Srims.papers.MagazineXmlReader.superclass.constructor.call(this, Srims.papers.Magazine);
    }
});
