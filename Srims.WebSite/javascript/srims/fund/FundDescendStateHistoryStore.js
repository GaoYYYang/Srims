
if (!Srims.fund) 
    Ext.namespace('Srims.fund');

Srims.fund.FundDescendStateHistoryStore = Ext.extend(Srims.data.XmlStore, {
    constructor: function(load_url, params){
        Srims.fund.FundDescendStateHistoryStore.superclass.constructor.call(this, new Srims.fund.FundDescendStateHistoryXmlReader(), load_url, params);
    }
});


