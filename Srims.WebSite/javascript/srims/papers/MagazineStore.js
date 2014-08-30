
if (!Srims.papers) 
    Ext.namespace('Srims.papers');

Srims.papers.MagazineStore = Ext.extend(Srims.data.XmlStore, {
    constructor: function(load_url, params){
        Srims.papers.MagazineStore.superclass.constructor.call(this, new Srims.papers.MagazineXmlReader(), load_url, params);
    }
});
