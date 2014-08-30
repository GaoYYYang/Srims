
if (!Srims.fund) 
    Ext.namespace("Srims.fund");

Srims.fund.FinanceEditWindow = function(id, finance, store){

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
    this._textFieldVoucherNumber = new Ext.form.TextField({
        fieldLabel: '凭单号',
        allowBlank: false,
        width: 180
    });
    this._dateFieldReceiveDate = new Ext.form.DateField({
        fieldLabel: '到帐日期',
        allowBlank: false,
        width: 180
    });
    this._numberFieldAmount = new Srims.component.MoneyField({
        fieldLabel: '经费额(万元)',
        allowNegative: false,
        allowBlank: false,
        width: 180
    });
    this._textAreaAbstract = new Ext.form.TextArea({
        fieldLabel: '说明',
        width: 180
    });
    
    Srims.fund.FinanceEditWindow.superclass.constructor.call(this, {
        id: this._id,
        title: '新建经费到帐信息',
        iconCls: 'icon-new',
        width: 350,
        labelWidth: 90,
        height: 300,
        modal: true,
        bodyStyle: 'padding:10px 10px 0',
        deferredRender: false,
        frame: true,
        closeAction: 'hide',
        layout: 'form',
        resizable: false,
        items: [this._dateFieldReceiveDate, this._textFieldVoucherNumber, this._numberFieldAmount, this._textAreaAbstract],
        buttons: [this._buttonSave, this._buttonClose]
    });
    
    this._isValid = function(preventMark){
        var result = true;
        
        result = this._dateFieldReceiveDate.isValid(preventMark) && result;
        result = this._textFieldVoucherNumber.isValid(preventMark) && result;
        result = this._numberFieldAmount.isValid(preventMark) && result;
        result = this._textAreaAbstract.isValid(preventMark) && result;
        
        return result;
    }
    
    this._assignValues = function(){
        this._finance.set('voucherNumber', this._textFieldVoucherNumber.getValue());
        this._finance.set('amount', this._numberFieldAmount.getMoney());
        this._finance.set('receivedDate', Date.format(this._dateFieldReceiveDate.getValue()));
        this._finance.set('abstract', this._textAreaAbstract.getValue());
        
    }
    
    this._save = function(){
        var finance = this._finance;
        finance.beginEdit();
        this._assignValues();
        finance.commit();
        
        Ext.Ajax.request({
            url: Srims.service.fund.FinanceService + '/Save',
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
Ext.extend(Srims.fund.FinanceEditWindow, Ext.Window, {})

