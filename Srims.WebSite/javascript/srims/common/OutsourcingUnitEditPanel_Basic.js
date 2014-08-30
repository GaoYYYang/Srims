/**
* @author dulintao
*/
Srims.common.OutsourcingUnitEditPanel_Basic = function(outsourcing) {
    this._outsourcing = outsourcing;
    this._textFieldName = new Ext.form.TextField({
        fieldLabel: '外协单位名称',
        value: outsourcing.get('name'),
        allowBlank: false,
        width: 200
    });
    this._textFieldLegalRepresentativeName = new Ext.form.TextField({
        fieldLabel: '法定代表人',
        value: outsourcing.get('legalRepresentativeName'),
        allowBlank: false,
        width: 200
    });
    this._textFieldRegisteredCapital = new Ext.form.TextField({
        fieldLabel: '组册资本',
        value: outsourcing.get('registeredCapital'),
        allowBlank: false,
        width: 200
    });
    this._textFieldRegisteredCardNumber = new Ext.form.TextField({
        fieldLabel: '注册号',
        value: outsourcing.get('registeredCardNumber'),
        allowBlank: false,
        width: 200
    });
    this._textFieldOrganizationCode = new Ext.form.TextField({
        fieldLabel: '组织代码',
        value: outsourcing.get('organizationCode'),
        allowBlank: false,
        width: 200
    });
    this._textFieldTaxNumber = new Ext.form.TextField({
        fieldLabel: '税号',
        value: outsourcing.get('taxNumber'),
        allowBlank: false,
        width: 200
    });
    this._textFieldCompanyType = new Ext.form.TextField({
        fieldLabel: '公司类型',
        value: outsourcing.get('companyType'),
        allowBlank: false,
        width: 200
    });
    this._textFieldManagementType = new Ext.form.TextField({
        fieldLabel: '管理类别',
        value: outsourcing.get('managementType'),
        allowBlank: false,
        width: 200
    });

    this._textFieldCreateDateTime = new Ext.form.DateField({
        fieldLabel: '成立时间',
        value: outsourcing.get('createDateTime'),
        format: 'Y-m-d',
        allowBlank: false,
        width: 200
    });

    this._textFieldDealDateTimeStart = new Ext.form.DateField({
        fieldLabel: '营业开始时间',
        value: outsourcing.get('dealDateTimeStart'),
        format: 'Y-m-d',
        allowBlank: false,
        width: 200
    });
    this._textFieldDealDateTimeEnd = new Ext.form.DateField({
        fieldLabel: '至',
        value: outsourcing.get('dealDateTimeEnd'),
        format: 'Y-m-d',
        allowBlank: false,
        width: 200
    });
    this._textFieldBusinessScope = new Ext.form.TextField({
        fieldLabel: '经营范围',
        value: outsourcing.get('businessScope'),
        allowBlank: false,
        width: 600,
        height: 100
    });
    this._textFieldRemark = new Ext.form.TextField({
        fieldLabel: '备注',
        value: outsourcing.get('remark'),
        allowBlank: true,
        width: 600,
        height: 100
    });
    var items1 = [this._textFieldName, this._textFieldLegalRepresentativeName, this._textFieldRegisteredCapital, this._textFieldRegisteredCardNumber, this._textFieldDealDateTimeStart, this._textFieldOrganizationCode];
    var items2 = [this._textFieldTaxNumber, this._textFieldCompanyType, this._textFieldManagementType, this._textFieldCreateDateTime, this._textFieldDealDateTimeEnd];
    Srims.common.OutsourcingUnitEditPanel_Basic.superclass.constructor.call(this, {
        title: '基本信息',
        Height: 350,
        frame: true,
        labelWidth: 80,
        bodyStyle: 'padding:5px 5px 0',
        style: 'margin-bottom: 2px',
        defaultType: 'textfield',
        titleCollapse: true,
        items: [new Ext.Panel({
            widht: 600,
            layout: 'column',
            items: [new Ext.Panel({
                width: 450,
                layout: 'form',
                style: 'width:300px',
                items: items1
            }), new Ext.Panel({
                width: 450,
                style: 'width:300px',
                layout: 'form',
                items: items2
            })]
        }), this._textFieldBusinessScope, this._textFieldRemark]
    });
    //赋值
    this.assignValues = function() {
        this._outsourcing.set('name', this._textFieldName.getValue());
        this._outsourcing.set('legalRepresentativeName', this._textFieldLegalRepresentativeName.getValue());
        this._outsourcing.set('registeredCapital', this._textFieldRegisteredCapital.getValue());
        this._outsourcing.set('registeredCardNumber', this._textFieldRegisteredCardNumber.getValue());
        this._outsourcing.set('organizationCode', this._textFieldOrganizationCode.getValue());
        this._outsourcing.set('taxNumber', this._textFieldTaxNumber.getValue());
        this._outsourcing.set('companyType', this._textFieldCompanyType.getValue());
        this._outsourcing.set('managementType', this._textFieldManagementType.getValue());
        this._outsourcing.set('createDateTime', this._textFieldCreateDateTime.getValue().format('Y/m/d'));
        this._outsourcing.set('dealDateTimeStart', this._textFieldDealDateTimeStart.getValue().format('Y/m/d'));
        this._outsourcing.set('dealDateTimeEnd', this._textFieldDealDateTimeEnd.getValue().format('Y/m/d'));
        this._outsourcing.set('businessScope', this._textFieldBusinessScope.getValue());
        this._outsourcing.set('remark', this._textFieldRemark.getValue());
    }
    //清楚所有输入框
    this.clearParams = function() {
        this._textFieldName.reset();
        this._textFieldLegalRepresentativeName.reset();
        this._textFieldRegisteredCapital.reset();
        this._textFieldRegisteredCardNumber.reset();
        this._textFieldOrganizationCode.reset();
        this._textFieldTaxNumber.reset();
        this._textFieldCompanyType.reset();
        this._textFieldManagementType.reset();
        this._textFieldCreateDateTime.reset();
        this._textFieldDealDateTimeStart.reset();
        this._textFieldDealDateTimeEnd.reset();
        this._textFieldBusinessScope.reset();
        this._textFieldRemark.reset();
    }
    //对各输入框进行验证结果进行统计
    this.isValid = function(preventMark) {
        var result = true;

        result = this._textFieldName.isValid() && result;
        result = this._textFieldLegalRepresentativeName.isValid() && result;
        result = this._textFieldRegisteredCapital.isValid() && result;
        result = this._textFieldRegisteredCardNumber.isValid() && result;
        result = this._textFieldOrganizationCode.isValid() && result;
        result = this._textFieldTaxNumber.isValid() && result;
        result = this._textFieldCompanyType.isValid() && result;
        result = this._textFieldManagementType.isValid() && result;
        result = this._textFieldCreateDateTime.isValid() && result;
        result = this._textFieldDealDateTimeStart.isValid() && result;
        result = this._textFieldDealDateTimeEnd.isValid() && result;
        result = this._textFieldBusinessScope.isValid() && result;

        return result;
    }
}
Ext.extend(Srims.common.OutsourcingUnitEditPanel_Basic, Ext.form.FormPanel);