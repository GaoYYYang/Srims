
if (!Srims.component) 
    Ext.namespace('Srims.component');
	
Srims.component.EmailEditWindow = function(id, title, iconCls, emails){

    this._buttonCancel = new Ext.Button({
        minWidth: 80,
        text: '取 消',
        window: this,
        handler: function(){
            this.window.close();
        }
    });
    this._buttonSend = new Ext.Button({
        minWidth: 80,
        text: '发 送',
        window: this
    });
    this._comboBoxReceiver = new Ext.form.TextArea({
        fieldLabel: '收件人',
        value: emails,
        allowBlank: false,
        width: 500,
        height: 50
    })
    this._textFieldSubject = new Ext.form.TextField({
        fieldLabel: '主题',
        allowBlank: false,
        width: 500
    });
    this._textAreaContent = new Ext.form.TextArea({
        hideLabel: true,
        height: 210,
        allowBlank: false,
        style: 'margin-top:10px',
        width: 555
    });
    Srims.component.EmailEditWindow.superclass.constructor.call(this, {
        id: id,
        title: title,
        iconCls: iconCls,
        labelWidth: 50,
        bodyStyle: 'padding: 10px 0 0 10px',
        width: 600,
        height: 400,
        closeAction: 'close',
        resizable: false,
        layout: 'form',
        items: [this._comboBoxReceiver, this._textFieldSubject, this._textAreaContent],
        buttons: [this._buttonSend, this._buttonCancel]
    });
    //method
    this.isValid = function(preventMark){
        var result = true;
        
        result = this._comboBoxReceiver.isValid(preventMark) && result;
        result = this._textFieldSubject.isValid(preventMark) && result;
        result = this._textAreaContent.isValid(preventMark) && result;
        
        return result;
    }
    this.save = function(){
        Ext.Ajax.request({
            url: Srims.service.common.EmailService + '/SendEmail',
            params: {
                receiverAddresses: this._comboBoxReceiver.getValue(),
                subject: this._textFieldSubject.getValue(),
                content: this._textAreaContent.getValue()
            },
            scope: this,
            success: function(){
                Ext.Msg.show({
                    title: '邮件发送成功',
                    msg: '已经成功发送邮件',
                    buttons: Ext.Msg.OK,
                    icon: Ext.MessageBox.INFO
                });
                this.close();
            }
        })
    }
    //event
    this._on_buttonSend_Click = function(button, e){
        var window = button.window;
        
        if (!window.isValid(false)) 
            return;
        
        button.setText('正在发送');
        button.disable();
        
        window.save();
    }
    this._buttonSend.on('click', this._on_buttonSend_Click);
}
Ext.extend(Srims.component.EmailEditWindow, Ext.Window);
