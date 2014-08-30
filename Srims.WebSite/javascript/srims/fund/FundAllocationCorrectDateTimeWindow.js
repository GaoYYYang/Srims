
if (!Srims.fund) 
    Ext.namespace('Srims.fund');

Srims.fund.FundAllocationCorrectDateTimeWindow = function(fundallocation){

    this._fundAllocation = fundallocation;
    
    this._buttonClose = new Ext.Button({
        minWidth: 70,
        text: '关 闭',
        window: this,
        handler: function(){
            var window = this.window;
            window.close();
        }
    });
    this._buttonSave = new Ext.Button({
        minWidth: 70,
        text: '保 存',
        window: this
    });
    this._dateFieldDateTime = new Ext.form.DateField({
        fieldLabel: '分配时间',
        value: this._fundAllocation.get('allocationDateTime'),
        allowBlank: false,
        allowNegative: false,
        width: 160
    });
    Srims.fund.FundAllocationCorrectDateTimeWindow.superclass.constructor.call(this, {
        id: this._id,
        title: '纠正经费分配时间',
        width: 300,
        labelWidth: 70,
        height: 160,
        modal: true,
        bodyStyle: 'padding:10px 10px 0',
        deferredRender: false,
        frame: true,
        closeAction: 'close',
        layout: 'form',
        resizable: false,
        items: [this._dateFieldDateTime],
        buttons: [this._buttonSave, this._buttonClose]
    });
    
    this._isValid = function(preventMark){
        var result = true;
        
        result = this._dateFieldDateTime.isValid(preventMark) && result;
        
        return result;
    }
    this._save = function(){
        var fundAllocationDateTime = this._dateFieldDateTime.getValue().format("Y-m-d H:i:s");
        
        Ext.Ajax.request({
            url: Srims.service.fund.FundAllocationService + '/CorrectDateTime',
            params: {
                fundAllocationId: this._fundAllocation.get('id'),
                fundAllocationDateTime: fundAllocationDateTime
            },
            scope: this,
            success: function(){
                var panel = this._fundAllocation.panel;
                panel.fundAllocation = this._fundAllocation;
                panel.refresh();
                
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
Ext.extend(Srims.fund.FundAllocationCorrectDateTimeWindow, Ext.Window, {})
