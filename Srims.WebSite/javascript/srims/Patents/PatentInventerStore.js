if (!Srims.patents)
    Ext.namespace("Srims.patents");

Srims.patents.PatentInventerStore = Ext.extend(Srims.data.XmlStore, {
    constructor: function(patentId) {
        Srims.patents.PatentInventerStore.superclass.constructor.call(this, new Srims.patents.PatentInventerXmlReader(), Srims.service.patents.PatentInventerService + '/GetByPatentID', {
            patentId: patentId
        });
    }
});







