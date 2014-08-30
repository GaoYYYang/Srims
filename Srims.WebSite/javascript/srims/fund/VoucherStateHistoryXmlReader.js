
if (!Srims.fund) 
    Ext.namespace('Srims.fund');

Srims.fund.VoucherStateHistoryXmlReader = Ext.extend(Srims.data.XmlReader, {
    constructor: function(){
        Srims.fund.VoucherStateHistoryXmlReader.superclass.constructor.call(this, Srims.fund.VoucherStateHistory);
    }
});
