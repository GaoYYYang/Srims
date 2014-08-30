if (!Srims.papers) 
    Ext.namespace('Srims.papers');

Srims.papers.MagazineOccupationXmlReader = Ext.extend(Srims.data.XmlReader, {
    constructor: function(){
        Srims.papers.MagazineOccupationXmlReader.superclass.constructor.call(this, Srims.papers.MagazineOccupation);
    }
});