
if (!Srims.type) 
    Ext.namespace("Srims.type");

Srims.type.ProjectSupportFieldManageWindow = function(id, projectType, store){

    this._id = id;
    this._projectType = projectType;
    this._projectTypeStore = store;
    this._supportFieldGridPanel = new Srims.type.ProjectSupportFieldGridPanel(this._projectType, this._projectTypeStore);
    
    this._buttonClose = new Ext.Button({
        minWidth: 80,
        text: '关 闭',
        window: this,
        handler: function(){
            var window = this.window;
            window.hide();
        }
    });
    
    Srims.type.ProjectSupportFieldManageWindow.superclass.constructor.call(this, {
        id: this._id,
        title: '项目类型' + this._projectType.get('name') + '资助领域管理',
        iconCls: 'icon-type-support-field',
        width: 500,
        autoHeight: true,
        style: 'padding:5px',
        deferredRender: false,
        frame: true,
        closeAction: 'hide',
        layout: 'column',
        resizable: false,
        items: [this._supportFieldGridPanel],
        buttons: [this._buttonClose]
    });
}
Ext.extend(Srims.type.ProjectSupportFieldManageWindow, Ext.Window, {});
