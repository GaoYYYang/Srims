
if (!Srims.fund) 
    Ext.namespace("Srims.fund");

Srims.fund.FinanceVouchersShowWindow = function(id, finance){

    this._id = id;
    this._finance = finance;
    
    var load_url = Srims.service.fund.FinanceService + '/GetVouchers';
    this._store = new Srims.fund.VoucherStore(load_url, {
        financeID: this._finance.get('id')
    });
    
    this._gridPanelVoucher = new Srims.fund.FinanceVouchersShowWindow_VoucherGridPanel(this._store);
    
    this._buttonClose = new Ext.Button({
        minWidth: 80,
        text: '关 闭',
        window: this,
        handler: function(){
            var window = this.window;
            window.close();
        }
    });
    
    Srims.fund.FinanceVouchersShowWindow.superclass.constructor.call(this, {
        id: this._id,
        title: '经费到帐凭单信息',
        iconCls: 'icon-fund-voucher',
        width: 750,
        labelWidth: 90,
        autoHeight: true,
        modal: true,
        deferredRender: false,
        frame: true,
        closeAction: 'hide',
        layout: 'form',
        resizable: false,
        items: [this._gridPanelVoucher],
        buttons: [this._buttonClose]
    });
    this._store.load();
}
Ext.extend(Srims.fund.FinanceVouchersShowWindow, Ext.Window)

