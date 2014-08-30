
if (!Srims.type) 
    Ext.namespace('Srims.type');

Srims.type.ProjectTypeGridPanel_ToolBar = function(selection, store, panelId, queryParams){

    //fields
    this._panelId = panelId;
    this._selection = selection;
    this._store = store;
    this._queryParams = queryParams;
    
    //controls
    this._buttonQuery = new Ext.Toolbar.Button({
        iconCls: 'icon-query',
        text: '查询',
        minWidth: 60,
        selection: this._selection,
        panelId: this._panelId,
        store: this._store,
        handler: function(){
            Srims.type.showProjectTypeQueryWindow(this.panelId + '_QueryWindow', this.store, queryParams, Ext.getCmp(this.panelId));
        },
        tooltip: '<b>项目类别查询</b><br/>对项目类别进行查询'
    });
    this._buttonImport = new Ext.Toolbar.Button({
        iconCls: 'icon-import',
        text: '导入',
        minWidth: 60,
        store: this._store,
        handler: function(){
            Srims.type.showImportWindow(this.store);
        },
        tooltip: '<b>项目资助领域导入</b><br/>将项目资助领域从excel表导入到数据库中'
    });
    this._buttonNew = new Ext.Toolbar.Button({
        iconCls: 'icon-new',
        text: '添加',
        minWidth: 60,
        selection: this._selection,
        store: this._store,
        handler: function(){
            Srims.type.newProjectType(this.store);
        },
        tooltip: '<b>添加项目分类</b><br/>输入项目分类信息以添加类别'
    });
    this._buttonEditDocumentModel = new Ext.Toolbar.Button({
        iconCls: 'icon-upload-project-type-document-model',
        text: '上传类型文档模板',
        minWidth: 60,
        handler: function(){
            Srims.type.showProjectTypeDocumentModelEditWindow();
        },
        tooltip: '<b>添加项目分类</b><br/>输入项目分类信息以添加类别'
    });
    this._buttonShow = new Ext.Toolbar.Button({
        iconCls: 'icon-show',
        text: '查看',
        minWidth: 60,
        store: this._store,
        selection: this._selection,
        handler: function(){
            if (this.selection.getCount() == 0) 
                return;
            
            Srims.type.showProjectType(this.selection.getSelected(), this.store);
        },
        hidden: true,
        tooltip: '<b>查项目分类</b><br/>显示所选类别的详细信息'
    });
    this._buttonEdit = new Ext.Toolbar.Button({
        iconCls: 'icon-edit',
        text: '编辑',
        minWidth: 60,
        selection: this._selection,
        store: this._store,
        handler: function(){
            if (this.selection.getCount() == 0) 
                return;
            Srims.type.editProjectType(this.selection.getSelected(), this.store);
        },
        hidden: true,
        tooltip: '<b>编辑项目分类</b><br/>编辑选中项目类别的信息'
    });
    this._buttonProjectSupportFieldManage = new Ext.Toolbar.Button({
        iconCls: 'icon-type-support-category',
        text: '项目资助领域管理',
        minWidth: 60,
        selection: this._selection,
        store: this._store,
        handler: function(){
            Srims.type.showProjectSupportFieldManageWindow(this.selection.getSelected(), this.store);
        },
        hidden: true,
        tooltip: '<b>项目资助领域管理</b><br/>项目资助领域管理'
    });
    this._buttonProjectSupportCategoryManage = new Ext.Toolbar.Button({
        iconCls: 'icon-type-support-field',
        text: '项目资助类别管理',
        minWidth: 60,
        selection: this._selection,
        store: this._store,
        handler: function(){
            if (this.selection.getCount() == 0) 
                return;
            Srims.type.showProjectSupportCategoryManageWindow(this.selection.getSelected(), this.store);
        },
        hidden: true,
        tooltip: '<b>项目资助类别管理</b><br/>项目资助类别管理'
    });
    this._buttonDocumentModelManage = new Ext.Toolbar.Button({
        iconCls: 'icon-Document-model-manage',
        text: '文档模板管理',
        minWidth: 60,
        selection: this._selection,
        handler: function(){
            if (this.selection.getCount() == 0) 
                return;
            
            Srims.type.showDocumentModelManageWindow(this.selection.getSelected().get('id'), this.selection.getSelected().get('name'), false);
        },
        hidden: true,
        tooltip: '<b>查项目类型文档模板</b><br/>显示所选类别的文档模板'
    });
    this._buttonDelete = new Ext.Toolbar.Button({
        iconCls: 'icon-delete',
        text: '删除',
        minWidth: 60,
        store: this._store,
        selection: this._selection,
        handler: function(){
            if (this.selection.getCount() == 0) 
                return;
            Srims.type.deleteProjectType(this.selection.getSelected(), this.store);
        },
        hidden: true,
        tooltip: '<b>删除项目分类</b>'
    });
    this._buttonRefresh = new Ext.Toolbar.Button({
        iconCls: 'icon-refresh',
        text: '刷新',
        minWidth: 60,
        store: this._store,
        handler: function(){
            this.store.load();
        },
        tooltip: '<b>刷新列表</b><br/>更新项目分类列表'
    });
    this._buttonReset = new Ext.Toolbar.Button({
        iconCls: 'icon-reset',
        text: '重置',
        minWidth: 60,
        store: this._store,
        panelId: this._panelId,
        handler: function(){
            //清空查询条件
            var params = ['token'];
            Srims.SetQueryParams.clearParams(queryParams, params);
            this.store.load();
        },
        tooltip: '<b>重置列表</b><br/>清空查询条件，重置列表'
    });
    var user = Srims.currentLoginLog.user;
    this._buttonQuery.setVisible(user.userRoleType == 'Administrator');
    
    Srims.type.ProjectTypeGridPanel_ToolBar.superclass.constructor.call(this, {
        items: [this._buttonQuery, this._buttonNew, this._buttonEditDocumentModel, this._buttonDocumentModelManage, this._buttonShow, this._buttonEdit, this._buttonDelete, this._buttonProjectSupportFieldManage, this._buttonProjectSupportCategoryManage, new Ext.Toolbar.Fill(), this._buttonRefresh, this._buttonReset]
    });
    
    //initial
    this._selection.buttonShow = this._buttonShow;
    this._selection.buttonEdit = this._buttonEdit;
    this._selection.buttonDocumentModelManage = this._buttonDocumentModelManage;
    this._selection.buttonDelete = this._buttonDelete;
    this._selection.buttonProjectSupportFieldManage = this._buttonProjectSupportFieldManage;
    this._selection.buttonProjectSupportCategoryManage = this._buttonProjectSupportCategoryManage;
    //event methods
    this._onSelection_selectionChagne = function(selection){
        var buttonShow = selection.buttonShow;
        var buttonEdit = selection.buttonEdit;
        var buttonDelete = selection.buttonDelete;
        var buttonProjectSupportFieldManage = selection.buttonProjectSupportFieldManage;
        var buttonProjectSupportCategoryManage = selection.buttonProjectSupportCategoryManage;
        var buttonDocumentModelManage = selection.buttonDocumentModelManage;
        
        
        if (selection.getCount() == 0) {
            buttonShow.hide();
            buttonEdit.hide();
            buttonDelete.hide();
            buttonProjectSupportFieldManage.hide();
            buttonProjectSupportCategoryManage.hide();
            buttonDocumentModelManage.hide();
            return;
        }
        
        var projectType = selection.getSelected();
        
        buttonShow.setVisible(projectType.get('hasPermission_Show'));
        buttonShow.setDisabled(!projectType.get('canShow'));
        
        buttonEdit.setVisible(projectType.get('hasPermission_Edit'));
        buttonEdit.setDisabled(!projectType.get('canEdit'));
        
        buttonDelete.setVisible(projectType.get('hasPermission_Delete'));
        buttonDelete.setDisabled(!projectType.get('canDelete'));
        
        buttonProjectSupportFieldManage.setVisible(projectType.get('hasPermission_ManageProjectSupportField'));
        buttonProjectSupportFieldManage.setDisabled(!projectType.get('canManageProjectSupportField'));
        
        buttonProjectSupportCategoryManage.setVisible(projectType.get('hasPermission_ManageProjectSupportCategory'));
        buttonProjectSupportCategoryManage.setDisabled(!projectType.get('canManageProjectSupportCategory'));
        
        buttonDocumentModelManage.setVisible(projectType.get('hasPermission_UploadDocumentModel'));
    }
    
    //events
    this._selection.on('selectionchange', this._onSelection_selectionChagne);
}
Ext.extend(Srims.type.ProjectTypeGridPanel_ToolBar, Ext.Toolbar);
