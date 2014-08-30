
if (!Srims.performance)
    Ext.namespace('Srims.performance');

Srims.performance.PerformanceAllocationStore = Ext.extend(Srims.data.XmlStore, {
    constructor: function(load_url, params) {
        Srims.performance.PerformanceAllocationStore.superclass.constructor.call(this, new Srims.performance.PerformanceAllocationXmlReader(), load_url, params);
    }
});


