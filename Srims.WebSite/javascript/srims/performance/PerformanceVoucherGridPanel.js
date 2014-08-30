
if (!Srims.performance)
    Ext.namespace('Srims.performance');

Srims.performance.PerformanceVoucherGridPanel = function(id, voucherStore, title, iconCls, queryParams, isFinanceManage) {

    //fields
    this._store = voucherStore;
    this._store.grid = this;
    var user = Srims.currentLoginLog.user;
    var isExpert = user.userRoleType == 'Expert' ? true : false;
    //controls    
    this._selections = new Ext.grid.RowSelectionModel();
    this._columnModel = new Srims.performance.PerformanceVoucherGridPanel_ColumnModel(isFinanceManage, isExpert);
    this._toolbar = new Srims.performance.PerformanceVoucherGridPanel_ToolBar(this._selections, this._store, id, queryParams, isFinanceManage, false, undefined);
    this._textItemFundSum = new Ext.Toolbar.TextItem('');
    var params = {};
    params.sm = this._selections;
    params.store = this._store;
    params.id = id;
    params.title = title;
    params.iconCls = iconCls;
    params.colModel = this._columnModel;
    params.plugins = this._filters;
    params.tbar = this._toolbar;
    params.bbar = new Ext.PagingToolbar({
        pageSize: 40,
        store: this._store,
        displayInfo: true,
        displayMsg: '当前是第{0}条-第{1}条，共{2}条',
        emptyMsg: '没有可以显示的记录',
        items: [this._textItemFundSum]
    });
    //constructor
    Srims.performance.PerformanceVoucherGridPanel.superclass.constructor.call(this, params);
    //event

    this.on('celldblclick', onCellDblClick);

    this._store.on('load', function(store, records) {

        var fundSumMessage = String.format(" <font size='8'>课题组间接费用及绩效：<strong>{0}</strong>，绩效：<strong>{1}</strong>，课题组间接费用：<strong>{2}</strong></font>", Money.render(records.overheadExpensesExpertSum), Money.render(records.performanceSum), Money.render(records.overheadExpensesExpertSumRest));
        Ext.get(store.grid._textItemFundSum.id).update(fundSumMessage);
    });
    //private methods
    function onCellDblClick(grid, rowIndex, columnIndex, e) {
        var voucher = grid.getStore().getAt(rowIndex);
        Srims.performance.showVoucher(voucher, grid._store, isFinanceManage);
    }
}
Ext.extend(Srims.performance.PerformanceVoucherGridPanel, Srims.component.GridPanel);
