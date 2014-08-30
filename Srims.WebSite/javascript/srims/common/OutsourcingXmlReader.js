/**
 * @author dulintao
 */
if (!Srims.common)
	Ext.namespace('Srims.common');

Srims.common.OutsourcingXmlReader = Ext.extend(Srims.data.XmlReader, {
			constructor : function() {
				Srims.common.OutsourcingXmlReader.superclass.constructor.call(
						this, Srims.common.Outsourcing);
			}
		});