
if (!Srims.type) 
    Ext.namespace("Srims.type");

Srims.type.ProjectTypeShowPanel = function(panelId, projectType, store){

    this._panelId = panelId;
    this._projectType = projectType;
    this._store = store;
    
    this._basicForm = new Srims.type.ProjectTypeShowPanel_BasicForm(this._projectType);
    this._supportCategoryForm = new Srims.type.ProjectTypeShowPanel_ProjectSupportCategoryForm(this._projectType);
    this._supportFieldFrom = new Srims.type.ProjectTypeShowPanel_ProjectSupportFieldForm(this._projectType);
    this._toolBar = new Srims.type.ProjectTypeShowPanel_ToolBar(this._projectType, this._store);
    
    Srims.type.ProjectTypeShowPanel.superclass.constructor.call(this, {
        id: this._panelId,
        style: 'padding:5px; width:1200px',
        closable: true,
        frame: true,
        deferHeight: false,
        buttonAlign: 'center',
        title: this._projectType.get('name'),
        iconCls: 'icon-show',
        tbar: this._toolBar,
        items: [this._basicForm, this._supportCategoryForm, this._supportFieldFrom]
    });
    
}
Ext.extend(Srims.type.ProjectTypeShowPanel, Ext.Panel, {});
