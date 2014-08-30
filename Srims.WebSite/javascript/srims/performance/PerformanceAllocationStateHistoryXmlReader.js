
if (!Srims.performance)
    Ext.namespace('Srims.performance');

Srims.performance.PerformanceAllocationStateHistoryXmlReader = Ext.extend(Srims.data.XmlReader, {
    constructor: function() {
        Srims.performance.PerformanceAllocationStateHistoryXmlReader.superclass.constructor.call(this, Srims.performance.PerformanceAllocationStateHistory);
    }
});

