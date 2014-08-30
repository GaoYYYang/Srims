
if (!Srims.type) 
    Ext.namespace('Srims.type');

Srims.type.ProjectTypeShowPanel_ToolBar = function(projectType, store){

    //fields
    this._projectType = projectType;
    this._store = store;
    
    //controls
    this._buttonEdit = new Ext.Toolbar.Button({
        iconCls: 'icon-edit',
        text: '编辑',
        minWidth: 60,
        projectType: this._projectType,
        store: this._store,
        handler: function(){
            Srims.type.editProjectType(this.projectType, this.store);
        },
        hidden: true,
        tooltip: '<b>编辑项目分类</b><br/>编辑选中项目类别的信息'
    });
    this._buttonProjectSupportFieldManage = new Ext.Toolbar.Button({
        iconCls: 'icon-type-support-category',
        text: '项目资助领域管理',
        minWidth: 60,
        projectType: this._projectType,
        store: this._store,
        handler: function(){
            Srims.type.showProjectSupportFieldManageWindow(this.projectType, this.store);
        },
        hidden: true,
        tooltip: '<b>项目资助领域管理</b><br/>项目资助领域管理'
    });
    this._buttonProjectSupportCategoryManage = new Ext.Toolbar.Button({
        iconCls: 'icon-type-support-field',
        text: '项目资助类别管理',
        minWidth: 60,
        projectType: this._projectType,
        store: this._store,
        handler: function(){
            Srims.type.showProjectSupportCategoryManageWindow(this.projectType, this.store);
        },
        hidden: true,
        tooltip: '<b>项目资助类别管理</b><br/>项目资助类别管理'
    });
    this._buttonDelete = new Ext.Toolbar.Button({
        iconCls: 'icon-delete',
        text: '删除',
        minWidth: 60,
        projectType: this._projectType,
        store: this._store,
        handler: function(){
            Srims.type.deleteProjectType(this.projectType, this.store);
        },
        hidden: true,
        tooltip: '<b>删除项目分类</b>'
    });
    
    Srims.type.ProjectTypeShowPanel_ToolBar.superclass.constructor.call(this, {
        items: [this._buttonEdit, this._buttonDelete, this._buttonProjectSupportFieldManage, this._buttonProjectSupportCategoryManage]
    });
    
    //initial
    
    this._buttonEdit.setVisible(this._projectType.get('hasPermission_Edit'));
    this._buttonEdit.setDisabled(!this._projectType.get('canEdit'));
    
    this._buttonDelete.setVisible(this._projectType.get('hasPermission_Delete'));
    this._buttonDelete.setDisabled(!this._projectType.get('canDelete'));
    
    this._buttonProjectSupportFieldManage.setVisible(this._projectType.get('hasPermission_ManageProjectSupportField'));
    this._buttonProjectSupportFieldManage.setDisabled(!this._projectType.get('canManageProjectSupportField'));
    
    this._buttonProjectSupportCategoryManage.setVisible(this._projectType.get('hasPermission_ManageProjectSupportCategory'));
    this._buttonProjectSupportCategoryManage.setDisabled(!this._projectType.get('canManageProjectSupportCategory'));
    
}
Ext.extend(Srims.type.ProjectTypeShowPanel_ToolBar, Ext.Toolbar);
