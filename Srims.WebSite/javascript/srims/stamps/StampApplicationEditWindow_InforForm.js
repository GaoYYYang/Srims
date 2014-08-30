
if (!Srims.stamp) 
    Ext.namespace("Srims.stamp");

Srims.stamp.StampApplicationEditWindow_InforForm = function(stampApplication){

    this._stampApplication = stampApplication;
    var user = Srims.currentLoginLog.user;
    var userIsExpert = user.userRoleType == 'Expert';
    
    this._textFieldKeyWord = new Ext.form.TextField({
        fieldLabel: '关键词',
        value: this._stampApplication.get('keyWord'),
        minLength: 3,
        maxLength: 5,
        width: 150
    });
    this._comboBoxStuffComingFrom = new Srims.component.ProjectSearch.SearchComboBox({
        fieldLabel: '项目来源',
        // isReturn: undefined,
        value: this._stampApplication.get('stampStuffFromID') == 0 ? '' : this._stampApplication.get('stampStuffFromName'),
        selectEntityId: this._stampApplication.get('stampStuffFromID'),
        allowBlank: false,
        listWidth: 370,
        width: 350
    });
    this._textFieldStuffComingFrom = new Ext.form.TextField({
        fieldLabel: '项目来源',
        value: this._stampApplication.get('stampStuffFromName'),
        enabled: this._stampApplication.get('stampStuffFromID') == 0,
        disabled: this._stampApplication.get('stampStuffFromID') > 0,
        allowBlank: false,
        width: 350
    });
    this._textFieldManager = new Srims.component.ExpertSearch.SearchComboBox({
        fieldLabel: '经办人',
        value: !stampApplication.isNew() ? stampApplication.get('manager') : userIsExpert ? user.name : stampApplication.get('manager'),
        allowBlank: true,
        selectEntityId: 0,
        width: 168
    });
    this._numberFieldManagerPhone = new Ext.form.NumberField({
        fieldLabel: '经办人电话',
        value: this._stampApplication.get('managerPhone'),
        allowDecimals: false,
        allowNegative: false,
        width: 150
    });
    this._numberFieldNUmber = new Ext.form.NumberField({
        fieldLabel: '材料份数',
        value: this._stampApplication.get('stuffNumber'),
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
    this._comboBoxStampReason = new Srims.component.NoticeTextComboBox({
        fieldLabel: '盖章事由',
        value: this._stampApplication.get('stampReason'),
        displayField: 'name',
        noticeTextType: 'StampReason',
        editable: false,
        triggerAction: 'all',
        listWidth: 150,
        width: 150
    });
    var columnFirstItems = [this._comboBoxPrincipal, this._textFieldManager, this._comboBoxStampReason];
    var columnSecondItems = [this._textFieldKeyWord, this._numberFieldManagerPhone, this._numberFieldNUmber];
    
    Srims.stamp.StampApplicationEditWindow_InforForm.superclass.constructor.call(this, {
        title: '',
        widht: 600,
        Height: 600,
        frame: true,
        labelWidth: 90,
        bodyStyle: 'padding:5px 5px 0',
        style: 'margin-bottom: 2px',
        defaultType: 'textfield',
        titleCollapse: true,
        items: [this._comboBoxStuffComingFrom, this._textFieldStuffComingFrom, new Ext.Panel({
            widht: 600,
            layout: 'column',
            items: [new Ext.Panel({
                width:300,
                layout: 'form',
                style: 'width:300px',
                items: columnFirstItems
            }), new Ext.Panel({
                width: 300,
                style: 'width:300px',
                layout: 'form',
                items: columnSecondItems
            })]
        })]
    });
    
    this.assginValues = function(){
        this._stampApplication.set('keyWord', this._textFieldKeyWord.getValue());
        this._stampApplication.set('stampStuffFromID', this._comboBoxStuffComingFrom.getValue());
        this._stampApplication.set('stampStuffFromName', this._textFieldStuffComingFrom.getValue());
        this._stampApplication.set('stuffNumber', this._numberFieldNUmber.getValue());
        this._stampApplication.set('stampReason', this._comboBoxStampReason.getValue());
        this._stampApplication.set('manager', this._textFieldManager.getText());
        this._stampApplication.set('managerPhone', this._numberFieldManagerPhone.getValue());
        this._stampApplication.set('principalID', this._comboBoxPrincipal.getValue());
    }
    this._setTextFieldStuffComingFrom = function(){
        if (this._comboBoxStuffComingFrom.getText() == '其他') {
            this._textFieldStuffComingFrom.enable();
            this._textFieldStuffComingFrom.setValue('');
        }
        else {
            this._textFieldStuffComingFrom.disable();
            this._textFieldStuffComingFrom.setValue(this._comboBoxStuffComingFrom.getText());
        }
    }
    this._comboBoxStuffComingFrom.panel = this;
    this._comboBoxStuffComingFrom.on('select', function(){
        var panel = this.panel;
        panel._setTextFieldStuffComingFrom();
    });
    this._setManager = function(){
        var manager = this._textFieldManager.getText();
        if (!manager || manager.trim().length == 0) 
            this._textFieldManager.setValue(this._comboBoxPrincipal.getText());
    }
    this._comboBoxPrincipal.panel = this;
    this._comboBoxPrincipal.on('select', function(){
        var panel = this.panel;
        panel._setManager();
    });
    this.validTextField = function(component, value){
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
    this._validMananger = function(){
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
    this.isValid = function(preventMark){
        var result = true;
        
        result = this._textFieldKeyWord.isValid(preventMark) && result;
        result = this._comboBoxStuffComingFrom.isValid(preventMark) && result;
        result = this._textFieldStuffComingFrom.isValid(preventMark) && result;
        result = this._numberFieldNUmber.isValid(preventMark) && result;
        result = this._comboBoxStampReason.isValid(preventMark) && result;
        result = this._validMananger() && result;
        result = this._numberFieldManagerPhone.isValid(preventMark) && result;
        result = this._comboBoxPrincipal.isValid(preventMark) && result;
        result = this.validTextField(this._textFieldKeyWord, this._textFieldKeyWord.getValue()) && result;
        result = this.validTextField(this._textFieldManager, this._textFieldManager.getText()) && result;
        result = this.validTextField(this._textFieldStuffComingFrom, this._textFieldStuffComingFrom.getValue()) && result;
        return result;
    }
}

Ext.extend(Srims.stamp.StampApplicationEditWindow_InforForm, Ext.form.FormPanel, {});
