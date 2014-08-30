
if (!Srims.papers)
    Ext.namespace("Srims.papers");

Srims.papers.LiberalArtsPaperEditPanel_OtherBasicForm = function(liberalartspaper) {

this._paper = liberalartspaper;

this._textFieldPublisher = new Ext.form.TextField({
    fieldLabel: '期刊名或出版社',
    value: liberalartspaper.get('publisher'),
    allowBlank: false,
    width: 460
});
this._textFieldISSN = new Ext.form.TextField({
    fieldLabel: 'ISSN',
    value: liberalartspaper.get('issn'),
    width: 160
});
this._textFieldIssuesDate = new Ext.form.TextField({
    fieldLabel: '年代卷期 ',
    value: liberalartspaper.get('issuesDate'),
    width: 160
});
this._textFieldCODEN = new Ext.form.TextField({
    fieldLabel: '期刊代码',
    value: liberalartspaper.get('coden'),
    width: 160
});
this._textFieldDegreeType = new Ext.form.TextField({
    fieldLabel: '学位分类 ',
    value: liberalartspaper.get('degreeType'),
    width: 160
});


this._textFieldFirstOrganization = new Ext.form.TextField({
    fieldLabel: '第一机构',
    value: liberalartspaper.get('firstOrganization'),
    width: 160
});
this._textFieldOrganizationName = new Ext.form.TextField({
    fieldLabel: '机构名称',
    value: liberalartspaper.get('organizationName'),
    width: 160
});
this._textFieldRegion = new Ext.form.TextField({
    fieldLabel: '地区',
    value: liberalartspaper.get('region'),
    width: 160
});
this._textFieldSubjectClass = new Ext.form.TextField({
    fieldLabel: '学科分类',
    value: liberalartspaper.get('subjectClass'),
    width: 160
});
this._numberFieldOurSchoolSignRank = new Ext.form.NumberField({
    fieldLabel: '我校署名位次',
    value: liberalartspaper.get('ourSchoolSignRank'),
    allowDecimals: false,
    allowNegative: false,
    maxLength: 6,
    width: 160
});
this._comboBoxCollege = new Srims.component.EntityComboBox({
    fieldLabel: '所属学院',
    value: liberalartspaper.get('collegeName'),
    store: new Srims.experts.DepartmentStore(Srims.service.experts.DepartmentService + '/GetAllColleges'),
    displayField: 'name',
    entityId: liberalartspaper.get('collegeID'),
    editable: true,
    triggerAction: 'all',
    listWidth: 160,
    width: 144
});

this._textFieldFund = new Ext.form.TextField({
    fieldLabel: '基金',
    value: liberalartspaper.get('fund'),
    width: 160
});
this._textFieldFundType = new Ext.form.TextField({
    fieldLabel: '基金类别',
    value: liberalartspaper.get('fundType'),
    width: 160
});



var columnFirstItems = [this._textFieldISSN, this._textFieldCODEN, this._textFieldFirstOrganization, this._textFieldRegion, this._numberFieldOurSchoolSignRank, this._textFieldFund];
var columnSecondItems = [this._textFieldIssuesDate, this._textFieldDegreeType, this._textFieldOrganizationName, this._textFieldSubjectClass, this._comboBoxCollege, this._textFieldFundType];


    Srims.papers.LiberalArtsPaperEditPanel_OtherBasicForm.superclass.constructor.call(this, {
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

    this.assginValues = function() {

    this._paper.set('publisher', this._textFieldPublisher.getValue());
    this._paper.set('issn', this._textFieldISSN.getValue());
    this._paper.set('issuesDate', this._textFieldIssuesDate.getValue());
    this._paper.set('coden', this._textFieldCODEN.getValue());
    this._paper.set('degreeType', this._textFieldDegreeType.getValue());
        
        this._paper.set('firstOrganization', this._textFieldFirstOrganization.getValue());
        this._paper.set('organizationName', this._textFieldOrganizationName.getValue());
        this._paper.set('region', this._textFieldRegion.getValue());
        this._paper.set('subjectClass', this._textFieldSubjectClass.getValue());
        this._paper.set('ourSchoolSignRank', this._numberFieldOurSchoolSignRank.getValue());
        this._paper.set('collegeID', this._comboBoxCollege.getValue());

        this._paper.set('fund', this._textFieldFund.getValue());
        this._paper.set('fundType', this._textFieldFundType.getValue());
    }

    this.isValid = function(preventMark) {
        var result = true;
        result = this._textFieldPublisher.isValid(preventMark) && result;
        return result;
    }
}
Ext.extend(Srims.papers.LiberalArtsPaperEditPanel_OtherBasicForm, Ext.form.FormPanel, {});
