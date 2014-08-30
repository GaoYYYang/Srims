
if (!Srims.fund) 
    Ext.namespace('Srims.fund');

Srims.fund.FundAllocationStore = Ext.extend(Srims.data.XmlStore, {
    constructor: function(load_url, params){
        Srims.fund.FundAllocationStore.superclass.constructor.call(this, new Srims.fund.FundAllocationXmlReader(), load_url, params);
    }
});


