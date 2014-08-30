
if (!Srims.experts) 
    Ext.namespace('Srims.experts');

Srims.experts.MyAchieveViewWindow = function(id){

    this._id = id;
    this._title = '我的成果';
    
    this._basicPanel = new Srims.experts.MyAchieveViewWindow_BasicPanel();
    
    this._buttonClose = new Ext.Button({
        minWidth: 80,
        text: '关 闭',
        window: this,
        handler: function(){
            var window = this.window;
            window.hide();
        }
    });
    Srims.experts.MyAchieveViewWindow.superclass.constructor.call(this, {
        id: this._id,
        bodyStyle: 'padding:10px 10px 0',
        width: 700,
        height: 377,
        deferredRender: false,
        labelWidth: 85,
        frame: true,
        layout: 'form',
        buttonAlign: 'right',
        title: this._title,
        iconCls:'icon-expert-my-achievement',
        resizable: false,
        modal: true,
        items:[this._basicPanel],
        buttons: [this._buttonClose]
    })
}
Ext.extend(Srims.experts.MyAchieveViewWindow, Ext.Window);
