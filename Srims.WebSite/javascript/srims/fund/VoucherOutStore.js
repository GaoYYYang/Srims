
if (!Srims.fund) 
    Ext.namespace("Srims.fund");

Srims.fund.VoucherOutStore = Ext.extend(Srims.data.XmlStore, {
    constructor: function(voucherId){
        Srims.fund.VoucherOutStore.superclass.constructor.call(this, new Srims.fund.VoucherOutXmlReader(), Srims.service.fund.VoucherOutService + '/GetByVoucherID', {
            voucherID: voucherId
        });
    }
});
