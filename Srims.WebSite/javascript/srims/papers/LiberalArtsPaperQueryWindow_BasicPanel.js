
if (!Srims.papers) 
    Ext.namespace('Srims.papers');

Srims.papers.LiberalArtsPaperQueryWindow_BasicPanel = function() {

    this._textFieldEnglishName = new Ext.form.TextField({
        fieldLabel: '英文篇名',
        width: 300
    });

    this._textFieldSerialNumbe = new Ext.form.TextField({
        fieldLabel: '序列号',
        width: 150
    });
    this._comboBoxCollege = new Srims.component.EntityComboBox({
        fieldLabel: '所属学院',
        store: new Srims.experts.DepartmentStore(Srims.service.experts.DepartmentService + '/GetAllColleges'),
        displayField: 'name',
        editable: true,
        triggerAction: 'all',
        listWidth: 160,
        width: 144
    });


    this._textFieldResultsForm = new Ext.form.TextField({
        fieldLabel: '成果形式',
        width: 150
    });
    this._numberFieldPublishDateYearBegin = new Ext.form.NumberField({
        fieldLabel: '发表年',
        allowNegative: false,
        allowDecimals: false,
        minLength: 4,
        maxLength: 4,
        maxValue: (new Date()).getFullYear(),
        minValue: 1900,
        width: 150
    });
    this._numberFieldPublishDateYearEnd = new Ext.form.NumberField({
        fieldLabel: '至',
        allowNegative: false,
        allowDecimals: false,
        minLength: 4,
        maxLength: 4,
        maxValue: (new Date()).getFullYear(),
        minValue: 1900,
        width: 150
    });

    this._numberFieldOurSchoolSignRankBegin = new Ext.form.NumberField({
        fieldLabel: '我校署名位次',
        allowDecimals: false,
        allowNegative: false,
        maxLength: 6,
        width: 150
    });
    this._numberFieldOurSchoolSignRankEnd = new Ext.form.NumberField({
        fieldLabel: '至',
        allowDecimals: false,
        allowNegative: false,
        maxLength: 6,
        width: 150
    });

    this._numberFieldCiteTimeBegin = new Ext.form.NumberField({
        fieldLabel: '被引频次',
        allowNegative: false,
        allowDecimals: false,
        maxLength: 6,
        width: 150
    });
    this._numberFieldCiteTimeEnd = new Ext.form.NumberField({
        fieldLabel: '至',
        allowNegative: false,
        allowDecimals: false,
        maxLength: 6,
        width: 150
    });
    
    this._textFieldResultsName = new Ext.form.TextField({
        fieldLabel: '成果名',
        width: 150
    });
    this._checkboxGroupResultsType = new Srims.component.CheckBoxGroup({
        fieldLabel: '成果类别',
        cls: 'srims-checkboxGroup-signUnit',
        items: Srims.component.CheckBoxGroup.getCheckboxGroupItemsFromArray(Srims.papers.ResultsType)
    });


    var columnFirstItems = [this._comboBoxCollege, this._numberFieldPublishDateYearBegin, this._numberFieldOurSchoolSignRankBegin, this._numberFieldCiteTimeBegin, this._textFieldResultsName];
    var columnSecondItems = [this._textFieldSerialNumbe, this._numberFieldPublishDateYearEnd, this._numberFieldOurSchoolSignRankEnd, this._numberFieldCiteTimeEnd, this._textFieldResultsForm];

    Srims.papers.LiberalArtsPaperQueryWindow_BasicPanel.superclass.constructor.call(this, {
        title: '基本信息',
        frame: true,
        layout: 'form',
        labelWidth: 90,
        width: 710,
        items: [this._textFieldEnglishName,
                this._checkboxGroupResultsType,
                new Ext.Panel({
                    widht: 700,
                    layout: 'column',
                    items: [new Ext.Panel({
                        width: 300,
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

    this.buildParams = function(params) {
        params.englishName = this._textFieldEnglishName.getValue();
        params.publishDateYearStart = this._numberFieldPublishDateYearBegin.getValue();
        params.publishDateYearEnd = this._numberFieldPublishDateYearEnd.getValue();
        params.citeTimeStart = this._numberFieldCiteTimeBegin.getValue();
        params.citeTimeEnd = this._numberFieldCiteTimeEnd.getValue();
        params.resultsType = this._checkboxGroupResultsType.getSelecetedValue();
        params.resultsName = this._textFieldResultsName.getValue();
        params.resultsForm = this._textFieldResultsForm.getValue();
        params.serialNumbe = this._textFieldSerialNumbe.getValue();
        params.collegeName = this._comboBoxCollege.getText();

        params.ourSchoolSignRankStart = this._numberFieldOurSchoolSignRankBegin.getValue();
        params.ourSchoolSignRankEnd = this._numberFieldOurSchoolSignRankEnd.getValue();
    }

    this.clearParams = function(params) {
        this._textFieldEnglishName.reset();
        this._numberFieldPublishDateYearBegin.reset();
        this._numberFieldPublishDateYearEnd.reset();
        this._checkboxGroupResultsType.reset();
        this._textFieldResultsName.reset();
        this._textFieldResultsForm.reset();
        this._textFieldSerialNumbe.reset();
        this._numberFieldCiteTimeBegin.reset();
        this._numberFieldCiteTimeEnd.reset();
        this._comboBoxCollege.reset();

        this._numberFieldOurSchoolSignRankBegin.reset();
        this._numberFieldOurSchoolSignRankEnd.reset();
    }
}
Ext.extend(Srims.papers.LiberalArtsPaperQueryWindow_BasicPanel, Ext.FormPanel);
