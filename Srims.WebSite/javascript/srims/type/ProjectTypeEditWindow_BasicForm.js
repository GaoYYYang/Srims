
if (!Srims.type) 
    Ext.namespace("Srims.type");

Srims.type.ProjectTypeEditWindow_BasicForm = function(projectType){
    this._projectType = projectType;
    
    this._textFieldName = new Ext.form.TextField({
        fieldLabel: '名称',
        value: this._projectType.get('name'),
        allowBlank: false,
        width: 390
    });
    
    this._textFieldShortName = new Ext.form.TextField({
        fieldLabel: '简称',
        value: this._projectType.get('shortName'),
        width: 160
    });
    this._entityComboBoxProjectRank = new Srims.component.EntityComboBox({
        fieldLabel: '项目等级',
        store: new Srims.type.ProjectRankStore(Srims.service.type.ProjectRankService + '/GetAllRanks'),
        displayField: 'name',
        editable: true,
        value: this._projectType.get('projectRank'),
        entityId: this._projectType.get('projectRankID'),
        listWidth: 160,
        allowBlank: false,
        width: 160
    });
    this._numberFieldOverheadExpenseInRate = new Srims.component.PercentField({
        fieldLabel: '校内管理费率',
        value: this._projectType.get('overheadExpenseInRate'),
        width: 160
    });
    this._numberFieldCode = new Ext.form.TextField({
        fieldLabel: '分类代码',
        value: this._projectType.get('code'),
		regex: /(^\d{2}$)/,
        allowDecimals: false,
        allowNegative: false,
        maxLength: 2,
        minLength: 2,
        width: 160
    });
    this._numberFieldPerCode = new Ext.form.NumberField({
        fieldLabel: '原来代码',
        value: this._projectType.get('perCode'),
        allowNegative: false,
        width: 160
    });
    this._textFieldAdministration = new Ext.form.TextField({
        fieldLabel: '专管部门',
        value: this._projectType.get('administration'),
        width: 160
    });
    this._numberFieldOverheadExpenseOutRate = new Srims.component.PercentField({
        fieldLabel: '外协管理费率',
        value: this._projectType.get('overheadExpenseOutRate'),
        width: 160
    });
    this._numberFieldBakCode = new Ext.form.NumberField({
        fieldLabel: '备用代码',
        value: this._projectType.get('bakCode'),
        allowDecimals: false,
        allowNegative: false,
        width: 160
    });
    this._checkBoxIsBudget = new Ext.form.Checkbox({
        fieldLabel: '是否预算制',
        checked: this._projectType.get('isBudget')
    });
    this._checkBoxIsExploit = new Ext.form.Checkbox({
        fieldLabel: '是否同年单账本号',
        checked: this._projectType.get('isExploit')
    });
    this._comboBoxProjectComingFrom = new Ext.form.ComboBox({
        fieldLabel: '项目来源',
        value: this._projectType.get('projectComingFrom'),
        store: Srims.type.projectFormStore,
        displayField: 'name',
        editable: false,
        triggerAction: 'all',
        allowBlank: false,
        listWidth: 160,
        width: 160
    });
    this._comboBoxProjectSubjectNature = new Ext.form.ComboBox({
        fieldLabel: '学科分类',
        value: this._projectType.get('subjectNature'),
        store: Srims.type.projectSubjectNatureStore,
        displayField: 'name',
        editable: false,
        triggerAction: 'all',
        allowBlank: false,
        listWidth: 160,
        width: 160
    });
    this._entityComboBoxManagementFeesType = new Srims.component.GetAllManagementFeesComboBox({
        fieldLabel: '管理费收取类别',
        value: this._projectType.get('managementFeesType'),
        displayField: 'value',
        editable: true,
        listWidth: 600,
        allowBlank: true,
        width: 160
    });
    
    var columnFirstItems = [this._textFieldShortName, this._entityComboBoxProjectRank, this._numberFieldOverheadExpenseInRate, this._numberFieldCode, this._numberFieldPerCode, this._comboBoxProjectComingFrom, this._entityComboBoxManagementFeesType];
    var columnSecondItems = [this._textFieldAdministration, this._numberFieldOverheadExpenseOutRate, this._numberFieldBakCode, this._checkBoxIsExploit, this._checkBoxIsBudget, this._comboBoxProjectSubjectNature];
    Srims.type.ProjectTypeEditWindow_BasicForm.superclass.constructor.call(this, {
        // collapsible: true,
        title: '',
        widht: 600,
        Height: 417,
        frame: true,
        labelWidth: 90,
        bodyStyle: 'padding:5px 5px 0',
        style: 'margin-bottom: 2px',
        defaultType: 'textfield',
        titleCollapse: true,
        items: [this._textFieldName, new Ext.Panel({
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
    
    this.assginValues = function(){
        this._projectType.set('name', this._textFieldName.getValue());
        this._projectType.set('isBudget', this._checkBoxIsBudget.checked ? "true" : "false");
        this._projectType.set('overheadExpenseInRate', this._numberFieldOverheadExpenseInRate.getValue());
        this._projectType.set('overheadExpenseOutRate', this._numberFieldOverheadExpenseOutRate.getValue());
        this._projectType.set('administration', this._textFieldAdministration.getValue());
        this._projectType.set('shortName', this._textFieldShortName.getValue());
        this._projectType.set('code', this._numberFieldCode.getValue());
        this._projectType.set('bakCode', this._numberFieldBakCode.getValue());
        this._projectType.set('perCode', this._numberFieldPerCode.getValue());
        this._projectType.set('isExploit', this._checkBoxIsExploit.checked ? "true" : "false");
        this._projectType.set('projectComingFrom', this._comboBoxProjectComingFrom.getValue());
        this._projectType.set('projectRankID', this._entityComboBoxProjectRank.getValue());
        this._projectType.set('subjectNature', this._comboBoxProjectSubjectNature.getValue());
        this._projectType.set('managementFeesType', this._entityComboBoxManagementFeesType.getValue());
    }
    this.validTextField = function(textField){
        if (textField.getValue().trim().length == 0) {
            Ext.Msg.show({
                title: textField.fieldLabel + '错误',
                msg: '您输入的值有空格，请重新输入。',
                buttons: Ext.Msg.OK,
                icon: Ext.MessageBox.WARNING
            });
            return false;
        }
        return true;
        
    }
    this.isValid = function(preventMark){
        var result = true;
        
        result = this._textFieldName.isValid(preventMark) && result;
        result = this._numberFieldOverheadExpenseInRate.isValid(preventMark) && result;
        result = this._numberFieldOverheadExpenseOutRate.isValid(preventMark) && result;
        result = this._entityComboBoxProjectRank.isValid(preventMark) && result;
        result = this._numberFieldCode.isValid(preventMark) && result;
        result = this._numberFieldCode.isValid(preventMark) && result;
        result = this._numberFieldBakCode.isValid(preventMark) && result;
        result = this._comboBoxProjectSubjectNature.isValid(preventMark) && result;
        result = this._comboBoxProjectComingFrom.isValid(preventMark) && result;
       // result = this._entityComboBoxManagementFeesType.isValid(preventMark) && result;
        result = this.validTextField(this._textFieldName) && result;
        result = this.validTextField(this._textFieldShortName) && result;
        return result;
    }    
}

Ext.extend(Srims.type.ProjectTypeEditWindow_BasicForm, Ext.form.FormPanel, {});

