
if (!Srims.stamp) 
    Ext.namespace("Srims.stamp");

Srims.stamp.StuffStampManageWindow = function(id, stuff, stuffStore, stampApplication, stampApplicationStore){
    this._id = id;
    this._stuff = stuff;
    this._stuffStore = stuffStore;
    this._stampApplication = stampApplication;
    this._stampApplicationStore = stampApplicationStore;
    
    this._stuffStampGridPanel = new Srims.stamp.StuffStampGridPanel(this._stuff, this._stuffStore, this._stampApplication, this._stampApplicationStore);
    
    this._buttonClose = new Ext.Button({
        minWidth: 80,
        text: '关 闭',
        window: this,
        handler: function(){
            var window = this.window;
            window.hide();
        }
    });
    
    Srims.stamp.StuffStampManageWindow.superclass.constructor.call(this, {
        id: this._id,
        title: '文件用印管理',
        iconCls: 'icon-stamp-stuff',
        width: 500,
        autoHeight: true,
        style: 'padding:5px',
        deferredRender: false,
        frame: true,
        closeAction: 'close',
        layout: 'column',
        resizable: false,
        items: [this._stuffStampGridPanel],
        buttons: [this._buttonClose]
    });
}
Ext.extend(Srims.stamp.StuffStampManageWindow, Ext.Window, {});
