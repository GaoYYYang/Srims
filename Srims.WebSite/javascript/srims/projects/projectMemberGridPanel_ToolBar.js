
if (!Srims.projects) 
    Ext.namespace('Srims.projects');

Srims.projects.ProjectMemberGridPanel_ToolBar = function(selection, store, project){

    //fields
    this._selection = selection;
    this._store = store;
    this._project = project;
    
    //controls
    this._buttonNew = new Ext.Toolbar.Button({
        iconCls: 'icon-new',
        text: '添加',
        minWidth: 60,
        selection: this._selection,
        store: this._store,
        project: this._project,
        handler: function(){
            Srims.projects.newProjectMember(this.project, this.store);
        },
        hidden: true,
        tooltip: '<b>新建项目成员</b>'
    });
    this._buttonEdit = new Ext.Toolbar.Button({
        iconCls: 'icon-edit',
        text: '编辑',
        minWidth: 60,
        selection: this._selection,
        store: this._store,
        project: this._project,
        handler: function(){
            if (this.selection.getCount() == 0) 
                return;
            Srims.projects.editProjectMember(this.project, this.selection.getSelected(), this.store);
        },
        hidden: true,
        tooltip: '<b>编辑项目成员</b>'
    });
    this._buttonDelete = new Ext.Toolbar.Button({
        iconCls: 'icon-delete',
        text: '删除',
        minWidth: 60,
        selection: this._selection,
        store: this._store,
        handler: function(){
            if (this.selection.getCount() == 0) 
                return;
            
            Ext.MessageBox.confirm('删除项目成员', '你确定要删除这个项目成员吗？', function(buttonId){
                if (buttonId == 'yes') {
                    var _params = {};
                    _params.projectMemberID = this.selection.getSelected().get('id');
                    
                    Ext.Ajax.request({
                        url: Srims.service.projects.ProjectMemberService + '/Delete',
                        params: _params,
                        scope: this,
                        success: function(){
                            this.store.load();
                        }
                    });
                }
            }, this);
        },
        hidden: true,
        tooltip: '<b>编辑项目成员</b>'
    });
    this._buttonRefresh = new Ext.Toolbar.Button({
        iconCls: 'icon-refresh',
        text: '刷新',
        minWidth: 60,
        store: this._store,
        project: this._project,
        handler: function(){
            this.store = new Srims.projects.ProjectMemberStore(project);
            this.store.load();
        },
        tooltip: '<b>刷新列表</b><br/>更新项目成员列表'
    });
    Srims.projects.ProjectGridPanel_ToolBar.superclass.constructor.call(this, {
        items: [this._buttonNew, this._buttonEdit, this._buttonDelete, this._buttonRefresh]
    });
    
    this._buttonNew.setVisible(project.get('hasPermission_EditProjectMember'));
    this._buttonNew.setDisabled(!project.get('canEdit_ProjectMember'));
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
        
        buttonEdit.setVisible(project.get('hasPermission_EditProjectMember'));
        buttonEdit.setDisabled(!project.get('canEdit_ProjectMember'));
        
        buttonDelete.setVisible(project.get('hasPermission_EditProjectMember'));
        buttonDelete.setDisabled(!project.get('canEdit_ProjectMember'));
    }
    //events
    this._selection.on('selectionchange', this._onSelection_selectionChagne);
    
}
Ext.extend(Srims.projects.ProjectMemberGridPanel_ToolBar, Ext.Toolbar);
