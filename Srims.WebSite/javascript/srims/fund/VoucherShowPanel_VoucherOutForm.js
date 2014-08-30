
if (!Srims.fund) 
    Ext.namespace('Srims.fund');

Srims.fund.VoucherShowPanel_VoucherOutForm = function(voucher){

    this._voucher = voucher;
    this._store = new Srims.fund.VoucherOutStore(voucher.get('id'));
    
    this._columnModel = new Srims.fund.VoucherOutColumnModel();
    
    this._gridPanelVoucherOut = new Ext.grid.GridPanel({
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
            emptyText: '没有外协分配信息'
        }
    });
    
    Srims.fund.VoucherShowPanel_VoucherOutForm.superclass.constructor.call(this, {
        collapsible: true,
        title: '外协分配信息',
        autoHeight: true,
        frame: true,
        labelWidth: 140,
        bodyStyle: 'padding:5px 5px 0',
        style: 'margin-bottom: 2px',
        defaultType: 'textfield',
        titleCollapse: true,
        items: [this._gridPanelVoucherOut]
    });
    
    this._store.load();
}
Ext.extend(Srims.fund.VoucherShowPanel_VoucherOutForm, Ext.FormPanel, {});
