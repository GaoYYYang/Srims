if (!Srims.stamp)
    Ext.namespace("Srims.stamp");

Srims.stamp.StampApplicationEditPanel_BasicForm = function(stampApplication, isNew) {

    this._stampApplication = stampApplication;
    var user = Srims.currentLoginLog.user;
    this._isNew = isNew;
    var userIsExpert = user.userRoleType == 'Expert';


    this._textFieldKeyWord = new Ext.form.TextField({
        fieldLabel: '关键词',
        value: this._stampApplication.get('keyWord'),
        width: 150
    });
    this._comboBoxStuffComingFrom = new Srims.component.ProjectSearch.SearchComboBox({
        fieldLabel: '项目来源',
        // isReturn: undefined,
        value: this._stampApplication.get('stampStuffFromID') == 0 ? '' : this._stampApplication.get('stampStuffFromName'),
        disabled: !this._stampApplication.get('isProjectRelated'),
        selectEntityId: this._stampApplication.get('stampStuffFromID'),
        allowBlank: false,
        listWidth: 370,
        width: 360
    });
    this._textFieldStuffComingFrom = new Ext.form.TextField({
        fieldLabel: '项目来源(其他)',
        value: this._stampApplication.get('stampStuffFromName'),
        //   disabled: !this._stampApplication.get('isProjectRelated'),
        allowBlank: false,
        width: 360
    });

    this._textFieldManager = new Srims.component.ExpertSearch.SearchComboBox({
        fieldLabel: '经办人',
        value: !stampApplication.isNew() ? stampApplication.get('manager') : userIsExpert ? user.name : stampApplication.get('manager'),
        allowBlank: false,
        selectEntityId: 0,
        width: 168
    });
    this._numberFieldManagerPhone = new Ext.form.NumberField({
        fieldLabel: '经办人电话',
        value: this._stampApplication.get('managerPhone'),
        allowDecimals: false,
        allowNegative: false,
        allowBlank: false,
        width: 150
    });
    this._textFieldManagerEmail = new Ext.form.TextField({
        fieldLabel: '经办人邮箱',
        value: this._stampApplication.get('managerEmail'),
        allowDecimals: false,
        allowNegative: false,
        allowBlank: false,
        width: 168
    });
    this._numberFieldNUmber = new Ext.form.NumberField({
        fieldLabel: '材料份数',
        value: this._stampApplication.isNew() ? '1' : this._stampApplication.get('stuffNumber'),
        allowDecimals: false,
        allowNegative: false,
        allowBlank: false,
        width: 150
    });
    this._comboBoxPrincipal = new Srims.component.ExpertSearch.SearchComboBox({
        fieldLabel: '负责人',
        width: 168,
        value: !stampApplication.isNew() ? stampApplication.get('principal') : userIsExpert ? user.name : stampApplication.get('principal'),
        selectEntityId: !stampApplication.isNew() ? stampApplication.get('principalID') : userIsExpert ? user.expertId : stampApplication.get('principalID'),
        allowBlank: false,
        disabled: userIsExpert,
        editable: !userIsExpert
    });

    this._comboBoxGroup = new Srims.component.EntityComboBox({
        fieldLabel: '文印申请类型组',
        editable: false,
        store: new Srims.stamp.StampApplicationTypeGroupStore(Srims.service.stamp.StampApplicationTypeGroupService + '/Query', {}),
        displayField: 'name',
        value: this._stampApplication.get('stampApplicationTypeGroupName'),
        entityId: this._stampApplication.get('stampApplicationTypeGroupID'),
        allowBlank: false,
        width: 150
    });
    this._comboBoxProjectRelated = new Srims.component.EntityComboBox({
        fieldLabel: '文印申请类型',
        editable: false,
        store: new Srims.stamp.StampApplicationTypeStoreForGroup(),
        displayField: 'name',
        mode: 'local',
        value: this._stampApplication.get('stampApplicaitonTypeName'),
        entityId: this._stampApplication.get('stampApplicaitonTypeID'),
        allowBlank: false,
        width: 150
    });

    this._isDuplexPrint = new Ext.form.Checkbox({
        fieldLabel: '双面打印',
        checked: this._stampApplication.get('isDuplexPrint')
    });
    this._sealPerforation = new Ext.form.Checkbox({
        fieldLabel: '骑缝章',
        checked: this._stampApplication.get('sealPerforation')
    });
    this._expertPrint = new Ext.form.Checkbox({
        fieldLabel: '专家自行打印',
        checked: this._stampApplication.get('expertPrint')
    });

    var columnFirstItems = [this._comboBoxPrincipal, this._textFieldManager, this._textFieldManagerEmail, this._expertPrint];
    var columnSecondItems = [this._textFieldKeyWord, this._numberFieldManagerPhone, this._numberFieldNUmber, this._sealPerforation, this._isDuplexPrint];

    Srims.stamp.StampApplicationEditPanel_BasicForm.superclass.constructor.call(this, {
        title: '文印基本信息',
        widht: 600,
        Height: 450,
        frame: true,
        labelWidth: 90,
        layout: 'form',
        bodyStyle: 'padding:5px 5px 0',
        style: 'margin-bottom: 2px',
        defaultType: 'textfield',
        titleCollapse: true,
        items: [this._comboBoxGroup, this._comboBoxProjectRelated, this._comboBoxStuffComingFrom, this._textFieldStuffComingFrom, new Ext.Panel({
            labelWidth: 90,
            widht: 600,
            layout: 'column',
            items: [new Ext.Panel({
                width: 300,
                layout: 'form',
                style: 'width:350px',
                items: columnFirstItems
            }), new Ext.Panel({
                width: 300,
                style: 'width:350px',
                layout: 'form',
                items: columnSecondItems
            })]
        })]
    });
    // //级联选择
    this._comboBoxGroup.comboBoxProjectRelated = this._comboBoxProjectRelated;

    if (stampApplication.get('stampApplicationTypeGroupID')) {
        this._comboBoxProjectRelated.store.load({
            params: {
                ID: stampApplication.get('stampApplicationTypeID')
            }
        });
    }
    else {
        this._comboBoxProjectRelated.disable();
    }

    //method
    this.assginValues = function() {
        this._stampApplication.set('keyWord', this._textFieldKeyWord.getValue());
        this._stampApplication.set('stampStuffFromID', this._comboBoxStuffComingFrom.getValue());
        this._stampApplication.set('stampStuffFromName', this._textFieldStuffComingFrom.getValue());
        this._stampApplication.set('stuffNumber', this._numberFieldNUmber.getValue());
        // this._stampApplication.set('stampReason', this._comboBoxStampReason.getValue());
        this._stampApplication.set('manager', this._textFieldManager.getText());
        this._stampApplication.set('managerPhone', this._numberFieldManagerPhone.getValue());
        this._stampApplication.set('managerEmail', this._textFieldManagerEmail.getValue());
        this._stampApplication.set('principalID', this._comboBoxPrincipal.getValue());
        this._stampApplication.set('principal', this._comboBoxPrincipal.getText());
        this._stampApplication.set('isDuplexPrint', this._isDuplexPrint.getValue());
        this._stampApplication.set('sealPerforation', this._sealPerforation.getValue());
        this._stampApplication.set('expertPrint', this._expertPrint.getValue());
        this._stampApplication.set('stampApplicationTypeID', this._comboBoxProjectRelated.getValue());
        this._stampApplication.set('stampApplicationTypeName', this._comboBoxProjectRelated.getText());
        this._stampApplication.set('stampApplicationTypeGroupID', this._comboBoxGroup.getValue());
        this._stampApplication.set('stampApplicationTypeGroupName', this._comboBoxGroup.getText());
    }
    this._setTextFieldStuffComingFrom = function() {
        if (this._comboBoxStuffComingFrom.getText() == '其他') {
            this._comboBoxStuffComingFrom.clearValue();
            Ext.Msg.show({
                title: '请选择项目',
                msg: '请输入项目名称或者负责人，选择一个具体的项目。',
                buttons: Ext.Msg.OK,
                icon: Ext.MessageBox.WARNING
            });
        } else {
            this._textFieldStuffComingFrom.setValue(this._comboBoxStuffComingFrom.getText());
        }
    }
    this._comboBoxStuffComingFrom.panel = this;
    this._comboBoxStuffComingFrom.on('select', function() {
        var panel = this.panel;
        panel._setTextFieldStuffComingFrom();
    });
    this._setManager = function() {
        var manager = this._textFieldManager.getText();
        if (!manager || manager.trim().length == 0)
            this._textFieldManager.setValue(this._comboBoxPrincipal.getText());
    }
    this._comboBoxPrincipal.panel = this;
    this._comboBoxPrincipal.on('select', function() {
        var panel = this.panel;
        panel._setManager();
    });
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
    this._validMananger = function() {
        if (!this._textFieldManager.getText()) {
            Ext.Msg.show({
                title: '',
                msg: '经办人不能为空，请输入。',
                buttons: Ext.Msg.OK,
                icon: Ext.MessageBox.WARNING
            });
            return false;
        }
        return true;

    }
    this.isValid = function(preventMark) {
        var result = true;

        result = this._textFieldKeyWord.isValid(preventMark) && result;
        if (!this._stampApplicationChange) {
            result = this._comboBoxStuffComingFrom.isValid(preventMark) && result;
        }
        result = this._textFieldStuffComingFrom.isValid(preventMark) && result;
        result = this._numberFieldNUmber.isValid(preventMark) && result;
        result = this._validMananger() && result;
        result = this._numberFieldManagerPhone.isValid(preventMark) && result;
        result = this._textFieldManagerEmail.isValid(preventMark) && result;
        result = this._comboBoxPrincipal.isValid(preventMark) && result;
        result = this.validTextField(this._textFieldKeyWord, this._textFieldKeyWord.getValue()) && result;
        result = this.validTextField(this._textFieldManager, this._textFieldManager.getText()) && result;
        result = this.validTextField(this._textFieldStuffComingFrom, this._textFieldStuffComingFrom.getValue()) && result;
        result = this._comboBoxGroup.isValid(preventMark) && result;
        if (this._stampApplicationChange) {
            result = this._comboBoxProjectRelated.isValid(preventMark) && result;
        }

        return result;
    }

    this._onComboBoxGroup_select = function(comboBox) {
        var GroupId = comboBox.getValue();
        var comboBoxProjectRelated = comboBox.comboBoxProjectRelated;

        comboBoxProjectRelated.setValue(undefined);
        if (GroupId == undefined) {
            comboBoxProjectRelated.disable();
            comboBoxProjectRelated.store.removeAll();
        }
        else {
            comboBoxProjectRelated.enable();
            comboBoxProjectRelated.setValue(undefined);
            comboBoxProjectRelated.store.load({
                params: {
                    stampApplicationTypeGroupID: GroupId
                }
            });
        }
    }


    //event
    this._comboBoxProjectRelated.setSelectEntityId(this._stampApplication.get('stampApplicationTypeID'));
    this._comboBoxProjectRelated.setValue(this._stampApplication.get('stampApplicationTypeName'));
    this._comboBoxGroup.on('select', this._onComboBoxGroup_select);
    this._comboBoxGroup.on('change', function(comboBox) {
        comboBox.fireEvent('select', comboBox);
    });

    this._stampApplicationChange = function(comboBox) {
        var stampApplicationType = comboBox.getEntity();
        if (stampApplicationType.get('isProjectRelated')) {
            this._textFieldStuffComingFrom.disable();
            this._comboBoxStuffComingFrom.enable();
        }
        else {
            this._comboBoxStuffComingFrom.disable();
            this._textFieldStuffComingFrom.enable();
            this._comboBoxStuffComingFrom.setSelectEntityId(undefined);
            this._comboBoxStuffComingFrom.setValue(undefined);


        }
        return stampApplicationType.get('isProjectRelated');
    }
    this._comboBoxProjectRelated._comboBoxStuffComingFrom = this._comboBoxStuffComingFrom;
    this._comboBoxProjectRelated._textFieldStuffComingFrom = this._textFieldStuffComingFrom;

    this._comboBoxProjectRelated.on('select', this._stampApplicationChange);

    this._comboBoxProjectRelated.on('select', this._stampApplicationChange);

    this.next = function() {
        if (this.isValid(false) == false)
            return;
        this.assginValues();
        this.panel.panel._panelShow._basicPanel.resetValues(this._stampApplication);
        Srims.expertGuide.next(this);
    }
}
Ext.extend(Srims.stamp.StampApplicationEditPanel_BasicForm, Ext.form.FormPanel, {});