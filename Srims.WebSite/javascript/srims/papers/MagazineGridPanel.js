
if (!Srims.papers) 
    Ext.namespace('Srims.papers');

Srims.papers.MagazineGridPanel = function(id, magazineStore, title, iconCls, queryParams){

    //fields
    this._magazineStore = magazineStore;
    this._magazineStore.gird = this;
    
    this._selections = new Ext.grid.RowSelectionModel();
    
    //controls    
    this._columnModel = new Srims.papers.MagazineGridPanel_ColumnModel();
    
    this._filters = new Srims.papers.MagazineGridPanel_GridFilters();
    this._toolbar = new Srims.papers.MagazineGridPanel_ToolBar(this._selections, this._magazineStore, id, true, queryParams);
    
    var params = {};
    params.sm = this._selections;
    params.store = this._magazineStore;
    params.id = id;
    params.title = title;
    params.iconCls = iconCls;
    params.colModel = this._columnModel;
    params.plugins = this._filters;
    params.tbar = this._toolbar;
    params.defaultBBar = true;
    
    //constructor
    Srims.papers.MagazineGridPanel.superclass.constructor.call(this, params);
    //event
    
    this.on('celldblclick', onCellDblClick);
    
    //private methods
    function onCellDblClick(grid, rowIndex, columnIndex, e){
        var magazine = grid.getStore().getAt(rowIndex);
        Srims.papers.showMagazine(magazine);
    }
}
Ext.extend(Srims.papers.MagazineGridPanel, Srims.component.GridPanel);
