
if (!Srims.papers) 
    Ext.namespace('Srims.papers');

Srims.papers.MagazineOccupationManageGridPanel = function(id, magazineOccupationStore, title, iconCls){

    //fields
    this._magazineOccupationStore = magazineOccupationStore;
    this._magazineOccupationStore.gird = this;
    
    this._selections = new Ext.grid.RowSelectionModel();
    
    //controls    
    this._columnModel = new Srims.papers.MagazineOccupationGridPanel_ColumnModel();
    this._toolbar = new Srims.papers.MagazineOccupationGridPanel_ToolBar(this._selections, this._magazineOccupationStore, undefined);
    
    var params = {};
    params.sm = this._selections;
    params.store = this._magazineOccupationStore;
    params.id = id;
    params.title = title;
    params.iconCls = iconCls;
    params.colModel = this._columnModel;
    params.tbar = this._toolbar;
    params.defaultBBar = true;
    
    //constructor
    Srims.papers.MagazineOccupationManageGridPanel.superclass.constructor.call(this, params);
    //event
    
    this.on('celldblclick', onCellDblClick);
    
    //private methods
    function onCellDblClick(grid, rowIndex, columnIndex, e){
        var magazineOccupation = grid.getStore().getAt(rowIndex);
        // Srims.papers.showMagazineOccupation(magazineOccupation);
    }
}
Ext.extend(Srims.papers.MagazineOccupationManageGridPanel, Srims.component.GridPanel);
