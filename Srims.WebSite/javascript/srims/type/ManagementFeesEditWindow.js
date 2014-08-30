if (!Srims.type)
	Ext.namespace('Srims.type');

Srims.type.ManagementFeesEditWindow = function(id, managementFee, store) {
	this._id = id;
	this._managementFee = managementFee;
	this._store = store;


	var isNew = this._managementFee.isNew();
	this._title = this._managementFee.isNew() ? "新建管理费类别" : this._managementFee
			.get('type');
	this._formPanelBasic = new Srims.type.ManagementFeesEditWindwow_BasicForm(this._managementFee);// 在文件

	this._buttonSave = new Ext.Button({
				minWidth : 100,
				text : '保 存',
				panel : this
			});
	Srims.type.ManagementFeesEditWindow.superclass.constructor.call(this, {
				id : this._id,
				style : 'padding:5px; width:1200px',
				closable : true,
				height : 278,
				width : 680,
				buttonAlign : 'center',
				title : this._title,
				iconCls : managementFee.isNew() ? 'icon-new' : 'icon-edit',
				items : [this._formPanelBasic],
				buttons : [this._buttonSave]
			});
	this.assignValues = function() {
		this._formPanelBasic.assignValues();
	}
	this.isValid = function(preventMark) {
		var result = true;
		result = this._formPanelBasic.isValid(preventMark) && result;
		return result;
	}
	this.save = function() {
		var managementFee = this._managementFee;
		managementFee.beginEdit();
		this.assignValues();
		managementFee.commit();
		Ext.Ajax.request({
					url : Srims.service.type.ManagementFeesService + '/Save',
					params : managementFee.data,
					scope : this,
					success : function(response) {
						Srims.WorkSpace.getWorkSpace().remove(this);
						store.load();
						var newstore = new Ext.data.Store({
									data : response.responseXML,
									reader : new Srims.type.ManagementFeesXmlReader()
								});
						var newManagementFee = newstore.getAt(0);
						if (!isNew) {
							var panelId = 'ManagementFeesShowPanel'
									+ newManagementFee.get('id');
							if (Ext.getCmp(panelId))
								Srims.WorkSpace.getWorkSpace().remove(
										Ext.getCmp(panelId), true);
						}
						Srims.type.showManagementFee(newManagementFee, store);// 在文件TypeAction.js中
					}
				})
	}
	this._onButtonSave_Click = function(button, e) {
		var panel = button.panel;
		if (!panel.isValid(false))
			return;

		button.setText('正在保存');
		button.disable();
		panel.save();
	}

	this._buttonSave.on('click', this._onButtonSave_Click);
}
Ext.extend(Srims.type.ManagementFeesEditWindow, Ext.Window, {});