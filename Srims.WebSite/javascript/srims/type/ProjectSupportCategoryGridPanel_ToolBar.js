
if (!Srims.type) 
    Ext.namespace('Srims.type');

Srims.type.ProjectSupportCategoryGridPanel_ToolBar = function(selection, store, projectType, projectTypeStore){

    //fields
    this._selection = selection;
    this._store = store;
    this._projectType = projectType;
    this._projectTypeStore = projectTypeStore;
    
    //controls
    this._buttonNew = new Ext.Toolbar.Button({
        iconCls: 'icon-new',
        text: '添加',
        minWidth: 60,
        selection: this._selection,
        store: this._store,
        projectType: this._projectType,
        projectTypeStore: this._projectTypeStore,
        handler: function(){
            Srims.type.newProjectSupportCategory(this.store, this.projectType, this.projectTypeStore);
        },
        tooltip: '<b>添加项目资助类别</b><br/>输入项目资助类别信息以添加资助类别'
    });
    this._buttonEdit = new Ext.Toolbar.Button({
        iconCls: 'icon-edit',
        text: '编辑',
        minWidth: 60,
        selection: this._selection,
        store: this._store,
        projectType: this._projectType,
        projectTypeStore: this._projectTypeStore,
        handler: function(){
            if (this.selection.getCount() == 0) 
                return;
            Srims.type.editProjectSupportCategory(this.selection.getSelected(), this.store, this.projectType, this.projectTypeStore);
        },
        hidden: true,
        tooltip: '<b>编辑项目资助类别</b><br/>编辑选中项目资助类别的信息'
    });
    this._buttonDelete = new Ext.Toolbar.Button({
        iconCls: 'icon-delete',
        text: '删除',
        minWidth: 60,
        store: this._store,
        selection: this._selection,
        projectType: this._projectType,
        projectTypeStore: this._projectTypeStore,
        handler: function(){
            if (this.selection.getCount() == 0) 
                return;
            Srims.type.deleteProjectSupportCategory(this.selection.getSelected(), this.store, this.projectType, this.projectTypeStore);
        },
        hidden: true,
        tooltip: '<b>删除项目资助类别</b>'
    });
    var user = Srims.currentLoginLog.user;
    Srims.type.ProjectSupportCategoryGridPanel_ToolBar.superclass.constructor.call(this, {
        items: [this._buttonNew, this._buttonEdit, this._buttonDelete]
    });
    
    //initial
    this._selection.buttonEdit = this._buttonEdit;
    this._selection.buttonDelete = this._buttonDelete;
    
    //event methods
    this._onSelection_selectionChagne = function(selection){
        var buttonEdit = selection.buttonEdit;
        var buttonDelete = selection.buttonDelete;
        
        if (selection.getCount() == 0) {
            buttonEdit.hide();
            buttonDelete.hide();
            return;
        }
        
        var projectSupportCategory = selection.getSelected();
        
        buttonEdit.setVisible(projectSupportCategory.get('hasPermission_Edit'));
        buttonEdit.setDisabled(!projectSupportCategory.get('canEdit'));
        
        buttonDelete.setVisible(projectSupportCategory.get('hasPermission_Delete'));
        buttonDelete.setDisabled(!projectSupportCategory.get('canDelete'));
        
    }
    
    //events
    this._selection.on('selectionchange', this._onSelection_selectionChagne);
}
Ext.extend(Srims.type.ProjectSupportCategoryGridPanel_ToolBar, Ext.Toolbar);
