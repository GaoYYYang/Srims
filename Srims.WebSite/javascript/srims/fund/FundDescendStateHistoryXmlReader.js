
if (!Srims.fund) 
    Ext.namespace('Srims.fund');

Srims.fund.FundDescendStateHistoryXmlReader = Ext.extend(Srims.data.XmlReader, {
    constructor: function(){
        Srims.fund.FundDescendStateHistoryXmlReader.superclass.constructor.call(this, Srims.fund.FundDescendStateHistory);
    }
});

