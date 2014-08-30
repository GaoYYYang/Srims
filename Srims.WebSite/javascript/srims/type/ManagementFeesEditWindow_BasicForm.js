if (!Srims.type)
	Ext.namespace('Srims.type');

Srims.type.ManagementFeesEditWindwow_BasicForm = function(managementFee) {
	this._managementFee = managementFee;

	this._textFieldType = new Ext.form.TextField({
				fieldLabel : '管理费收取类别',
				value : this._managementFee.get('type'),
				allowBlank : false,
				width : 390
			});
	this._textFieldFundTotal = new Srims.component.MoneyField({
				fieldLabel : '经费额度（万元）≤',
				value : this._managementFee.get('fundtotal'),
				allowBlank : false,
				width : 160
			});
	this._textFieldFee = new Srims.component.PercentField({
				fieldLabel : '学校管理费比例（%）',
				value : this._managementFee.get('fee'),
				allowBlank : false,
				width : 160
			});
	this._textFieldPerformancePay = new Srims.component.PercentField({
				fieldLabel : '绩效工资比例（%）',
				value : this._managementFee.get('performancepay'),
				allowBlank : false,
				width : 160
			});
	this._textFieldRemark = new Ext.form.TextArea({
				fieldLabel : '备注',
				value : this._managementFee.get('remark'),
				width : 390
			});

	var columnFirstItems = [this._textFieldFundTotal, this._textFieldFee];
	var columnSecondItems = [this._textFieldPerformancePay];

	Srims.type.ManagementFeesEditWindwow_BasicForm.superclass.constructor.call(
			this, {
				title : '',
				width : 600,
				height : 427,
				frame : true,
				labelWidth : 130,
				bodyStyle : 'padding:5px 5px 0',
				style : 'margin-bottom:2px',
				defaultType : 'textfield',
				titleCollapse : true,
				items : [this._textFieldType, new Ext.Panel({
									width : 600,
									layout : 'column',
									items : [new Ext.Panel({
														width : 300,
														layout : 'form',
														items : columnFirstItems
													}), new Ext.Panel({
														width : 300,
														layout : 'form',
														items : columnSecondItems
													})]
								}), this._textFieldRemark]
			});
	this.assignValues = function() {
		this._managementFee.set('type', this._textFieldType.getValue());
		this._managementFee.set('fundtotal', this._textFieldFundTotal
						.getMoney());
		this._managementFee.set('fee', this._textFieldFee.getValue());
		this._managementFee.set('performancepay', this._textFieldPerformancePay
						.getValue());
		this._managementFee.set('remark', this._textFieldRemark.getValue());
	}
	this.validTextField = function(textField) {
		if (textField.getValue().trim().length == 0) {
			Ext.Msg.show({
						title : textField.fieldLabel + '错误',
						msg : '您输入的值有空格，请重新输入。',
						button : Ext.Msg.OK,
						icon : Ext.MessageBox.WARNING
					});
			return false;
		}
		return true;
	}
	this.isValid = function(preventMark) {
		var result = true;
		result = this._textFieldType.isValid(preventMark) && result;
		result = this._textFieldFundTotal.isValid(preventMark) && result;
		result = this._textFieldFee.isValid(preventMark) && result;
		result = this._textFieldPerformancePay.isValid(preventMark) && result;
		result = this._textFieldRemark.isValid(preventMark) && result;
		result = this.validTextField(this._textFieldType) && result;
		return result;
	}

}
Ext.extend(Srims.type.ManagementFeesEditWindwow_BasicForm, Ext.form.FormPanel,
		{});