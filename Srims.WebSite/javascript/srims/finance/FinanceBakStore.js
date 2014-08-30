
if (!Srims.finance) 
    Ext.namespace('Srims.finance');

Srims.finance.FinanceBakStore = Ext.extend(Srims.data.XmlStore, {
    constructor: function(load_url, params){
        Srims.finance.FinanceBakStore.superclass.constructor.call(this, new Srims.finance.FinanceBakXmlReader(), load_url, params);
    }
});
