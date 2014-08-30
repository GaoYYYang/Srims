
if (!Srims.users) 
    Ext.namespace('Srims.users');

Srims.users.MessageShowWindow = function(id, message, gridPanelId){
    //field
    this._message = message;
    this._id = id;
    this._title = message.get('title');
    
    //controls
    this._formPanelBasic = new Srims.users.MessageShowWindow_BasicForm(message);
    this._formPanelContent = new Srims.users.MessageShowWindow_ContentForm(message);
    
    this._buttonClose = new Ext.Button({
        minWidth: 80,
        text: '关闭',
        window: this,
        handler: function(){
            var window = this.window;
            window.close();
        }
    })
    
    //constructor
    Srims.users.MessageShowWindow.superclass.constructor.call(this, {
        id: this._id,
        style: 'padding:5px 5px 0 5px',
        width: 600,
        autoHeight: true,
        deferredRender: false,
        frame: true,
        closeAction: 'close',
        buttonAlign: 'center',
        title: this._message.get('title'),
        resizable: false,
        iconCls: 'icon-message-show',
        items: [this._formPanelBasic, this._formPanelContent],
        buttons: [this._buttonClose]
    });
    //event
    this.on('close', onClose);
    //event method
    function onClose(){
        Ext.Ajax.request({
            url: Srims.service.users.MessageService + '/MarkAsRead',
            scope: this,
            params: this._message,
            success: function(){
                var panel = Ext.getCmp(gridPanelId);
                if (panel) 
                    panel.getMessageStore().load();
                Srims.Poll.startPollAction(Srims.Poll.getPollAction_UnreadMessagesCount);
            }
        });
    }
}
Ext.extend(Srims.users.MessageShowWindow, Ext.Window);
