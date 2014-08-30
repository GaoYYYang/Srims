/**
 * @author dulintao
 */
if (!Srims.common)
	Ext.namespace('Srims.common');

Srims.common.OutsourcingUnitStore = Ext.extend(Srims.data.XmlStore, {
			constructor : function(load_url, params) {
				Srims.common.OutsourcingUnitStore.superclass.constructor.call(this,
						new Srims.common.OutsourcingUnitXmlReader(), load_url,
						params);
			}
		});