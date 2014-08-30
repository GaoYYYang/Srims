/**
 * @author dulintao
 */
Srims.common.OutsourcingUnitShowPanel_Basic = function(outsourcing) {
	this._outsourcing = outsourcing;
	this._textFieldName = new Ext.form.TextField({
				fieldLabel : '外协单位名称',
				value : this._outsourcing.get('name'),
				allowBlank : false,
				width : 390
			});
	this._textFieldAddress = new Ext.form.TextField({
				fieldLabel : '外协单位地址',
				value : this._outsourcing.get('address'),
				allowBlank : false,
				width : 390
			});
	this._textFieldDirector = new Ext.form.TextField({
				fieldLabel : '负责人',
				value : this._outsourcing.get('director'),
				allowBlank : false,
				width : 390
			});
	this._textFieldPhone = new Ext.form.TextField({
				fieldLabel : '电话',
				value : this._outsourcing.get('phone'),
				allowBlank : false,
				width : 390
			});
	this._textFieldDirectorEmail = new Ext.form.TextField({
				fieldLabel : '负责人邮箱',
				value : this._outsourcing.get('directorEmail'),
				allowBlank : false,
				width : 390
			});
	this._textAreaRemark = new Ext.form.TextArea({
				fieldLabel : '备注',
				value : this._outsourcing.get('remark'),
				width : 390
			});
	var item1 = [this._textFieldName, this._textFieldDirector,
			this._textFieldDirectorEmail];
	var item2 = [this._textFieldAddress, this._textFieldPhone];
	Srims.common.OutsourcingShowPanel_Basic.superclass.constructor.call(this, {
				collapsible : true,
				title : '基本信息',
				Height : 500,
				frame : true,
				labelWidth : 130,
				bodyStyle : 'padding:5px 5px 0',
				style : 'margin-bottom: 2px',
				defaultType : 'textfield',
				titleCollapse : true,
				items : [new Ext.Panel({
									labelWidth : 130,
									widht : 800,
									layout : 'column',
									items : [new Ext.Panel({
														width : 400,
														layout : 'form',
														style : 'width:400px',
														items : item1
													}), new Ext.Panel({
														width : 400,
														style : 'width:400px',
														layout : 'form',
														items : item2
													})]
								}), this._textAreaRemark]
			});
	this.resetComponentValue = function(outsourcing) {
		this._textFieldName.setValue(outsourcing.get('name'));
		this._textFieldAddress.setValue(outsourcing.get('address'));
		this._textFieldDirector.setValue(outsourcing.get('director'));
		this._textFieldPhone.setValue(outsourcing.get('phone'));
		this._textFieldDirectorEmail.setValue(outsourcing.get('directorEmail'));
		this._textAreaRemark.setValue(outsourcing.get('remark'));
	}
}
Ext.extend(Srims.common.OutsourcingUnitShowPanel_Basic, Ext.form.FormPanel, {});
