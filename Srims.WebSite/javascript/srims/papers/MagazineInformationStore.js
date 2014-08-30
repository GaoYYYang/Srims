
if (!Srims.papers) 
    Ext.namespace('Srims.papers');

Srims.papers.MagazineInformationStore = Ext.extend(Srims.data.XmlStore, {
    constructor: function(magazineID){
        Srims.papers.MagazineStore.superclass.constructor.call(this, new Srims.papers.MagazineInformationXmlReader(), Srims.service.papers.MagazineInformationService + '/GetByMagazineID', {
            magazineId: magazineID
        });
    }
});
