
if (!Srims.fund) 
    Ext.namespace("Srims.fund");

Srims.fund.VoucherStore = Ext.extend(Srims.data.XmlStore, {
    constructor: function(load_url, params){
        Srims.fund.VoucherStore.superclass.constructor.call(this, new Srims.fund.VoucherXmlReader(), load_url, params);
    }
});
