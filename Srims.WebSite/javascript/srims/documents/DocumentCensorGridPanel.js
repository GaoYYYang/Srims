
if (!Srims.documents) 
    Ext.namespace('Srims.documents');

Srims.documents.DocumentCensorGridPanel = function(id, title, store, iconCls){

    this._store = store;
    this._columnModel = new Srims.documents.DocumentCensorGridPanel_ColumnModel();
    this._selections = new Ext.grid.RowSelectionModel();
    this._toolBar = new Srims.documents.DocumentCensorGridPanel_ToolBar(this._selections, this._store)
    
    var params = {};
    
    params.id = id;
    params.title = title;
    params.iconCls = iconCls;
    params.sm = this._selections;
    params.store = this._store;
    params.colModel = this._columnModel;
    params.tbar = this._toolBar;
    params.defaultBBar = true;
    
    Srims.documents.DocumentCensorGridPanel.superclass.constructor.call(this, params);
    
    function onCellDblClick(grid, rowIndex, columnIndex, e){
        var document = grid.getStore().getAt(rowIndex);
        Srims.projects.downLoadDocument(document);
    };
    this.on('celldblclick', onCellDblClick);
};
Ext.extend(Srims.documents.DocumentCensorGridPanel, Srims.component.GridPanel, {});
