
if (!Srims.fund) 
    Ext.namespace('Srims.fund');

Srims.fund.FundDescendManageWindow_FundReturnPanel = function(finance, window){

    this._project = finance;
    params = {
        financeId: finance.get('id')
    }
    this._store = new Srims.fund.FinanceFundDescendStore(Srims.service.fund.FinanceFundDescendService + '/GetByFinance', params);
    this._store.window = window;
    this._columnModel = new Srims.fund.FinanceFundDescendGridPanel_ColumnModel(false, false);
    this._selections = new Ext.grid.RowSelectionModel();
    this._toolBar = new Srims.fund.FinanceFundDescendGridPanel_ToolBar(this._selections, this._store, undefined, undefined, true);
    
    
    var params = {};
    params.sm = this._selections;
    params.store = this._store;
    params.colModel = this._columnModel;
    params.height = 125;
    params.tbar = this._toolBar;
    params.defaultBBar = false;
    
    this._gridPanelFinanceFundDescend = new Srims.component.GridPanel(params);
    
    Srims.fund.FundDescendManageWindow_FundReturnPanel.superclass.constructor.call(this, {
        collapsible: true,
        title: '',
        frame: true,
        style: 'margin-bottom: 2px',
        defaultType: 'textfield',
        titleCollapse: false,
        items: [this._gridPanelFinanceFundDescend]
    });
    this._store.load();
}
Ext.extend(Srims.fund.FundDescendManageWindow_FundReturnPanel, Ext.FormPanel, {});

