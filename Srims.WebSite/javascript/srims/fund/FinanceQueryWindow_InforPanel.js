
if (!Srims.fund) 
    Ext.namespace('Srims.fund');

Srims.fund.FinanceStateStore = [['True', '已下拨完'], ['False', '未下拨完'], ['', '全部']];

Srims.fund.FinanceQueryWindow_InforPanel = function(){

    this._textFieldVoucherNumber = new Ext.form.TextField({
        fieldLabel: '凭单号',
        width: 150
    });
    this._dateFieldReceiveDateBegin = new Ext.form.DateField({
        fieldLabel: '到帐日期',
        width: 150
    });
    this._dateFieldReceiveDateEnd = new Ext.form.DateField({
        fieldLabel: '至',
        width: 150
    });
    this._numberFieldAmountBegin = new Srims.component.MoneyField({
        fieldLabel: '经费额(万元)',
        allowNegative: false,
        width: 150
    });
    this._numberFieldAmountEnd = new Srims.component.MoneyField({
        fieldLabel: '至',
        allowNegative: false,
        width: 150
    });
    this._comboBoxIsDescendAll = new Ext.form.ComboBox({
        fieldLabel: '状态',
        store: Srims.fund.FinanceStateStore,
        displayField: 'name',
        editable: false,
        triggerAction: 'all',
        allowBlank: false,
        listWidth: 150,
        width: 150
    });
    this._checkBoxIsInvoiced = new Ext.form.Checkbox({
        fieldLabel: '是否已开发票'
    });
    this._textFieldAbstract = new Ext.form.TextField({
        fieldLabel: '摘要',
        width: 150
    });
    var columnFirstItems = [this._textFieldVoucherNumber, this._dateFieldReceiveDateBegin, this._numberFieldAmountBegin, this._checkBoxIsInvoiced];
    var columnSecondItems = [this._comboBoxIsDescendAll, this._dateFieldReceiveDateEnd, this._numberFieldAmountEnd, this._textFieldAbstract];
    
    Srims.fund.FinanceQueryWindow_InforPanel.superclass.constructor.call(this, {
        title: '',
        frame: true,
        layout: 'form',
        labelWidth: 60,
        items: [new Ext.Panel({
            layout: 'column',
            items: [new Ext.Panel({
                width: 250,
                layout: 'form',
                labelWidth: 80,
                items: columnFirstItems
            }), new Ext.Panel({
                labelWidth: 40,
                layout: 'form',
                items: columnSecondItems
            })]
        })]
    });
    
    this.buildParams = function(params){
        params.voucherNumber = this._textFieldVoucherNumber.getValue();
        params.isDescendAll = this._comboBoxIsDescendAll.getValue();
        params.isInvoiced = this._checkBoxIsInvoiced.checked ? "true" : "";
        params.amountStart = this._numberFieldAmountBegin.getMoney();
        params.amountEnd = this._numberFieldAmountEnd.getMoney();
        params.receivedDateStart = Date.format(this._dateFieldReceiveDateBegin.getValue());
        params.receivedDateEnd = Date.format(this._dateFieldReceiveDateEnd.getValue());
        params.financeAbstract = this._textFieldAbstract.getValue();
    }
    
    this.clearParams = function(){
        this._textFieldVoucherNumber.reset();
        this._comboBoxIsDescendAll.reset();
        this._numberFieldAmountBegin.reset();
        this._numberFieldAmountEnd.reset();
        this._dateFieldReceiveDateBegin.reset();
        this._dateFieldReceiveDateEnd.reset();
        this._checkBoxIsInvoiced.reset();
        this._textFieldAbstract.reset();
    }
}
Ext.extend(Srims.fund.FinanceQueryWindow_InforPanel, Ext.FormPanel);
