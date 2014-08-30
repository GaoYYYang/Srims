
if (!Srims.component) 
    Ext.namespace('Srims.component');

Srims.component.QueryWindow_MemberPanel = function(titleName){

    this._textFieldAgeBegin = new Ext.form.NumberField({
        fieldLabel: '专家年龄',
        width: 150,
        allowDecimals: false,
        allowNegative: false
    });
    this._textFieldAgeEnd = new Ext.form.NumberField({
        fieldLabel: '至',
        width: 150,
        allowDecimals: false,
        allowNegative: false
    });
    this._textFieldPostLevelBegin = new Ext.form.NumberField({
        fieldLabel: '职称级别',
        width: 150,
        allowDecimals: false,
        allowNegative: false
    });
    this._textFieldPostLevelEnd = new Ext.form.NumberField({
        fieldLabel: '至',
        width: 150,
        allowDecimals: false,
        allowNegative: false
    });
    this._checkboxGroupAcademyDegree = new Srims.component.CheckBoxGroup({
        fieldLabel: '专家学历',
        columns: 4,
        items: Srims.component.QueryWindow_MemberPanel.ExpertAcademyDegreeStore.checkboxGroupItems,
        cls: 'srims-checkboxGroup-expert'
    });
    this._comboBoxCollege = new Srims.component.EntityComboBox({
        fieldLabel: '所属学院',
        store: new Srims.experts.DepartmentStore(Srims.service.projects.ProjectService + '/GetProjectColleges'),
        displayField: 'name',
        editable: true,
        triggerAction: 'all',
        listWidth: 150,
        width: 150
    });
    this._checkboxIsPostOrAcademyDegree = new Ext.form.Checkbox({
        fieldLabel: '查询设置',
        boxLabel: '学历和职称是或的关系'
    })
    
    Srims.component.QueryWindow_MemberPanel.superclass.constructor.call(this, {
        title: titleName,
        frame: true,
        layout: 'form',
        labelWidth: 70,
        items: [new Ext.Panel({
            layout: 'column',
            labelWidth: 70,
            items: [new Ext.Panel({
                layout: 'form',
                labelWidth: 70,
                width: 250,
                items: [this._textFieldAgeBegin, this._textFieldPostLevelBegin]
            }), new Ext.Panel({
                layout: 'form',
                labelWidth: 20,
                items: [this._textFieldAgeEnd, this._textFieldPostLevelEnd]
            })]
        }), this._comboBoxCollege, this._checkboxGroupAcademyDegree, this._checkboxIsPostOrAcademyDegree]
    });
    
    this.buildParams = function(params){
        params.birthdayStart = Date.renderAsAge(this._textFieldAgeBegin.getValue());
        params.birthdayEnd = Date.renderAsAge(this._textFieldAgeEnd.getValue());
        params.postLevelStart = this._textFieldPostLevelBegin.getValue();
        params.postLevelEnd = this._textFieldPostLevelEnd.getValue();
        params.academyDegrees = this._checkboxGroupAcademyDegree.getSelecetedValue();
        params.college = this._comboBoxCollege.getText();
        params.isPostOrAcademyDegree = this._checkboxIsPostOrAcademyDegree.checked ? 'true' : '';
    }
    this.clearParams = function(){
        this._textFieldAgeBegin.reset();
        this._textFieldAgeEnd.reset();
        this._textFieldPostLevelBegin.reset();
        this._textFieldPostLevelEnd.reset();
        this._checkboxGroupAcademyDegree.reset();
        this._comboBoxCollege.reset();
        this._checkboxIsPostOrAcademyDegree.reset();
    }
}
Ext.extend(Srims.component.QueryWindow_MemberPanel, Ext.FormPanel);

Srims.component.QueryWindow_MemberPanel.ExpertAcademyDegreeStore = new Srims.data.IDValueRecordStore(Srims.service.experts.ExpertService + '/GetExpertAcademyDegree');
Srims.component.QueryWindow_MemberPanel.ExpertAcademyDegreeStore.load({
    callback: Srims.component.QueryWindow_MemberPanel.ExpertAcademyDegreeStore.buildCheckboxGroupItems
});





