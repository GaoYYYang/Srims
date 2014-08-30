
if (!Srims.fund) 
    Ext.namespace('Srims.fund');

Srims.fund.VoucherStateHistoryStore = Ext.extend(Srims.data.XmlStore, {
    constructor: function(voucherId){
        Srims.fund.VoucherStateHistoryStore.superclass.constructor.call(this, new Srims.fund.VoucherStateHistoryXmlReader(),  Srims.service.fund.VoucherStateHistoryService + '/GetVoucherStateHistories', {
            voucherID: voucherId
        });
    }
});