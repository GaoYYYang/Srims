
if (!Srims.projects) 
    Ext.namespace('Srims.projects');

Srims.projects.ProjectSetDelegateGridPanel = function(projectStore){

    //fields
    this._projectStore = projectStore;
    
    //controls  
    this._selection = new Ext.grid.CheckboxSelectionModel();
    this._toolbar = new Srims.projects.ProjectSetDelegateGridPanel_ToolBar(this._selection, this._projectStore);
    this._columnModel = new Srims.projects.ProjectSetDelegateGridPanel_ColumnModel(this._selection);
    
    var params = {};
    params.sm = this._selection;
    params.store = this._projectStore;
    params.colModel = this._columnModel;
    params.tbar = this._toolbar;
    params.defaultBBar = false;
    params.height = 300;
    
    Srims.projects.ProjectSetDelegateGridPanel.superclass.constructor.call(this, params);
};
Ext.extend(Srims.projects.ProjectSetDelegateGridPanel, Srims.component.GridPanel);
