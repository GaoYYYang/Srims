if (!Srims.experts)
    Ext.namespace('Srims.experts');

Srims.experts.ExpertLinkWayEditWindow_LinkWayForm = function(expert) {
    this._expert = expert;
    var emailExpr = /\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;

    this._numberFieldMobilePhone = new Ext.form.NumberField({
        fieldLabel: '    手机',
        value: expert.get('mobilePhone'),
        allowDecimals: false,
        allowNegative: false,
        width: 160
    });
    this._textFieldFax = new Ext.form.TextField({
        fieldLabel: '    传真',
        value: expert.get('fax'),
        width: 160
    });
    this._numberFieldZip = new Ext.form.NumberField({
        fieldLabel: '    邮编',
        value: expert.get('zip'),
        allowDecimals: false,
        allowNegative: false,
        width: 160
    });

    this._numberFieldOfficePhone = new Ext.form.NumberField({
        fieldLabel: '办公电话',
        value: expert.get('officePhone'),
        allowDecimals: false,
        allowNegative: false,
        width: 160
    });
    this._numberFieldHomePhone = new Ext.form.NumberField({
        fieldLabel: '家庭电话',
        value: expert.get('homePhone'),
        allowDecimals: false,
        allowNegative: false,
        width: 160
    });
    this._textFieldEmail = new Ext.form.TextField({
        fieldLabel: '电子邮件',
        value: expert.get('email'),
        regex: emailExpr,
        regexText: '邮箱格式有误，请重新输入',
        width: 160
    });

    this._textFieldAddress = new Ext.form.TextArea({
        fieldLabel: '通信地址',
        value: expert.get('address'),
        scroll: true,
        height: 50,
        width: 450
    });

    //constructor
    var columnOneItems = [this._numberFieldMobilePhone, this._textFieldFax, this._numberFieldZip];
    var columnTwoItems = [this._numberFieldOfficePhone, this._numberFieldHomePhone, this._textFieldEmail];

    Srims.experts.ExpertLinkWayEditWindow_LinkWayForm.superclass.constructor.call(this, {
        title: '联系方式信息',
        collapsible: true,
        frame: true,
        layout: 'form',
        labelWidth: 60,
        width: 576,
        items: [new Ext.Panel({
            widht: 570,
            layout: 'column',
            items: [new Ext.Panel({
                width: 290,
                layout: 'form',
                labelWidth: 60,
                items: columnOneItems
            }), new Ext.Panel({
                layout: 'form',
                labelWidth: 60,
                items: columnTwoItems
            })]
        }), this._textFieldAddress]
    });

    //method
    this.assginValues = function() {
        this._expert.set('mobilePhone', this._numberFieldMobilePhone.getValue());
        this._expert.set('fax', this._textFieldFax.getValue());
        this._expert.set('officePhone', this._numberFieldOfficePhone.getValue());
        this._expert.set('zip', this._numberFieldZip.getValue());
        this._expert.set('homePhone', this._numberFieldHomePhone.getValue());
        this._expert.set('email', this._textFieldEmail.getValue());
        this._expert.set('address', this._textFieldAddress.getValue());
    }
    this.clearParams = function() {
        this._numberFieldMobilePhone.reset();
        this._textFieldFax.reset();
        this._numberFieldOfficePhone.reset();
        this._numberFieldZip.reset();
        this._numberFieldHomePhone.reset();
        this._textFieldEmail.reset();
        this._textFieldAddress.reset();
    }  
}

Ext.extend(Srims.experts.ExpertLinkWayEditWindow_LinkWayForm, Ext.FormPanel);

