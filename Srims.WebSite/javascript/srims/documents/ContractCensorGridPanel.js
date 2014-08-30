
if (!Srims.documents) 
    Ext.namespace('Srims.documents');

Srims.documents.ContractCensorGridPanel = function(id, title, store, iconCls){

    this._store = store;
    this._columnModel = new Srims.documents.ContractCensorGridPanel_ColumnModel();
    this._selections = new Ext.grid.RowSelectionModel();
    this._toolBar = new Srims.documents.ContractCensorGridPanel_ToolBar(this._selections, this._store)
    
    var params = {};
    
    params.id = id;
    params.title = title;
    params.iconCls = iconCls;
    params.sm = this._selections;
    params.store = this._store;
    params.colModel = this._columnModel;
    params.tbar = this._toolBar;
    params.defaultBBar = true;
    
    Srims.documents.ContractCensorGridPanel.superclass.constructor.call(this, params);
    
    function onCellDblClick(grid, rowIndex, columnIndex, e){
        var contract = grid.getStore().getAt(rowIndex);
        Srims.projects.downLoadContract(contract);
    };
    this.on('celldblclick', onCellDblClick);
};
Ext.extend(Srims.documents.ContractCensorGridPanel, Srims.component.GridPanel, {});
