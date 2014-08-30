
if (!Srims.fund) 
    Ext.namespace('Srims.fund');

Srims.fund.FinanceVouchesShowWindow_VoucherGridPanel_ToolBar = function(store, selection){
    //fields
    this._store = store;
    this._selection = selection;
    
    //controls
    this._buttonShowVoucher = new Ext.Toolbar.Button({
        iconCls: 'icon-show',
        text: '查看',
        minWidth: 60,
        store: this._store,
        selection: this._selection,
        hidden: true,
        handler: function(){
            if (this.selection.getCount() == 0) 
                return;
            
            Srims.fund.showVoucher(this.selection.getSelected(), this.store, false);
        },
        tooltip: '<b>查看凭单信息</b>'
    });
    
    Srims.fund.FinanceVouchesShowWindow_VoucherGridPanel_ToolBar.superclass.constructor.call(this, {
        items: [this._buttonShowVoucher],
        height: 25
    });
    //initial
    this._selection.buttonShowVoucher = this._buttonShowVoucher;
    
    //event methods
    this._onSelection_selectionChagne = function(selection){
        var buttonShowVoucher = selection.buttonShowVoucher;
        
        if (selection.getCount() == 0) {
            buttonShowVoucher.hide();
            return;
        }
        
        var voucher = selection.getSelected();
        
        buttonShowVoucher.setVisible(true);
        buttonShowVoucher.setDisabled(false);
    }
    //events
    this._selection.on('selectionchange', this._onSelection_selectionChagne);
}
Ext.extend(Srims.fund.FinanceVouchesShowWindow_VoucherGridPanel_ToolBar, Ext.Toolbar);
