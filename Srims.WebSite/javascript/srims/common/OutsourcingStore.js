/**
 * @author dulintao
 */
if (!Srims.common)
	Ext.namespace('Srims.common');

Srims.common.OutsourcingStore = Ext.extend(Srims.data.XmlStore, {
			constructor : function(load_url, params) {
				Srims.common.OutsourcingStore.superclass.constructor.call(this,
						new Srims.common.OutsourcingXmlReader(), load_url,
						params);
			}
		});