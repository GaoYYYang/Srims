
if (!Srims.experts) 
    Ext.namespace('Srims.experts');

Srims.experts.ExpertStore = Ext.extend(Srims.data.XmlStore, {
    constructor: function(load_url, params){
        Srims.experts.ExpertStore.superclass.constructor.call(this, new Srims.experts.ExpertXmlReader(), load_url, params);
    }
});
