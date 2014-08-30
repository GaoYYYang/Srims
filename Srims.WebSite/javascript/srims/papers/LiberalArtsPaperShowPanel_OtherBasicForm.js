
if (!Srims.papers) 
    Ext.namespace("Srims.papers");

Srims.papers.LiberalArtsPaperShowPanel_OtherBasicForm = function(paper) {

    this._paper = paper;

    this._textFieldPublisher = new Ext.form.Field({
    fieldLabel: '期刊名或出版社',
    value: this._paper.get('publisher'),
        readOnly: true,
        width: 460
    });
    this._textFieldISSN = new Ext.form.Field({
    fieldLabel: 'ISSN',
    value: this._paper.get('issn'),
        readOnly: true,
        width: 160
    });
    this._textFieldIssuesDate = new Ext.form.Field({
    fieldLabel: '年代卷期',
    value: this._paper.get('issuesDate'),
        readOnly: true,
        width: 160
    });
    this._textFieldCODEN = new Ext.form.Field({
    fieldLabel: '期刊代码',
    value: this._paper.get('coden'),
        readOnly: true,
        width: 160
    });
    this._textFieldDegreeType = new Ext.form.Field({
    fieldLabel: '学位分类',
    value: this._paper.get('degreeType'),
        readOnly: true,
        width: 160
    });

    this._textFieldFirstOrganization = new Ext.form.Field({
    fieldLabel: '第一机构',
    value: this._paper.get('firstOrganization'),
        readOnly: true,
        width: 160
    });
    this._textFieldOrganizationName = new Ext.form.Field({
    fieldLabel: '机构名称',
    value: this._paper.get('organizationName'),
        readOnly: true,
        width: 160
    });
    this._textFieldRegion = new Ext.form.Field({
    fieldLabel: '地区',
    value: this._paper.get('region'),
        readOnly: true,
        width: 160
    });
    this._textFieldSubjectClass = new Ext.form.Field({
    fieldLabel: '学科分类',
    value: this._paper.get('subjectClass'),
        readOnly: true,
        width: 160
    });
    this._numberFieldOurSchoolSignRank = new Ext.form.Field({
    fieldLabel: '我校署名位次',
    value: this._paper.get('ourSchoolSignRank'),
        readOnly: true,
        width: 160
    });


    this._comboBoxCollege = new Ext.form.Field({
        fieldLabel: '所属院系',
        value: this._paper.get('collegeName'),
        readOnly: true,
        width: 160
    });
    this._textFieldFund = new Ext.form.Field({
    fieldLabel: '基金',
    value: this._paper.get('fund'),
        readOnly: true,
        width: 160
    });
    this._textFieldFundType = new Ext.form.Field({
    fieldLabel: '基金类别',
    value: this._paper.get('fundType'),
        readOnly: true,
        width: 160
    });



    var columnFirstItems = [this._textFieldISSN, this._textFieldCODEN, this._textFieldFirstOrganization, this._textFieldRegion, this._numberFieldOurSchoolSignRank, this._textFieldFund];
    var columnSecondItems = [this._textFieldIssuesDate, this._textFieldDegreeType, this._textFieldOrganizationName, this._textFieldSubjectClass, this._comboBoxCollege, this._textFieldFundType];

    Srims.papers.LiberalArtsPaperShowPanel_OtherBasicForm.superclass.constructor.call(this, {
        collapsible: true,
        title: '其他基本信息',
        Height: 500,
        frame: true,
        labelWidth: 100,
        bodyStyle: 'padding:5px 5px 0',
        style: 'margin-bottom: 2px',
        defaultType: 'textfield',
        titleCollapse: true,
        items: [this._textFieldPublisher, new Ext.Panel({
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
Ext.extend(Srims.papers.LiberalArtsPaperShowPanel_OtherBasicForm, Ext.form.FormPanel, {});

