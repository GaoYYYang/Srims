
if (!Srims.documents) 
    Ext.namespace('Srims.documents');

Srims.documents.DocumentModelManageWindow = function(id, projectTypeId, projectTypeName, isProjectShow){

    this._id = id;
    this._projectTypeId = projectTypeId;
    this._DocumentModelGridPanel = new Srims.documents.DocumentModelGridPanel(this._projectTypeId, isProjectShow);
    
    this._buttonClose = new Ext.Button({
        minWidth: 80,
        text: '关 闭',
        window: this,
        handler: function(){
            var window = this.window;
            window.close();
        }
    });
    
    Srims.documents.DocumentModelManageWindow.superclass.constructor.call(this, {
        id: this._id,
        title: projectTypeName + '文档模板管理',
        width: 500,
        autoHeight: true,
        style: 'padding:5px',
        deferredRender: false,
        frame: true,
        closeAction: 'close',
        layout: 'column',
        resizable: false,
        items: [this._DocumentModelGridPanel],
        buttons: [this._buttonClose]
    });
    
    this._DocumentModelGridPanel.getStore().load();
}
Ext.extend(Srims.documents.DocumentModelManageWindow, Ext.Window, {});

