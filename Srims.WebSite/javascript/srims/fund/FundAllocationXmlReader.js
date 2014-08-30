
if (!Srims.fund) 
    Ext.namespace('Srims.fund');

Srims.fund.FundAllocationXmlReader = Ext.extend(Srims.data.XmlReader, {
    constructor: function(){
        Srims.fund.FundAllocationXmlReader.superclass.constructor.call(this, Srims.fund.FundAllocation);
    }
    
});

