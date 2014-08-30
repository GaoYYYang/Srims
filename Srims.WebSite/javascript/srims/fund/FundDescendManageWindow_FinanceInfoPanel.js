
if (!Srims.fund) 
    Ext.namespace("Srims.fund");

Srims.fund.FundDescendManageWindow_FinanceInfoPanel = function(finance){

    this._finance = finance;
    
    this._textFieldVoucherNumber = new Ext.form.TextField({
        fieldLabel: '凭单号',
        value: finance.get('voucherNumber'),
        width: 150,
        readOnly: true
    });
    this._dateFieldReceiveDate = new Ext.form.TextField({
        fieldLabel: '到帐日期',
        value: Date.render(finance.get('receivedDate')),
        readOnly: true,
        width: 150
    });
    this._numberFieldAmount = new Ext.form.TextField({
        fieldLabel: '到帐金额',
        value: Money.render(finance.get('amount')),
        readOnly: true,
        width: 150
    });
    this._numberFieldDescendAmount = new Ext.form.TextField({
        fieldLabel: '已下拨金额',
        value: Money.render(finance.get('descendAmount')),
        readOnly: true,
        width: 150
    });
    this._textAreaAbstract = new Ext.form.TextField({
        fieldLabel: '说明',
        value: finance.get('abstract'),
        readOnly: true,
        width: 350
    });
    this._checkboxIsInvoiced = new Ext.form.Checkbox({
        fieldLabel: '是否开发票',
        checked: finance.get('isInvoiced'),
        readOnly: true
    });
    this._textFieldInvoiceTime = new Ext.form.TextField({
        fieldLabel: '开发票时间',
        value: finance.get('invoiceTime'),
        width: 150,
        readOnly: true
    });
    this._textFieldInvoiceType = new Ext.form.TextField({
        fieldLabel: '发票类型',
        value: finance.get('invoiceType'),
        width: 150,
        readOnly: true
    });
    this._textFieldInvoiceNumber = new Ext.form.TextField({
        fieldLabel: '发票号',
        value: finance.get('invoiceNumber'),
        width: 150,
        readOnly: true
    });
    this._toolBar = new Srims.fund.FundDescendManageWindow_FinanceInfoPanel_ToolBar(finance, this);
    
    var columnOneItems = [this._textFieldVoucherNumber, this._numberFieldAmount, this._textFieldInvoiceNumber];
    var columnTowItems = [this._dateFieldReceiveDate, this._checkboxIsInvoiced, this._textFieldInvoiceType];
    var columnthreeItems = [this._numberFieldDescendAmount, this._textFieldInvoiceTime];
    Srims.fund.FundDescendManageWindow_FinanceInfoPanel.superclass.constructor.call(this, {
        title: '',
        autoHeight: true,
        frame: true,
        bodyStyle: 'padding:5px 0 0 5px',
        style: 'margin-bottom: 2px',
        defaultType: 'textfield',
        layout: 'form',
        labelWidth: 70,
        tbar: this._toolBar,
        items: [new Ext.Panel({
            layout: 'column',
            items: [new Ext.Panel({
                width: 280,
                labelWidth: 70,
                layout: 'form',
                items: columnOneItems
            }), new Ext.Panel({
                width: 280,
                labelWidth: 70,
                layout: 'form',
                items: columnTowItems
            }), new Ext.Panel({
                layout: 'form',
                labelWidth: 70,
                items: columnthreeItems
            })]
        }), this._textAreaAbstract]
    });
    
    this.resetComponentValues = function(currentfinance){
        this._numberFieldDescendAmount.setValue(Money.render(currentfinance.get('descendAmount')));
        this._checkboxIsInvoiced.setValue(currentfinance.get('isInvoiced'));
        this._textFieldInvoiceTime.setValue(currentfinance.get('invoiceTime'));
        this._textFieldInvoiceType.setValue(currentfinance.get('invoiceType'));
        this._textFieldInvoiceNumber.setValue(currentfinance.get('invoiceNumber'));
    }
}
Ext.extend(Srims.fund.FundDescendManageWindow_FinanceInfoPanel, Ext.form.FormPanel, {})

