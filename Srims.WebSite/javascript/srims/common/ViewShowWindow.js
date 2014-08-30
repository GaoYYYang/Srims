
if (!Srims.common) 
    Ext.namespace('Srims.common');

Srims.common.ViewShowWindow = function(id, store, viewType){

    this._id = id;
    this._store = store;
    this._viewGridPanel = new Srims.common.ViewGridPanel(this._store, viewType);
    
    this._buttonClose = new Ext.Button({
        minWidth: 80,
        text: '关 闭',
        window: this,
        handler: function(){
            var window = this.window;
            window.close();
        }
    });
    this._buttonDefineSelf = new Ext.Button({
        minWidth: 80,
        text: '自定义',
        window: this,
        handler: function(){
            this.setText('正在转入...');
            this.setDisabled(true);
            
            eval(Srims.common.ViewType.getDefineSelfFunction(viewType));
            this.window.close();
        }
    });
    
    Srims.common.ViewShowWindow.superclass.constructor.call(this, {
        id: this._id,
        title: Srims.common.viewTypeRender(viewType) + '视图',
        iconCls: Srims.common.ViewType.getIconCls(viewType),
        width: 700,
        autoHeight: true,
        style: 'padding:5px',
        deferredRender: false,
        frame: true,
        closeAction: 'close',
        layout: 'form',
        resizable: false,
        items: [this._viewGridPanel],
        buttons: [this._buttonDefineSelf, this._buttonClose]
    });
    
    this._store.window = this;
    this._store.on('load', function(){
        if (this.getCount() == 0) {
            eval(Srims.common.ViewType.getDefineSelfFunction(viewType));
            this.window.close();
        }
    })
    
    this._store.load();
}
Ext.extend(Srims.common.ViewShowWindow, Ext.Window, {});

