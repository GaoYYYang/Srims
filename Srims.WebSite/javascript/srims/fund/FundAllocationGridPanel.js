
if (!Srims.fund) 
    Ext.namespace('Srims.fund');

Srims.fund.FundAllocationGridPanel = function(id, fundDescendStore, title, iconCls, queryParams){

    this._store = fundDescendStore;
    this._store.gird = this;
    
    this._selections = new Ext.grid.RowSelectionModel();
    this._columnModel = new Srims.fund.FundAllocationGridPanel_ColumnModel(true);
    
    this._toolBar = new Srims.fund.FundAllocationGridPanel_ToolBar(this._selections, this._store, id, queryParams);
    
    var params = {};
    params.id = id;
    params.title = title;
    params.iconCls = iconCls;
    params.sm = this._selections;
    params.store = this._store;
    params.colModel = this._columnModel;
    params.tbar = this._toolBar;
    params.defaultBBar = true;
    
    Srims.fund.FundAllocationGridPanel.superclass.constructor.call(this, params);
    
    this.on('celldblclick', onCellDblClick);
    
    //private methods
    function onCellDblClick(grid, rowIndex, columnIndex, e){
        var fundAllocation = grid.getStore().getAt(rowIndex);
        Srims.fund.showFundAllocationInfo(fundAllocation);
    }
}
Ext.extend(Srims.fund.FundAllocationGridPanel, Srims.component.GridPanel, {});
