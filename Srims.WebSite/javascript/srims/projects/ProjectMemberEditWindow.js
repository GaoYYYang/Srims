if (!Srims.projects)
	Ext.namespace('Srims.projects');

Srims.projects.ProjectMemberEditWindow = function(id, projectMember, project, store) {

	this._id = id;
	this._projectMember = projectMember;
	this._project = project;
	this._store = store;

	this._buttonClose = new Ext.Button({
		minWidth: 80,
		text: '关 闭',
		window: this,
		handler: function() {
			var window = this.window;
			window.close();
		}
	});
	this._buttonSave = new Ext.Button({
		minWidth: 80,
		text: '保 存',
		window: this
	});

	this._comboBoxExpert = new Srims.component.ExpertSearch.SearchComboBox({
		fieldLabel: '专家',
		width: 140,
		value: this._projectMember.get('name'),
		selectEntityId: this._projectMember.get('expertID'),
		allowBlank: false
	});
	this._checkboxIsSecondCollege = new Ext.form.Checkbox({
		fieldLabel: '双聘单位',
		checked: this._projectMember.get('isExpertSecondCollege'),
		disabled: true
	});
	this._textFieldOrder = new Ext.form.NumberField({
		fieldLabel: '位次',
		width: 80,
		value: this._projectMember.get('order'),
		maxValue: 500,
		minValue: 1,
		allowBlank: false,
		allowDecimals: false,
		allowNegative: false
	});
	this._textFieldTaskName = new Ext.form.TextField({
		fieldLabel: '子课题名称',
		value: this._projectMember.get('taskName'),
		width: 180
	});
	this._textFieldTaskNO = new Ext.form.TextField({
		fieldLabel: '子课题编号',
		value: this._projectMember.get('taskNo'),
		width: 180
	});
	Srims.projects.ProjectMemberEditWindow.superclass.constructor.call(this, {
		id: this._id,
		title: '编辑项目成员信息',
		width: 350,
		labelWidth: 70,
		height: 200,
		modal: true,
		bodyStyle: 'padding:10px 10px 0',
		deferredRender: false,
		frame: true,
		closeAction: 'close',
		layout: 'form',
		resizable: false,
		items: [this._textFieldOrder, this._comboBoxExpert,this._checkboxIsSecondCollege, this._textFieldTaskName, this._textFieldTaskNO],
		buttons: [this._buttonSave, this._buttonClose]
	});

	this._validateOrderAndExpert = function() {
		var projectMembers = this._store.getRange();
		var projectMemberOrder = this._textFieldOrder.getValue();
		var expertID = this._comboBoxExpert.getValue();

		for (var i = 0; i < projectMembers.length; i++) {
			if (this._projectMember == projectMembers[i])
				continue;

			if (projectMemberOrder == projectMembers[i].get('order')) {
				Ext.Msg.show({
					title: '成员位次错误',
					msg: '成员位次不能重复，请重新输入位次',
					buttons: Ext.Msg.OK,
					icon: Ext.MessageBox.WARNING
				});
				return false;
			}
			if (expertID == projectMembers[i].get('expertID')) {
				Ext.Msg.show({
					title: '专家错误',
					msg: '该专家已经是这个项目的成员，请重新选择专家',
					buttons: Ext.Msg.OK,
					icon: Ext.MessageBox.WARNING
				});
				return false;
			}
		}
		return true;
	}
	this._comboBoxExpert.checkboxIsSecondCollege= this._checkboxIsSecondCollege;
	this.comboBoxExpert_Change = function(comboBox) {
		//处理专家变化
		var expertSecondCollege = comboBox.getEntity().get('college2');
		if (expertSecondCollege != '') {
			comboBox.checkboxIsSecondCollege.setDisabled(false);
		};
	}
	this._comboBoxExpert.on('change', this.comboBoxExpert_Change);

	this._isValid = function(preventMark) {
		var result = true;

		result = this._textFieldOrder.isValid(preventMark) && result;
		result = this._textFieldTaskNO.isValid(preventMark) && result;
		result = this._textFieldTaskName.isValid(preventMark) && result;
		result = this._comboBoxExpert.isValid(preventMark) && result;
		result = this._validateOrderAndExpert() && result;

		return result;
	}
	this._assignValues = function() {
		this._projectMember.set('expertID', this._comboBoxExpert.getValue());
		this._projectMember.set('order', this._textFieldOrder.getValue());
		this._projectMember.set('isExpertSecondCollege', this._checkboxIsSecondCollege.getValue());
		this._projectMember.set('taskName', this._textFieldTaskName.getValue());
		this._projectMember.set('taskNo', this._textFieldTaskNO.getValue());
		this._projectMember.set('projectID', this._project.get('id'));
	}
	this._save = function() {
		var projectMember = this._projectMember;
		projectMember.beginEdit();
		this._assignValues();
		projectMember.commit();

		Ext.Ajax.request({
			url: Srims.service.projects.ProjectMemberService + '/Save',
			params: projectMember.data,
			scope: this,
			success: function() {
				this._store.load();
				this.close();
			}
		});
	}
	this._buttonSave_Click = function(button) {
		var window = button.window;

		if (!window._isValid(false))
			return;

		button.setText('正在保存');
		button.disable();

		window._save();
	}
	this._buttonSave.on('click', this._buttonSave_Click);
}
Ext.extend(Srims.projects.ProjectMemberEditWindow, Ext.Window, {})