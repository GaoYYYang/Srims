
if (!Srims.stamp) 
    Ext.namespace("Srims.stamp");

Srims.stamp.StuffManageWindow = function(id, stampApplication, stampApplicationStore){

    this._id = id;
    this._stampApplication = stampApplication;
    this._stampApplicationStore = stampApplicationStore;
    var stuffStore = new Srims.stamp.StuffStore(stampApplication.get('id'));
    this._stuffGridPanel = new Srims.stamp.StuffGridPanel(this._stampApplication, this._stampApplicationStore, stuffStore);
    
    this._buttonClose = new Ext.Button({
        minWidth: 80,
        text: '关 闭',
        window: this,
        handler: function(){
            var window = this.window;
            window.hide();
        }
    });
    
    Srims.stamp.StuffManageWindow.superclass.constructor.call(this, {
        id: this._id,
        title: '用印文件管理',
        iconCls: 'icon-stamp-stuff',
        width: 500,
        autoHeight: true,
        style: 'padding:5px',
        deferredRender: false,
        frame: true,
        closeAction: 'close',
        layout: 'column',
        resizable: false,
        items: [this._stuffGridPanel],
        buttons: [this._buttonClose]
    });
}
Ext.extend(Srims.stamp.StuffManageWindow, Ext.Window, {});

