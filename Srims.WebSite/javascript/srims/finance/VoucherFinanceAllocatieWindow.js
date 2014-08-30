
if (!Srims.finance) 
    Ext.namespace("Srims.finance");

Srims.finance.VoucherFinanceAllocateWindow = function(id, voucher, store){

    this._id = id;
    this._voucher = voucher;
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
    this._dateFieldFinanceAllocationDate = new Ext.form.DateField({
        fieldLabel: '财务分配时间',
        value: Date.render(voucher.get('financeAllocationDateTime')),
        readOnly: true,
        allowBlank: false,
        width: 150
    });
    this._numberFieldFinanceNumber = new Ext.form.TextField({
        fieldLabel: '财务制单号',
        value: voucher.get('financeNumber'),
        allowBlank: false,
        minLength: 5,
        maxLength: 5,
        enableKeyEvents: true,
        width: 150
    });
    Srims.finance.VoucherFinanceAllocateWindow.superclass.constructor.call(this, {
        id: this._id,
        title: '凭单财务分配信息',
        iconCls: 'icon-new',
        width: 350,
        labelWidth: 80,
        height: 140,
        modal: true,
        bodyStyle: 'padding:10px 10px 0',
        deferredRender: false,
        frame: true,
        layout: 'form',
        resizable: false,
        items: [this._dateFieldFinanceAllocationDate, this._numberFieldFinanceNumber],
        buttons: [this._buttonSave, this._buttonClose]
    });
    this._numberFieldFinanceNumber.on('keypress', function(button, e){
        var allowed = '0123456789';
        var k = e.getKey();
        if (!Ext.isIE && (e.isSpecialKey() || k == e.BACKSPACE || k == e.DELETE)) {
            return;
        }
        var c = e.getCharCode();
        if (allowed.indexOf(String.fromCharCode(c)) === -1) {
            e.stopEvent();
        }
    });
    this._isValid = function(preventMark){
        var result = true;
        
        result = this._dateFieldFinanceAllocationDate.isValid(preventMark) && result;
        result = this._numberFieldFinanceNumber.isValid(preventMark) && result;
        
        return result;
    }
    
    this._assignValues = function(){
        this._voucher.set('financeNumber', this._numberFieldFinanceNumber.getValue());
        this._voucher.set('financeAllocationDate', Date.format(this._dateFieldFinanceAllocationDate.getValue()));
    }
    
    this._save = function(){
        var voucher = this._voucher;
        voucher.beginEdit();
        this._assignValues();
        voucher.commit();
        
        Ext.Ajax.request({
            url: Srims.service.fund.VoucherService + '/VoucherAllocate',
            params: voucher.data,
            scope: this,
            success: function(response){
                this._store.load();
                this.close();
                var newstore = new Ext.data.Store({
                    data: response.responseXML,
                    reader: new Srims.fund.VoucherXmlReader()
                });
                var editedVoucher = newstore.getAt(0);
                var panelId = 'VoucherFinanceShowPanel' + editedVoucher.get('id');
                if (Ext.getCmp(panelId)) 
                    Srims.WorkSpace.getWorkSpace().remove(Ext.getCmp(panelId), true);
                Srims.fund.showVoucher(editedVoucher, this._store, true);
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
Ext.extend(Srims.finance.VoucherFinanceAllocateWindow, Ext.Window, {})
