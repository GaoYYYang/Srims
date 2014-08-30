
if (!Srims.type) 
    Ext.namespace("Srims.type");

Srims.type.ProjectSupportCategoryManageWindow = function(id, projectType, store){

    this._id = id;
    this._projectType = projectType;
    this._projectTypeStore = store;
    this._supportCategoryGridPanel = new Srims.type.ProjectSupportCategoryGridPanel(this._projectType, this._projectTypeStore);
    
    this._buttonClose = new Ext.Button({
        minWidth: 80,
        text: '关 闭',
        window: this,
        handler: function(){
            var window = this.window;
            window.hide();
        }
    });
    
    Srims.type.ProjectSupportCategoryManageWindow.superclass.constructor.call(this, {
        id: this._id,
        title: '项目类型' + this._projectType.get('name') + '资助类别管理',
        iconCls: 'icon-type-support-category',
        width: 500,
        autoHeight: true,
        style: 'padding:5px',
        deferredRender: false,
        frame: true,
        closeAction: 'hide',
        layout: 'column',
        resizable: false,
        items: [this._supportCategoryGridPanel],
        buttons: [this._buttonClose]
    });
    //this._supportCategoryGridPanel.getProjectSupportCategoryStore().load();
}
Ext.extend(Srims.type.ProjectSupportCategoryManageWindow, Ext.Window, {});
