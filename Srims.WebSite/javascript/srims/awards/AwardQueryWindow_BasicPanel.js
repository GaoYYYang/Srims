
if (!Srims.awards) 
    Ext.namespace("Srims.awards");
if (!Srims.experts) 
    Ext.namespace("Srims.experts");

Srims.awards.AwardQueryWindow_BasicPanel = function(){
    this._textFieldAwardProjectName = new Ext.form.TextField({
        fieldLabel: '奖励项目名称',
        width: 300
    });
    this._textFieldAwardName = new Ext.form.TextField({
        fieldLabel: '奖励名称',
        width: 150
    });
    this._textFieldAwardWinner = new Ext.form.TextField({
        fieldLabel: '获奖人',
        width: 150
    });
    this._numberFieldAwardWinnerRank = new Ext.form.NumberField({
        fieldLabel: '位次',
        allowNegative: false,
        allowDecimals: false,
        minValue: 1,
        width: 150
    });
    this._numberFieldAwardYearStart = new Ext.form.NumberField({
        fieldLabel: '年度',
        allowNegative: false,
        allowDecimals: false,
        maxValue: (new Date()).getFullYear(),
        minValue: 1900,
        width: 150
    });
    this._numberFieldAwardYearEnd = new Ext.form.NumberField({
        fieldLabel: '至',
        allowNegative: false,
        allowDecimals: false,
        maxValue: (new Date()).getFullYear(),
        minValue: 1900,
        width: 150
    });
    this._comboBoxCollege = new Srims.component.EntityComboBox({
        fieldLabel: '所属学院',
        store: new Srims.experts.DepartmentStore(Srims.service.experts.DepartmentService + '/GetAllColleges'),
        displayField: 'name',
        editable: false,
        triggerAction: 'all',
        listWidth: 150,
        width: 150
    });
    this._comboBoxSubjectNature = new Ext.form.ComboBox({
        fieldLabel: '学科分类',
        store: Srims.subjectNatureStore,
        displayField: 'name',
        editable: true,
        triggerAction: 'all',
        listWidth: 150,
        width: 150
    });
    
    this._columnOne = [this._textFieldAwardName, this._numberFieldAwardYearStart, this._textFieldAwardWinner, this._comboBoxSubjectNature];
    this._columnTwo = [this._numberFieldAwardWinnerRank, this._numberFieldAwardYearEnd, this._comboBoxCollege];
    
    Srims.awards.AwardQueryWindow_BasicPanel.superclass.constructor.call(this, {
        title: '基本信息',
        frame: true,
        layout: 'form',
        labelWidth: 90,
        width: 681,
        items: [this._textFieldAwardProjectName, new Ext.Panel({
            layout: 'column',
            items: [new Ext.Panel({
                width: 300,
                layout: 'form',
                labelWidth: 90,
                items: this._columnOne
            }), new Ext.Panel({
                labelWidth: 75,
                layout: 'form',
                items: this._columnTwo
            })]
        })]
    });
    this.buildParams = function(params){
        var subjectNatureName = this._comboBoxSubjectNature.getRawValue();
        if (!String.isEmpty(subjectNatureName)) 
            params.subjectNature = this._comboBoxSubjectNature.getValue();
        else 
            params.subjectNature = ''
        
        params.Name = this._textFieldAwardName.getValue();
        params.ProjectName = this._textFieldAwardProjectName.getValue();
        params.AwardWinnerName = this._textFieldAwardWinner.getValue();
        params.AwardWinnerOrder = this._numberFieldAwardWinnerRank.getValue();
        params.YearStart = this._numberFieldAwardYearStart.getValue();
        params.YearEnd = this._numberFieldAwardYearEnd.getValue();
        params.collegeName = this._comboBoxCollege.getText();
    }
    this.clearParams = function(params){
        this._textFieldAwardName.reset();
        this._textFieldAwardProjectName.reset();
        this._textFieldAwardWinner.reset();
        this._numberFieldAwardWinnerRank.reset();
        this._numberFieldAwardYearStart.reset();
        this._numberFieldAwardYearEnd.reset();
        this._comboBoxSubjectNature.reset();
    }
    this.isValid = function(preventMark){
        var result = true;
        result = this._numberFieldAwardYearStart.isValid(preventMark) && result;
        result = this._numberFieldAwardYearEnd.isValid(preventMark) && result;
        return result;
    }
}
Ext.extend(Srims.awards.AwardQueryWindow_BasicPanel, Ext.FormPanel);

