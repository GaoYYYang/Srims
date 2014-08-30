/**
* @author dulintao
*/
if (!Srims.performance)
    Ext.namespace('Srims.performance');

Srims.performance.PerformanceXmlReader = Ext.extend(Srims.data.XmlReader, {
    constructor: function() {
        Srims.performance.PerformanceXmlReader.superclass.constructor.call(this, Srims.performance.Performance);
    },
    //carlsirce2013.4.1 加入绩效统计
    readRecords: function(responseXML) {
        var result = Srims.performance.PerformanceXmlReader.superclass.readRecords.call(this, responseXML);
        result.records.overheadExpensesInSum = parseInt(Ext.DomQuery.selectValue("OverheadExpensesInSum", responseXML), 10);
        result.records.overheadExpensesMiddleSum = parseInt(Ext.DomQuery.selectValue("OverheadExpensesMiddleSum", responseXML), 10);
        result.records.receivedPerformance = parseInt(Ext.DomQuery.selectValue("ReceivedPerformance", responseXML), 10);
        result.records.descendPerformance = parseInt(Ext.DomQuery.selectValue("DescendPerformance", responseXML), 10);
        return result;
    }
});
Srims.performance.PerformanceSimpleXmlReader = Ext.extend(Srims.data.XmlReader, {
    constructor: function() {
        Srims.performance.PerformanceSimpleXmlReader.superclass.constructor.call(this, Srims.performance.Performance);
    }
});

