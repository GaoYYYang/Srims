
if (!Srims.papers)
    Ext.namespace('Srims.papers');

Srims.papers.LiberalArtsPaperEditPanel_BasicForm = function(liberalartspaper) {
    this._paper = liberalartspaper;
    /////必须填的
    this._textFieldSerialNumbe = new Ext.form.TextField({
        fieldLabel: '序列号',
        value: liberalartspaper.get('serialNumbe'),
        width: 160
    });
    this._numberFieldPublishDateYear = new Ext.form.NumberField({
        fieldLabel: '发表年',
        value: liberalartspaper.get('publishDateYear'),
        allowDecimals: false,
        allowNegative: false,
        allowBlank: false,
        minLength: 4,
        maxLength: 4,
        maxValue: (new Date()).getFullYear(),
        minValue: 1900,
        width: 160
    });
    this._textFieldResultsName = new Ext.form.TextField({
        fieldLabel: '成果名',
        value: liberalartspaper.get('resultsName'),
        allowBlank: false,
        width: 160
    });
    this._comboBoxResultsType = new Ext.form.ComboBox({
        fieldLabel: '成果类别',
        value: liberalartspaper.get('resultsType'),
        store: Srims.papers.ResultsType,
        displayField: 'name',
        editable: false,
        triggerAction: 'all',
        allowBlank: false,
        listWidth: 160,
        width: 144
    });

//    this._textFieldSourceAuthor = new Ext.form.TextField({
//        fieldLabel: '来源作者',
//        value: liberalartspaper.get('sourceAuthor'),
//        allowBlank: false,
//        width: 160
//    });
//    this._textFieldFirstAuthor = new Ext.form.TextField({
//        fieldLabel: '第一作者',
//        value: liberalartspaper.get('firstAuthor'),
//        allowBlank: false,
//        width: 160
//    });
    /////不必须填的
    this._numberFieldCiteTime = new Ext.form.NumberField({
        fieldLabel: '总被引用次数',
        value: liberalartspaper.get('citeTime'),
        allowDecimals: false,
        allowNegative: false,
        maxLength: 6,
        width: 160
    });
    this._textFieldResultsForm = new Ext.form.TextField({
        fieldLabel: '成果形式',
        value: liberalartspaper.get('resultsForm'),
        width: 160
    });
    this._textFieldEnglishName = new Ext.form.TextField({
        fieldLabel: '英文篇名',
        value: liberalartspaper.get('englishName'),
        width: 460
    });
    this._textFieldDegree = new Ext.form.TextField({
        fieldLabel: '文章等级',
        value: liberalartspaper.get('degree'),
        width: 460
    });
    var columnFirstItems = [this._numberFieldPublishDateYear, this._textFieldResultsName,  this._textFieldResultsForm];
    var columnSecondItems = [this._textFieldSerialNumbe, this._comboBoxResultsType, this._numberFieldCiteTime];

    Srims.papers.LiberalArtsPaperEditPanel_BasicForm.superclass.constructor.call(this, {
        collapsible: true,
        title: '基本信息',
        Height: 900,
        frame: true,
        labelWidth: 110,
        bodyStyle: 'padding:5px 5px 0',
        style: 'margin-bottom: 2px',
        defaultType: 'textfield',
        titleCollapse: true,
        items: [this._textFieldEnglishName,this._textFieldDegree,
                new Ext.Panel({
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
               })]
    });

    this.assginValues = function() {
        this._paper.set('serialNumbe', this._textFieldSerialNumbe.getValue());
        this._paper.set('publishDateYear', this._numberFieldPublishDateYear.getValue());
        this._paper.set('resultsName', this._textFieldResultsName.getValue());
        this._paper.set('resultsType', this._comboBoxResultsType.getValue());
//        this._paper.set('sourceAuthor', this._textFieldSourceAuthor.getValue());
//        this._paper.set('firstAuthor', this._textFieldFirstAuthor.getValue());
        this._paper.set('citeTime', this._numberFieldCiteTime.getValue());
        this._paper.set('resultsForm', this._textFieldResultsForm.getValue());
        this._paper.set('englishName', this._textFieldEnglishName.getValue());
        this._paper.set('degree', this._textFieldDegree.getValue());
    }
    this.validTextField = function(textField) {
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
    this.isValid = function(preventMark) {
        var result = true;
        result = this._numberFieldPublishDateYear.isValid(preventMark) && result;
        result = this._textFieldResultsName.isValid(preventMark) && result;
        result = this._comboBoxResultsType.isValid(preventMark) && result;
//        result = this._textFieldSourceAuthor.isValid(preventMark) && result;
//        result = this._textFieldFirstAuthor.isValid(preventMark) && result;
        return result;
    }
}
Ext.extend(Srims.papers.LiberalArtsPaperEditPanel_BasicForm, Ext.form.FormPanel, {});
