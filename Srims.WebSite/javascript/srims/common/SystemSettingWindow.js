
if (!Srims.common) 
    Ext.namespace('Srims.common');


Srims.common.SystemSettingWindow = function(systemSetting){
    this._title = '系统设置';
    this._systemSetting = systemSetting;
    
    this._formPanelFund = new Srims.common.SystemSettingWindow_FundForm(systemSetting);
    this._formPanelAdminRate = new Srims.common.SystemSettingWindow_AdminRateForm(systemSetting);
    this._formPanelSendMaill = new Srims.common.SystemSettingWindow_SendMaillForm(systemSetting);
    this._formPanelWindowsServer = new Srims.common.SystemSettingWindow_WindowsServerForm(systemSetting);
    this._formPanelPaper = new Srims.common.SystemSettingWindow_PaperDescriptionForm(systemSetting);
    
    this._buttonSave = new Ext.Button({
        minWidth: 80,
        text: '保存设置',
        window: this
    });
    this._buttonClose = new Ext.Button({
        minWidth: 80,
        text: '取消',
        window: this,
        handler: function(){
            var window = this.window;
            window.close();
        }
    });
    Srims.common.SystemSettingWindow.superclass.constructor.call(this, {
        id: this._id,
        bodyStyle: 'padding:10px 10px 0',
        width: 805,
        height: 700,
        deferredRender: false,
        labelWidth: 85,
        frame: true,
        closeAction: 'hide',
        layout: 'form',
        buttonAlign: 'right',
        title: this._title,
        iconCls: 'icon-log-Set',
        resizable: false,
        modal: true,
        autoScroll: true,
        items: [this._formPanelFund, this._formPanelAdminRate, this._formPanelSendMaill, this._formPanelPaper, this._formPanelWindowsServer],
        buttons: [this._buttonSave, this._buttonClose]
    });
    //method
    this.assignValues = function(){
        this._formPanelFund.assignValues();
        this._formPanelAdminRate.assignValues();
        this._formPanelSendMaill.assignValues();
        this._formPanelWindowsServer.assignValues();
        this._formPanelPaper.assignValues();
    }
    this.isValid = function(preventMark){
        var result = true;
        result = this._formPanelFund.isValid(preventMark) && result;
        result = this._formPanelAdminRate.isValid(preventMark) && result;
        result = this._formPanelSendMaill.isValid(preventMark) && result;
        return result;
    }
    this.save = function(){
        var systemSetting = this._systemSetting;
        systemSetting.beginEdit();
        this.assignValues();
        systemSetting.commit();
        
        Ext.Ajax.request({
            url: Srims.service.common.SystemSettingService + '/Save',
            params: systemSetting.data,
            scope: this,
            success: function(){
                this.close();
            }
        })
    }
    this.passwordValidate = function(){
        if (this._formPanelSendMaill._textFieldSmtpPassword.getValue() == this._formPanelSendMaill._textFieldSmtpPasswordConfirm.getValue()) 
            return true;
        else 
            return false;
    };
    this._onButtonSave_Click = function(button, e){
        var window = button.window;
        
        if (!window.isValid(false)) 
            return;
        if (!window.passwordValidate()) {
            Ext.Msg.show({
                title: '确认密码错误',
                msg: '二次密码输入不一致，请重新输入！',
                buttons: Ext.Msg.OK,
                icon: Ext.MessageBox.WARNING
            })
            return false;
        }
        button.setText('正在保存');
        button.disable();
        
        window.save();
    }
    this._buttonSave.on('click', this._onButtonSave_Click);
}
Ext.extend(Srims.common.SystemSettingWindow, Ext.Window);
