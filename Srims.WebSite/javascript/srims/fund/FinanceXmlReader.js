
if (!Srims.fund) 
    Ext.namespace('Srims.fund');

Srims.fund.FinanceXmlReader = Ext.extend(Srims.data.XmlReader, {
    constructor: function(){
        Srims.fund.FinanceXmlReader.superclass.constructor.call(this, Srims.fund.Finance);
    },
    readRecords: function(responseXML){
        var result = Srims.fund.FinanceXmlReader.superclass.readRecords.call(this, responseXML);
        result.records.financeSum = parseInt(Ext.DomQuery.selectValue("FinanceSum", responseXML), 10);
        result.records.financeDescendSum = parseInt(Ext.DomQuery.selectValue("FinanceDescendSum", responseXML), 10);
        
        return result;    
    }
});
Srims.fund.FinanceSimpleXmlReader = Ext.extend(Srims.data.XmlReader, {
    constructor: function(){
        Srims.fund.FinanceSimpleXmlReader.superclass.constructor.call(this, Srims.fund.Finance);
    }
});
