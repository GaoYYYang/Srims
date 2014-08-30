
if (!Srims.bases) 
    Ext.namespace('Srims.bases');

Srims.bases.BaseEditWindow_BasicPanel = function(base){
    this._base = base;
    
    this._fieldName = new Ext.form.TextField({
        fieldLabel: '基地名称',
        noticeTextType: "AwardName",
        value: this._base.get('name'),
        allowBlank: false,
        width: 160
    });
    this._fieldAdministration = new Ext.form.TextField({
        fieldLabel: '主管部门',
        value: this._base.get('administration'),
        width: 160
    });
    this._fieldAddress = new Ext.form.TextField({
        fieldLabel: '地址',
        value: this._base.get('address'),
        width: 160
    });
    this._fieldPhone = new Ext.form.NumberField({
        fieldLabel: '电话',
        value: this._base.get('phone'),
        allowDecimals: false,
        allowNegative: false,
        width: 160
    });
    this._fieldFax = new Ext.form.NumberField({
        fieldLabel: '传真',
        value: this._base.get('fax'),
        allowDecimals: false,
        allowNegative: false,
        width: 160
    });
    this._fieldZip = new Ext.form.NumberField({
        fieldLabel: '邮编',
        value: this._base.get('zip'),
        allowDecimals: false,
        allowNegative: false,
        regex: /^[1-9]\d{5}(?!\d)$/,
        width: 160
    });
    this._fieldRank = new Srims.component.NoticeTextComboBox({
        fieldLabel: '等级',
        value: this._base.get('rank'),
        emptyText: '请选择基地等级',
        noticeTextType: "BaseRank",
        displayField: 'value',
        editable: true,
        triggerAction: 'all',
        listWidth: 160,
        width: 160
    });
    this._checkboxAcademyDirectorIsSchool = new Ext.form.Checkbox({
        fieldLabel: '学术负责人是否是校内专家',
        itemCls: 'base_is_school_expert_checkbox',
        checked: this._base.get('isAcademyDirectorSchoolExpert')
    });
    
    this._comboBoxAcademyDirectorSchoolExpert = new Srims.component.ExpertSearch.SearchComboBox({
        fieldLabel: '校内学术负责人',
        value: this._base.get('isAcademyDirectorSchoolExpert') ? this._base.get('academyDirectorName') : null,
        selectEntityId: this._base.get('isAcademyDirectorSchoolExpert') ? this._base.get('academyDirectorID') : null,
        width: 160,
        disabled: !this._base.get('isAcademyDirectorSchoolExpert')
    });
    this._fieldAcademyDirector = new Ext.form.TextField({
        fieldLabel: '校外学术负责人',
        value: this._base.get('isAcademyDirectorSchoolExpert') ? null : this._base.get('academyDirectorName'),
        width: 160,
        disabled: this._base.get('isAcademyDirectorSchoolExpert')
    });
    this._checkboxDirectorIsSchool = new Ext.form.Checkbox({
        fieldLabel: '负责人是否是校内专家',
        itemCls: 'base_is_school_expert_checkbox',
        checked: this._base.get('isDirectorSchoolExpert')
    });
    this._comboBoxDirectorSchoolExpert = new Srims.component.ExpertSearch.SearchComboBox({
        fieldLabel: '校内负责人',
        value: this._base.get('isDirectorSchoolExpert') ? this._base.get('directorName') : null,
        selectEntityId: this._base.get('isDirectorSchoolExpert') ? this._base.get('directorID') : null,
        width: 160,
        disabled: !this._base.get('isDirectorSchoolExpert')
    });
    this._fieldDirector = new Ext.form.TextField({
        fieldLabel: '校外负责人',
        value: this._base.get('isDirectorSchoolExpert') ? null : this._base.get('directorName'),
        width: 160,
        disabled: this._base.get('isDirectorSchoolExpert')
    });
    //constructor
    var columnOneItems = [this._fieldName, this._fieldRank, this._fieldPhone, this._fieldZip];
    var columnTwoItems = [this._fieldAdministration, this._fieldAddress, this._fieldFax];
    
    Srims.bases.BaseEditWindow_BasicPanel.superclass.constructor.call(this, {
        collapsible: true,
        frame: true,
        layout: 'form',
        labelWidth: 150,
        
        width: 660,
        items: [new Ext.Panel({
            widht: 660,
            labelWidth: 80,
            style: 'padding:5px 0 0 10px',
            layout: 'column',
            items: [new Ext.Panel({
                width: 300,
                layout: 'form',
                labelWidth: 80,
                items: columnOneItems
            }), new Ext.Panel({
                layout: 'form',
                labelWidth: 80,
                items: columnTwoItems
            })]
        }), this._checkboxDirectorIsSchool, new Ext.Panel({
            widht: 660,
            layout: 'column',
            labelWidth: 80,
            style: 'padding:0 0 0 10px',
            items: [new Ext.Panel({
                width: 300,
                layout: 'form',
                labelWidth: 80,
                items: this._comboBoxDirectorSchoolExpert
            }), new Ext.Panel({
                layout: 'form',
                labelWidth: 80,
                items: this._fieldDirector
            })]
        }), this._checkboxAcademyDirectorIsSchool, new Ext.Panel({
            widht: 660,
            layout: 'column',
            labelWidth: 80,
            style: 'padding:0 0 0 10px',
            items: [new Ext.Panel({
                width: 300,
                layout: 'form',
                labelWidth: 80,
                items: this._comboBoxAcademyDirectorSchoolExpert
            }), new Ext.Panel({
                layout: 'form',
                labelWidth: 80,
                items: this._fieldAcademyDirector
            })]
        })]
    });
    
    this.enableComponnent = function(checkbox, checked){
        checkbox.enableComponnent.setDisabled(!checked);
        checkbox.disableComponnent.setDisabled(checked);
    }
    this._checkboxAcademyDirectorIsSchool.enableComponnent = this._comboBoxAcademyDirectorSchoolExpert;
    this._checkboxAcademyDirectorIsSchool.disableComponnent = this._fieldAcademyDirector;
    this._checkboxAcademyDirectorIsSchool.on('check', this.enableComponnent);
    
    this._checkboxDirectorIsSchool.enableComponnent = this._comboBoxDirectorSchoolExpert;
    this._checkboxDirectorIsSchool.disableComponnent = this._fieldDirector;
    this._checkboxDirectorIsSchool.on('check', this.enableComponnent);
    //method
    this.assignValues = function(){
        this._base.set('name', this._fieldName.getValue());
        this._base.set('address', this._fieldAddress.getValue());
        this._base.set('administration', this._fieldAdministration.getValue());
        this._base.set('fax', this._fieldFax.getValue());
        this._base.set('phone', this._fieldPhone.getValue());
        this._base.set('rank', this._fieldRank.getValue());
        this._base.set('zip', this._fieldZip.getValue());
        
        if (this._checkboxAcademyDirectorIsSchool.checked) 
            this._base.set('academyDirectorID', this._comboBoxAcademyDirectorSchoolExpert.getValue());
        else 
            this._base.set('academyDirectorName', this._fieldAcademyDirector.getValue());
        
        if (this._checkboxDirectorIsSchool.checked) 
            this._base.set('directorID', this._comboBoxDirectorSchoolExpert.getValue());
        else 
            this._base.set('directorName', this._fieldDirector.getValue());
    }
    
    this.clearParams = function(){
        this._fieldName.reset();
        this._fieldAddress.reset();
        this._fieldAdministration.reset();
        this._fieldFax.reset();
        this._fieldPhone.reset();
        this._fieldRank.reset();
        this._fieldZip.reset();
        
        this._checkboxAcademyDirectorIsSchool.reset();
        this._comboBoxAcademyDirectorSchoolExpert.reset();
        this._fieldAcademyDirector.reset();
        
        this._checkboxDirectorIsSchool.reset();
        this._comboBoxDirectorSchoolExpert.reset();
        this._fieldDirector.reset();
    }
    
    this.isValid = function(preventMark){
        var result = true;
        result = this._fieldName.isValid(preventMark) && result;
        result = this._fieldZip.isValid(preventMark) && result;
        return result;
    }
}

Ext.extend(Srims.bases.BaseEditWindow_BasicPanel, Ext.FormPanel);

