
if (!Srims.performance)
    Ext.namespace('Srims.performance');

Srims.performance.PerformanceVoucherStateHistoryXmlReader = Ext.extend(Srims.data.XmlReader, {
    constructor: function() {
        Srims.performance.PerformanceVoucherStateHistoryXmlReader.superclass.constructor.call(this, Srims.performance.PerformanceVoucherStateHistory);
    }
});
