
if (!Srims.papers) 
    Ext.namespace('Srims.papers');

Srims.papers.MagazineQueryWindow_InforPanel = function(isMagazineQuery){

    this._textFieldName = new Ext.form.TextField({
        fieldLabel: '杂志名称',
        width: 150
    });
    this._textFieldISSN = new Ext.form.TextField({
        fieldLabel: 'ISSN',
        width: 150
    });
    this._numberFieldYear = new Ext.form.NumberField({
        fieldLabel: '年份',
        allowDecimals: false,
        allowNegative: false,
        minLengthText: 4,
        maxLengthText: 4,
        maxValue: (new Date()).getFullYear(),
        minValue: 1900,
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
        allowDecimals: false,
        allowNegative: false,
        maxLength: 6,
        width: 150
    });
    this._numberFieldCiteFrequencyEnd = new Ext.form.NumberField({
        fieldLabel: '至',
        allowDecimals: false,
        allowNegative: false,
        maxLength: 6,
        width: 150
    });
    this._numberFieldSubAirerBegin = new Ext.form.NumberField({
        fieldLabel: '分区',
        allowDecimals: false,
        allowNegative: false,
        maxLength: 6,
        width: 150
    });
    this._numberFieldSubAirerEnd = new Ext.form.NumberField({
        fieldLabel: '至',
        allowDecimals: false,
        allowNegative: false,
        maxLength: 6,
        width: 150
    });
    this._textFieldSubjectClass = new Srims.component.NoticeTextSearch.SearchComboBox({
        fieldLabel: '学科分类',
        noticeTextType: "SubjectClass",
        width: 168
    });
    this._checkboxGroupLanguages = new Srims.component.CheckBoxGroup({
        fieldLabel: '语种',
        cls: 'srims-checkboxGroup',
        columns: 4,
        items: Srims.component.CheckBoxGroup.getCheckboxGroupItemsFromArray(Srims.papers.languageStore)
    });
    this._checkboxGroupSubjectRanks = new Srims.component.CheckBoxGroup({
        fieldLabel: '期刊等级',
        cls: 'srims-checkboxGroup',
        columns: 4,
        items: Srims.papers.MagazineQueryWindow_InforPanel.SubjectRankStore.checkboxGroupItems
    });
    
    var columnFirstItems = [this._textFieldName, this._textFieldSubjectClass];
    var columnSecondItems = [this._textFieldISSN];
    var columnItems = [this._checkboxGroupLanguages];
    if (isMagazineQuery) {
        columnFirstItems[columnFirstItems.length] = this._numberFieldInfluenceFactorBegin;
        columnFirstItems[columnFirstItems.length] = this._numberFieldCiteFrequencyBegin;
        columnFirstItems[columnFirstItems.length] = this._numberFieldSubAirerBegin;
        
        columnSecondItems[columnSecondItems.length] = this._numberFieldYear;
        columnSecondItems[columnSecondItems.length] = this._numberFieldInfluenceFactorEnd;
        columnSecondItems[columnSecondItems.length] = this._numberFieldCiteFrequencyEnd;
        columnSecondItems[columnSecondItems.length] = this._numberFieldSubAirerEnd;
        
        columnItems[columnItems.length] = this._checkboxGroupSubjectRanks;
    }
    
    Srims.papers.MagazineQueryWindow_InforPanel.superclass.constructor.call(this, {
        title: '杂志信息',
        frame: true,
        layout: 'form',
        labelWidth: 60,
        items: [new Ext.Panel({
            layout: 'column',
            items: [new Ext.Panel({
                width: 250,
                layout: 'form',
                labelWidth: 60,
                items: columnFirstItems
            }), new Ext.Panel({
                labelWidth: 60,
                layout: 'form',
                items: columnSecondItems
            })]
        }), new Ext.Panel({
            labelWidth: 60,
            layout: 'form',
            items: columnItems
        })]
    });
    
    this.buildParams = function(params){
        params.fullName = this._textFieldName.getValue();
        params.iSSN = this._textFieldISSN.getValue();
        params.language = this._checkboxGroupLanguages.getSelecetedValue();
        params.subjectClass = this._textFieldSubjectClass.getValue();
        
        if (isMagazineQuery) {
            params.subjectRank = this._checkboxGroupSubjectRanks.getSelecetedValue();
            params.citeFrequencyStart = this._numberFieldCiteFrequencyBegin.getValue();
            params.citeFrequencyEnd = this._numberFieldCiteFrequencyEnd.getValue();
            params.influenceFactorStart = this._numberFieldInfluenceFactorBegin.getValue();
            params.influenceFactorEnd = this._numberFieldInfluenceFactorEnd.getValue();
            params.subAirerStart = this._numberFieldSubAirerBegin.getValue();
            params.subAirerEnd = this._numberFieldSubAirerEnd.getValue();
            params.year = this._numberFieldYear.getValue();
        }
    }
    
    this.clearParams = function(){
        this._textFieldName.reset();
        this._textFieldISSN.reset();
        this._checkboxGroupLanguages.reset();
        this._textFieldSubjectClass.reset();
        if (isMagazineQuery) {
            this._checkboxGroupSubjectRanks.reset();
            this._numberFieldCiteFrequencyBegin.reset();
            this._numberFieldCiteFrequencyEnd.reset();
            this._numberFieldInfluenceFactorBegin.reset();
            this._numberFieldInfluenceFactorEnd.reset();
            this._numberFieldYear.reset();
        }
    }
}
Ext.extend(Srims.papers.MagazineQueryWindow_InforPanel, Ext.FormPanel);

Srims.papers.MagazineQueryWindow_InforPanel.SubjectRankStore = new Srims.data.IDValueRecordStore(Srims.service.papers.MagazineService + '/GetSubjectRank');
Srims.papers.MagazineQueryWindow_InforPanel.SubjectRankStore.load({
    callback: Srims.papers.MagazineQueryWindow_InforPanel.SubjectRankStore.buildCheckboxGroupItems
});

