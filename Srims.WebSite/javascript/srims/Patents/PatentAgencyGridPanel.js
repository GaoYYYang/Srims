
if (!Srims.patents) 
    Ext.namespace("Srims.patents");

Srims.patents.PatentAgencyGridPanel = function(id, patentAgencyStore, title, iconCls, queryParams){
    //field
    this._patentAgencyStore = patentAgencyStore;
    this._selections = new Ext.grid.RowSelectionModel();
    
    //controls
    this._columnModel = new Srims.patents.PatentAgencyGridPanel_ColumnModel();
    this._toolBar = new Srims.patents.PatentAgencyGridPanel_ToolBar(this, this._selections, this._patentAgencyStore, id, queryParams);
    this._filters = new Srims.patents.PatentAgencyGridPanel_GridFilter();
    
    var params = {};
    params.sm = this._selections;
    params.store = this._patentAgencyStore;
    params.id = id;
    params.title = title;
    params.iconCls = iconCls;
    params.plugins = this._filters;
    params.colModel = this._columnModel;
    params.tbar = this._toolBar;
    params.defaultBBar = true;
    
    //constructor
    Srims.patents.PatentAgencyGridPanel.superclass.constructor.call(this, params);
    
    //event
    this.on('celldblclick', onCellDblClick);
    //private methods
    function onCellDblClick(grid, rowIndex, columnIndex, e){
        var patentAgency = grid.getStore().getAt(rowIndex);
        var store = grid.getStore();
        //  Srims.patents.showEditPatentAgencyWindow(patentAgency, store);
    }
}
Ext.extend(Srims.patents.PatentAgencyGridPanel, Srims.component.GridPanel);
