
if (!Srims.type) 
    Ext.namespace('Srims.type');

Srims.type.ProjectSupportFieldGridPanel_ToolBar = function(selection, store, projectType, projectTypeStore){

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
            Srims.type.newProjectSupportField(this.store, this.projectType, this.projectTypeStore);
        },
        tooltip: '<b>添加项目资助领域</b><br/>输入项目资助领域信息以添加资助领域'
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
            Srims.type.editProjectSupportField(this.selection.getSelected(), this.store, this.projectType, this.projectTypeStore);
        },
        hidden: true,
        tooltip: '<b>编辑项目资助领域</b><br/>编辑选中项目资助领域的信息'
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
            Srims.type.deleteProjectSupportField(this.selection.getSelected(), this.store, this.projectType, this.projectTypeStore);
        },
        hidden: true,
        tooltip: '<b>删除项目资助领域</b>'
    });
    this._buttonProjectSupportSubFieldManage = new Ext.Toolbar.Button({
        iconCls: 'icon-type-support-sub-field',
        text: '项目资助子领域管理',
        minWidth: 60,
        selection: this._selection,
        store: this._store,
        projectType: this._projectType,
        projectTypeStore: this._projectTypeStore,
        handler: function(){
            if (this.selection.getCount() == 0) 
                return;
            Srims.type.showProjectSupportSubFieldManageWindow(this.selection.getSelected(), this.store, this.projectType, this.projectTypeStore);
        },
        hidden: true,
        tooltip: '<b>项目资助子领域管理</b><br/>项目资助子领域管理'
    });
    var user = Srims.currentLoginLog.user;
    Srims.type.ProjectSupportFieldGridPanel_ToolBar.superclass.constructor.call(this, {
        items: [this._buttonNew, this._buttonEdit, this._buttonProjectSupportSubFieldManage, this._buttonDelete]
    });
    
    //initial
    this._selection.buttonEdit = this._buttonEdit;
    this._selection.buttonDelete = this._buttonDelete;
    this._selection.buttonProjectSupportSubFieldManage = this._buttonProjectSupportSubFieldManage;
    //event methods
    this._onSelection_selectionChagne = function(selection){
        var buttonEdit = selection.buttonEdit;
        var buttonDelete = selection.buttonDelete;
        var buttonProjectSupportSubFieldManage = selection.buttonProjectSupportSubFieldManage;
        if (selection.getCount() == 0) {
            buttonEdit.hide();
            buttonDelete.hide();
            buttonProjectSupportSubFieldManage.hide();
            return;
        }
        
        var projectSupportField = selection.getSelected();
        
        buttonEdit.setVisible(projectSupportField.get('hasPermission_Edit'));
        buttonEdit.setDisabled(!projectSupportField.get('canEdit'));
        
        buttonDelete.setVisible(projectSupportField.get('hasPermission_Delete'));
        buttonDelete.setDisabled(!projectSupportField.get('canDelete'));
        
        buttonProjectSupportSubFieldManage.setVisible(projectSupportField.get('hasPermission_ManageSubField'));
        buttonProjectSupportSubFieldManage.setDisabled(!projectSupportField.get('canManageSubField'));
    }
    
    //events
    this._selection.on('selectionchange', this._onSelection_selectionChagne);
}
Ext.extend(Srims.type.ProjectSupportFieldGridPanel_ToolBar, Ext.Toolbar);
