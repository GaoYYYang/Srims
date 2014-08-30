if (!Srims.type)
	Ext.namespace("Srims.type");

Srims.type.ManagementFeesShowPanel_BasicForm = function(managementFee) {
	this._managementFee = managementFee;

	this._textFieldType = new Ext.form.TextField({
				fieldLabel : '管理费收取类别',
				value : this._managementFee.get('type'),
				allowBlank : false,
				width : 390
			});
	this._textFieldFundTotal = new Ext.form.TextField({
				fieldLabel : '经费额度（万元）≤',
				value : Money.render(this._managementFee.get('fundtotal')),
				allowBlank : false,
				width : 160
			});
	this._textFieldFee = new Ext.form.TextField({
				fieldLabel : '学校管理费比例（%）',
				value : ExpenseRate.render(this._managementFee.get('fee')),
				allowBlank : false,
				width : 160
			});
	this._textFieldPerformancePay = new Ext.form.TextField({
				fieldLabel : '绩效工资比例（%）',
				value : ExpenseRate.render(this._managementFee
						.get('performancepay')),
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
	Srims.type.ManagementFeesShowPanel_BasicForm.superclass.constructor.call(
			this, {
				collapsible : true,
				title : '基本信息',
				Height : 500,
				frame : true,
				labelWidth : 130,
				bodyStyle : 'padding:5px 5px 0',
				style : 'margin-bottom: 2px',
				defaultType : 'textfield',
				titleCollapse : true,
				items : [this._textFieldType, new Ext.Panel({
									labelWidth : 130,
									widht : 800,
									layout : 'column',
									items : [new Ext.Panel({
														width : 400,
														layout : 'form',
														style : 'width:400px',
														items : columnFirstItems
													}), new Ext.Panel({
														width : 400,
														style : 'width:400px',
														layout : 'form',
														items : columnSecondItems
													})]
								}), this._textFieldRemark]
			});
}
Ext
		.extend(Srims.type.ManagementFeesShowPanel_BasicForm,
				Ext.form.FormPanel, {});