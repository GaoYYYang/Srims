
if (!Srims.papers) 
    Ext.namespace('Srims.papers');

Srims.papers.PaperEditPanel_BasicForm = function(paper){
    this._paper = paper;
    
    this._textFieldName = new Ext.form.TextField({
        fieldLabel: '论文名称',
        value: paper.get('name'),
        allowBlank: false,
        width: 460
    });
    this._entitySearchComboBoxMagazine = new Srims.component.MagazineSearch.SearchComboBox({
        fieldLabel: '杂志期刊',
        value: paper.get('fullName'),
        store: new Srims.papers.MagazineStore(Srims.service.papers.MagazineService + "/SearchMagazine"),
        listWidth: 460,
        selectEntityId: paper.get('magazineID'),
        width: 460
    });
    this._textFieldResourceName = new Ext.form.TextField({
        fieldLabel: '会议名称',
        value: paper.get('resourceName'),
        width: 460
    });
    this._numberFieldPublishYear = new Ext.form.NumberField({
        fieldLabel: '发表年份',
        value: paper.get('publishYear'),
        allowDecimals: false,
        allowNegative: false,
        minLength: 4,
        maxLength: 4,
        maxValue: (new Date()).getFullYear(),
        minValue: 1900,
        width: 160
    });
    this._textFieldPublishDate = new Ext.form.TextField({
        fieldLabel: '发表日期',
        value: paper.get('publishDate'),
        width: 160
    });
    // this._numberFieldInfluenceFactor = new Srims.component.ThousandPercentField({
    //     fieldLabel: '影响因子',
    //     value: paper.get('influenceFactorOfPaper'),
    //     maxLength: 6,
    //    width: 160
    // });
    this._numberFieldCiteFrequency = new Ext.form.NumberField({
        fieldLabel: '被引频次',
        value: paper.get('citeFrequencyOfPaper'),
        allowDecimals: false,
        allowNegative: false,
        maxLength: 6,
        width: 160
    });
    this._textFieldDocumentNumber = new Ext.form.TextField({
        fieldLabel: '文档编号',
        value: paper.get('documentNumber'),
        width: 160
    });
    this._textFieldVolume = new Ext.form.TextField({
        fieldLabel: '期/卷',
        value: paper.get('volume'),
        width: 160
    });
    this._numberFieldStartPage = new Ext.form.NumberField({
        fieldLabel: '起始页码',
        value: paper.get('startPage'),
        allowDecimals: false,
        allowNegative: false,
        minValue: 1,
        maxLength: 6,
        width: 160
    });
    this._numberFieldEndPage = new Ext.form.NumberField({
        fieldLabel: '终止页码',
        value: paper.get('endPage'),
        allowDecimals: false,
        allowNegative: false,
        minValue: 1,
        maxLength: 6,
        width: 160
    });
    this._numberFieldPages = new Ext.form.NumberField({
        fieldLabel: '页数',
        value: paper.get('pages'),
        allowDecimals: false,
        allowNegative: false,
        readOnly: true,
        maxLength: 6,
        width: 160
    });
    this._textFieldIsiUniqueArticleIdentifier = new Ext.form.TextField({
        fieldLabel: 'ISIIdentifier',
        value: paper.get('isiUniqueArticleIdentifier'),
        width: 160
    });
    this._comboBoxType = new Ext.form.ComboBox({
        fieldLabel: '文章类型',
        value: paper.get('type'),
        store: Srims.papers.paperTypeStore,
        displayField: 'name',
        editable: false,
        triggerAction: 'all',
        allowBlank: false,
        listWidth: 160,
        width: 144
    });
    this._comboBoxCollege = new Srims.component.EntityComboBox({
        fieldLabel: '所属学院',
        value: paper.get('collegeName'),
        store: new Srims.experts.DepartmentStore(Srims.service.experts.DepartmentService + '/GetAllColleges'),
        displayField: 'name',
        entityId: paper.get('collegeID'),
        editable: true,
        triggerAction: 'all',
        listWidth: 160,
        width: 144
    });
    this._comboBoxLab = new Srims.component.NoticeTextComboBox({
        fieldLabel: '所属实验室',
        value: paper.get('lab'),
        displayField: 'name',
        noticeTextType: 'Lab',
        editable: false,
        triggerAction: 'all',
        listWidth: 160,
        width: 144
    });
    this._comboBoxLinkManSignUnit = new Ext.form.ComboBox({
        fieldLabel: '通讯作者署名单位',
        value: paper.get('linkManSignUnit'),
        store: Srims.papers.signUnitStore,
        displayField: 'name',
        editable: false,
        triggerAction: 'all',
        allowBlank: false,
        listWidth: 160,
        width: 144
    });
  
    this._comboBoxFirstAuthorSignUnit = new Ext.form.ComboBox({
        fieldLabel: '第一作者署名单位',
        value: paper.get('firstAuthorSignUnit'),
        store: Srims.papers.signUnitStore,
        displayField: 'name',
        editable: false,
        triggerAction: 'all',
        allowBlank: false,
        listWidth: 160,
        width: 144
    });
    this._numberFieldSignOrder = new Ext.form.NumberField({
        fieldLabel: '我校署名位次',
        value: paper.get('signOrder'),
        allowDecimals: false,
        allowNegative: false,
        maxLength: 6,
        width: 160
    });
    // this._numberFieldSubAirer = new Ext.form.NumberField({
    //     fieldLabel: '所属分区',
    //     value: paper.get('subAirer'),
    //     allowDecimals: false,
    //     allowNegative: false,
    //    maxLength: 6,
    //width: 160
    //  });
    this._checkboxGroupIndexed = new Srims.component.CheckBoxGroup({
        fieldLabel: '论文收录',
        cls: 'srims-checkboxGroup',
        columns: 5,
        items: Srims.component.CheckBoxGroup.getCheckboxGroupItemsFromArray(Srims.papers.paperIndexedTypeStore, this._paper.get("indexedString"))
    });
    var columnFirstItems = [this._comboBoxType, this._numberFieldPublishYear, this._textFieldDocumentNumber, this._numberFieldStartPage, this._numberFieldPages, this._comboBoxCollege, this._comboBoxLinkManSignUnit, this._numberFieldSignOrder];
    var columnSecondItems = [this._textFieldPublishDate, this._numberFieldCiteFrequency, this._textFieldVolume, this._numberFieldEndPage, this._textFieldIsiUniqueArticleIdentifier, this._comboBoxLab, this._comboBoxFirstAuthorSignUnit];
    
    Srims.papers.PaperEditPanel_BasicForm.superclass.constructor.call(this, {
        collapsible: true,
        title: '基本信息',
        Height: 900,
        frame: true,
        labelWidth: 110,
        bodyStyle: 'padding:5px 5px 0',
        style: 'margin-bottom: 2px',
        defaultType: 'textfield',
        titleCollapse: true,
        items: [this._textFieldName, this._entitySearchComboBoxMagazine,this._textFieldResourceName, new Ext.Panel({
            widht: 600,
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
        }), this._checkboxGroupIndexed]
    });
    
    this.assginValues = function(){
        this._paper.set('name', this._textFieldName.getValue());
        this._paper.set('magazineID', this._entitySearchComboBoxMagazine.getValue());
        this._paper.set('resourceName', this._textFieldResourceName.getValue()); 
        this._paper.set('publishYear', this._numberFieldPublishYear.getValue());
        this._paper.set('publishDate', this._textFieldPublishDate.getValue());
        // this._paper.set('influenceFactorOfPaper', this._numberFieldInfluenceFactor.getValue());
        this._paper.set('citeFrequencyOfPaper', this._numberFieldCiteFrequency.getValue());
        this._paper.set('documentNumber', this._textFieldDocumentNumber.getValue());
        this._paper.set('volume', this._textFieldVolume.getValue());
        this._paper.set('startPage', this._numberFieldStartPage.getValue());
        this._paper.set('endPage', this._numberFieldEndPage.getValue());
        this._paper.set('pages', this._numberFieldPages.getValue());
        this._paper.set('isiUniqueArticleIdentifier', this._textFieldIsiUniqueArticleIdentifier.getValue());
        this._paper.set('type', this._comboBoxType.getValue());
        this._paper.set('collegeID', this._comboBoxCollege.getValue());
        this._paper.set('lab', this._comboBoxLab.getValue());
        this._paper.set('linkManSignUnit', this._comboBoxLinkManSignUnit.getValue());
        this._paper.set('firstAuthorSignUnit', this._comboBoxFirstAuthorSignUnit.getValue());
        this._paper.set('signOrder', this._numberFieldSignOrder.getValue());
        // this._paper.set('subAirer', this._numberFieldSubAirer.getValue());
        this._paper.set('indexedString', this._checkboxGroupIndexed.getSelecetedValue());
    }
    this.validTextField = function(textField){
        if (textField.getValue().trim().length == 0) {
            Ext.Msg.show({
                title: textField.fieldLabel + '错误',
                msg: '您输入的值只有空格，请重新输入。',
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
        result = this._entitySearchComboBoxMagazine.isValid(preventMark) && result;
        result = this._numberFieldPublishYear.isValid(preventMark) && result;
        result = this._textFieldPublishDate.isValid(preventMark) && result;
        // result = this._numberFieldInfluenceFactor.isValid(preventMark) && result;
        result = this._numberFieldCiteFrequency.isValid(preventMark) && result;
        result = this._textFieldVolume.isValid(preventMark) && result;
        result = this._textFieldIsiUniqueArticleIdentifier.isValid(preventMark) && result;
        result = this._comboBoxType.isValid(preventMark) && result;
        result = this._comboBoxCollege.isValid(preventMark) && result;
        result = this._comboBoxLab.isValid(preventMark) && result;
        result = this._comboBoxLinkManSignUnit.isValid(preventMark) && result;
        result = this._comboBoxFirstAuthorSignUnit.isValid(preventMark) && result;
        result = this._numberFieldSignOrder.isValid(preventMark) && result;
        // result = this._numberFieldSubAirer.isValid(preventMark) && result;
        result = this._checkboxGroupIndexed.isValid(preventMark) && result;
        result = this.validTextField(this._textFieldName) && result;
        return result;
    }
    this._setPages = function(){
        var result = true;
        var preventMark = false;
        result = this.isValid(preventMark) && result;
        result = this._numberFieldStartPage.isValid(preventMark) && result;
        if (result && this._numberFieldEndPage.getValue() && this._numberFieldStartPage.getValue()) {
            if (this._numberFieldStartPage.getValue() - this._numberFieldEndPage.getValue() > 0) {
                Ext.Msg.show({
                    title: '页码错误',
                    msg: '起始页码大于终止页码，请重新输入。',
                    buttons: Ext.Msg.OK,
                    icon: Ext.MessageBox.WARNING
                });
            }
            else 
                this._numberFieldPages.setValue(this._numberFieldEndPage.getValue() - this._numberFieldStartPage.getValue() + 1);
        }
        else 
            this._numberFieldPages.setValue(undefined);
    }
    this._numberFieldEndPage.panel = this;
    this._numberFieldEndPage.on('blur', function(){
        var panel = this.panel;
        panel._setPages();
    });
    this._numberFieldStartPage.panel = this;
    this._numberFieldStartPage.on('blur', function(){
        var panel = this.panel;
        panel._setPages();
    });
}
Ext.extend(Srims.papers.PaperEditPanel_BasicForm, Ext.form.FormPanel, {});
