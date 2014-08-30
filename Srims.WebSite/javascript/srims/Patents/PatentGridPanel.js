
if (!Srims.patents)
    Ext.namespace("Srims.patents");

Srims.patents.PatentGridPanel = function(id, patentStore, title, iconCls, queryParams) {
    //field
    this._patentStore = patentStore;
    this._selections = new Ext.grid.RowSelectionModel();

    //controls
    this._columnModel = new Srims.patents.PatentGridPanel_ColumnModel();
    this._toolBar = new Srims.patents.PatentGridPanel_ToolBar(this, this._selections, this._patentStore, id, queryParams);

    //public methods
    this.getPatentStore = function() {
        return this._patentStore;
    }

    var params = {};
    params.sm = this._selections;
    params.store = this._patentStore;
    params.id = id;
    params.title = title;
    params.iconCls = iconCls;
    params.colModel = this._columnModel;
    params.tbar = this._toolBar;
    params.defaultBBar = true;

    //constructor
    Srims.patents.PatentGridPanel.superclass.constructor.call(this, params);

    //event
    this.on('celldblclick', onCellDblClick);
    //private methods
    function onCellDblClick(grid, rowIndex, columnIndex, e) {
        var patent = grid.getStore().getAt(rowIndex);
        var store = grid.getStore();
        Srims.patents.showPatent(patent, store);
    }
}
Ext.extend(Srims.patents.PatentGridPanel, Srims.component.GridPanel);



