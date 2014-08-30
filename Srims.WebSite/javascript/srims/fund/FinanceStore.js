
if (!Srims.fund) 
    Ext.namespace('Srims.fund');

Srims.fund.FinanceStore = Ext.extend(Srims.data.XmlStore, {
    constructor: function(load_url, params){
        Srims.fund.FinanceStore.superclass.constructor.call(this, new Srims.fund.FinanceXmlReader(), load_url, params);
    }
});
Srims.fund.FinanceSimpleStore = Ext.extend(Srims.data.XmlStore, {
    constructor: function(load_url, params){
        Srims.fund.FinanceStore.superclass.constructor.call(this, new Srims.fund.FinanceSimpleXmlReader(), load_url, params);
    }
});
