
if (!Srims.fund) 
    Ext.namespace('Srims.fund');

Srims.fund.VoucherQueryWindow_InforPanel = function(isFinanceManage){

    var voucherStateStore = isFinanceManage ? Srims.fund.VoucherStateForFinanceStore : Srims.fund.VoucherStateStore;
    
    this._textFieldVoucherNumber = new Ext.form.TextField({
        fieldLabel: '凭单号',
        width: 150
    });
    this._comboBoxExpert = new Srims.component.ExpertSearch.SearchComboBox({
        fieldLabel: '专家',
        width: 167
    });
    this._comboBoxProject = new Srims.component.ProjectSearch.SearchComboBox({
        fieldLabel: '项目名称',
        width: 167
    });
    this._dateFieldFinanceAllocationDateBegin = new Ext.form.DateField({
        fieldLabel: '财务分配时间',
        width: 150
    });
    this._dateFieldFinanceAllocationDateEnd = new Ext.form.DateField({
        fieldLabel: '至',
        width: 150
    });
    this._textFieldAccountBookNumber = new Ext.form.TextField({
        fieldLabel: '账本号',
        width: 150
    });
    this._numberFieldFinanceNumber = new Ext.form.NumberField({
        fieldLabel: '财务制单号',
        allowBlank: false,
        allowDecimals: false,
        allowNegative: false,
        minLength: 5,
        maxLength: 5,
        width: 150
    });
    this._checkBoxIsHorizontal = new Ext.form.Checkbox({
        fieldLabel: '是否横向项目'
    });
    this._checkboxGroupVoucherStates = new Srims.component.CheckBoxGroup({
        fieldLabel: '凭单状态',
        cls: 'srims-checkboxGroup',
        columns: isFinanceManage ? 3 : 4,
        items: Srims.component.CheckBoxGroup.getCheckboxGroupItemsFromArray(voucherStateStore)
    });
    var columnFirstItems = [this._textFieldVoucherNumber, this._comboBoxProject, this._textFieldAccountBookNumber, this._dateFieldFinanceAllocationDateBegin];
    var columnSecondItems = [this._comboBoxExpert, this._checkBoxIsHorizontal, this._numberFieldFinanceNumber, this._dateFieldFinanceAllocationDateEnd];
    
    Srims.fund.VoucherQueryWindow_InforPanel.superclass.constructor.call(this, {
        title: '',
        frame: true,
        layout: 'form',
        labelWidth: 90,
        items: [new Ext.Panel({
            layout: 'column',
            items: [new Ext.Panel({
                width: 252,
                layout: 'form',
                labelWidth: 80,
                items: columnFirstItems
            }), new Ext.Panel({
                labelWidth: 90,
                layout: 'form',
                items: columnSecondItems
            })]
        }), this._checkboxGroupVoucherStates]
    });
    
    this.buildParams = function(params){
        params.voucherNumber = this._textFieldVoucherNumber.getValue();
        params.accountBookNumber = this._textFieldAccountBookNumber.getValue();
        params.financeNumber = this._numberFieldFinanceNumber.getValue();
        params.isHorizontal = this._checkBoxIsHorizontal.checked ? "true" : "";
        params.allocationDateTimeStart = Date.format(this._dateFieldFinanceAllocationDateBegin.getValue());
        params.allocationDateTimeEnd = Date.format(this._dateFieldFinanceAllocationDateEnd.getValue());
        params.voucherState = this._checkboxGroupVoucherStates.getSelecetedValue();
        params.expertName = this._comboBoxExpert.getText();
        params.projectName = this._comboBoxProject.getText();
    }
    
    this.clearParams = function(){
        this._textFieldVoucherNumber.reset();
        this._textFieldAccountBookNumber.reset();
        this._numberFieldFinanceNumber.reset();
        this._checkBoxIsHorizontal.reset();
        this._dateFieldFinanceAllocationDateBegin.reset();
        this._dateFieldFinanceAllocationDateEnd.reset();
        this._checkboxGroupVoucherStates.reset();
        this._comboBoxExpert.reset();
        this._comboBoxProject.reset();
    }
}
Ext.extend(Srims.fund.VoucherQueryWindow_InforPanel, Ext.FormPanel);
