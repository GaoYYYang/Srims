
if (!Srims.finance) 
    Ext.namespace('Srims.fund');

Srims.fund.FinanceVouchersShowWindow_VoucherGridPanel = function(voucherStore){

    //fields
    this._store = voucherStore;
    this._store.grid = this;
    //controls    
    this._selections = new Ext.grid.RowSelectionModel();
    this._columnModel = new Srims.fund.FinanceVouchersShowWindow_VoucherGridPanel_ColumnModel();
    this._toolbar = new Srims.fund.FinanceVouchesShowWindow_VoucherGridPanel_ToolBar(this._store, this._selections);
    
    var params = {};
    params.sm = this._selections;
    params.store = this._store;
    params.colModel = this._columnModel;
    params.tbar = this._toolbar;
    params.height = 270;
    params.defaultBBar = false;
    //constructor
    Srims.fund.FinanceVouchersShowWindow_VoucherGridPanel.superclass.constructor.call(this, params);
    //event
    
    this.on('celldblclick', onCellDblClick);
    
    //private methods
    function onCellDblClick(grid, rowIndex, columnIndex, e){
        var voucher = grid.getStore().getAt(rowIndex);
        Srims.fund.showVoucher(voucher, grid._store, false);
    }
}
Ext.extend(Srims.fund.FinanceVouchersShowWindow_VoucherGridPanel, Srims.component.GridPanel);
