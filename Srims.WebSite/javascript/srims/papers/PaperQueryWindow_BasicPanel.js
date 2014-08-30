
if (!Srims.papers) 
    Ext.namespace('Srims.papers');

Srims.papers.PaperQueryWindow_BasicPanel = function(){

    this._textFieldName = new Ext.form.TextField({
        fieldLabel: '论文名称',
        width: 300
    });
    this._comboBoxCollege = new Srims.component.EntityComboBox({
        fieldLabel: '所属学院',
        store: new Srims.experts.DepartmentStore(Srims.service.papers.PaperService + '/GetPaperColleges'),
        displayField: 'name',
        editable: true,
        triggerAction: 'all',
        listWidth: 150,
        width: 150
    });
    this._comboBoxLab = new Srims.component.EntityComboBox({
        fieldLabel: '所属实验室',
        store: new Srims.data.IDValueRecordStore(Srims.service.papers.PaperService + '/GetLabs'),
        displayField: 'name',
        editable: true,
        triggerAction: 'all',
        listWidth: 150,
        width: 150
    });
    this._textFieldAuthor = new Ext.form.TextField({
        fieldLabel: '论文作者',
        width: 150
    });
    this._numberFieldOrder = new Ext.form.NumberField({
        fieldLabel: '作者位次',
        allowNegative: false,
        allowDecimals: false,
        minValue: 1,
        maxLength: 6,
        width: 150
    });
    this._checkBoxIsLinkMan = new Ext.form.Checkbox({
        fieldLabel: '是否通讯作者'
    });
    this._textFieldKeyWord = new Ext.form.TextField({
        fieldLabel: '关键词',
        width: 150
    });
    this._numberFieldInfluenceFactorBegin = new Srims.component.ThousandPercentField({
        fieldLabel: '影响因子',
        maxLength: 6,
        width: 150
    });
    this._numberFieldInfluenceFactorEnd = new Srims.component.ThousandPercentField({
        fieldLabel: '至',
        maxLength: 6,
        width: 150
    });
    this._numberFieldCiteFrequencyBegin = new Ext.form.NumberField({
        fieldLabel: '被引频次',
        allowNegative: false,
        allowDecimals: false,
        maxLength: 6,
        width: 150
    });
    this._numberFieldCiteFrequencyEnd = new Ext.form.NumberField({
        fieldLabel: '至',
        allowNegative: false,
        allowDecimals: false,
        maxLength: 6,
        width: 150
    });
    this._numberFieldPublishYearBegin = new Ext.form.NumberField({
        fieldLabel: '发表年份',
        allowNegative: false,
        allowDecimals: false,
        minLength: 4,
        maxLength: 4,
        maxValue: (new Date()).getFullYear(),
        minValue: 1900,
        width: 150
    });
    this._numberFieldPublishYearEnd = new Ext.form.NumberField({
        fieldLabel: '至',
        allowNegative: false,
        allowDecimals: false,
        minLength: 4,
        maxLength: 4,
        maxValue: (new Date()).getFullYear(),
        minValue: 1900,
        width: 150
    });
    this._numberFieldSubAirerBegin = new Ext.form.NumberField({
        fieldLabel: '分区',
        allowNegative: false,
        allowDecimals: false,
        maxLength: 6,
        width: 150
    });
    this._numberFieldSubAirerEnd = new Ext.form.NumberField({
        fieldLabel: '至',
        allowNegative: false,
        allowDecimals: false,
        maxLength: 6,
        width: 150
    });
    
    var columnFirstItems = [this._comboBoxCollege, this._textFieldAuthor, this._checkBoxIsLinkMan, this._numberFieldInfluenceFactorBegin, this._numberFieldCiteFrequencyBegin, this._numberFieldPublishYearBegin, this._numberFieldSubAirerBegin];
    var columnSecondItems = [this._comboBoxLab, this._numberFieldOrder, this._textFieldKeyWord, this._numberFieldInfluenceFactorEnd, this._numberFieldCiteFrequencyEnd, this._numberFieldPublishYearEnd, this._numberFieldSubAirerEnd];
    
    Srims.papers.PaperQueryWindow_BasicPanel.superclass.constructor.call(this, {
        title: '基本信息',
        frame: true,
        layout: 'form',
        labelWidth: 90,
        width: 680,
        items: [this._textFieldName, new Ext.Panel({
            layout: 'column',
            items: [new Ext.Panel({
                width: 260,
                layout: 'form',
                labelWidth: 90,
                items: columnFirstItems
            }), new Ext.Panel({
                labelWidth: 100,
                layout: 'form',
                items: columnSecondItems
            })]
        })]
    });
    
    this.buildParams = function(params){
        params.name = this._textFieldName.getValue();
        params.collegeName = this._comboBoxCollege.getText();
        params.lab = this._comboBoxLab.getText();
        params.paperAuthorName = this._textFieldAuthor.getValue();
        params.authorOrder = this._numberFieldOrder.getValue();
        params.isLinkMan = this._checkBoxIsLinkMan.checked ? "true" : "";
        params.keyWord = this._textFieldKeyWord.getValue();
        params.influenceFactorOfPaperStart = this._numberFieldInfluenceFactorBegin.getValue();
        params.influenceFactorOfPaperEnd = this._numberFieldInfluenceFactorEnd.getValue();
        params.citeFrequencyOfPaperStart = this._numberFieldCiteFrequencyBegin.getValue();
        params.citeFrequencyOfPaperEnd = this._numberFieldCiteFrequencyEnd.getValue();
        params.publishYearStart = this._numberFieldPublishYearBegin.getValue();
        params.publishYearEnd = this._numberFieldPublishYearEnd.getValue();
        params.SubAirerStart = this._numberFieldSubAirerBegin.getValue();
        params.SubAirerEnd = this._numberFieldSubAirerEnd.getValue();
    }
    
    this.clearParams = function(params){
        this._textFieldName.reset();
        this._comboBoxCollege.reset();
        this._comboBoxLab.reset();
        this._textFieldAuthor.reset();
        this._numberFieldOrder.reset();
        this._checkBoxIsLinkMan.reset();
        this._textFieldKeyWord.reset();
        this._numberFieldInfluenceFactorBegin.reset();
        this._numberFieldInfluenceFactorEnd.reset();
        this._numberFieldCiteFrequencyBegin.reset();
        this._numberFieldCiteFrequencyEnd.reset();
        this._numberFieldPublishYearBegin.reset();
        this._numberFieldPublishYearEnd.reset();
        this._numberFieldSubAirerBegin.reset();
        this._numberFieldSubAirerEnd.reset();
    }
}
Ext.extend(Srims.papers.PaperQueryWindow_BasicPanel, Ext.FormPanel);
