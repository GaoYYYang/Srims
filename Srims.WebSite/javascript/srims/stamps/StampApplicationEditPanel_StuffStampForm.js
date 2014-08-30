if (!Srims.stamp)
	Ext.namespace("Srims.stamp");

Srims.stamp.StampApplicationEditPanel_StuffStampForm = function(id, stuffStore, stuff, stampApplication) {

	this._id = id;
	this._stuffStore = stuffStore;
	this._stampApplication = stampApplication;
	this._stuff = stuff;
	this._isNew = this._stuff.isNew();

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

	this._textFieldName = new Ext.form.TextField({
		fieldLabel: '文件名称',
		value: this._isNew ? "" : this._stuff.get('stuffName'),
		allowBlank: false,
		width: 250
	});
	this._comboBoxStuffTypes = new Srims.component.NoticeTextComboBox({
		fieldLabel: '文件类型',
		value: this._stuff.get('stuffType'),
		displayField: 'name',
		noticeTextType: 'StuffType',
		editable: true,
		triggerAction: 'all',
		allowBlank: true,
		listWidth: 150,
		width: 140
	});

	this._textFieldStuffType = new Ext.form.TextField({
		fieldLabel: '文件类型(其他)',
		value: this._stuff.get('stuffType'),
		allowBlank: false,
		disabled: true,
		width: 140
	});
	this._fileUploadField = new Srims.component.FileUploadField({
		id: 'upLoadStuffDocument',
		fieldLabel: '上传文印材料',
		width: 140,
		emptyText: '请选择要上传的文印材料',
		allowBlank: !String.isEmpty(this._stuff.get('stuffDocument')) ? true : false,
		fileTypes: ['pdf'],
		buttonCfg: {
			text: '',
			iconCls: 'icon-upload'
		}
	});
	this._labelDoucmentHint = new Ext.form.Label({
		html: !String.isEmpty(this._stuff.get('stuffDocument')) ? '<span style="color:#FF0000">您已经上传了该申请材料的文档。可重新上传。</span>' : ''
	})

	this._StampEditGridPnel = new Srims.stamp.StampApplicationEditPanel_StuffStampEditGridPanel(this._stuff);
	var items1 = [this._comboBoxStuffTypes];
	var items2 = [this._textFieldStuffType];

	this._StuffPanel = new Ext.Panel({
		widht: 600,
		Height: 300,
		labelWidth: 90,
		layout: 'form',
		bodyStyle: 'padding:0 5px 0',
		style: 'margin-bottom: 2px',
		defaultType: 'textfield',
		items: [this._textFieldName, new Ext.Panel({
			width: 600,
			layout: 'column',
			items: [new Ext.Panel({
				labelWidth: 90,
				width: 300,
				layout: 'form',
				items: items1
			}), new Ext.Panel({
				labelWidth: 90,
				width: 300,
				style: 'width:350px',
				layout: 'form',
				items: items2
			})]
		}), new Ext.Panel({
			width: 600,
			layout: 'column',
			items: [new Ext.Panel({
				labelWidth: 90,
				width: 240,
				layout: 'form',
				items: this._fileUploadField
			}), new Ext.Panel({
				labelWidth: 5,
				width: 300,
				layout: 'form',
				items: this._labelDoucmentHint
			})]
		})]
	});

	this._formPanelStuff = new Ext.FormPanel({
		fileUpload: true, //标志此表单数据中包含文件数据
		frame: true,
		layout: 'form',
		labelWidth: 60,
		autoHeight: true,
		bodyStyle: 'padding: 10px 0 10px 10px',
		items: [this._StuffPanel, this._StampEditGridPnel]
	});
	Srims.stamp.StampApplicationEditPanel_StuffStampForm.superclass.constructor.call(this, {
		id: this._id,
		title: '添加材料信息',
		iconCls: 'icon-new',
		width: 600,
		autoHeight: true,
		labelWidth: 80,
		modal: true,
		deferredRender: false,
		frame: true,
		closeAction: 'close',
		layout: 'form',
		items: [this._formPanelStuff],
		buttons: [this._buttonSave, this._buttonClose]
	});

	//取得材料
	this.getStuff = function(documentGuid) {
		this._stuff.set("stuffName", this._textFieldName.getValue());
		this._stuff.set("stuffType", this._textFieldStuffType.getValue());

		if (!String.isEmpty(documentGuid))
			this._stuff.set("stuffDocument", documentGuid);

		return this._stuff;
	}
	//新建材料章型
	this.newStuffStamp = function(newStuffStamp) {
		var stuffStamp = new Srims.stamp.StuffStamp({});
		stuffStamp.set('stampID', newStuffStamp.get('id'));
		stuffStamp.set('type', newStuffStamp.get('type'));
		stuffStamp.set('number', newStuffStamp.get('number'));
		stuffStamp.set('pagination', newStuffStamp.get('pagination'));
		return stuffStamp;
	}
	this.validTextField = function(component, value) {
		if (value && value.trim().length == 0) {
			Ext.Msg.show({
				title: component.fieldLabel + '错误',
				msg: '您输入的值只有空格，请重新输入。',
				buttons: Ext.Msg.OK,
				icon: Ext.MessageBox.WARNING
			});
			return false;
		}
		return true;

	}
	this._setTextFieldStuffType = function() {
		if (this._comboBoxStuffTypes.getValue() == '其他') {
			this._textFieldStuffType.enable();
			this._textFieldStuffType.setValue('');
		} else {
			this._textFieldStuffType.disable();
			this._textFieldStuffType.setValue(this._comboBoxStuffTypes.getValue());
		}
	}
	this._comboBoxStuffTypes.panel = this;
	this._comboBoxStuffTypes.on('select', function() {
		var panel = this.panel;
		panel._setTextFieldStuffType();
	});
	this.isValid = function(preventMark) {
		var result = true;
		result = this._textFieldName.isValid(preventMark) && result;
		result = this._textFieldStuffType.isValid(preventMark) && result;
		result = this._comboBoxStuffTypes.isValid(preventMark) && result;
		result = this.validTextField(this._textFieldName) && result;
		result = this.validTextField(this._textFieldStuffType) && result;
		result = this._fileUploadField.isValid(preventMark) && result;
		return result;
	}
	this.reset = function() {
		this._textFieldName.reset();
		this._textFieldStuffType.reset();
		this._comboBoxStuffTypes.reset();
		this._StampEditGridPnel._store.load();
		this._StampEditGridPnel._selections.clearSelections()
	}
	this.save = function() {
		this._formPanelStuff.getForm().submit({
			url: Srims.service.stamp.StuffService + '/UpLoadDocument',
			waitMsg: '正在上传文印材料，请耐心等待',
			scope: this,
			success: function(form, action) {

				var jsonData = Ext.util.JSON.decode(action.response.responseText);
				var documentGuid = jsonData.guid;

				this.stuff = this.getStuff(documentGuid);
				var isNewStuff = this._StampEditGridPnel.isNewStuff();
				this.stuff.stampStore = this._StampEditGridPnel.getStore();
				this.stuff.stuffStamps = new Array();
				var stuffStamps = this._StampEditGridPnel._selections.getSelections();
				this.stuff.set('stampTypes', '');
				for (var i = 0; i < stuffStamps.length; i++) {
					var stuffStamp = this.newStuffStamp(stuffStamps[i]);
					this.stuff.stuffStamps[this.stuff.stuffStamps.length] = stuffStamp;
					var stampType = (this.stuff.get('stampTypes') ? (this.stuff.get('stampTypes') + ',') : '') + stuffStamp.get('type') + '(' + stuffStamp.get('number') + ')'
					this.stuff.set('stampTypes', stampType);
				}

				if (isNewStuff)
					this._stuffStore.add(stuff);

				this.close();
			}
		});
	}
	this._onButonSave_Click = function(button, e) {
		var window = button.window;

		if (!window.isValid(false))
			return;
		if (window._StampEditGridPnel._selections.getSelections().length == 0) {
			Ext.Msg.show({
				title: '材料章型不能为空',
				msg: '请添加材料章型',
				buttons: Ext.Msg.OK,
				icon: Ext.MessageBox.INFO
			});
			return;
		}
		if (window._StampEditGridPnel.validEditor() == false) {
			Ext.Msg.show({
				title: '章数不能为空',
				msg: '请填写章型的数量',
				buttons: Ext.Msg.OK,
				icon: Ext.MessageBox.INFO
			});
			return;
		}
		if (window._StampEditGridPnel.validEditorPagination() == false) {
			Ext.Msg.show({
				title: '盖章页不能为空',
				msg: '请填写盖章页',
				buttons: Ext.Msg.OK,
				icon: Ext.MessageBox.INFO
			});
			return;
		}
		button.setText('正在保存');
		button.disable();
		window.save();
	}
	this._buttonSave.on('click', this._onButonSave_Click);
}
Ext.extend(Srims.stamp.StampApplicationEditPanel_StuffStampForm, Ext.Window, {});