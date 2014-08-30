
if (!Srims.fund) 
    Ext.namespace("Srims.fund");

Srims.fund.VoucherShowPanel_StateHistoryForm = function(voucher){
    this._voucher = voucher;
    this._store = new Srims.fund.VoucherStateHistoryStore(voucher.get('id'));
    
    this._columnModel = new Srims.fund.VoucherStateHistoryColumnModel();
    
    this._gridPanelVoucherStateHistory = new Ext.grid.GridPanel({
        store: this._store,
        colModel: this._columnModel,
        enableColumnHide: false,
        enableColumnMove: true,
        enableHdMenu: false,
        border: false,
        width: 500,
        autoExpand: true,
        stripeRows: true,
        loadMask: true,
        autoHeight: true,
        stateful: false,
        viewConfig: {
            autoFill: true,
            scrollOffset: 0,
            forceFit: true,
            emptyText: '没有凭单状态历史信息'
        }
    });
    
    Srims.fund.VoucherShowPanel_StateHistoryForm.superclass.constructor.call(this, {
        collapsible: true,
        title: '凭单状态历史信息',
        autoHeight: true,
        frame: true,
        labelWidth: 140,
        bodyStyle: 'padding:5px 5px 0',
        style: 'margin-bottom: 2px',
        defaultType: 'textfield',
        titleCollapse: true,
        items: [this._gridPanelVoucherStateHistory]
    });
    
    this._store.load();
}

Ext.extend(Srims.fund.VoucherShowPanel_StateHistoryForm, Ext.form.FormPanel, {});
