
if (!Srims.fund) 
    Ext.namespace('Srims.fund');

Srims.fund.FinanceFundDescendStore = Ext.extend(Srims.data.XmlStore, {
    constructor: function(load_url, params){
        Srims.fund.FinanceFundDescendStore.superclass.constructor.call(this, new Srims.fund.FinanceFundDescendXmlReader(), load_url, params);
    }
});
