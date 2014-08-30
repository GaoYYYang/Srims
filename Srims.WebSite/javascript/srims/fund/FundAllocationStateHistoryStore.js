
if (!Srims.fund) 
    Ext.namespace('Srims.fund');

Srims.fund.FundAllocationStateHistoryStore = Ext.extend(Srims.data.XmlStore, {
    constructor: function(load_url, params){
        Srims.fund.FundAllocationStateHistoryStore.superclass.constructor.call(this, new Srims.fund.FundAllocationStateHistoryXmlReader(), load_url, params);
    }
});


