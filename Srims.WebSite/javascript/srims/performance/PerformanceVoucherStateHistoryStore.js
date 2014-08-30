
if (!Srims.performance)
    Ext.namespace('Srims.performance');

Srims.performance.PerformanceVoucherStateHistoryStore = Ext.extend(Srims.data.XmlStore, {
    constructor: function(voucherId) {
        Srims.performance.PerformanceVoucherStateHistoryStore.superclass.constructor.call(this, new Srims.performance.PerformanceVoucherStateHistoryXmlReader(), Srims.service.performance.PerformanceVoucherStateHistoryService + '/GetVoucherStateHistories', {
            PerformanceVoucherID: voucherId
        });
    }
});