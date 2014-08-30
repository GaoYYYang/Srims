// XmlReader
if (!Srims.type)
	Ext.namespace('Srims.type');

Srims.type.ManagementFeesXmlReader = Ext.extend(Srims.data.XmlReader, {
			constructor : function() {
				Srims.type.ManagementFeesXmlReader.superclass.constructor.call(
						this, Srims.type.ManagementFees);
			}
		});

Srims.type.GetManagementFeesXmlReader = Ext.extend(Srims.data.XmlReader, {
			constructor : function() {
				Srims.type.GetManagementFeesXmlReader.superclass.constructor
						.call(this, Srims.type.GetAllManagementFees)
			}
		});