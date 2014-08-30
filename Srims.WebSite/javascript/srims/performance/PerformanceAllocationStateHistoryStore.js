
if (!Srims.performance)
    Ext.namespace('Srims.performance');

Srims.performance.PerformanceAllocationStateHistoryStore = Ext.extend(Srims.data.XmlStore, {
    constructor: function(load_url, params) {
        Srims.performance.PerformanceAllocationStateHistoryStore.superclass.constructor.call(this, new Srims.performance.PerformanceAllocationStateHistoryXmlReader(), load_url, params);
    }
});


