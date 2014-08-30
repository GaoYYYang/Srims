
if (!Srims.fund) 
    Ext.namespace('Srims.fund');

Srims.fund.FundDescendManageWindow_FundDescendPanel = function(finance, window){

    this._project = finance;
    params = {
        financeId: finance.get('id')
    }
    this._store = new Srims.fund.FundDescendStore(Srims.service.fund.FundDescendService + '/GetByFinance', params);
    this._store.window = window;
    this._store.finance = finance;
    
    this._columnModel = new Srims.fund.FundDescendGridPanel_ColumnModel(false, false, false);
    this._selections = new Ext.grid.RowSelectionModel();
    this._toolBar = new Srims.fund.FundDescendGridPanel_ToolBar(this._selections, this._store, undefined, undefined, true, false, false, true);
    
    var params = {};
    params.sm = this._selections;
    params.store = this._store;
    params.colModel = this._columnModel;
    params.height = 160;
    params.tbar = this._toolBar;
    params.defaultBBar = false;
    
    this._gridPanelFundDescend = new Srims.component.GridPanel(params);
    
    Srims.fund.FundDescendManageWindow_FundDescendPanel.superclass.constructor.call(this, {
        collapsible: true,
        title: '',
        frame: true,
        style: 'margin-bottom: 2px',
        defaultType: 'textfield',
        titleCollapse: false,
        items: [this._gridPanelFundDescend]
    });
    this._store.load();
    
    this._gridPanelFundDescend.window = window;
    this._gridPanelFundDescend.on('celldblclick', onCellDblClick);
    //private methods
    function onCellDblClick(grid, rowIndex, columnIndex, e){
        var fundDescend = grid.getStore().getAt(rowIndex);
        Srims.fund.showFundAllocationInfoByFundDescend(fundDescend);
        window.hide();
    }
}
Ext.extend(Srims.fund.FundDescendManageWindow_FundDescendPanel, Ext.FormPanel, {});

