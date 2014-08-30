
if (!Srims.common)
    Ext.namespace('Srims.common');

Srims.common.OutsourcingInquiryPanel_Basic = function() {
    this._textFieldName = new Ext.form.TextField({
        fieldLabel: '外协单位名称',
        width: 200
    });
    this._textFieldLegalRepresentativeName = new Ext.form.TextField({
        fieldLabel: '法定代表人',
        width: 200
    });
    this._numberFieldRegisteredCapitalStart = new Ext.form.NumberField({
        fieldLabel: '注册资本',
        width: 200
    });
    this._numberFieldRegisteredCapitalEnd = new Ext.form.NumberField({
        fieldLabel: '至',
        allowNegative: false,
        allowDecimals: false,
        width: 200
    });
    this._textFieldRegisteredCardNumber = new Ext.form.TextField({
        fieldLabel: '注册号',
        width: 200
    });
    //    this._textFieldOrganizationCode = new Ext.form.TextField({
    //        fieldLabel: '组织代码',
    //        width: 200
    //    });

    this._textFieldOrganizationCode = new Ext.form.TextField({
        fieldLabel: '组织代码',
        labelWidth: 120,
        maxLength: 8,
        width: 65,
        autoCreate: { tag: 'input', type: 'text', size: '20', autocomplete: 'off', maxlength: '8' }
    });
    this._codeShortLine = new Ext.form.Label({
        text: '    —'
    });
    this._codeNinethNumber = new Ext.form.TextField({
        fieldLabel: '第九位',
        hideLabel: true,
        width: 20,
        autoCreate: { tag: 'input', type: 'text', size: '20', autocomplete: 'off', maxlength: '1' }
    });

    this._textFieldTaxNumber = new Ext.form.TextField({
        fieldLabel: '税号',
        width: 200
    });
    this._textFieldCompanyType = new Ext.form.ComboBox({
        fieldLabel: '公司类型',
        store: Srims.common.outsourcingCompanyTypeStore,
        displayField: 'name',
        editable: false,
        triggerAction: 'all',
        emptyText: '请选择公司类型',
        listWidth: 200,
        allowBlank: true,
        width: 180
    });
    var scheduleType = [
    ['1', '一级', ''],
    ['2', '二级', ''],
    ['3', '三级', ''],
    ['4', '四级', ''],
    ['5', '五级', '']
];
    this._textFieldManagementType = new Ext.form.ComboBox({
        store: scheduleType,
        displayField: 'lb',
        fieldLabel: '管理类别',
        triggerAction: 'all',
        typeAhead: true,
        mode: 'local',
        emptyText: '请选择类别',
        selectOnFocus: true,
        width: 180
    });
    this._textFieldBusinessScope = new Ext.form.TextField({
        fieldLabel: '经营范围',
        allowBlank: false,
        width: 200
    });

    this.items = new Ext.Panel({
        widht: 500,
        labelWidth: 120,
        layout: 'column',
        items: [new Ext.Panel({
            width: 200,
            labelWidth: 120,
            layout: 'form',
            items: this._textFieldOrganizationCode
        }), new Ext.Panel({
            width: 20,
            layout: 'form',
            items: this._codeShortLine
        }),
            new Ext.Panel({
                width: 30,
                layout: 'form',
                items: this._codeNinethNumber
            })
            ]
    });

    Srims.common.OutsourcingInquiryPanel_Basic.superclass.constructor.call(this, ({
        collapsible: true,
        title: '基本信息',
        autoHeight: true,
        frame: true,
        layout: 'form',
        labelWidth: 120,
        buttonAlign: 'center',
        bodyStyle: 'padding:5px 5px 0',
        style: 'margin-bottom: 2px',
        defaultType: 'textfield',
        titleCollapse: true,
        items: [new Ext.Panel({
            layout: 'column',
            items: [new Ext.Panel({
                layout: 'form',
                labelWidth: 120,
                width: 400,
                items: [this._textFieldName, this._numberFieldRegisteredCapitalStart]
            }), new Ext.Panel({
                layout: 'form',
                labelWidth: 120,
                width: 400,
                items: [this._textFieldLegalRepresentativeName, this._numberFieldRegisteredCapitalEnd]
            }), new Ext.Panel({
                layout: 'form',
                labelWidth: 120,
                width: 400,
                items: [this._textFieldRegisteredCardNumber, this.items]
            }), new Ext.Panel({
                layout: 'form',
                labelWidth: 120,
                width: 400,
                items: [this._textFieldCompanyType, this._textFieldTaxNumber]
            }), new Ext.Panel({
                layout: 'form',
                labelWidth: 120,
                width: 400,
                items: [this._textFieldManagementType]
            })]
        })]
    }))

    this.buildParams = function(params) {
        params.name = this._textFieldName.getValue();
        params.RegisteredCapitalStart = this._numberFieldRegisteredCapitalStart.getValue();
        params.RegisteredCapitalEnd = this._numberFieldRegisteredCapitalEnd.getValue();
        params.legalRepresentativeName = this._textFieldLegalRepresentativeName.getValue();
        params.ManagementType = this._textFieldManagementType.getRawValue();
        params.RegisteredCardNumber = this._textFieldRegisteredCardNumber.getValue();
        if (this._textFieldOrganizationCode.getValue() != "")
            params.OrganizationCode = this._textFieldOrganizationCode.getValue() + '-' + this._codeNinethNumber.getValue();
        else
            params.OrganizationCode = "";
        params.FieldCompanyType = this._textFieldCompanyType.getValue();
        params.TaxNumber = this._textFieldTaxNumber.getValue();

    }

    this.clearParams = function(params) {
        this._textFieldName.reset();
        this._numberFieldRegisteredCapitalStart.reset();
        this._numberFieldRegisteredCapitalEnd.reset();
        this._textFieldLegalRepresentativeName.reset();
        this._textFieldManagementType.reset();
        this._textFieldRegisteredCardNumber.reset();
        this._codeNinethNumber.reset();
        this._textFieldOrganizationCode.reset();
        this._textFieldCompanyType.reset();
        this._textFieldTaxNumber.reset();
    }
}
Ext.extend(Srims.common.OutsourcingInquiryPanel_Basic, Ext.Panel, {});
