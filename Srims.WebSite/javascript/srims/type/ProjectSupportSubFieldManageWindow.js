
if (!Srims.type) 
    Ext.namespace("Srims.type");

Srims.type.ProjectSupportSubFieldManageWindow = function(id, projectSupportField, projectSupportFieldStore, projectType, projectTypeStore){

    this._id = id;
    this._projectSupportField = projectSupportField;
    this._projectSupportFieldStore = projectSupportFieldStore;
    this._projectType = projectType;
    this._projectTypeStore = projectTypeStore;
    
    this._supportSubFieldGridPanel = new Srims.type.ProjectSupportSubFieldGridPanel(this._projectSupportField, this._projectSupportFieldStore, this._projectType, this._projectTypeStore);
    
    this._buttonClose = new Ext.Button({
        minWidth: 80,
        text: '关 闭',
        window: this,
        handler: function(){
            var window = this.window;
            window.hide();
        }
    });
    
    Srims.type.ProjectSupportSubFieldManageWindow.superclass.constructor.call(this, {
        id: this._id,
        title: '项目资助子领域' + this._projectSupportField.get('name') + '项目资助子领域管理',
        iconCls: 'icon-type-support-sub-field',
        width: 500,
        autoHeight: true,
        style: 'padding:5px',
        deferredRender: false,
        frame: true,
        closeAction: 'hide',
        layout: 'column',
        resizable: false,
        items: [this._supportSubFieldGridPanel],
        buttons: [this._buttonClose]
    });
}
Ext.extend(Srims.type.ProjectSupportSubFieldManageWindow, Ext.Window, {});


