
if (!Srims.performance)
    Ext.namespace('Srims.performance');

Srims.performance.PerformanceQueryWindow_InforPanel = function() {

    this._comboBoxExpert = new Srims.component.ExpertSearch.SearchComboBox({
        fieldLabel: '负责人',
        width: 166
    });
    this._comboBoxProject = new Srims.component.ProjectSearch.SearchComboBox({
        fieldLabel: '项目名称',
        width: 166
    });
    this._comboBoxProjectType = new Ext.form.TextField({
        fieldLabel: '项目类型',
        width: 150
    });
    this._comboBoxProjectNumber = new Ext.form.TextField({
        fieldLabel: '项目编号',
        width: 150
    });
    this._checkBoxIsCanceled = new Ext.form.Checkbox({
        fieldLabel: '已作废'
    });
    this._checkBoxIsCanceled2 = new Ext.form.Checkbox({
        fieldLabel: '未作废'
    });
    this._checkBoxIsAllocated = new Ext.form.Checkbox({
        fieldLabel: '已完全下拨'
    });
    this._checkBoxIsAllocated2 = new Ext.form.Checkbox({
        fieldLabel: '未完全下拨'
    });
    this._startDateBegin = new Ext.form.DateField({
        fieldLabel: '项目开始时间',
        width: 180
    });
    this._startDateEnd = new Ext.form.DateField({
        fieldLabel: '至',
        width: 180
    });
    this._allocationDateBegin = new Ext.form.DateField({
        fieldLabel: '审核通过时间',
        width: 180
    });
    this._allocationDateEnd = new Ext.form.DateField({
        fieldLabel: '至',
        width: 180
    });
    this._adjustDateBegin = new Ext.form.DateField({
        fieldLabel: '间接费调整时间',
        width: 180
    });
    this._adjustDateEnd = new Ext.form.DateField({
        fieldLabel: '至',
        width: 180
    });


    //   var columnFirstItems = [this._comboBoxProject]//, this._textFieldAccountBookNumber, this._dateFieldFinanceAllocationDateBegin];
    // var columnSecondItems = [this._comboBoxProjectNumber]//, this._numberFieldFinanceNumber, this._dateFieldFinanceAllocationDateEnd];
    var columnThirdItems = [this._comboBoxProject, this._comboBoxProjectNumber, this._checkBoxIsAllocated, this._checkBoxIsCanceled, this._startDateBegin, this._allocationDateBegin, this._adjustDateBegin]

    var columnFourthItems = [this._comboBoxProjectType, this._comboBoxExpert, this._checkBoxIsAllocated2, this._checkBoxIsCanceled2, this._startDateEnd, this._allocationDateEnd, this._adjustDateEnd]
    Srims.performance.PerformanceQueryWindow_InforPanel.superclass.constructor.call(this, {
        title: '',
        frame: true,
        layout: 'column',
        width: 800,
        labelWidth: 100,
        items: [new Ext.Panel({
            width: 300,
            layout: 'form',
            labelWidth: 100,
            items: columnThirdItems
        }), new Ext.Panel({
            width: 300,
            labelWidth: 100,
            layout: 'form',
            items: columnFourthItems

        })]
    });

    this.buildParams = function(params) {
        params.isAllocated = this._checkBoxIsAllocated.getValue();
        params.isCanceled = this._checkBoxIsCanceled.getValue();
        params.isAllocated2 = this._checkBoxIsAllocated2.getValue();
        params.isCanceled2 = this._checkBoxIsCanceled2.getValue();
        params.expertName = this._comboBoxExpert.getText();
        params.projectName = this._comboBoxProject.getText();

        params.startDateStart = Date.format(this._startDateBegin.getValue());
        params.startDateEnd = Date.format(this._startDateEnd.getValue());

        params.allocationDateStart = Date.format(this._allocationDateBegin.getValue());
        params.allocationDateEnd = Date.format(this._allocationDateEnd.getValue());

        params.adjustDateStart = Date.format(this._adjustDateBegin.getValue());
        params.adjustDateEnd = Date.format(this._adjustDateEnd.getValue());
        params.typeName = this._comboBoxProjectType.getValue();
        params.projectNumber = this._comboBoxProjectNumber.getValue();

    }

    this.clearParams = function() {
        this._checkBoxIsCanceled.reset();
        this._checkBoxIsAllocated.reset();
        this._checkBoxIsCanceled2.reset();
        this._checkBoxIsAllocated2.reset();
        this._comboBoxExpert.reset();
        this._comboBoxProject.reset();
        this._comboBoxProjectNumber.reset();
        this._startDateBegin.reset();
        this._startDateEnd.reset();
        this._allocationDateBegin.reset();
        this._allocationDateEnd.reset();
        this._adjustDateBegin.reset();
        this._adjustDateEnd.reset();
        this._comboBoxProjectType.reset();
    }
}
Ext.extend(Srims.performance.PerformanceQueryWindow_InforPanel, Ext.FormPanel);
