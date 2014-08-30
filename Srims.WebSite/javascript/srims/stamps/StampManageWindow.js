
if (!Srims.stamp) 
    Ext.namespace("Srims.stamp");

Srims.stamp.StampManageWindow = function(id){

    this._id = id;
    
    this._stampGridPanel = new Srims.stamp.StampGridPanel();
    
    this._buttonClose = new Ext.Button({
        minWidth: 80,
        text: '关 闭',
        window: this,
        handler: function(){
            var window = this.window;
            window.hide();
        }
    });
    
    Srims.stamp.StampManageWindow.superclass.constructor.call(this, {
        id: this._id,
        title: '图章管理',
        iconCls: 'icon-stamp-stamp',
        width: 500,
        autoHeight: true,
        style: 'padding:5px',
        deferredRender: false,
        frame: true,
        closeAction: 'close',
        layout: 'column',
        resizable: false,
        items: [this._stampGridPanel],
        buttons: [this._buttonClose]
    });
}
Ext.extend(Srims.stamp.StampManageWindow, Ext.Window, {});
