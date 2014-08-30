if (!Srims.common)
    Ext.namespace('Srims.common');

Srims.common.OutsourcingProvinceXmlReader = Ext.extend(Srims.data.XmlReader, {
    constructor: function() {
    Srims.common.OutsourcingProvinceXmlReader.superclass.constructor.call(
						this, Srims.common.OutsourcingProvinceCities);
    }
});