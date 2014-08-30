
if (!Srims.users) 
    Ext.namespace('Srims.users');

Srims.users.MessageEditWindow = function(id, message, gridPnaelId){

    this._message = message;
    this._title = '发送短消息';
    
    this._formPanelBasic = new Srims.users.MessageEditWindow_BasicForm(message);
    this._formPanelContent = new Srims.users.MessageEditWindow_ContentForm(message);
    
    this._buttonSave = new Ext.Button({
        minWidth: 80,
        text: '发送',
        formPanelBasic: this._formPanelBasic,
        window: this
    });
    
    Srims.users.MessageEditWindow.superclass.constructor.call(this, {
        id: id,
        style: 'padding:5px',
        width: 600,
        autoHeight: true,
        closeAction: 'close',
        buttonAlign: 'center',
        title: this._title,
        iconCls: 'icon-message-send',
        resizable: false,
        items: [this._formPanelBasic, this._formPanelContent],
        buttons: [this._buttonSave]
    });
    //method
    this.assignValues = function(){
        this._formPanelBasic.assignValues();
        this._formPanelContent.assignValues();
    }
    this.isValid = function(preventMark){
        var result = true;
        
        result = this._formPanelBasic.isValid(preventMark) && result;
        
        return result;
    }
    this.save = function(){
        var message = this._message;
        message.beginEdit();
        this.assignValues();
        message.commit();
        
        Ext.Ajax.request({
            url: Srims.service.users.MessageService + '/Sender',
            params: message.data,
            scope: this,
            success: function(){
                var panel = Ext.getCmp(gridPnaelId);
                if (panel) 
                    panel.getMessageStore().load();
                
                this.close();
                Srims.Poll.startPollAction(Srims.Poll.getPollAction_UnreadMessagesCount);
            }
        })
    }
    //event
    this._onButtonSave_Click = function(button, e){
        var window = button.window;
        
        if (!window.isValid(false)) 
            return;
        Ext.Ajax.request({
            url: Srims.service.users.UserService + '/IsUserNameExist',
            params: {
                name: this.formPanelBasic._comboBoxReceiver.getText()
            },
            success: function(response){
                if (Boolean.toBoolean(response.responseText)) {
                    button.setText('正在保存');
                    button.disable();
                    
                    window.save();
                }
                else {
                    Ext.Msg.show({
                        title: '用户名错误',
                        msg: '该用户名不存在，请重新输入！',
                        buttons: Ext.Msg.OK,
                        icon: Ext.MessageBox.WARNING
                    });
                }
            }
        })
    }
    this._buttonSave.on('click', this._onButtonSave_Click);
}
Ext.extend(Srims.users.MessageEditWindow, Ext.Window);

