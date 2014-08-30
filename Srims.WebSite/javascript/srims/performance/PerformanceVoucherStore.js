
if (!Srims.performance)
    Ext.namespace("Srims.performance");

Srims.performance.PerformanceVoucherStore = Ext.extend(Srims.data.XmlStore, {
    constructor: function(load_url, params) {
    Srims.performance.PerformanceVoucherStore.superclass.constructor.call(this, new Srims.performance.PerformanceVoucherXmlReader(), load_url, params);
    }
});
