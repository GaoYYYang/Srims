
if (!Srims.bases) 
    Ext.namespace("Srims.bases");

Srims.bases.BaseGridPanel = function(id, baseStore, title, iconCls, queryParams){

    //fields
    this._baseStore = baseStore;
    this._selections = new Ext.grid.RowSelectionModel();
    
    //controls
    this._columnModel = new Srims.bases.BaseGridPanel_ColumnModel();
    this._filters = new Srims.bases.BaseGridPanel_GridFilters();
    this._toolbar = new Srims.bases.BaseGridPanel_ToolBar(this, this._selections, queryParams);
    
    //public methods
    this.getBaseStore = function(){
        return this._baseStore;
    }
    
    var params = {};
    params.sm = this._selections;
    params.store = this._baseStore;
    params.id = id;
    params.title = title;
    params.iconCls = iconCls;
    params.colModel = this._columnModel;
    params.plugins = this._filters;
    params.tbar = this._toolbar;
    params.defaultBBar = true;
    
    //constructor
    Srims.bases.BaseGridPanel.superclass.constructor.call(this, params);
    
    //event
    this.on('celldblclick', onCellDblClick);
    //private methods
    function onCellDblClick(grid, rowIndex, columnIndex, e){
    
        var base = grid.getStore().getAt(rowIndex);
        var store = grid.getStore();
        Srims.bases.showBase(base);
    }
}
Ext.extend(Srims.bases.BaseGridPanel, Srims.component.GridPanel);
