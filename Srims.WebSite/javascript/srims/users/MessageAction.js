
if (!Srims.users) 
    Ext.namespace('Srims.users');

Srims.users.MessageAction = function(){
}
Srims.users.MessageAction.listMyMessages = function(){
    Srims.users.MessageAction.listMessage('MyMessageGridPanel', '我的短消息', 'icon-message-list', false);
}
Srims.users.MessageAction.listMyUnReadMessages = function(){
    Srims.users.MessageAction.listMessage('MyUnReadMessageGridPanel', '未读短消息', '', true);
}
Srims.users.MessageAction.listMessage = function(panelId, title, concls, isUnRead){
    var messageStore = undefined;
    var panel = Srims.WorkSpace.active(panelId);
    
    if (!panel) {
        var loadUrl = isUnRead ? Srims.service.users.MessageService + '/GetUnReadMessages' : Srims.service.users.MessageService + '/GetMessages';
        messageStore = new Srims.users.MessageStore(loadUrl);
        panel = new Srims.users.MessageGridPanel(panelId, messageStore, title, concls, isUnRead);
        if (!isUnRead) 
            Srims.WorkSpace.addPanel(panel);
        else 
            panel.render('divUnReadMesseages');
        
        messageStore.load();
    }
}
Srims.users.MessageAction.sendMessage = function(gridPanelId){
    var id = 'NewMessageWindow';
    var window = Ext.getCmp(id);
    
    if (!window) {
        var message = new Srims.users.Message({});
        window = new Srims.users.MessageEditWindow(id, message, gridPanelId);
    }
    
    window.show();
}
Srims.users.MessageAction.showMessage = function(message, gridPanelId){
    var id = 'ShowMessageWindow' + message.get('id');
    var window = Ext.getCmp(id);
    
    if (!window) {
        window = new Srims.users.MessageShowWindow(id, message, gridPanelId);
    }
    
    window.show();
}
