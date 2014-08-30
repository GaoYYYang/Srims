
if (!Srims.projects)
    Ext.namespace('Srims.projects');

Srims.projects.ExpertGuideProjectMemberGridPanel_ToolBar = function(panel) {

    //fields
    this._panel = panel;

    //controls
    this._buttonNew = new Ext.Toolbar.Button({
        iconCls: 'icon-new',
        text: '添加',
        minWidth: 60,
        selection: this._selection,
        panel: this._panel,
        handler: function() {
            Srims.projects.newProjectMember(this.panel._project, this.panel._store);
        },
        hidden: true,
        tooltip: '<b>新建项目成员</b>'
    });
    this._buttonEdit = new Ext.Toolbar.Button({
        iconCls: 'icon-edit',
        text: '编辑',
        minWidth: 60,
        selection: this._selection,
        panel: this._panel,
        handler: function() {
            if (this.panel._selections.getCount() == 0)
                return;
            Srims.projects.editProjectMember(this.panel._project, this.panel._selections.getSelected(), this.panel._store);
        },
        hidden: true,
        tooltip: '<b>编辑项目成员</b>'
    });
    this._buttonDelete = new Ext.Toolbar.Button({
        iconCls: 'icon-delete',
        text: '删除',
        minWidth: 60,
        panel: this._panel,
        handler: function() {
            if (this.panel._selections.getCount() == 0)
                return;

            Ext.MessageBox.confirm('删除项目成员', '你确定要删除这个项目成员吗？', function(buttonId) {
                if (buttonId == 'yes') {
                    var _params = {};
                    _params.projectMemberID = this.panel._selections.getSelected().get('id');

                    Ext.Ajax.request({
                        url: Srims.service.projects.ProjectMemberService + '/Delete',
                        params: _params,
                        scope: this,
                        success: function() {
                            this.panel._store.load();
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
        panel: this._panel,
        handler: function() {
            this.panel.setProject(this.panel._project);
        },
        tooltip: '<b>刷新列表</b><br/>更新项目成员列表'
    });
    Srims.projects.ProjectGridPanel_ToolBar.superclass.constructor.call(this, {
        items: [this._buttonNew, this._buttonEdit, this._buttonDelete, this._buttonRefresh]
    });

    this.setProject = function(project) {
        this._buttonNew.setVisible(project.get('hasPermission_EditProjectMember'));
        this._buttonNew.setDisabled(!project.get('canEdit_ProjectMember'));
    }

    //initial
    this._panel._selections.buttonEdit = this._buttonEdit;
    this._panel._selections.buttonDelete = this._buttonDelete;

    //event methods
    this._onSelection_selectionChagne = function(selection) {
        var buttonEdit = selection.buttonEdit;
        var buttonDelete = selection.buttonDelete;

        if (selection.getCount() == 0) {
            buttonEdit.hide();
            buttonDelete.hide();
            return;
        }

        buttonEdit.setVisible(buttonEdit.panel._project.get('hasPermission_EditProjectMember'));
        buttonEdit.setDisabled(!buttonEdit.panel._project.get('canEdit_ProjectMember'));

        buttonDelete.setVisible(buttonDelete.panel._project.get('hasPermission_EditProjectMember'));
        buttonDelete.setDisabled(!buttonDelete.panel._project.get('canEdit_ProjectMember'));
    }
    //events
    this._panel._selections.on('selectionchange', this._onSelection_selectionChagne);
}
Ext.extend(Srims.projects.ExpertGuideProjectMemberGridPanel_ToolBar, Ext.Toolbar);
