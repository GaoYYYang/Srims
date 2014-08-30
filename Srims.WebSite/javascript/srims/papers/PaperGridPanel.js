
if (!Srims.papers) 
    Ext.namespace('Srims.papers');

Srims.papers.PaperGridPanel = function(id, paperStore, title, iconCls, queryParams){

    //fields
    this._paperStore = paperStore;
    this._paperStore.gird = this;
    
    this._selections = new Ext.grid.RowSelectionModel();
    
    //controls    
    this._columnModel = new Srims.papers.PaperGridPanel_ColumnModel();
    
    this._filters = new Srims.papers.PaperGridPanel_GridFilters();
    this._toolbar = new Srims.papers.PaperGridPanel_ToolBar(this._selections, this._paperStore, this, id, false, queryParams);
    
    var params = {};
    params.sm = this._selections;
    params.store = this._paperStore;
    params.id = id;
    params.title = title;
    params.iconCls = iconCls;
    params.colModel = this._columnModel;
    params.plugins = this._filters;
    params.tbar = this._toolbar;
    params.defaultBBar = true;
    
    //constructor
    Srims.papers.PaperGridPanel.superclass.constructor.call(this, params);
    
    //event
    this.on('celldblclick', onCellDblClick);
    
    //private methods
    function onCellDblClick(grid, rowIndex, columnIndex, e){
        var paper = grid.getStore().getAt(rowIndex);
        Srims.papers.showPaper(paper);
    }
};
Ext.extend(Srims.papers.PaperGridPanel, Srims.component.GridPanel);
