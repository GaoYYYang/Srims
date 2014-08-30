
if (!Srims.fund) 
    Ext.namespace('Srims.fund');

Srims.fund.FinanceGridPanel = function(id, financeStore, title, iconCls, queryParams, isFinanceManage){

    this._store = financeStore;
    this._store.gird = this;
    
    this._selections = new Ext.grid.RowSelectionModel();
    this._columnModel = new Srims.fund.FinanceGridPanel_ColumnModel(isFinanceManage);
    
    this._toolBar = new Srims.fund.FinanceGridPanel_ToolBar(this._selections, this._store, id, queryParams, isFinanceManage);
    this._textItemFinanceSum = new Ext.Toolbar.TextItem('');
    
    this._bbar = new Ext.PagingToolbar({
        pageSize: 40,
        store: this._store,
        displayInfo: true,
        displayMsg: '当前是第{0}条 - 第{1}条，共{2}条',
        emptyMsg: "没有可以显示的记录",
        items: [this._textItemFinanceSum]
    });
    var params = {};
    params.id = id;
    params.title = title;
    params.iconCls = iconCls;
    params.sm = this._selections;
    params.store = this._store;
    params.colModel = this._columnModel;
    params.tbar = this._toolBar;                                                 
    params.bbar = this._bbar;
    
    Srims.fund.FinanceGridPanel.superclass.constructor.call(this, params);
    
    this._store.on('load', function(store, records){
        if (records.financeSum == undefined || records.financeSum == null) 
            records.financeSum = records.financeDescendSum = 0;
        
        var financeSumMessage = String.format(" 总经费：<strong>{0}</strong>，已下拨经费：<strong>{1}</strong>", Money.render(records.financeSum), Money.render(records.financeDescendSum));
        Ext.get(store.gird._textItemFinanceSum.id).update(financeSumMessage);
    });
    
    this.on('celldblclick', onCellDblClick);
    
    //private methods
    function onCellDblClick(grid, rowIndex, columnIndex, e){
        var finance = grid.getStore().getAt(rowIndex);
        if (!isFinanceManage) 
            Srims.fund.showFundDescendManageWindow(finance, grid.getStore());
    }
}
Ext.extend(Srims.fund.FinanceGridPanel, Srims.component.GridPanel, {});
