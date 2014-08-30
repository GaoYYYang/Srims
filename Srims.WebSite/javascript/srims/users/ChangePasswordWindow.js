
if (Srims.users) 
    Ext.namespace('Srims.users');

Srims.users.ChangePasswordWindow = function(id){

    this._id = id;
    this._title = '修改密码';
    
    this._textFieldOldPassword = new Ext.form.TextField({
        fieldLabel: '请输入原密码',
        inputType: 'password',
        blankText: '密码不能为空！',
        allowBlank: false,
        width: 160
    });
    this._textFieldNewPassword = new Ext.form.TextField({
        fieldLabel: '请输入新密码',
        allowBlank: false,
        blankText: '密码不能为空！',
        inputType: 'password',
        width: 160
    });
    this._textFieldConfirmNewPassword = new Ext.form.TextField({
        fieldLabel: '确认新密码',
        allowBlank: false,
        blankText: '密码不能为空！',
        inputType: 'password',
        width: 160
    });
    
    this._buttonSave = new Ext.Button({
        minWidth: 80,
        text: '修 改',
        window: this
    });
    this._buttonClose = new Ext.Button({
        minWidth: 80,
        text: '关 闭',
        window: this,
        handler: function(){
            var window = this.window;
            window.close();
        }
    });
    Srims.users.ChangePasswordWindow.superclass.constructor.call(this, {
        id: this._id,
        bodyStyle: 'padding:5px 0 10px 10px',
        width: 330,
        autoHeight: true,
        autoScroll: true,
        deferredRender: false,
        labelWidth: 85,
        frame: true,
        layout: 'form',
        buttonAlign: 'right',
        title: this._title,
        iconCls: 'icon-change-password',
        resizable: false,
        modal: true,
        items: [this._textFieldOldPassword, this._textFieldNewPassword, this._textFieldConfirmNewPassword],
        buttons: [this._buttonSave, this._buttonClose]
    });
    //method
    this.save = function(){
    
        Ext.Ajax.request({
            url: Srims.service.users.UserService + '/SaveNewPassword',
            scope: this,
            params: {
                newPassword: this._textFieldNewPassword.getValue()
            },
            success: function(response){
                Ext.Msg.show({
                    msg: '密码修改成功',
                    buttons: Ext.Msg.OK,
                    icon: Ext.MessageBox.INFO
                });
                this.close();
            }
        })
    }
    this.isValid = function(preventMark){
        var result = true;
        result = this._textFieldOldPassword.isValid(preventMark) && result;
        result = this._textFieldNewPassword.isValid(preventMark) && result;
        result = this._textFieldConfirmNewPassword.isValid(preventMark) && result;
        return result;
    }
    //event
    this._onButtonSave_Click = function(button, e){
        var window = button.window;
        
        if (!window.isValid(false)) 
            return;
        
        Ext.Ajax.request({
            url: Srims.service.users.UserService + '/IsOldPasswordWrong',
            scope: this,
            params: {
                oldPassword: window._textFieldOldPassword.getValue()
            },
            success: function(response){
                if (!Boolean.toBoolean(response.responseText)) {
                    Ext.Msg.show({
                        title: '输入原密码错误',
                        msg: '请重新输入原密码',
                        buttons: Ext.Msg.OK,
                        icon: Ext.MessageBox.WARNING
                    });
                }
                else {
                    if (window._textFieldNewPassword.getValue() != window._textFieldConfirmNewPassword.getValue()) {
                        Ext.Msg.show({
                            title: '两次输入新密码不一致',
                            msg: '请重新输入新密码',
                            buttons: Ext.Msg.OK,
                            icon: Ext.MessageBox.WARNING
                        });
                    }
                    else {
                        button.setText('正在保存');
                        button.disable();
                        window.save();
                    }
                }
            }
        })
    }
    this._buttonSave.on('click', this._onButtonSave_Click);
}
Ext.extend(Srims.users.ChangePasswordWindow, Ext.Window);
