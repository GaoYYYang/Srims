
if (!Srims.type) 
    Ext.namespace('Srims.type');

Srims.type.ProjectTypeGridPanel = function(id, store, title, iconCls, queryParams){

    //fields
    this._store = store;
    this._store.gird = this;
    
    this._selections = new Ext.grid.RowSelectionModel();
    
    //controls    
    this._columnModel = new Srims.type.ProjectTypeGridPanel_ColumnModel();
    this._toolbar = new Srims.type.ProjectTypeGridPanel_ToolBar(this._selections, this._store, id, queryParams);
    this._filters = new Srims.type.ProjectTypeGridPanel_GridFilters();
    var params = {};
    params.sm = this._selections;
    params.store = this._store;
    params.id = id;
    params.title = title;
    params.iconCls = iconCls;
    params.colModel = this._columnModel;
    params.tbar = this._toolbar;
    params.plugins = this._filters;
    params.defaultBBar = true;
    
    //constructor
    Srims.type.ProjectTypeGridPanel.superclass.constructor.call(this, params);
    
    //event
    this.on('celldblclick', onCellDblClick);
    
    //private methods
    function onCellDblClick(grid, rowIndex, columnIndex, e){
        var projectType = grid.getStore().getAt(rowIndex);
        Srims.type.showProjectType(projectType, grid._store);
    }
}
Ext.extend(Srims.type.ProjectTypeGridPanel, Srims.component.GridPanel);
