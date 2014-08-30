
if (!Srims.experts) 
    Ext.namespace('Srims.experts');

Srims.experts.ExpertPatentStore = Ext.extend(Srims.data.XmlStore, {
    constructor: function(load_url, params){
        Srims.experts.ExpertPatentStore.superclass.constructor.call(this, new Srims.experts.ExpertPatentXmlReader(), load_url, params);
    }
});


