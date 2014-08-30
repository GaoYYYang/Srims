
if (!Srims.projects) 
    Ext.namespace('Srims.projects');

Srims.projects.ExpertGuideProjectPayPlanItemGridPanel = function(project){

    this._project = new Srims.projects.Project({});
    this._store = new Srims.fund.PayPlanItemStore(this._project);
    this._columnModel = new Srims.fund.PayPlanItemGridPanel_ColumnModel();
    
    this._selections = new Ext.grid.RowSelectionModel();
    this._toolBar = new Srims.projects.ExpertGuideProjectPayPlanItemGridPanel_ToolBar(this);
    
    var params = {};
    params.sm = this._selections;
    params.store = this._store;
    params.colModel = this._columnModel;
    params.tbar = this._toolBar;
    params.height = 220;
    params.width = 600;
    
    Srims.projects.ExpertGuideProjectPayPlanItemGridPanel.superclass.constructor.call(this, params);
    
    function onCellDblClick(grid, rowIndex, columnIndex, e){
        var payPlanItem = grid.getStore().getAt(rowIndex);
        Srims.projects.editProjectPayPlanItem(this._project, payPlanItem, this._store);
    }
    this.on('celldblclick', onCellDblClick);
    
    this.setProject = function(project){
        this._project = project;
        
        this._toolBar.setProject(project);
        
        this._store.params.projectId = this._project.get('id');
        this._store.load();
    }
    
    this.next = function(){
    
        this.panel.panel._projectShowPanel.resetProject(this._project);
        Srims.expertGuide.next(this);
    }
};
Ext.extend(Srims.projects.ExpertGuideProjectPayPlanItemGridPanel, Srims.component.GridPanel, {});
