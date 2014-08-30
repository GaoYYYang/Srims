
if (!Srims.experts) 
    Ext.namespace('Srims.experts');

Srims.experts.ExpertAwardStore = Ext.extend(Srims.data.XmlStore, {
    constructor: function(load_url, params){
        Srims.experts.ExpertAwardStore.superclass.constructor.call(this, new Srims.experts.ExpertAwardXmlReader(), load_url, params);
    }
})
