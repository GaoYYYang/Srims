
if (!Srims.experts) 
    Ext.namespace('Srims.experts');

Srims.experts.ExpertQueryPanel_Basic = function(){
    this._textFieldName = new Ext.form.TextField({
        fieldLabel: '姓名',
        width: 120
    })
    this._textFieldNumber = new Ext.form.TextField({
        fieldLabel: '工作证号',
        width: 120
    })
    
    this._numberFieldAgeStart = new Ext.form.NumberField({
        fieldLabel: '年龄',
        allowNegative: false,
        allowDecimals: false,
        maxLength: 2,
        minLength: 2,
        maxValue: 99,
        minValue: 18,
        width: 120
    })
    this._numberFieldAgeEnd = new Ext.form.NumberField({
        fieldLabel: '至',
        allowNegative: false,
        allowDecimals: false,
        maxLength: 2,
        minLength: 2,
        maxValue: 60,
        minValue: 18,
        width: 120
    })
    
    var academyDegreeItems = Srims.component.QueryWindow_MemberPanel.ExpertAcademyDegreeStore.checkboxGroupItems;
    this._checkboxGroupAcademyDegree = new Srims.component.CheckBoxGroup({
        fieldLabel: '学历',
        columns: academyDegreeItems.length > 6 ? 5 : academyDegreeItems.length,
        items: academyDegreeItems,
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
    this._textFieldPostLevelStart = new Ext.form.NumberField({
        fieldLabel: '职称级别',
        width: 120,
        allowDecimals: false,
        allowNegative: false
    });
    this._textFieldPostLevelEnd = new Ext.form.NumberField({
        fieldLabel: '至',
        width: 120,
        allowDecimals: false,
        allowNegative: false
    });
    this._checkboxIsPostOrAcademyDegree = new Ext.form.Checkbox({
        fieldLabel: '查询设置',
        boxLabel: '学历和职称是“或”的关系'
    });
    //    var yes = new Ext.form.Radio({
    //        name: 'radioIsDoctorDirector',
    //        boxLabel: '是'
    //    });
    //    var no = new Ext.form.Radio({
    //        name: 'radioIsDoctorDirector',
    //        boxLabel: '否'
    //    });
    //    var unknown = new Ext.form.Radio({
    //        name: 'radioIsDoctorDirector',
    //        boxLabel: '未知'
    //    });
    this._checkboxIsDoctorDirector = new Ext.form.Checkbox({
        fieldLabel: '是否博导'
    });
    
    Srims.experts.ExpertQueryPanel_Basic.superclass.constructor.call(this, ({
        collapsible: true,
        title: '基本信息',
        autoHeight: true,
        frame: true,
        layout: 'form',
        labelWidth: 60,
        buttonAlign: 'center',
        bodyStyle: 'padding:5px 5px 0',
        style: 'margin-bottom: 2px',
        defaultType: 'textfield',
        titleCollapse: true,
        items: [new Ext.Panel({
            layout: 'column',
            items: [new Ext.Panel({
                layout: 'form',
                labelWidth: 60,
                width: 220,
                items: [this._textFieldName, this._numberFieldAgeStart, this._textFieldPostLevelStart]
            }), new Ext.Panel({
                layout: 'form',
                labelWidth: 60,
                width: 220,
                items: [this._textFieldNumber, this._numberFieldAgeEnd, this._textFieldPostLevelEnd]
            }), new Ext.Panel({
                layout: 'form',
                labelWidth: 60,
                width: 260,
                items: [this._checkboxIsDoctorDirector, this._checkboxIsPostOrAcademyDegree, this._comboBoxCollege]
            })]
        }), this._checkboxGroupAcademyDegree]
    }))
    
    this.buildParams = function(params){
        params.name = this._textFieldName.getValue();
        params.number = this._textFieldNumber.getValue();
        params.birthdayStart = Date.renderAsAge(this._numberFieldAgeStart.getValue());
        params.birthdayEnd = Date.renderAsAge(this._numberFieldAgeEnd.getValue());
        params.academyDegree = this._checkboxGroupAcademyDegree.getSelecetedValue();
        params.college = this._comboBoxCollege.getText();
        params.postLevelStart = this._textFieldPostLevelStart.getValue();
        params.postLevelEnd = this._textFieldPostLevelEnd.getValue();
        params.isPostOrDegree = this._checkboxIsPostOrAcademyDegree.checked ? "true" : "";
        params.isDoctorDirector = this._checkboxIsDoctorDirector.checked ? "true" : "";
    }
    
    this.clearParams = function(params){
        this._textFieldName.reset();
        this._textFieldNumber.reset();
        this._numberFieldAgeStart.reset();
        this._numberFieldAgeEnd.reset();
        this._checkboxGroupAcademyDegree.reset();
        this._textFieldPostLevelStart.reset();
        this._textFieldPostLevelEnd.reset();
        this._checkboxIsPostOrAcademyDegree.reset();
        this._checkboxIsDoctorDirector.reset();
        this._comboBoxCollege.reset();
    }
}
Ext.extend(Srims.experts.ExpertQueryPanel_Basic, Ext.Panel, {});
