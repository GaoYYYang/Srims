
if (!Srims.fund) 
    Ext.namespace('Srims.fund');

Srims.fund.FinanceFundDescendXmlReader = Ext.extend(Srims.data.XmlReader, {
    constructor: function(){
        Srims.fund.FinanceFundDescendXmlReader.superclass.constructor.call(this, Srims.fund.FinanceFundDescend);
    }
});
