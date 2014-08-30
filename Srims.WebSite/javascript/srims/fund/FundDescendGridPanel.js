
if (!Srims.fund) 
    Ext.namespace('Srims.fund');

Srims.fund.FundDescendGridPanel = function(id, fundDescendStore, title, iconCls, queryParams, isBorrow, isExpert, isCensor, isShowFinanceInfo){

    this._store = fundDescendStore;
    this._store.gird = this;
    
    this._selections = new Ext.grid.RowSelectionModel();
    this._columnModel = new Srims.fund.FundDescendGridPanel_ColumnModel(isBorrow, false, isShowFinanceInfo);
    
    this._toolBar = new Srims.fund.FundDescendGridPanel_ToolBar(this._selections, this._store, id, queryParams, false, isBorrow, isExpert, isCensor);
    
    var params = {};
    params.id = id;
    params.title = title;
    params.iconCls = iconCls;
    params.sm = this._selections;
    params.store = this._store;
    params.colModel = this._columnModel;
    params.tbar = this._toolBar;
    params.defaultBBar = true;
    
    Srims.fund.FundDescendGridPanel.superclass.constructor.call(this, params);
    
    this.on('celldblclick', onCellDblClick);
    
    //private methods
    function onCellDblClick(grid, rowIndex, columnIndex, e){
        var fundDescend = grid.getStore().getAt(rowIndex);
        Srims.fund.showFundAllocationInfoByFundDescend(fundDescend);
    }
}
Ext.extend(Srims.fund.FundDescendGridPanel, Srims.component.GridPanel, {});
