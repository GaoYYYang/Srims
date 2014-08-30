
if (!Srims.projects) 
    Ext.namespace('Srims.projects');

Srims.projects.ExpertGuideProjectMemberGridPanel = function() {

    this._project = new Srims.projects.Project({});
    this._store = new Srims.projects.ProjectMemberStore(this._project);
    this._columnModel = new Srims.projects.ProjectMemberGridPanel_ColumnModel();

    this._selections = new Ext.grid.RowSelectionModel();
    this._toolBar = new Srims.projects.ExpertGuideProjectMemberGridPanel_ToolBar(this);

    this.params = {};
    this.params.sm = this._selections;
    this.params.store = this._store;
    this.params.colModel = this._columnModel;
    this.params.tbar = this._toolBar;
    this.params.height = 220;
    this.params.width = 600;

    //constructor
    Srims.projects.ProjectMemberGridPanel.superclass.constructor.call(this, this.params);

    function onCellDblClick(grid, rowIndex, columnIndex, e) {
        var projectMember = grid.getStore().getAt(rowIndex);
        Srims.projects.editProjectMember(this._project, projectMember, this._store);
    }
    this.on('celldblclick', onCellDblClick);

    this.setProject = function(project) {
        this._project = project;

        this._toolBar.setProject(project);

        this._store.params.projectId = this._project.get('id');
        this._store.load();
    }

    this.next = function() {
    Ext.MessageBox.confirm('项目成员', '是否已完成所有项目成员的填写？', function(buttonId) {
            if (buttonId == 'yes') {

                this.panel.panel._contractManagePanel.setProject(this._project);
                Srims.expertGuide.next(this);
            }
            else {
                return;
            }

        }, this);
    }
    this.previous = function() {
        this.panel.panel._panelBasic.setProject(this._project);
    }
};
Ext.extend(Srims.projects.ExpertGuideProjectMemberGridPanel, Srims.component.GridPanel, {});
