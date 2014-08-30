
if (!Srims.experts) 
    Ext.namespace('Srims.experts');

Srims.experts.ExpertQueryPanel_Project_Basic = function(){
    this._dateFieldStartDateStart = new Ext.form.DateField({
        fieldLabel: '开始时间',
        width: 120
    });
    this._dateFieldStartDateEnd = new Ext.form.DateField({
        fieldLabel: '至',
        width: 120
    });
    this._dateFieldEndDateStart = new Ext.form.DateField({
        fieldLabel: '结束时间',
        width: 120
    });
    this._dateFieldEndDateEnd = new Ext.form.DateField({
        fieldLabel: '至',
        width: 120
    });
    this._checkboxGroupLevel = new Srims.component.CheckBoxGroup({
        fieldLabel: '项目级别',
        cls: 'srims-checkboxGroup',
        columns: 3,
        items: Srims.component.CheckBoxGroup.getCheckboxGroupItemsFromArray(Srims.projects.projectLevelStore)
    });
    this._checkboxGroupState = new Srims.component.CheckBoxGroup({
        fieldLabel: '项目状态',
        cls: 'srims-checkboxGroup',
        columns: 4,
        items: Srims.component.CheckBoxGroup.getCheckboxGroupItemsFromArray(Srims.projects.projectStateQueryStore)
    });
    this._checkboxIsSecret = new Ext.form.Checkbox({
        fieldLabel: '是否涉密'
    });
    
    Srims.experts.ExpertQueryPanel_Project_Basic.superclass.constructor.call(this, ({
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
                width: 230,
                items: [this._dateFieldStartDateStart, this._dateFieldEndDateStart]
            }), new Ext.Panel({
                layout: 'form',
                labelWidth: 20,
                width: 200,
                items: [this._dateFieldStartDateEnd, this._dateFieldEndDateEnd]
            }), new Ext.Panel({
                layout: 'form',
                labelWidth: 60,
                width: 200,
                items: [this._checkboxIsSecret]
            })]
        }), this._checkboxGroupLevel, this._checkboxGroupState]
    }))
    
    
    this.buildParams = function(params){
        params.projectStartDateStart = Date.format(this._dateFieldStartDateStart.getValue());
        params.projectStartDateEnd = Date.format(this._dateFieldStartDateEnd.getValue());
        params.projectEndDateStart = Date.format(this._dateFieldEndDateStart.getValue());
        params.projectEndDateEnd = Date.format(this._dateFieldEndDateEnd.getValue());
        params.projectLevel = this._checkboxGroupLevel.getSelecetedValue();
        params.projectState = this._checkboxGroupState.getSelecetedValue();
        params.projectIsSecret = this._checkboxIsSecret.checked ? "true" : "";
    }
    
    this.clearParams = function(){
        this._dateFieldStartDateStart.reset();
        this._dateFieldStartDateEnd.reset();
        this._dateFieldEndDateStart.reset();
        this._dateFieldEndDateEnd.reset();
        this._checkboxGroupLevel.reset();
        this._checkboxGroupState.reset();
        this._checkboxIsSecret.reset();
    }
}
Ext.extend(Srims.experts.ExpertQueryPanel_Project_Basic, Ext.Panel, {});
