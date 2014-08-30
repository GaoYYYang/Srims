
if (!Srims.type) 
    Ext.namespace('Srims.type');

Srims.type.ProjectSupportSubFieldGridPanel_ToolBar = function(selection, store, projectSupportField, projectSupportFieldStore, projectType, projectTypeStore){

    //fields
    this._selection = selection;
    this._store = store;
    this._projectSupportField = projectSupportField;
    this._projectSupportFieldStore = projectSupportFieldStore;
    this._projectType = projectType;
    this._projectTypeStore = projectTypeStore;
    
    //controls
    this._buttonNew = new Ext.Toolbar.Button({
        iconCls: 'icon-new',
        text: '添加',
        minWidth: 60,
        selection: this._selection,
        store: this._store,
        projectSupportField: this._projectSupportField,
        projectSupportFieldStore: this._projectSupportFieldStore,
        projectType: this._projectType,
        projectTypeStore: this._projectTypeStore,
        handler: function(){
            Srims.type.newProjectSupportSubField(this.store, this.projectSupportField, this.projectSupportFieldStore, this.projectType, this.projectTypeStore);
        },
        tooltip: '<b>添加项目资助子领域</b><br/>输入项目资助子领域信息以添加资助子领域'
    });
    this._buttonEdit = new Ext.Toolbar.Button({
        iconCls: 'icon-edit',
        text: '编辑',
        minWidth: 60,
        selection: this._selection,
        store: this._store,
        projectSupportField: this._projectSupportField,
        projectSupportFieldStore: this._projectSupportFieldStore,
        projectType: this._projectType,
        projectTypeStore: this._projectTypeStore,
        handler: function(){
            if (this.selection.getCount() == 0) 
                return;
            Srims.type.editProjectSupportSubField(this.selection.getSelected(), this.store, this.projectSupportField, this.projectSupportFieldStore, this.projectType, this.projectTypeStore);
        },
        hidden: true,
        tooltip: '<b>编辑项目资助子领域</b><br/>编辑选中项目资助子领域的信息'
    });
    this._buttonDelete = new Ext.Toolbar.Button({
        iconCls: 'icon-delete',
        text: '删除',
        minWidth: 60,
        store: this._store,
        selection: this._selection,
        projectSupportField: this._projectSupportField,
        projectSupportFieldStore: this._projectSupportFieldStore,
        projectType: this._projectType,
        projectTypeStore: this._projectTypeStore,
        handler: function(){
            if (this.selection.getCount() == 0) 
                return;
            Srims.type.deleteProjectSupportSubField(this.selection.getSelected(), this.store, this.projectSupportField, this.projectSupportFieldStore, this.projectType, this.projectTypeStore);
        },
        hidden: true,
        tooltip: '<b>删除项目资助子领域</b>'
    });
    var user = Srims.currentLoginLog.user;
    Srims.type.ProjectSupportSubFieldGridPanel_ToolBar.superclass.constructor.call(this, {
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
        
        var projectSupportSubFiled = selection.getSelected();
        
        buttonEdit.setVisible(projectSupportSubFiled.get('hasPermission_Edit'));
        buttonEdit.setDisabled(!projectSupportSubFiled.get('canEdit'));
        
        buttonDelete.setVisible(projectSupportSubFiled.get('hasPermission_Delete'));
        buttonDelete.setDisabled(!projectSupportSubFiled.get('canDelete'));
        
    }
    
    //events
    this._selection.on('selectionchange', this._onSelection_selectionChagne);
}
Ext.extend(Srims.type.ProjectSupportSubFieldGridPanel_ToolBar, Ext.Toolbar);
