
if (!Srims.finance) 
    Ext.namespace("Srims.finance");

Srims.finance.FinanceInvoiceEditWindow = function(id, finance, store){

    this._id = id;
    this._finance = finance;
    this._store = store;
    
    this._buttonClose = new Ext.Button({
        minWidth: 80,
        text: '关 闭',
        window: this,
        handler: function(){
            var window = this.window;
            window.close();
        }
    });
    this._buttonSave = new Ext.Button({
        minWidth: 80,
        text: '保 存',
        window: this
    });
    this._comboBoxInvoiceType = new Srims.component.NoticeTextComboBox({
        fieldLabel: '发票类型',
        noticeTextType: 'InvoiceType',
        value: finance.get('invoiceType'),
        allowBlank: false,
        listWidth: 200,
        width: 200
    });
    this._textFieldInvoiceNumber = new Ext.form.TextField({
        fieldLabel: '发票号',
        allowBlank: true,
        value: finance.get('invoiceNumber'),
        width: 150
    });
    
    Srims.finance.FinanceInvoiceEditWindow.superclass.constructor.call(this, {
        id: this._id,
        title: '发票信息',
        iconCls: 'icon-new',
        width: 350,
        labelWidth: 60,
        height: 140,
        modal: true,
        bodyStyle: 'padding:10px 10px 0',
        deferredRender: false,
        frame: true,
        layout: 'form',
        resizable: false,
        items: [this._textFieldInvoiceNumber, this._comboBoxInvoiceType],
        buttons: [this._buttonSave, this._buttonClose]
    });
    
    this._isValid = function(preventMark){
        var result = true;
        
        result = this._comboBoxInvoiceType.isValid(preventMark) && result;
        result = this._textFieldInvoiceNumber.isValid(preventMark) && result;
        
        return result;
    }
    
    this._assignValues = function(){
        this._finance.set('invoiceNumber', this._textFieldInvoiceNumber.getValue());
        this._finance.set('invoiceType', this._comboBoxInvoiceType.getValue());
    }
    
    this._save = function(){
        var finance = this._finance;
        finance.beginEdit();
        this._assignValues();
        finance.commit();
        
        Ext.Ajax.request({
            url: Srims.service.fund.FinanceService + '/SaveInvoice',
            params: finance.data,
            scope: this,
            success: function(){
                this._store.load();
                this.close();
            }
        });
    }
    this._buttonSave_Click = function(button){
        var window = button.window;
        
        if (!window._isValid(false)) 
            return;
        
        button.setText('正在保存');
        button.disable();
        
        window._save();
    }
    this._buttonSave.on('click', this._buttonSave_Click);
}
Ext.extend(Srims.finance.FinanceInvoiceEditWindow, Ext.Window, {})
