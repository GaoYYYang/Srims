
if (!Srims.performance)
    Ext.namespace('Srims.performance');

Srims.performance.PerformanceVoucherXmlReader = Ext.extend(Srims.data.XmlReader, {
    constructor: function() {
        Srims.performance.PerformanceVoucherXmlReader.superclass.constructor.call(this, Srims.performance.PerformanceVoucher);
    },
    //carlsirce2013.12.23 加入绩效统计
    readRecords: function(responseXML) {
        var result = Srims.performance.PerformanceVoucherXmlReader.superclass.readRecords.call(this, responseXML);
        result.records.overheadExpensesExpertSum = parseInt(Ext.DomQuery.selectValue("OverheadExpensesExpertSum", responseXML), 10);
        result.records.performanceSum = parseInt(Ext.DomQuery.selectValue("PerformanceSum", responseXML), 10);
        result.records.overheadExpensesExpertSumRest = parseInt(Ext.DomQuery.selectValue("OverheadExpensesExpertSumRest", responseXML), 10);
        return result;
    }
});