
if (!Srims.common) 
    Ext.namespace('Srims.common');
	
	Srims.common.SystemSettingXmlReader = Ext.extend(Srims. data.XmlReader,{
		constructor: function(){
			Srims.common.SystemSettingXmlReader.superclass.constructor.call(this,Srims.common.SystemSetting);
		}
	});