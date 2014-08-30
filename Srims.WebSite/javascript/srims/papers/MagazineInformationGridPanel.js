
if (!Srims.papers) 
    Ext.namespace('Srims.papers');

Srims.papers.MagazineInformationGridPanel = function(magazine){

    this._magazine = magazine;
    this._store = new Srims.papers.MagazineInformationStore(magazine.get('id'));
    this._store.gird = this;
    this._columnModel = new Srims.papers.MagazineInformationGridPanel_ColumnModel();
    
    this._selections = new Ext.grid.RowSelectionModel();
    this._toolBar = new Srims.papers.MagazineInformationGridPanel_ToolBar(this._selections, this._store, this._magazine)
    
    this._view = new Ext.grid.GridView({
        forceFit: true,
        autoFill: true,
        emptyText: '该杂志目前无年度信息'
    });
    
    //public methods
    this.getMagazineInformationStore = function(){
        return this._store;
    }
    
    Srims.papers.MagazineInformationGridPanel.superclass.constructor.call(this, {
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
        var magazineInformation = grid.getMagazineInformationStore().getAt(rowIndex);
        Srims.papers.editMagazineInformation(this._magazine, magazineInformation, this._store);
    }
    this.on('celldblclick', onCellDblClick);
};
Ext.extend(Srims.papers.MagazineInformationGridPanel, Ext.grid.GridPanel, {});
