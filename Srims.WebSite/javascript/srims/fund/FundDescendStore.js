
if (!Srims.fund) 
    Ext.namespace('Srims.fund');

Srims.fund.FundDescendStore = Ext.extend(Srims.data.XmlStore, {
    constructor: function(load_url, params){
        Srims.fund.FundDescendStore.superclass.constructor.call(this, new Srims.fund.FundDescendXmlReader(), load_url, params);
    }
});
