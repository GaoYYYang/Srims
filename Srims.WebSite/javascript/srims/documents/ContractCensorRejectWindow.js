
if (!Srims.documents) 
    Ext.namespace('Srims.documents');

Srims.documents.ContractCensorRejectWindow = function(id, contract, store, isHorizontal){

    this._contract = contract;
    
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
        text: '审核驳回',
        window: this
    });
    
    this._textRemark = new Ext.form.TextArea({
        fieldLabel: '驳回理由',
        height: 60,
        width: 240
    });
    
    Srims.documents.ContractCensorRejectWindow.superclass.constructor.call(this, {
        id: id,
        title: '审核驳回项目合同：',
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
        items: [this._textRemark],
        buttons: [this._buttonCensor, this._buttonClose]
    });
    
    this.buttonCensor_click = function(button, e){
        var window = this.window;
        var remark = window._textRemark.getValue();
        
        Srims.projects.censorContractReject(window._contract, store, isHorizontal, remark);
        window.close();
    }
    this._buttonCensor.on('click', this.buttonCensor_click);
}
Ext.extend(Srims.documents.ContractCensorRejectWindow, Ext.Window);
