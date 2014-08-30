/**
* @author dulintao
*/
if (!Srims.performance)
    Ext.namespace('Srims.performance');

Srims.performance.PerformanceStore = Ext.extend(Srims.data.XmlStore, {
    constructor: function(load_url, params) {
        Srims.performance.PerformanceStore.superclass.constructor.call(this, new Srims.performance.PerformanceXmlReader(), load_url, params);
    }
});

Srims.performance.PerformanceSimpleStore = Ext.extend(Srims.data.XmlStore, {
    constructor: function(load_url, params) {
        Srims.performance.PerformanceSimpleStore.superclass.constructor.call(this, new Srims.performance.PerformanceSimpleXmlReader(), load_url, params);
    }
});
