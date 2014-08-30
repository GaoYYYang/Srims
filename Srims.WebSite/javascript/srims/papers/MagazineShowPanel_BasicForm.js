
if (!Srims.papers) 
    Ext.namespace('Srims.papers');

Srims.papers.MagazineShowPanel_BasicForm = function(magazine, isPaperShow){
    this._magazine = magazine;
    this._isPaperShow = isPaperShow;
    this._fieldFullName = new Ext.form.Field({
        fieldLabel: '全称',
        value: magazine.get('fullName'),
        readOnly: true,
        width: 500,
        hidden: this._isPaperShow,
        hideLabel: this._isPaperShow
    });
    this._fieldShortName = new Ext.form.Field({
        fieldLabel: '简称',
        value: magazine.get('shortName'),
        readOnly: true,
        width: 160
    });
    this._fieldISSN = new Ext.form.Field({
        fieldLabel: 'ISSN',
        value: magazine.get('issn'),
        readOnly: true,
        width: 160
    });
    this._fieldLanguage = new Ext.form.Field({
        fieldLabel: '语种',
        value: Srims.papers.LanguageRender(magazine.get('language')),
        readOnly: true,
        width: 160
    });
    this._fieldPublishType = new Ext.form.Field({
        fieldLabel: '出版类型',
        value: Srims.papers.PublishTypeRender(magazine.get('publishType')),
        readOnly: true,
        width: 160
    });
    this._fieldSubjectClass = new Ext.form.Field({
        fieldLabel: '学科分类',
        value: magazine.get('subjectClass'),
        readOnly: true,
        width: 160
    });
    this._fieldSubjectRank = new Ext.form.Field({
        fieldLabel: '期刊等级',
        value: magazine.get('subjectRank'),
        readOnly: true,
        width: 160
    });
    this._fieldPublishCompany = new Ext.form.Field({
        fieldLabel: '出版公司',
        value: magazine.get('publishCompany'),
        readOnly: true,
        width: 160,
        hidden: this._isPaperShow,
        hideLabel: this._isPaperShow
    });
    this._fieldPublishCompanyCity = new Ext.form.Field({
        fieldLabel: '公司所在城市',
        value: magazine.get('publishCompanyCity'),
        readOnly: true,
        width: 160,
        hidden: this._isPaperShow,
        hideLabel: this._isPaperShow
    });
    this._fieldPublishCompanyAddress = new Ext.form.Field({
        fieldLabel: '公司地址',
        value: magazine.get('publishCompanyAddress'),
        readOnly: true,
        width: 500,
        hidden: this._isPaperShow,
        hideLabel: this._isPaperShow
    });
    var columnFirstItems = [this._fieldShortName, this._fieldLanguage, this._fieldSubjectClass, this._fieldPublishCompany];
    var columnSecondItems = [this._fieldISSN, this._fieldPublishType, this._fieldSubjectRank, this._fieldPublishCompanyCity];
    
    Srims.papers.MagazineShowPanel_BasicForm.superclass.constructor.call(this, {
        collapsible: true,
        title: '杂志基本信息',
        Height: 500,
        frame: true,
        labelWidth: 80,
        bodyStyle: 'padding:5px 5px 0',
        style: 'margin-bottom: 2px',
        defaultType: 'textfield',
        titleCollapse: true,
        items: [this._fieldFullName, new Ext.Panel({
            width: 600,
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
        }), this._fieldPublishCompanyAddress]
    });
}

Ext.extend(Srims.papers.MagazineShowPanel_BasicForm, Ext.form.FormPanel, {});
