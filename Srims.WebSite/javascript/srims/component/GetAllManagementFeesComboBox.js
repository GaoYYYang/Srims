// 重定义新Combox组件,获取所有管理费收取类别
if (!Srims.component)
	Ext.namespace('Srims.component');

Srims.component.GetAllManagementFeesComboBox = Ext.extend(Ext.form.ComboBox, {
	constructor : function(params) {
		params.store = new Srims.type.GetManagementFeesStore(Srims.service.type.ManagementFeesService
				+ '/GetAllManagementFees');
		params.displayField = 'value';
		params.valueFiled = 'value';
		params.mode = 'remote';
		params.lazyInit = false;
		params.editable = false;
		params.triggerAction = 'all';
		params.forceSelection = true;
		Srims.component.GetAllManagementFeesComboBox.superclass.constructor.call(
				this, params);
	},
	getStore : function() {
		return this.store;
	}
})