
if (!Srims.type) 
    Ext.namespace("Srims.type");

Srims.type.ProjectTypeShowPanel_BasicForm = function(projectType){

    this._projectType = projectType;
    
    this._textFieldName = new Ext.form.TextField({
        fieldLabel: '名称',
        value: this._projectType.get('name'),
        width: 390,
        readOnly: true
    });
    
    this._textFieldProjectRank = new Ext.form.TextField({
        fieldLabel: '项目等级',
        value: this._projectType.get('projectRank'),
        width: 160,
        readOnly: true
    });
    this._textFieldOverheadExpenseInRate = new Ext.form.TextField({
        fieldLabel: '校内管理费率',
        value: ExpenseRate.render(this._projectType.get('overheadExpenseInRate')),
        width: 160,
        readOnly: true
    });
    this._textFieldCode = new Ext.form.TextField({
        fieldLabel: '分类代码',
        value: this._projectType.get('code'),
        width: 160,
        readOnly: true
    });
    
    this._textFieldAdministration = new Ext.form.TextField({
        fieldLabel: '专管部门',
        value: this._projectType.get('administration'),
        width: 160,
        readOnly: true
    });
    this._textFieldOverheadExpenseOutRate = new Ext.form.TextField({
        fieldLabel: '外协管理费率',
        value: ExpenseRate.render(this._projectType.get('overheadExpenseOutRate')),
        width: 160,
        readOnly: true
    });
    this._textFieldIsBudget = new Ext.form.TextField({
        fieldLabel: '是否预算制',
        value: Boolean.render(this._projectType.get('isBudget')),
        width: 160,
        readOnly: true
    });
    this._textFieldIsExploit = new Ext.form.TextField({
        fieldLabel: '是否同年单账本号',
        value: Boolean.render(this._projectType.get('isExploit')),
        width: 160,
        readOnly: true
    });
    
    this._textFieldProjectComingFrom = new Ext.form.TextField({
        fieldLabel: '项目来源',
        value: Srims.type.projectFromRender(this._projectType.get('projectComingFrom')),
        width: 160,
        readOnly: true
    });
    this._textFieldProjectSubjectNature = new Ext.form.TextField({
        fieldLabel: '学科分类',
        value: Srims.type.projectSubjectNatureRender(this._projectType.get('subjectNature')),
        width: 160,
        readOnly: true
    });
    this._managementFeesType = new Ext.form.TextField({
        fieldLabel: '管理费收取类别',
        value: this._projectType.get('managementFeesType'),
        width: 160
    });
    
    var columnFirstItems = [this._textFieldProjectRank, this._textFieldOverheadExpenseInRate, this._textFieldCode, this._textFieldProjectComingFrom, this._textFieldProjectSubjectNature, this._managementFeesType];
    var columnSecondItems = [this._textFieldAdministration, this._textFieldOverheadExpenseOutRate, this._textFieldIsBudget, this._textFieldIsExploit];
    
    Srims.type.ProjectTypeShowPanel_BasicForm.superclass.constructor.call(this, {
        collapsible: true,
        title: '基本信息',
        Height: 500,
        frame: true,
        labelWidth: 100,
        bodyStyle: 'padding:5px 5px 0',
        style: 'margin-bottom: 2px',
        defaultType: 'textfield',
        titleCollapse: true,
        items: [this._textFieldName, new Ext.Panel({
            labelWidth: 100,
            widht: 800,
            layout: 'column',
            items: [new Ext.Panel({
                width: 400,
                layout: 'form',
                style: 'width:300px',
                items: columnFirstItems
            }), new Ext.Panel({
                width: 400,
                style: 'width:300px',
                layout: 'form',
                items: columnSecondItems
            })]
        })]
    });
}
Ext.extend(Srims.type.ProjectTypeShowPanel_BasicForm, Ext.form.FormPanel, {});
