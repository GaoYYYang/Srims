
if (!Srims.fund) 
    Ext.namespace('Srims.fund');

Srims.fund.FundAllocationStateHistoryXmlReader = Ext.extend(Srims.data.XmlReader, {
    constructor: function(){
        Srims.fund.FundAllocationStateHistoryXmlReader.superclass.constructor.call(this, Srims.fund.FundAllocationStateHistory);
    }
});

