
if (!Srims.papers) 
    Ext.namespace("Srims.papers");

Srims.papers.PaperShowPanel_BasicForm = function(paper){
    this._paper = paper;
    
    this._paperName = new Ext.form.Field({
        fieldLabel: '论文名称',
        value: this._paper.get('name'),
        readOnly: true,
        width: 460
    });
    this._magazineName = new Ext.form.Field({
        fieldLabel: '杂志名称',
        value: this._paper.get('fullName'),
        readOnly: true,
        width: 460
    });
    this._textFieldResourceName = new Ext.form.Field({
        fieldLabel: '会议名称',
        value: this._paper.get('resourceName'),
        readOnly: true,
        width: 460
    });
    this._paperType = new Ext.form.Field({
        fieldLabel: '文章类型',
        value: Srims.papers.PaperTypeRender(this._paper.get('type')),
        readOnly: true,
        width: 160
    });
    this._paperIndexed = new Ext.form.Field({
        fieldLabel: '论文收录',
        value: this._paper.get('indexed'),
        readOnly: true,
        width: 160
    });
    this._publishYear = new Ext.form.Field({
        fieldLabel: '发表年份',
        value: this._paper.get('publishYear'),
        readOnly: true,
        width: 160
    });
    this._publishDate = new Ext.form.Field({
        fieldLabel: '发表日期',
        value: this._paper.get('publishDate'),
        readOnly: true,
        width: 160
    });
    this._influenceFactor = new Ext.form.Field({
        fieldLabel: '影响因子',
        value: InfluenceFactor.render(this._paper.get('influenceFactorOfPaper')),
        readOnly: true,
        width: 160
    });
    this._citeFrequency = new Ext.form.Field({
        fieldLabel: '被引频次',
        value: this._paper.get('citeFrequencyOfPaper'),
        readOnly: true,
        width: 160
    });
    this._documentNumber = new Ext.form.Field({
        fieldLabel: '期次',
        value: this._paper.get('documentNumber'),
        readOnly: true,
        width: 160
    });
    this._volume = new Ext.form.Field({
        fieldLabel: '卷号',
        value: this._paper.get('volume'),
        readOnly: true,
        width: 160
    });
    this._startPage = new Ext.form.Field({
        fieldLabel: '起始页码',
        value: this._paper.get('startPage'),
        readOnly: true,
        width: 160
    });
    this._endPage = new Ext.form.Field({
        fieldLabel: '终止页码',
        value: this._paper.get('endPage'),
        readOnly: true,
        width: 160
    });
    this._pages = new Ext.form.Field({
        fieldLabel: '页数',
        value: this._paper.get('pages'),
        readOnly: true,
        width: 160
    });
    this._isiIdentifier = new Ext.form.Field({
        fieldLabel: 'ISIIdentifier',
        value: this._paper.get('isiUniqueArticleIdentifier'),
        readOnly: true,
        width: 160
    });
    this._collegeName = new Ext.form.Field({
        fieldLabel: '所属院系',
        value: this._paper.get('collegeName'),
        readOnly: true,
        width: 160
    });
    this._lab = new Ext.form.Field({
        fieldLabel: '所属实验室',
        value: this._paper.get('lab'),
        readOnly: true,
        width: 160
    });
    this._linkManSignUnit = new Ext.form.Field({
        fieldLabel: '通讯作者署名单位',
        value: Srims.papers.SignUnitRender(this._paper.get('linkManSignUnit')),
        readOnly: true,
        width: 160
    });
   
    this._firstAuthorSignUnit = new Ext.form.Field({
        fieldLabel: '第一作者署名单位',
        value: Srims.papers.SignUnitRender(this._paper.get('firstAuthorSignUnit')),
        readOnly: true,
        width: 160
    });
    this._signOrder = new Ext.form.Field({
        fieldLabel: '中国海洋大学位次',
        value: this._paper.get('signOrder'),
        readOnly: true,
        width: 160
    });
    var columnFirstItems = [this._paperType, this._publishYear, this._influenceFactor, this._documentNumber, this._startPage, this._pages, this._collegeName, this._linkManSignUnit];
    var columnSecondItems = [this._paperIndexed, this._publishDate, this._citeFrequency, this._volume, this._endPage, this._isiIdentifier, this._lab, this._firstAuthorSignUnit];
    
    var items = [this._paperName];
    if (paper.get("magazineID") != undefined && paper.get("magazineID")) 
        items[items.length] = this._magazineName;
    else 
        items[items.length] = this._textFieldResourceName;
    
    items[items.length] = new Ext.Panel({
        labelWidth: 100,
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
    });
    items[items.length] = this._signOrder;
    
    Srims.papers.PaperShowPanel_BasicForm.superclass.constructor.call(this, {
        collapsible: true,
        title: '基本信息',
        Height: 500,
        frame: true,
        labelWidth: 100,
        bodyStyle: 'padding:5px 5px 0',
        style: 'margin-bottom: 2px',
        defaultType: 'textfield',
        titleCollapse: true,
        items: items
    });
}

Ext.extend(Srims.papers.PaperShowPanel_BasicForm, Ext.form.FormPanel, {});
