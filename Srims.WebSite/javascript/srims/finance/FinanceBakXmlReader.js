
if (!Srims.finance) 
    Ext.namespace("Srims.finance");

Srims.finance.FinanceBakXmlReader = Ext.extend(Srims.data.XmlReader, {
    constructor: function(){
        Srims.finance.FinanceBakXmlReader.superclass.constructor.call(this, Srims.finance.FinanceBak);
    }
});
