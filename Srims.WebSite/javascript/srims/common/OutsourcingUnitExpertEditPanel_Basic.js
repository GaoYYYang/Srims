/**
* @author dulintao
*/
Srims.common.OutsourcingUnitExpertEditPanel_Basic = function(outsourcing) {
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
    this._textFieldCreateDateTime = new Ext.form.TextField({
        fieldLabel: '成立时间',
        value: outsourcing.get('createDateTime'),
        allowBlank: false,
        width: 200
    });
    this._textFieldDealDateTime = new Ext.form.TextField({
        fieldLabel: '营业期限',
        value: outsourcing.get('dealDateTime'),
        allowBlank: false,
        width: 200
    });
    this._textFieldBusinessScope = new Ext.form.TextField({
        fieldLabel: '经营范围',
        value: outsourcing.get('businessScope'),
        allowBlank: false,
        width: 600,
        height: 200
    });
    this._textFieldRemark = new Ext.form.TextField({
        fieldLabel: '备注',
        value: outsourcing.get('remark'),
        allowBlank: false,
        width: 600,
        height: 100
    });
    var items1 = [this._textFieldName, this._textFieldLegalRepresentativeName, this._textFieldRegisteredCapital, this._textFieldRegisteredCardNumber, this._textFieldOrganizationCode];
    var items2 = [this._textFieldTaxNumber, this._textFieldManagementType, this._textFieldCreateDateTime, this._textFieldDealDateTime];
    Srims.common.OutsourcingUnitExpertEditPanel_Basic.superclass.constructor.call(this, {
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
        this._outsourcing.set('address', this._textFieldAddress.getValue());
        this._outsourcing.set('director', this._textFieldDirector.getValue());
        this._outsourcing.set('phone', this._textFieldPhone.getValue());
        this._outsourcing.set('directorEmail',this._textFieldDirectorEmail.getValue());
        this._outsourcing.set('remark', this._textAreaRemark.getValue());
        this._outsourcing.set('name', this._textFieldName.getValue());
        this._outsourcing.set('address', this._textFieldAddress.getValue());
        this._outsourcing.set('director', this._textFieldDirector.getValue());
        this._outsourcing.set('phone', this._textFieldPhone.getValue());
        this._outsourcing.set('directorEmail', this._textFieldDirectorEmail.getValue());
        this._outsourcing.set('remark', this._textAreaRemark.getValue());
    }
    //清楚所有输入框
    this.clearParams = function() {
        this._textFieldName.reset();
        this._textFieldAddress.reset();
        this._textFieldDirector.reset();
        this._textFieldPhone.reset();
        this._textFieldDirectorEmail.reset();
        this._textAreaRemark.reset();
    }
    //对各输入框进行验证结果进行统计
    this.isValid = function(preventMark) {
        var result = true;

        result = this._textFieldName.isValid() && result;
        result = this._textFieldAddress.isValid() && result;
        result = this._textFieldDirector.isValid() && result;
        result = this._textFieldPhone.isValid() && result;
        result = this._textFieldDirectorEmail.isValid() && result;
        result = this._textAreaRemark.isValid() && result;

        return result;
    }
}
Ext.extend(Srims.common.OutsourcingUnitExpertEditPanel_Basic, Ext.form.FormPanel);