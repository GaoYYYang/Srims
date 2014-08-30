if (!Srims.papers) 
    Ext.namespace('Srims.papers');

Srims.papers.MagazineOccupationStore = Ext.extend(Srims.data.XmlStore, {
    constructor: function(url,magazineId){
        Srims.papers.MagazineOccupationStore.superclass.constructor.call(this, new Srims.papers.MagazineOccupationXmlReader(),url, {
            magazineID: magazineId
        });
    }
});