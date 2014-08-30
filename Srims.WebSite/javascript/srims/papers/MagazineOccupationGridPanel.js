
if (!Srims.papers) 
    Ext.namespace('Srims.papers');

Srims.papers.MagazineOccupationGridPanel = function(magazine){

    this._magazine = magazine;
    this._store = new Srims.papers.MagazineOccupationStore(Srims.service.papers.MagazineOccupationService + '/GetByMagazineID', magazine.get('id'));
    this._store.gird = this;
    this._columnModel = new Srims.papers.MagazineOccupationGridPanel_ColumnModel();
    
    this._selections = new Ext.grid.RowSelectionModel();
    this._toolBar = new Srims.papers.MagazineOccupationGridPanel_ToolBar(this._selections, this._store, this._magazine)
    
    this._view = new Ext.grid.GridView({
        forceFit: true,
        autoFill: true,
        emptyText: '该杂志目前无主编信息'
    });
    
    //public methods
    this.getMagazineOccupationStore = function(){
        return this._store;
    }
    
    Srims.papers.MagazineOccupationGridPanel.superclass.constructor.call(this, {
        stateful: true,
        store: this._store,
        sm: this._selections,
        enableColumnHide: true,
        enableColumnMove: true,
        border: false,
        region: 'center',
        closable: true,
        loadMask: true,
        colModel: this._columnModel,
        tbar: this._toolBar,
        height: 220,
        view: this._view
    });
    
    function onCellDblClick(grid, rowIndex, columnIndex, e){
        var magazineOccupation = grid.getMagazineOccupationStore().getAt(rowIndex);
        Srims.papers.editMagazineOccupation(this._magazine, magazineOccupation, this._store);
    }
    this.on('celldblclick', onCellDblClick);
};
Ext.extend(Srims.papers.MagazineOccupationGridPanel, Ext.grid.GridPanel, {});
