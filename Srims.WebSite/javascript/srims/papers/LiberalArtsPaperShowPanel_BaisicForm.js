
if (!Srims.papers) 
    Ext.namespace("Srims.papers");

Srims.papers.LiberalArtsPaperShowPanel_BasicForm = function(paper) {
    this._paper = paper;

    this._textFieldSerialNumbe = new Ext.form.Field({
    fieldLabel: '序列号',
    value: this._paper.get('serialNumbe'),
        readOnly: true,
        width: 160
    });
    this._numberFieldPublishDateYear = new Ext.form.Field({
    fieldLabel: '发表年',
    value: this._paper.get('publishDateYear'),
        readOnly: true,
        width: 160
    });
    this._textFieldResultsName = new Ext.form.Field({
    fieldLabel: '成果名',
    value: this._paper.get('resultsName'),
        readOnly: true,
        width: 160
    });
    this._comboBoxResultsType = new Ext.form.Field({
    fieldLabel: '成果类别',
    value: Srims.papers.ResultsTypeRender(this._paper.get('resultsType')),
        readOnly: true,
        width: 160
    });
    this._textFieldSourceAuthor = new Ext.form.Field({
    fieldLabel: '来源作者',
    value: this._paper.get('sourceAuthor'),
        readOnly: true,
        width: 160
    });
    this._publishDate = new Ext.form.Field({
    fieldLabel: '第一作者',
    value: this._paper.get('firstAuthor'),
        readOnly: true,
        width: 160
    });
    this._numberFieldCiteTime = new Ext.form.Field({
    fieldLabel: '总被引用次数',
    value: this._paper.get('citeTime'),
        readOnly: true,
        width: 160
    });
    this._textFieldResultsForm = new Ext.form.Field({
    fieldLabel: '成果形式',
    value: this._paper.get('resultsForm'),
        readOnly: true,
        width: 160
    });
    this._textFieldEnglishName = new Ext.form.Field({
    fieldLabel: '英文篇名',
    value: this._paper.get('englishName'),
        readOnly: true,
        width: 460
    });
    this._textFieldDegree = new Ext.form.Field({
        fieldLabel: '文章等级',
        value: this._paper.get('degree'),
        readOnly: true,
        width: 460
    });
    var columnFirstItems = [this._numberFieldPublishDateYear, this._textFieldResultsName,  this._textFieldResultsForm];
    var columnSecondItems = [this._textFieldSerialNumbe, this._comboBoxResultsType, this._numberFieldCiteTime];
    
    Srims.papers.LiberalArtsPaperShowPanel_BasicForm.superclass.constructor.call(this, {
        collapsible: true,
        title: '基本信息',
        Height: 500,
        frame: true,
        labelWidth: 100,
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
}

Ext.extend(Srims.papers.LiberalArtsPaperShowPanel_BasicForm, Ext.form.FormPanel, {});
