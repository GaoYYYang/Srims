
if (!Srims.performance)
    Ext.namespace('Srims.performance');

Srims.performance.PerformanceAllocationXmlReader = Ext.extend(Srims.data.XmlReader, {
    constructor: function() {
        Srims.performance.PerformanceAllocationXmlReader.superclass.constructor.call(this, Srims.performance.PerformanceAllocation);
    },
    readRecords: function(responseXML) {
        var result = Srims.performance.PerformanceAllocationXmlReader.superclass.readRecords.call(this, responseXML);
        result.records.overheadExpensesExpertSum = parseInt(Ext.DomQuery.selectValue("OverheadExpensesExpertSum", responseXML), 10);
        return result;
    }
});

