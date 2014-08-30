
if (!Srims.common) 
    Ext.namespace('Srims.common');

Srims.common.ViewGridPanel = function(store, viewType){

    this._store = store;
    this._columnModel = new Srims.common.ViewGridPanel_ColumnModel();
    
    this._selections = new Ext.grid.RowSelectionModel();
    this._toolBar = new Srims.common.ViewGridPanel_ToolBar(this._selections, this._store, viewType)
    
    var params = {};
    params.sm = this._selections;
    params.store = this._store;
    params.colModel = this._columnModel;
    params.tbar = this._toolBar;
    params.height = 300;
    
    //constructor
    Srims.common.ViewGridPanel.superclass.constructor.call(this, params);
    
    function onCellDblClick(grid, rowIndex, columnIndex, e){
        var view = grid.getStore().getAt(rowIndex);
        
        Srims.common.doViewAction(view);
    }
    this.on('celldblclick', onCellDblClick);
};
Ext.extend(Srims.common.ViewGridPanel, Srims.component.GridPanel, {});
