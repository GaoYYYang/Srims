/**
* @author dulintao
*/
if (!Srims.common)
    Ext.namespace('Srims.common');

Srims.common.OutsourcingUnitXmlReader = Ext.extend(Srims.data.XmlReader, {
    constructor: function() {
        Srims.common.OutsourcingUnitXmlReader.superclass.constructor.call(
						this, Srims.common.OutsourcingUnit);
    }
});