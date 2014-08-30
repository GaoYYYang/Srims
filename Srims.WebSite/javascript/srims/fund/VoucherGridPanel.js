
if (!Srims.finance) 
    Ext.namespace('Srims.fund');

Srims.fund.VoucherGridPanel = function(id, voucherStore, title, iconCls, queryParams, isFinanceManage){

    //fields
    this._store = voucherStore;
    this._store.grid = this;
    var user = Srims.currentLoginLog.user;
    var isExpert = user.userRoleType == 'Expert' ? true : false;
    //controls    
    this._selections = new Ext.grid.RowSelectionModel();
    this._columnModel = new Srims.fund.VoucherGridPanel_ColumnModel(isFinanceManage, isExpert);
    this._toolbar = new Srims.fund.VoucherGridPanel_ToolBar(this._selections, this._store, id, queryParams, isFinanceManage, false, undefined);
    
    var params = {};
    params.sm = this._selections;
    params.store = this._store;
    params.id = id;
    params.title = title;
    params.iconCls = iconCls;
    params.colModel = this._columnModel;
    params.plugins = this._filters;
    params.tbar = this._toolbar;
    params.defaultBBar = true;
    //constructor
    Srims.fund.VoucherGridPanel.superclass.constructor.call(this, params);
    //event
    
    this.on('celldblclick', onCellDblClick);
    
    //private methods
    function onCellDblClick(grid, rowIndex, columnIndex, e){
        var voucher = grid.getStore().getAt(rowIndex);
        Srims.fund.showVoucher(voucher, grid._store, isFinanceManage);
    }
}
Ext.extend(Srims.fund.VoucherGridPanel, Srims.component.GridPanel);
