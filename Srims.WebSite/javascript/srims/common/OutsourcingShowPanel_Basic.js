/**
* @author dulintao
*/
Srims.common.OutsourcingShowPanel_Basic = function(outsourcing) {
this._outsourcing = outsourcing;
this._user = Srims.currentLoginLog.user;
this._userIsExpert = this._user.userRoleType == 'Expert';
    this._textFieldName = new Ext.form.TextField({
        fieldLabel: '外协单位名称',
        value: outsourcing.get('name'),
        allowBlank: true,
        width: 200,
        readOnly: true
    });
    this._textFieldLegalRepresentativeName = new Ext.form.TextField({
    fieldLabel: '法人代表',
        value: outsourcing.get('legalRepresentativeName'),
        allowBlank: true,
        width: 200,
        readOnly: true
    });
    this._textFieldRegisteredCapital = new Ext.form.TextField({
    fieldLabel: '注册资本(万元)',
        value: outsourcing.get('registeredCapital'),
        allowBlank: true,
        width: 200,
        readOnly: true
    });
    this._textFieldRegisteredCardNumber = new Ext.form.TextField({
        fieldLabel: '注册号',
        value: outsourcing.get('registeredCardNumber'),
        allowBlank: true,
        width: 200,
        readOnly: true
    });
    this._textFieldOrganizationCode = new Ext.form.TextField({
        fieldLabel: '组织代码',
        value: outsourcing.get('organizationCode'),
        allowBlank: true,
        width: 200,
        readOnly: true
    });
    this._textFieldTaxNumber = new Ext.form.TextField({
        fieldLabel: '税号',
        value: outsourcing.get('taxNumber'),
        allowBlank: true,
        width: 200,
        readOnly: true
    });
    this._textFieldCompanyType = new Ext.form.TextField({
        fieldLabel: '公司类型',
        value: outsourcing.get('companyType'),
        allowBlank: true,
        width: 200,
        readOnly: true
    });
    this._textFieldManagementType = new Ext.form.TextField({
        fieldLabel: '管理类别',
        value: outsourcing.get('managementType'),
        allowBlank: true,
        width: 200,
        readOnly: true
    });

    this._textFieldCreateDateTime = new Ext.form.DateField({
        fieldLabel: '成立时间',
        value: outsourcing.get('createDateTime'),
        format: 'Y-m-d',
        allowBlank: true,
        width: 200,
        readOnly: true
    });

    this._textFieldDealDateTimeStart = new Ext.form.DateField({
    fieldLabel: '营业期限',
        value: outsourcing.get('dealDateTimeStart'),
        format: 'Y-m-d',
        allowBlank: true,
        width: 200,
        readOnly: true
    });
    this._textFieldDealDateTimeEnd = new Ext.form.DateField({
        fieldLabel: '至',
        value: outsourcing.get('dealDateTimeEnd'),
        format: 'Y-m-d',
        allowBlank: true,
        width: 200
    });
    this._textFieldBusinessScope = new Ext.form.TextArea({
        fieldLabel: '经营范围',
        value: outsourcing.get('businessScope'),
        allowBlank: true,
        width: 600,
        height: 100,
        readOnly: true
    });
    this._textFieldRemark = new Ext.form.TextArea({
        fieldLabel: '备注',
        value: outsourcing.get('remark'),
        allowBlank: true,
        width: 600,
        height: 100,
        readOnly: true
    });
    this._textFieldIsVerify = new Ext.form.TextField({
        fieldLabel: '审核状态',
        value: outsourcing.get('isVerify'),
        allowBlank: true,
        width: 200,
        readOnly: true
    });
    this._textFieldAddress = new Ext.form.TextField({
        fieldLabel: '单位所在地',
        value: outsourcing.get('address'),
        allowBlank: true,
        width: 200,
        readOnly: true
    });
    if (this._userIsExpert) {
        var items1 = [this._textFieldName, this._textFieldLegalRepresentativeName, this._textFieldRegisteredCapital, this._textFieldRegisteredCardNumber, this._textFieldDealDateTimeStart, this._textFieldIsVerify];
        var items2 = [this._textFieldOrganizationCode, this._textFieldCompanyType, this._textFieldTaxNumber, this._textFieldCreateDateTime, this._textFieldDealDateTimeEnd, this._textFieldAddress];
    }
    else {
        var items1 = [this._textFieldName, this._textFieldLegalRepresentativeName, this._textFieldRegisteredCapital, this._textFieldRegisteredCardNumber, this._textFieldDealDateTimeStart, this._textFieldTaxNumber, this._textFieldAddress];
        var items2 = [this._textFieldOrganizationCode, this._textFieldCompanyType, this._textFieldManagementType, this._textFieldCreateDateTime, this._textFieldDealDateTimeEnd, this._textFieldIsVerify];
    }
    Srims.common.OutsourcingShowPanel_Basic.superclass.constructor.call(this, {
        collapsible: true,
        title: '基本信息',
        Height: 500,
        frame: true,
        labelWidth: 130,
        bodyStyle: 'padding:5px 5px 0',
        style: 'margin-bottom: 2px',
        defaultType: 'textfield',
        titleCollapse: true,
        items: [new Ext.Panel({
            labelWidth: 130,
            widht: 800,
            layout: 'column',
            items: [new Ext.Panel({
                width: 400,
                layout: 'form',
                style: 'width:400px',
                items: items1
            }), new Ext.Panel({
                width: 400,
                style: 'width:400px',
                layout: 'form',
                items: items2
            })]
        }), this._textFieldBusinessScope, this._textFieldRemark]
    });
    this.resetComponentValue = function(outsourcing) {
        this._outsourcing.set('name', this._textFieldName.getValue());
        this._outsourcing.set('legalRepresentativeName', this._textFieldLegalRepresentativeName.getValue());
        this._outsourcing.set('registeredCapital', this._textFieldRegisteredCapital.getValue());
        this._outsourcing.set('registeredCardNumber', this._textFieldRegisteredCardNumber.getValue());
        this._outsourcing.set('organizationCode', this._textFieldOrganizationCode.getValue());
        this._outsourcing.set('taxNumber', this._textFieldTaxNumber.getValue());
        this._outsourcing.set('companyType', this._textFieldCompanyType.getValue());
        this._outsourcing.set('managementType', this._textFieldManagementType.getValue());
        if (this._textFieldCreateDateTime.getValue() == null || this._textFieldCreateDateTime.getValue() == "" || this._textFieldCreateDateTime.getValue() == undefined)
        this._outsourcing.set('createDateTime', null);
        else
        this._outsourcing.set('createDateTime', this._textFieldCreateDateTime.getValue().format('Y/m/d'));
        if (this._textFieldDealDateTimeStart.getValue() == null || this._textFieldDealDateTimeStart.getValue() == "" || this._textFieldDealDateTimeStart.getValue() == undefined)
        this._outsourcing.set('dealDateTimeStart', null);
        else
        this._outsourcing.set('dealDateTimeStart', this._textFieldDealDateTimeStart.getValue().format('Y/m/d'));
        if (this._textFieldDealDateTimeEnd.getValue() == null || this._textFieldDealDateTimeEnd.getValue() == "" || this._textFieldDealDateTimeEnd.getValue() == undefined)
        this._outsourcing.set('dealDateTimeEnd', null);
        else
        this._outsourcing.set('dealDateTimeEnd', this._textFieldDealDateTimeEnd.getValue().format('Y/m/d'));
        this._outsourcing.set('businessScope', this._textFieldBusinessScope.getValue());
        this._outsourcing.set('remark', this._textFieldRemark.getValue());
        this._outsourcing.set('isVerify', this._textFieldIsVerify.getValue());

        this._outsourcing.set('corporationPlace', this._textFieldAddress.getValue());
    }
}
Ext.extend(Srims.common.OutsourcingShowPanel_Basic, Ext.form.FormPanel, {});
