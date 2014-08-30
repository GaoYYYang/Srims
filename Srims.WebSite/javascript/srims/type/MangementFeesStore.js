if (!Srims.type)
	Ext.namespace('Srims.type');

Srims.type.ManagementFeesStore = Ext.extend(Srims.data.XmlStore, {
			constructor : function(load_url, params) {
				Srims.type.ManagementFeesStore.superclass.constructor.call(
						this, new Srims.type.ManagementFeesXmlReader(),
						load_url, params);
			}
		});

Srims.type.GetManagementFeesStore = Ext.extend(Srims.data.XmlStore, {
			constructor : function(load_url) {
				Srims.type.GetManagementFeesStore.superclass.constructor.call(
						this, new Srims.type.GetManagementFeesXmlReader(),
						load_url)
			}
		});