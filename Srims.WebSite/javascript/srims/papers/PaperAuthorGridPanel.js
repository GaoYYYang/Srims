
if (!Srims.papers) 
    Ext.namespace("Srims.papers");

Srims.papers.PaperAuthorGridPanel = function(paper){

    this._paper = paper;
    this._store = new Srims.papers.PaperAuthorStore(paper.get('id'));
    this._store.gird = this;
    this._columnModel = new Srims.papers.PaperAuthorGridPanel_ColumnModel();
    this._selections = new Ext.grid.RowSelectionModel();
    this._toolBar = new Srims.papers.PaperAuthorGridPanel_ToolBar(this._selections, this._store, this._paper);
    
    //public methods
    this.getPaperAuthorStore = function(){
        return this._store;
    }
    
    Srims.papers.PaperAuthorGridPanel.superclass.constructor.call(this, {
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
        var paperAuthor = grid.getPaperAuthorStore().getAt(rowIndex);
        Srims.papers.editPaperAuthor(this._paper, paperAuthor, this._store);
    }
    this.on('celldblclick', onCellDblClick);
};
Ext.extend(Srims.papers.PaperAuthorGridPanel, Srims.component.GridPanel, {});
