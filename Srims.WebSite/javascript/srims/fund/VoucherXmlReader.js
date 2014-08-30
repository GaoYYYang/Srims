
if (!Srims.fund) 
    Ext.namespace('Srims.fund');

Srims.fund.VoucherXmlReader = Ext.extend(Srims.data.XmlReader, {
    constructor: function(){
        Srims.fund.VoucherXmlReader.superclass.constructor.call(this, Srims.fund.Voucher);
    }
});
