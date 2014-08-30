
if (!Srims.projects) 
    Ext.namespace('Srims.projects');

Srims.projects.ProjectMemberGridPanel = function(project){

    this._project = project;
    this._store = new Srims.projects.ProjectMemberStore(project);
    this._columnModel = new Srims.projects.ProjectMemberGridPanel_ColumnModel();
    
    this._selections = new Ext.grid.RowSelectionModel();
    this._toolBar = new Srims.projects.ProjectMemberGridPanel_ToolBar(this._selections, this._store, this._project);
    
    this.params = {};
    this.params.sm = this._selections;
    this.params.store = this._store;
    this.params.colModel = this._columnModel;
    this.params.tbar = this._toolBar;
    this.params.height = 220;
    
    //constructor
    Srims.projects.ProjectMemberGridPanel.superclass.constructor.call(this, this.params);
    
    function onCellDblClick(grid, rowIndex, columnIndex, e){
        var projectMember = grid.getStore().getAt(rowIndex);
        Srims.projects.editProjectMember(this._project, projectMember, this._store);
    }
    this.on('celldblclick', onCellDblClick);
    
    this._reset = function(project){
        this._project = project;
        this._store.load({
            params: {
                projectId: project.get('id')
            }
        });
        this._toolBar._reset(this._store, this._project);
    }
    
};
Ext.extend(Srims.projects.ProjectMemberGridPanel, Srims.component.GridPanel, {});
