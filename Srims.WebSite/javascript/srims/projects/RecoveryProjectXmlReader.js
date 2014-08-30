
if (!Srims.projects)
    Ext.namespace('Srims.projects');

Srims.projects.RecoveryProjectXmlReader = Ext.extend(Srims.data.XmlReader, {
    constructor: function() {
        Srims.projects.RecoveryProjectXmlReader.superclass.constructor.call(this, Srims.projects.Recovery);
    },
    readRecords: function(responseXML) {
        var result = Srims.projects.RecoveryProjectXmlReader.superclass.readRecords.call(this, responseXML);
        result.records.PerformanceSum = parseInt(Ext.DomQuery.selectValue("PerformanceSum", responseXML), 10);
        result.records.OverheadExpensesSum = parseInt(Ext.DomQuery.selectValue("OverheadExpensesSum", responseXML), 10);
        result.records.OverheadExpensesMiddleSum = parseInt(Ext.DomQuery.selectValue("OverheadExpensesMiddleSum", responseXML), 10);
        return result;
    }
});
Srims.projects.RecoveryProjectSimpleXmlReader = Ext.extend(Srims.data.XmlReader, {
    constructor: function() {
        Srims.projects.RecoveryProjectXmlReader.superclass.constructor.call(this, Srims.projects.Recovery);
    }
});