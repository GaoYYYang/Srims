
if (Srims.type) 
    Ext.namespace("Srims.type");
Srims.type.ProjectTypeShowPanel_ProjectSupportCategoryForm = function(projectType){
    this._projectType = projectType;
    this._store = new Srims.type.ProjectSupportCategoryStore();
    
    this._columnModel = new Srims.type.ProjectSupportCategoryGridPanel_ColumnModel();
    
    this._gridPanelProjectSupportCategory = new Ext.grid.GridPanel({
        store: this._store,
        colModel: this._columnModel,
        enableColumnHide: false,
        enableColumnMove: true,
        enableHdMenu: false,
        border: false,
        width: 500,
        autoExpand: true,
        stripeRows: true,
        loadMask: true,
        autoHeight: true,
        stateful: false,
        viewConfig: {
            autoFill: true,
            scrollOffset: 0,
            forceFit: true,
            emptyText: '没有资助类别信息'
        }
    });
    
    Srims.type.ProjectTypeShowPanel_ProjectSupportCategoryForm.superclass.constructor.call(this, {
        collapsible: true,
        title: '项目资助类别信息',
        autoHeight: true,
        frame: true,
        labelWidth: 140,
        bodyStyle: 'padding:5px 5px 0',
        style: 'margin-bottom: 2px',
        defaultType: 'textfield',
        titleCollapse: true,
        items: [this._gridPanelProjectSupportCategory]
    });
    this._store.load({
        params: {
            projectTypeID: projectType.get('id')
        }
    });
}
Ext.extend(Srims.type.ProjectTypeShowPanel_ProjectSupportCategoryForm, Ext.FormPanel, {});
