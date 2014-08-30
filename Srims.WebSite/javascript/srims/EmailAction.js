
Srims.emailAction = function(){
};

Srims.emailAction.sendEmail = function(emails){
    if (emails.length == 0) {
        Ext.Msg.show({
            title: '发送邮件错误',
            msg: '您没有选择收件人',
            buttons: Ext.Msg.OK,
            icon: Ext.MessageBox.INFO
        });
        return;
    }
    
    var windowId = 'SendEmialWindow';
    var window = Ext.getCmp(windowId);
    
    if (!window) {
        window = new Srims.component.EmailEditWindow(windowId, '发送邮件', 'icon-email', emails);
    }
    window.show();
};