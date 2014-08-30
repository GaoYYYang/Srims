
/**
* @author gy
*/
if (!Srims.common)
    Ext.namespace('Srims.common');

Srims.common.OutsourcingAllocationStore = Ext.extend(Srims.data.XmlStore, {
    constructor: function(load_url, params) {
        Srims.common.OutsourcingAllocationStore.superclass.constructor.call(this,
						new Srims.common.OutsourcingAllocationXmlReader(), load_url,
						params);
    }
});