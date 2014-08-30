/**
* @author dulintao
*/
if (!Srims.common)
    Ext.namespace('Srims.common');

Srims.common.OutsourcingProvinceStore = Ext.extend(Srims.data.XmlStore, {
    constructor: function(load_url, params) {
    Srims.common.OutsourcingProvinceStore.superclass.constructor.call(this,
						new Srims.common.OutsourcingProvinceXmlReader(), load_url,
						params);
    }
});