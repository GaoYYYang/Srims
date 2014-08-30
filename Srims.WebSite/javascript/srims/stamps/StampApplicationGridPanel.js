
if (!Srims.stamp) 
    Ext.namespace('Srims.stamp');

Srims.stamp.StampApplicationGridPanel = function(id, store, title, iconCls, queryParams, stampState){

    //fields
    this._store = store;
    this._store.gird = this;
    this._stampState = stampState;
    this._selections = new Ext.grid.RowSelectionModel();
    
    //controls    
    this._columnModel = new Srims.stamp.StampApplicationGridPanel_ColumnModel();
    this._toolbar = new Srims.stamp.StampApplicationGridPanel_ToolBar(this._selections, this._store, id, queryParams, this._stampState);
    
    var params = {};
    params.sm = this._selections;
    params.store = this._store;
    params.id = id;
    params.title = title;
    params.iconCls = iconCls;
    params.colModel = this._columnModel;
    params.tbar = this._toolbar;
    params.defaultBBar = true;
    
    //constructor
    Srims.stamp.StampApplicationGridPanel.superclass.constructor.call(this, params);
    
    //event
    this.on('celldblclick', onCellDblClick);
    
    //private methods
    function onCellDblClick(grid, rowIndex, columnIndex, e){
        var stampApplication = grid.getStore().getAt(rowIndex);
        Srims.stamp.showStampApplication(stampApplication, grid._store, stampState);
    }
}
Ext.extend(Srims.stamp.StampApplicationGridPanel, Srims.component.GridPanel);
