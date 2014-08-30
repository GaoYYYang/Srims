
if (!Srims.papers) 
    Ext.namespace("Srims.papers");

Srims.papers.LiberalArtsPaperAuthorGridPanel = function(paper) {

    this._paper = paper;
    this._store = new Srims.papers.LiberalArtsPaperAuthorStore(paper.get('id'));
    this._store.gird = this;
    this._columnModel = new Srims.papers.LiberalArtsPaperAuthorGridPanel_ColumnModel();
    this._selections = new Ext.grid.RowSelectionModel();
    this._toolBar = new Srims.papers.LiberalArtsPaperAuthorGridPanel_ToolBar(this._selections, this._store, this._paper);
    
    //public methods
    this.getLiberalArtsPaperAuthorStore = function(){
        return this._store;
    }

    Srims.papers.LiberalArtsPaperAuthorGridPanel.superclass.constructor.call(this, {
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
        var paperAuthor = grid.getLiberalArtsPaperAuthorStore().getAt(rowIndex);
        Srims.papers.editLiberalArtsPaperAuthor(this._paper, paperAuthor, this._store);
    }
    this.on('celldblclick', onCellDblClick);
};
Ext.extend(Srims.papers.LiberalArtsPaperAuthorGridPanel, Srims.component.GridPanel, {});
