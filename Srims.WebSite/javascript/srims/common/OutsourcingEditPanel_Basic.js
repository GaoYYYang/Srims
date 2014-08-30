/**
* @author dulintao
*/
Srims.common.OutsourcingEditPanel_Basic = function(IsInformation, outsourcing) {

    this._user = Srims.currentLoginLog.user;
    this._userIsExpert = this._user.userRoleType == 'Expert';
    this._outsourcing = outsourcing;

    this._textFieldName = new Ext.form.TextField({
        fieldLabel: '外协单位名称',
        value: outsourcing.isNew() ? IsInformation.split('?;')[0] : outsourcing.get('name'),
        allowBlank: false,
        width: 200
    });
    this._textFieldLegalRepresentativeName = new Ext.form.TextField({
        fieldLabel: '法人代表',
        value: outsourcing.get('legalRepresentativeName'),
        allowBlank: false,
        width: 200
    });
    this._textFieldRegisteredCapital = new Ext.form.NumberField({
        fieldLabel: '注册资本(万元)',
        value: outsourcing.get('registeredCapital'),
        allowBlank: false,
        width: 200
    });
    this.validatCardNumber = function() {
        var panel = this.panel;
        var value = this.getValue();
        if (value == "") {
            return true;
        }
        var lCardNumber = value.length;
        if (!isNaN(value))
            if (lCardNumber == 12 || lCardNumber == 15) {

            return true;
        }
        else {
            this.invalidText = '请正确输入12或15位的注册号！';
            return false;
        }
    }
    this._textFieldRegisteredCardNumber = new Ext.form.TextField({
        fieldLabel: '注册号',
        value: outsourcing.get('registeredCardNumber'),
        allowBlank: true,
        validator: this.validatCardNumber,
        width: 200
    });
    this._textFieldRegisteredCardNumber.panel = this;
    this._textFieldRegisteredCardNumber.validator = this.validatCardNumber;

    this.validatOrganizationCode = function() {
        var panel = this.panel;
        var value = this.getRawValue();
        var lCodeNumber = String(value).length;
        if (!isNaN(value))
            if (lCodeNumber == 8) {
            return true;
        }
        else {
            this.invalidText = '请正确输入8位本体代码！';
            return false;
        }
    }
    this.validatNinethNumber = function() {
        var panel = this.panel;
        var valueNine = this.getValue();
        var nineIsOne = valueNine.length;
        if (nineIsOne != 1) {
            this.invalidText = '请输入一位校验码！';
            return false;
        }
        else {
            var code = panel._textFieldOrganizationCode.getRawValue();
            var totleCode = 0;
            totleCode = code[0] * 3 + code[1] * 7 + code[2] * 9 + code[3] * 10 + code[4] * 5 + code[5] * 8 + code[6] * 4 + code[7] * 2;
            var compare = 11 - totleCode % 11;

            if ((valueNine >= 0 && valueNine <= 9) || (valueNine >= 'a' && valueNine <= 'z') || (valueNine >= 'A' && valueNine <= 'Z')) {
                if (compare == 0 || compare == 11)
                    if (valueNine == 0)
                    return true;
                if (compare == 10)
                    if (valueNine == "x" || valueNine == "X")
                    return true;
                if (compare < 10 && compare >= 1)
                    if (valueNine == compare)
                    return true;
                else {
                    this.invalidText = '校验码输入错误！';
                    return false;
                }
            }
            else {
                this.invalidText = '校验码必须为数字或字母！';
                return false;
            }
        }
    }

    this._textFieldOrganizationCode = new Ext.form.TextField({
        fieldLabel: '组织代码',
        value: outsourcing.isNew() ? IsInformation.split('?;')[1] : outsourcing.get('organizationCode') ? outsourcing.get('organizationCode').split('-')[0] : '',
        allowBlank: false,
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
        value: outsourcing.isNew() ? IsInformation.split('?;')[2] : outsourcing.get('organizationCode') ? outsourcing.get('organizationCode').split('-')[1] : '',
        allowBlank: false,
        width: 20,
        autoCreate: { tag: 'input', type: 'text', size: '20', autocomplete: 'off', maxlength: '1' }
    });
    this._textFieldOrganizationCode.panel = this;
    this._textFieldOrganizationCode.validator = this.validatOrganizationCode;
    this._codeNinethNumber.panel = this;
    this._codeNinethNumber.validator = this.validatNinethNumber;

    this.validatTaxNumber = function() {
        var panel = this.panel;
        var value = this.getValue();
        var lTaxNumber = value.length;
        //        if (!outsourcing.isNew()) {
        //            var provincecity = panel._comboBoxTaskCorporationPlace_Town.getRawValue() + ' ' + panel._comboBoxTaskCorporationPlace_City.getRawValue();
        //            //////////////////////////
        //            Ext.Ajax.request(this, {
        //                url: Srims.service.common.OutsourcingService + '/GetByCityName',
        //                params: { provincecity: provincecity },
        //                scope: this,
        //                success: function(response) {
        //                var adv = response.responseText; 
        //                }
        //            });
        //        }
        //        else
        var adv = panel._comboBoxTaskCorporationPlace_City.getValue();
        var OCode = panel._textFieldOrganizationCode.getValue() + panel._codeNinethNumber.getValue();
        if (lTaxNumber != 15) {
            this.invalidText = '您输入的税号位数不等于15位！';
            return false;
        }
        else {
            if (outsourcing.isNew()) {
                if (value.substring(0, 6) == adv) {
                    var lastNine = value.substring(6, 15);
                    if (lastNine == OCode) {
                        return true;
                    }
                    else {
                        this.invalidText = '后九位必须与组织代码相符合！';
                        return false;
                    }
                }

                else {
                    this.invalidText = '前六位必须与选择的地区代码一致！';
                    return false;
                }
            }
            if (!outsourcing.isNew()) {
                var lastNine = value.substring(6, 15);
                if (lastNine == OCode) {
                    return true;
                }
                else {
                    this.invalidText = '后九位必须与组织代码相符合！';
                    return false;
                }
            }
        }
    }

    this._textFieldTaxNumber = new Ext.form.TextField({
        fieldLabel: '税号',
        value: outsourcing.get('taxNumber'),
        allowBlank: false,
        width: 200
    });
    this._textFieldTaxNumber.panel = this;

    this._textFieldTaxNumber.validator = this.validatTaxNumber;


    this._textFieldCompanyType = new Ext.form.ComboBox({
        fieldLabel: '公司类型',
        value: outsourcing.get('companyType'),
        store: Srims.common.outsourcingCompanyTypeStore,
        displayField: 'name',
        editable: false,
        triggerAction: 'all',
        emptyText: '请选择公司类型',
        listWidth: 200,
        allowBlank: false,
        width: 200
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
        value: outsourcing.get('managementType'),
        triggerAction: 'all',
        typeAhead: true,
        mode: 'local',
        emptyText: '请选择类别',
        selectOnFocus: true,
        width: 200
    });

    this._textFieldCreateDateTime = new Ext.form.DateField({
        fieldLabel: '成立时间',
        value: outsourcing.get('createDateTime'),
        format: 'Y-m-d',
        allowBlank: true,
        readOnly: true,
        width: 200
    });
    this.validatStart = function() {
        var panel = this.panel;
        var value = this.getValue();
        if (value == "") {
            return true;
        }
        if (this.getValue() < panel._textFieldCreateDateTime.getValue()) {
            this.invalidText = '营业期限初始时间在成立时间之后！';
            return false;
        }
        else {
            return true;
        }
    };
    this._textFieldDealDateTimeStart = new Ext.form.DateField({
        fieldLabel: '营业期限',
        value: outsourcing.get('dealDateTimeStart'),
        format: 'Y-m-d',
        allowBlank: true,
        readOnly: true,
        width: 200
    });
    this._textFieldDealDateTimeStart.panel = this;
    this._textFieldDealDateTimeStart.validator = this.validatStart;

    this.validatEndTime = function() {
        var panel = this.panel;
        var value = this.getValue();
        if (value == "") {
            return true;
        }
        if (this.getValue() > panel._textFieldDealDateTimeStart.getValue()) {

            return true;
        }
        else {
            this.invalidText = '营业期限结束时间在开始时间之后！';
            return false;
        }
    }
    this._textFieldDealDateTimeEnd = new Ext.form.DateField({
        fieldLabel: '至',
        value: outsourcing.get('dealDateTimeEnd'),
        format: 'Y-m-d',
        allowBlank: true,
        readOnly: true,
        width: 200
    });
    this._textFieldDealDateTimeEnd.panel = this;
    this._textFieldDealDateTimeEnd.validator = this.validatEndTime;

    this._textFieldBusinessScope = new Ext.form.TextArea({
        fieldLabel: '经营范围',
        value: outsourcing.get('businessScope'),
        allowBlank: true,
        width: 600,
        height: 100
    });
    this._textFieldRemark = new Ext.form.TextArea({
        fieldLabel: '备注',
        value: outsourcing.get('remark'),
        allowBlank: true,
        width: 600,
        height: 100
    });
    this._textFieldIsVerify = new Ext.form.TextField({
        fieldLabel: '审核状态',
        value: outsourcing.get('isVerify'),
        allowBlank: false,
        width: 600,
        height: 100
    });

    //取得所在省份或城市
    this._getProvinceOrCity = function(outsourcing, index) {
        var outsourcing_taskCorporationPlace = outsourcing.get('address');
        if (outsourcing_taskCorporationPlace != undefined && outsourcing_taskCorporationPlace.toString().trim() != '')
            outsourcing_taskCorporationPlace = outsourcing_taskCorporationPlace.split(' ')[index];
        else
            outsourcing_taskCorporationPlace = undefined;
        return outsourcing_taskCorporationPlace
    }
    var outsourcing_taskCorporationPlace_province = this._getProvinceOrCity(outsourcing, 0); //? this._getProvinceOrCity(outsourcing, 0) : "";
    this._comboBoxTaskCorporationPlace_Province = new Ext.form.ComboBox({
        fieldLabel: '单位所在地',
        value: outsourcing_taskCorporationPlace_province,
        store: newProvinces,
        allowBlank: false,
        emptyText: '选择省',
        editable: false,
        triggerAction: 'all',
        listWidth: 65,
        panel: this,
        width: 50
    });
    var outsourcing_taskCorporationPlace_town = this._getProvinceOrCity(outsourcing, 1); //? this._getProvinceOrCity(outsourcing, 1) : "";
    this._comboBoxTaskCorporationPlace_Town = new Ext.form.ComboBox({
        fieldLabel: '单位所在地',
        hideLabel: true,
        value: outsourcing_taskCorporationPlace_town,
        store: new Ext.data.SimpleStore({
            fields: new Array('city'),
            data: outsourcing_taskCorporationPlace_province == undefined ? new Array() : newProvinces.getCities(outsourcing_taskCorporationPlace_province)
        }),
        valueField: 'city',
        displayField: 'city',
        allowBlank: false,
        emptyText: '选择市',
        editable: false,
        mode: 'local',
        triggerAction: 'all',
        listWidth: 65,
        width: 50
    });
    var outsourcing_taskCorporationPlace_city = this._getProvinceOrCity(outsourcing, 2); //? this._getProvinceOrCity(outsourcing, 2) : "";
    this._comboBoxTaskCorporationPlace_City = new Ext.form.ComboBox({
        fieldLabel: '单位所在地',
        hideLabel: true,
        value: outsourcing_taskCorporationPlace_city,
        store: new Srims.common.OutsourcingProvinceStore(Srims.service.common.OutsourcingService + '/GetProvinceAreasByProvinceName'),
        valueField: 'id',
        displayField: 'name',
        allowBlank: false,
        emptyText: '选择区',
        editable: false,
        mode: 'local',
        triggerAction: 'all',
        listWidth: 65,
        width: 50
    });
    //城市之间的联动

    this.onComboBoxTaskCorporationPlace_Town_Select = function(comboBox) {
        var province = comboBox.getValue();
        comboBox.comboBoxTaskCorporationPlace_City.setValue("");
        comboBox.comboBoxTaskCorporationPlace_City.store.load({ params: { provinceName: province} });
    }
    this.onComboBoxTaskCorporationPlace_Province_Select = function(comboBox) {
        var province = comboBox.getValue();
        comboBox.comboBoxTaskCorporationPlace_Town.setValue("");
        comboBox.comboBoxTaskCorporationPlace_Town.comboBoxTaskCorporationPlace_City.setValue("");

        var comboBoxTaskCorporationPlace_Town = comboBox.comboBoxTaskCorporationPlace_Town;
        var cityStore = comboBoxTaskCorporationPlace_Town.store;
        var cities = newProvinces.getCities(province);
        cityStore.loadData(cities);
        comboBoxTaskCorporationPlace_Town.setValue(undefined);

    }
    this._comboBoxTaskCorporationPlace_Town.comboBoxTaskCorporationPlace_City = this._comboBoxTaskCorporationPlace_City;
    this._comboBoxTaskCorporationPlace_Town.on('select', this.onComboBoxTaskCorporationPlace_Town_Select);
    this._comboBoxTaskCorporationPlace_Province.comboBoxTaskCorporationPlace_Town = this._comboBoxTaskCorporationPlace_Town;
    this._comboBoxTaskCorporationPlace_Province.on('select', this.onComboBoxTaskCorporationPlace_Province_Select);

    if (this._userIsExpert) {
        this.items1 = [this._textFieldName, this._textFieldLegalRepresentativeName, this._textFieldRegisteredCapital, this._textFieldRegisteredCardNumber, this._textFieldDealDateTimeStart];

        this.items2 = [this._textFieldCompanyType]//, this._textFieldTaxNumber, this._textFieldCreateDateTime, this._textFieldDealDateTimeEnd];
        this.items2[this.items2.length] = new Ext.Panel({
            widht: 400,
            layout: 'column',
            items: [new Ext.Panel({
                width: 200,
                layout: 'form',
                items: this._comboBoxTaskCorporationPlace_Province
            }), new Ext.Panel({
                width: 75,
                layout: 'form',
                items: this._comboBoxTaskCorporationPlace_Town
            }), new Ext.Panel({
                width: 80,
                layout: 'form',
                items: this._comboBoxTaskCorporationPlace_City
            })]
        });
        this.items2[this.items2.length] = this._textFieldTaxNumber;
        this.items2[this.items2.length] = this._textFieldCreateDateTime;
        this.items2[this.items2.length] = this._textFieldDealDateTimeEnd;



        this.items1[this.items1.length] = new Ext.Panel({
            widht: 500,
            layout: 'column',
            items: [new Ext.Panel({
                width: 200,
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
    }
    else {
        this.items1 = [this._textFieldName, this._textFieldLegalRepresentativeName, this._textFieldRegisteredCapital, this._textFieldRegisteredCardNumber, this._textFieldDealDateTimeStart, this._textFieldTaxNumber];
        this.items2 = [this._textFieldCompanyType]//, this._textFieldManagementType, this._textFieldCreateDateTime, this._textFieldDealDateTimeEnd];

        this.items2[this.items2.length] = new Ext.Panel({
            widht: 400,
            layout: 'column',
            items: [new Ext.Panel({
                width: 200,
                layout: 'form',
                items: this._comboBoxTaskCorporationPlace_Province
            }), new Ext.Panel({
                width: 75,
                layout: 'form',
                items: this._comboBoxTaskCorporationPlace_Town
            }), new Ext.Panel({
                width: 80,
                layout: 'form',
                items: this._comboBoxTaskCorporationPlace_City
            })]
        });

        this.items2[this.items2.length] = this._textFieldManagementType;
        this.items2[this.items2.length] = this._textFieldCreateDateTime;
        this.items2[this.items2.length] = this._textFieldDealDateTimeEnd;
        this.items2[this.items2.length] = new Ext.Panel({
            widht: 500,
            layout: 'column',
            items: [new Ext.Panel({
                width: 200,
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
    }

    Srims.common.OutsourcingEditPanel_Basic.superclass.constructor.call(this, {
        title: '基本信息',
        Height: 350,
        frame: true,
        labelWidth: 120,
        bodyStyle: 'padding:5px 5px 0',
        style: 'margin-bottom: 2px',
        defaultType: 'textfield',
        titleCollapse: true,
        items: [new Ext.Panel({
            widht: 600,
            layout: 'column',
            items: [new Ext.Panel({
                width: 400,
                layout: 'form',
                style: 'width:400px',
                items: this.items1
            }), new Ext.Panel({
                width: 400,
                style: 'width:300px',
                layout: 'form',
                items: this.items2
            })]
        }), this._textFieldBusinessScope, this._textFieldRemark]
    });
    this.assignValues = function() {
        this._outsourcing.set('name', this._textFieldName.getValue());
        this._outsourcing.set('legalRepresentativeName', this._textFieldLegalRepresentativeName.getValue());
        this._outsourcing.set('registeredCapital', this._textFieldRegisteredCapital.getValue());
        this._outsourcing.set('registeredCardNumber', this._textFieldRegisteredCardNumber.getValue());
        this._outsourcing.set('organizationCode', this._textFieldOrganizationCode.getRawValue() + "-" + this._codeNinethNumber.getValue());
        this._outsourcing.set('taxNumber', this._textFieldTaxNumber.getValue());
        this._outsourcing.set('companyType', this._textFieldCompanyType.getValue());
        this._outsourcing.set('managementType', this._textFieldManagementType.getRawValue());
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
        if (!this._userIsExpert)
            this._outsourcing.set('isVerify', "审核通过");
        else {
            if (this._textFieldIsVerify.getValue() == null || this._textFieldIsVerify.getValue() == "" || this._textFieldIsVerify.getValue() == undefined)
                this._outsourcing.set('isVerify', "未审核");
            else
                this._outsourcing.set('isVerify', this._textFieldIsVerify.getValue());
        }
        this._outsourcing.set('address', this._comboBoxTaskCorporationPlace_Province.getValue() + ' ' + this._comboBoxTaskCorporationPlace_Town.getRawValue() + ' ' + this._comboBoxTaskCorporationPlace_City.getRawValue());

    }
    //清除所有输入框
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
        this._comboBoxTaskCorporationPlace_Province.reset();
        this._comboBoxTaskCorporationPlace_Town.reset();
        this._comboBoxTaskCorporationPlace_City.reset();
    }
    //对各输入框进行验证结果进行统计
    this.isValid = function(preventMark) {
        var result = true;
        if (this._userIsExpert) {
            result = this._textFieldName.isValid() && result;
            result = this._textFieldLegalRepresentativeName.isValid() && result;
            result = this._textFieldRegisteredCapital.isValid() && result;
            result = this._textFieldRegisteredCardNumber.isValid(preventMark) && result;
            result = this._textFieldOrganizationCode.isValid() && result;
            result = this._textFieldTaxNumber.isValid() && result;
            result = this._textFieldCompanyType.isValid() && result;
            //result = this._textFieldManagementType.isValid() && result;
            result = this._comboBoxTaskCorporationPlace_Province.isValid() && result;
            result = this._comboBoxTaskCorporationPlace_Town.isValid() && result;
            result = this._comboBoxTaskCorporationPlace_City.isValid() && result;
            //result = this._textFieldCreateDateTime.isValid() && result;
            result = this._textFieldDealDateTimeStart.isValid() && result;
            result = this._textFieldDealDateTimeEnd.isValid() && result;
            //result = this._textFieldBusinessScope.isValid() && result;
            return result;
        }
        else
            return result;
    }
}
Ext.extend(Srims.common.OutsourcingEditPanel_Basic, Ext.form.FormPanel);