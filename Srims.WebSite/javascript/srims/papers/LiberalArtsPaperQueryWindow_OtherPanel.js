
if (!Srims.papers) 
    Ext.namespace('Srims.papers');

Srims.papers.LiberalArtsPaperQueryWindow_OtherPanel = function() {
this._textFieldPublisher = new Ext.form.TextField({
    fieldLabel: '期刊名或出版社',
    allowBlank: false,
    width: 460
});
this._textFieldISSN = new Ext.form.TextField({
    fieldLabel: 'ISSN',
    width: 160
});
this._textFieldIssuesDate = new Ext.form.TextField({
    fieldLabel: '年代卷期 ',
    width: 160
});
this._textFieldCODEN = new Ext.form.TextField({
    fieldLabel: '期刊代码',
    width: 160
});
this._textFieldDegreeType = new Ext.form.TextField({
    fieldLabel: '学位分类 ',
    width: 160
});


this._textFieldFirstOrganization = new Ext.form.TextField({
    fieldLabel: '第一机构',
    width: 160
});
this._textFieldOrganizationName = new Ext.form.TextField({
    fieldLabel: '机构名称',
    width: 160
});
this._textFieldRegion = new Ext.form.TextField({
    fieldLabel: '地区',
    width: 160
});
this._textFieldSubjectClass = new Ext.form.TextField({
    fieldLabel: '学科分类',
    width: 160
});



this._textFieldFund = new Ext.form.TextField({
    fieldLabel: '基金',
    width: 160
});
this._textFieldFundType = new Ext.form.TextField({
    fieldLabel: '基金类别',
    width: 160
});



var columnFirstItems = [this._textFieldISSN, this._textFieldCODEN, this._textFieldFirstOrganization, this._textFieldRegion,  this._textFieldFund];
var columnSecondItems = [this._textFieldIssuesDate, this._textFieldDegreeType, this._textFieldOrganizationName, this._textFieldSubjectClass,  this._textFieldFundType];


    Srims.papers.LiberalArtsPaperQueryWindow_OtherPanel.superclass.constructor.call(this, {
        title: '其他信息',
        frame: true,
        layout: 'form',
        labelWidth: 100,
        width: 710,
        items: [this._textFieldPublisher, new Ext.Panel({
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
    
    this.buildParams = function(params){
    params.publisher= this._textFieldPublisher.getValue();
    params.issn=this._textFieldISSN.getValue();
    params.issuesDate= this._textFieldIssuesDate.getValue();
    params.coden= this._textFieldCODEN.getValue();
    params.degreeType= this._textFieldDegreeType.getValue();

    params.firstOrganization= this._textFieldFirstOrganization.getValue();
    params.organizationName=this._textFieldOrganizationName.getValue();
    params.region=this._textFieldRegion.getValue();
    params.subjectClass=this._textFieldSubjectClass.getValue();

    params.fund=this._textFieldFund.getValue();
    params.fundType=this._textFieldFundType.getValue();

    }

    this.clearParams = function(params) {
    this._textFieldPublisher.reset();
    this._textFieldISSN.reset();
    this._textFieldIssuesDate.reset();
    this._textFieldCODEN.reset();
    this._textFieldDegreeType.reset();

    this._textFieldFirstOrganization.reset();
    this._textFieldOrganizationName.reset();
    this._textFieldRegion.reset();
    this._textFieldSubjectClass.reset();

    this._textFieldFund.reset();
    this._textFieldFundType.reset();
    }
}
Ext.extend(Srims.papers.LiberalArtsPaperQueryWindow_OtherPanel, Ext.FormPanel);
