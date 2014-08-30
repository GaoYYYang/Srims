
if (!Srims.common) 
    Ext.namespace('Srims.common');
Srims.common.AnnouncementShowWindow = function(id, announcement){
    //field
    this._announcement = announcement;
    this._id = id;
    this._title = announcement.get('title');
    
    //controls
    this._formPanelBasic = new Srims.common.AnnouncementShowWindow_BasicForm(announcement);
    this._formPanelContent = new Srims.common.AnnouncementShowWindow_ContentForm(announcement);
    
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
    Srims.common.AnnouncementShowWindow.superclass.constructor.call(this, {
        id: this._id,
        style: 'padding:5px',
        width: 600,
        height: 500,
        deferredRender: false,
        frame: true,
        closeAction: 'hide',
        buttonAlign: 'center',
        title: this._announcement.get('title'),
        resizable: false,
        iconCls: 'icon-announcement-show',
        items: [this._formPanelBasic, this._formPanelContent],
        buttons: [this._buttonClose]
    });
}
Ext.extend(Srims.common.AnnouncementShowWindow, Ext.Window);