
if (!Srims.fund) 
    Ext.namespace("Srims.fund");

Srims.fund.FundAllocationShowPanel_FundDescendStateHistoryForm = function(fundAllocation){

    var load_url = Srims.service.fund.FundDescendStateHistoryService + '/GetByFundDescend';
    this._store = new Srims.fund.FundDescendStateHistoryStore(load_url, {
        fundDescendID: fundAllocation.get('fundDescendID')
    });
    this._columnModel = new Srims.fund.FundDescendStateHistoryGridPanel_ColumnModel();
    
    this._gridPanelFundDescendStateHistory = new Ext.grid.GridPanel({
        store: this._store,
        colModel: this._columnModel,
        enableColumnHide: false,
        enableColumnMove: true,
        enableHdMenu: false,
        border: false,
        width: 700,
        autoExpand: true,
        autoExpandColumn: 'accountBookNumber',
        stripeRows: true,
        loadMask: true,
        autoHeight: true,
        stateful: false,
        viewConfig: {
            autoFill: true,
            scrollOffset: 0,
            forceFit: true,
            emptyText: '没有状态历史信息'
        }
    });
    
    Srims.fund.FundAllocationShowPanel_FundDescendStateHistoryForm.superclass.constructor.call(this, {
        collapsible: true,
        title: '对应经费下拨状态历史信息',
        frame: true,
        labelWidth: 100,
        bodyStyle: 'padding:5px 5px 0',
        style: 'margin-bottom: 2px',
        defaultType: 'textfield',
        titleCollapse: true,
        items: [this._gridPanelFundDescendStateHistory]
    });
    
    this._store.load();
}
Ext.extend(Srims.fund.FundAllocationShowPanel_FundDescendStateHistoryForm, Ext.form.FormPanel, {});

