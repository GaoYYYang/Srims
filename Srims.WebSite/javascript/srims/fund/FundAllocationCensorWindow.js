
if (!Srims.fund) 
    Ext.namespace('Srims.fund');

Srims.fund.FundAllocationCensorWindow = function(id, fundAllocation, isCensorPass){

    this._fundAllocation = fundAllocation;
    
    this._buttonClose = new Ext.Button({
        minWidth: 80,
        text: '关 闭',
        window: this,
        handler: function(){
            var window = this.window;
            window.close();
        }
    });
    this._buttonCensor = new Ext.Button({
        minWidth: 80,
        text: isCensorPass ? '审核通过' : '审核驳回',
        window: this
    });
    
    this._fieldCensorState = new Ext.form.Field({
        fieldLabel: '审核状态',
        value: isCensorPass ? '审核通过' : '审核驳回',
        readOnly: true,
        width: 160
    });
    this._textRemark = new Ext.form.TextArea({
        fieldLabel: '备注',
        height: 60,
        width: 230
    });
    
    Srims.fund.FundAllocationCensorWindow.superclass.constructor.call(this, {
        id: this._id,
        title: isCensorPass ? '审核通过绩效分配' : '审核驳回绩效分配',
        width: 370,
        autoHeight: true,
        labelWidth: 60,
        bodyStyle: 'padding:10px 10px 20px 10px',
        deferredRender: false,
        frame: true,
        modal: true,
        closeAction: 'close',
        layout: 'form',
        resizable: false,
        items: [this._fieldCensorState, this._textRemark],
        buttons: [this._buttonCensor, this._buttonClose]
    });
    
    this.buttonCensor_click = function(button, e){
        var window = this.window;
        
        if (isCensorPass) 
            Srims.fund.censorPassFundAllocation(window._fundAllocation, window._textRemark.getValue(), window);
        else 
            Srims.fund.censorRejectFundAllocation(window._fundAllocation, window._textRemark.getValue(), window);
    }
    this._buttonCensor.on('click', this.buttonCensor_click);
}
Ext.extend(Srims.fund.FundAllocationCensorWindow, Ext.Window);
