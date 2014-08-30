
if (!Srims.fund) 
    Ext.namespace('Srims.fund');

Srims.fund.FundDescendXmlReader = Ext.extend(Srims.data.XmlReader, {
    constructor: function(){
        Srims.fund.FundDescendXmlReader.superclass.constructor.call(this, Srims.fund.FundDescend);
    }
});
