
if (!Srims.common)
    Ext.namespace('Srims.common');

Srims.common.OutsourcingShowPanel_AllocationInfo_QueryWindow_BasicPanel = function() {
    this._textFieldNumber = new Ext.form.TextField({
        fieldLabel: '编号',
        width: 150
    });
    this._textFieldName = new Ext.form.TextField({
        fieldLabel: '名称',
        width: 150
    });
    this._textFieldPrincipal = new Ext.form.TextField({
        fieldLabel: '负责人',
        width: 150
    });
    this._comboBoxCollege = new Srims.component.EntityComboBox({
        fieldLabel: '所属学院',
        store: new Srims.experts.DepartmentStore(Srims.service.common.ProjectService + '/GetProjectColleges'),
        displayField: 'name',
        editable: true,
        triggerAction: 'all',
        listWidth: 150,
        width: 150
    });
    this._dateFieldStartDateBegin = new Ext.form.DateField({
        fieldLabel: '开始时间',
        width: 150
    });
    this._dateFieldStartDateEnd = new Ext.form.DateField({
        fieldLabel: '至',
        width: 150
    });
    this._dateFieldEndDateBegin = new Ext.form.DateField({
        fieldLabel: '结束时间',
        width: 150
    });
    this._dateFieldEndDateEnd = new Ext.form.DateField({
        fieldLabel: '至',
        width: 150
    });
    this._checkboxGroupLevel = new Srims.component.CheckBoxGroup({
        fieldLabel: '项目级别',
        cls: 'srims-checkboxGroup',
        columns: 3,
        items: Srims.component.CheckBoxGroup.getCheckboxGroupItemsFromArray(Srims.projects.projectLevelStore, Srims.projects.ProjectLevel.Perside)
    });
    this._checkboxGroupState = new Srims.component.CheckBoxGroup({
        fieldLabel: '项目状态',
        cls: 'srims-checkboxGroup',
        columns: 4,
        items: Srims.component.CheckBoxGroup.getCheckboxGroupItemsFromArray(Srims.projects.projectStateQueryStore)
    });
    this._textFieldTaskFroms = new Ext.form.TextField({
        fieldLabel: '任务来源',
        width: 150
    });
    this._checkboxIsSecret = new Ext.form.Checkbox({
        fieldLabel: '是否涉密'
    });
    this._comboBoxProjectSubjectNature = new Ext.form.ComboBox({
        fieldLabel: '学科分类',
        store: Srims.type.projectSubjectNatureStore,
        displayField: 'name',
        editable: true,
        triggerAction: 'all',
        listWidth: 150,
        width: 150
    });
    this._panelCorporationPlace = new Srims.component.ProvinceCityPanel('单位地址', undefined, undefined, true);


    var columnOneItems = [this._textFieldNumber, this._textFieldPrincipal, this._dateFieldStartDateBegin, this._dateFieldEndDateBegin, this._checkboxIsSecret];
    var columnTwoItems = [this._textFieldName, this._comboBoxCollege, this._dateFieldStartDateEnd, this._dateFieldEndDateEnd];
    var columnItems = [];
    columnTwoItems[columnTwoItems.length] = this._textFieldTaskFroms;
    columnOneItems[columnOneItems.length] = this._comboBoxProjectSubjectNature;
    columnItems[columnItems.length] = this._panelCorporationPlace;


    columnItems[columnItems.length] = this._checkboxGroupLevel;
    columnItems[columnItems.length] = this._checkboxGroupState;

    Srims.common.OutsourcingShowPanel_AllocationInfo_QueryWindow_BasicPanel.superclass.constructor.call(this, {
        title: '基本信息',
        frame: true,
        layout: 'form',
        labelWidth: 60,
        autoWidth: true,
        autoHeight: true,
        items: [new Ext.Panel({
            layout: 'column',
            items: [new Ext.Panel({
                width: 250,
                layout: 'form',
                labelWidth: 60,
                items: columnOneItems
            }), new Ext.Panel({
                labelWidth: 60,
                layout: 'form',
                items: columnTwoItems
            })]
        }), new Ext.Panel({
            labelWidth: 60,
            layout: 'form',
            items: columnItems
        })]
    });

    this.buildParams = function(params) {
        params.number = this._textFieldNumber.getValue();
        params.name = this._textFieldName.getValue();
        params.principal = this._textFieldPrincipal.getValue();
        params.principalCollege = this._comboBoxCollege.getText();

        var subjectNatureName = this._comboBoxProjectSubjectNature.getRawValue();
        if (!String.isEmpty(subjectNatureName))
            params.subjectNature = this._comboBoxProjectSubjectNature.getValue();
        else
            params.subjectNature = ''

        params.startDateStart = Date.format(this._dateFieldStartDateBegin.getValue());
        params.startDateEnd = Date.format(this._dateFieldStartDateEnd.getValue());
        params.endDateStart = Date.format(this._dateFieldEndDateBegin.getValue());
        params.endDateEnd = Date.format(this._dateFieldEndDateEnd.getValue());
        params.level = this._checkboxGroupLevel.getSelecetedValue();
        params.state = this._checkboxGroupState.getSelecetedValue();
        params.isSecret = this._checkboxIsSecret.checked ? this._checkboxIsSecret.getValue() : '';


        params.taskFroms = this._textFieldTaskFroms.getValue();
        params.corporationPlace = '';
        if (this._panelCorporationPlace._comboBox_Province.getRawValue() != '')
            params.corporationPlace = this._panelCorporationPlace._comboBox_Province.getRawValue() + ' ' + this._panelCorporationPlace._comboBox_City.getRawValue();

    }
    this.clearParams = function() {
        this._textFieldNumber.reset();
        this._textFieldName.reset();
        this._textFieldPrincipal.reset();
        this._comboBoxCollege.reset();
        this._dateFieldStartDateBegin.reset();
        this._dateFieldStartDateEnd.reset();
        this._dateFieldEndDateBegin.reset();
        this._dateFieldEndDateEnd.reset();
        this._textFieldTaskFroms.reset();
        this._checkboxGroupLevel.reset();
        this._checkboxGroupState.reset();
        this._comboBoxProjectSubjectNature.reset();


        this._checkboxIsSecret.reset();
        this._panelCorporationPlace._comboBox_Province.reset();
        this._panelCorporationPlace._comboBox_City.reset();

    }
}
Ext.extend(Srims.common.OutsourcingShowPanel_AllocationInfo_QueryWindow_BasicPanel, Ext.FormPanel);
