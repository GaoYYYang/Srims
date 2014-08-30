
if (!Srims.projects)
    Ext.namespace('Srims.projects');

Srims.projects.ProjectShowPanel_BasicForm = function(project) {

    //field
    this._project = project;

    //controls
    this._fieldName = new Ext.form.Field({
        fieldLabel: '项目名称',
        value: project.get('name'),
        readOnly: true,
        width: 480
    });
    this._fieldNumber = new Ext.form.Field({
        fieldLabel: '项目编号',
        value: project.get('number'),
        readOnly: true,
        width: 160
    });
    this._checkboxIsSecret = new Ext.form.Checkbox({
        fieldLabel: '是否涉密',
        hidden: true,
        hideLabel: true,
        checked: project.get('isSecret'),
        readOnly: true
    });
    this._fieldPrincipal = new Ext.form.Field({
        fieldLabel: '项目负责人',
        value: project.get('principal'),
        readOnly: true,
        width: 160
    });
    this._fieldPrincipalDelegate = new Ext.form.Field({
        fieldLabel: '委托负责人',
        value: project.get('principalDelegate'),
        readOnly: true,
        width: 160
    });
    this._fieldLevel = new Ext.form.Field({
        fieldLabel: '项目级别',
        value: Srims.projects.projectLevelRender(project.get('level')),
        readOnly: true,
        width: 160
    });
    this._fieldState = new Ext.form.Field({
        fieldLabel: '项目状态',
        value: Srims.projects.projectStateRender(project.get('state')),
        readOnly: true,
        width: 160
    });
    this._fieldResearchType = new Ext.form.Field({
        fieldLabel: '研究类型',
        value: project.get('researchType'),
        readOnly: true,
        width: 160
    });
    this._fieldCooperationType = new Ext.form.Field({
        fieldLabel: '合作类型',
        value: project.get('cooperationType'),
        readOnly: true,
        width: 160
    });
    this._fieldStartDate = new Ext.form.Field({
        fieldLabel: '开始时间',
        value: Date.render(project.get('startDate')),
        readOnly: true,
        width: 160
    });
    this._fieldEndDate = new Ext.form.Field({
        fieldLabel: '结束时间',
        value: Date.render(project.get('endDate')),
        readOnly: true,
        width: 160
    });
    this._fieldFirstLevelSubject = new Ext.form.Field({
        fieldLabel: '一级学科',
        value: project.get('firstLevelSubjectName'),
        readOnly: true,
        width: 160
    });
    this._fieldSecondLevelSubject = new Ext.form.Field({
        fieldLabel: '二级学科',
        value: project.get('secondLevelSubjectName'),
        readOnly: true,
        width: 160
    });
    this._fieldBase = new Ext.form.Field({
        fieldLabel: '所属基地',
        value: project.get('baseName'),
        readOnly: true,
        width: 300
    });
    this._fieldTaskComingFrom = new Ext.form.Field({
        fieldLabel: '委托单位',
        readOnly: true,
        value: project.get('taskComingFrom'),
        width: 160
    });
    this._fieldTaskCorporationPlace = new Ext.form.Field({
        fieldLabel: '单位所在地',
        value: project.get('corporationPlace'),
        readOnly: true,
        width: 160
    });

    //constructor        
    var columnOneItems = [this._fieldNumber, this._fieldPrincipal, this._fieldLevel, this._fieldResearchType, this._fieldStartDate, this._fieldFirstLevelSubject];
    var columnTwoItems = [this._checkboxIsSecret, this._fieldPrincipalDelegate, this._fieldState, this._fieldCooperationType, this._fieldEndDate, this._fieldSecondLevelSubject];

    if (project.get('isHorizontal')) {
        columnOneItems[columnOneItems.length] = this._fieldTaskComingFrom;
        columnTwoItems[columnTwoItems.length] = this._fieldTaskCorporationPlace;
    }
    Srims.projects.ProjectShowPanel_BasicForm.superclass.constructor.call(this, {
        collapsible: true,
        title: '基本信息',
        autoHeight: true,
        frame: true,
        labelWidth: 80,
        bodyStyle: 'padding:5px 5px 0',
        style: 'margin-bottom: 2px',
        defaultType: 'textfield',
        titleCollapse: true,
        items: [this._fieldName, new Ext.Panel({
            width: 600,
            layout: 'column',
            items: [new Ext.Panel({
                width: 300,
                layout: 'form',
                style: 'width:300px',
                items: columnOneItems
            }), new Ext.Panel({
                width: 300,
                style: 'width:300px',
                layout: 'form',
                items: columnTwoItems
            })]
        }), this._fieldBase]
    });
    this.resetComponentValue = function(project) {
        this._fieldName.setValue(project.get('name'));
        this._fieldNumber.setValue(project.get('number'));
        this._checkboxIsSecret.setValue(project.get('isSecret'));
        this._fieldPrincipal.setValue(project.get('principal'));
        this._fieldPrincipalDelegate.setValue(project.get('principalDelegate'));
        this._fieldLevel.setValue(Srims.projects.projectLevelRender(project.get('level')));
        this._fieldState.setValue(Srims.projects.projectStateRender(project.get('state')));
        this._fieldResearchType.setValue(project.get('researchType'));
        this._fieldCooperationType.setValue(project.get('cooperationType'));
        this._fieldStartDate.setValue(Date.render(project.get('startDate')));
        this._fieldEndDate.setValue(Date.render(project.get('endDate')));
        this._fieldFirstLevelSubject.setValue(project.get('firstLevelSubjectName'));
        this._fieldSecondLevelSubject.setValue(project.get('secondLevelSubjectName'))
        this._fieldBase.setValue(project.get('baseName'));
        this._fieldTaskComingFrom.setValue(project.get('taskComingFrom'));
        this._fieldTaskCorporationPlace.setValue(project.get('corporationPlace'));
    }
}
Ext.extend(Srims.projects.ProjectShowPanel_BasicForm, Ext.form.FormPanel, {});
