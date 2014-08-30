
if (!Srims.fund) 
    Ext.namespace('Srims.fund');

Srims.fund.VoucherOutXmlReader = Ext.extend(Srims.data.XmlReader, {
    constructor: function(){
        Srims.fund.VoucherOutXmlReader.superclass.constructor.call(this, Srims.fund.VoucherOut);
    }
});
