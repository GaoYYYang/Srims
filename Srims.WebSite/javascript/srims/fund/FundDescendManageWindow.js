
if (!Srims.fund) 
    Ext.namespace('Srims.fund');

Srims.fund.FundDescendManageWindow = function(id, finance, store){

    this._id = id;
    this._finance = finance;
    
    this._fundDescendManageWindow_FinanceInfoPanel = new Srims.fund.FundDescendManageWindow_FinanceInfoPanel(finance);
    this._fundDescendManageWindow_FundDescendPanel = new Srims.fund.FundDescendManageWindow_FundDescendPanel(finance, this);
    this._fundDescendManageWindow_FundReturnPanel = new Srims.fund.FundDescendManageWindow_FundReturnPanel(finance, this);
    this._fundDescendManageWindow_MessagePanel = new Srims.fund.FundDescendManageWindow_MessagePanel();
    
    this._buttonClose = new Ext.Button({
        minWidth: 80,
        text: '关 闭',
        window: this,
        handler: function(){
            var window = this.window;
            window.hide();
        }
    });
    this._buttonDescend = new Ext.Button({
        minWidth: 80,
        text: '下 拨',
        disabled: !this._finance.get('canDescend'),
        hidden: !this._finance.get('hasPermission_Descend'),
        window: this,
        handler: function(){
            var window = this.window;
            Srims.fund.newFundDescend(finance, window._fundDescendManageWindow_FundDescendPanel._gridPanelFundDescend.getStore(), window);
        }
    });
    this._buttonBatchDescend = new Ext.Button({
        minWidth: 80,
        text: '批量下拨',
        disabled: !this._finance.get('canDescend'),
        hidden: !this._finance.get('hasPermission_Descend'),
        window: this,
        handler: function(){
            var window = this.window;
            Srims.fund.newBatchFundDescend(finance, window._fundDescendManageWindow_FundDescendPanel._gridPanelFundDescend.getStore(), window);
        }
    });
    
    var user = Srims.currentLoginLog.user;
    this._buttonReturn = new Ext.Button({
        minWidth: 80,
        text: '还 款',
        window: this,
        disabled: !this._finance.get('canDescend'),
        hidden: !user.HasPermissionFundReturn,
        handler: function(){
            var window = this.window;
            Srims.fund.NewFundReturn(finance, window._fundDescendManageWindow_FundReturnPanel._gridPanelFinanceFundDescend.getStore(), window, undefined);
        }
    });
    
    Srims.fund.FundDescendManageWindow.superclass.constructor.call(this, {
        id: this._id,
        title: '经费下拨管理',
        iconCls: 'icon-fund-descend-Manage',
        width: 900,
        height: 580,
        deferredRender: false,
        frame: true,
        closeAction: 'hide',
        layout: 'form',
        style: 'padding:10px',
        resizable: false,
        items: [this._fundDescendManageWindow_MessagePanel, this._fundDescendManageWindow_FinanceInfoPanel, this._fundDescendManageWindow_FundDescendPanel, this._fundDescendManageWindow_FundReturnPanel],
        buttons: [this._buttonDescend, this._buttonBatchDescend, this._buttonReturn, this._buttonClose]
    });
    
    this.resetButtonVisibleAndDisabled = function(currentFinance){
        this._buttonDescend.setVisible(currentFinance.get('hasPermission_Descend'));
        this._buttonDescend.setDisabled(!currentFinance.get('canDescend'));
        
        this._buttonBatchDescend.setVisible(currentFinance.get('hasPermission_Descend'));
        this._buttonBatchDescend.setDisabled(!currentFinance.get('canDescend'));
        
        this._buttonReturn.setVisible(user.HasPermissionFundReturn);
        this._buttonReturn.setDisabled(!currentFinance.get('canDescend'));
    }
    this.on('hide', function(){
        store.load();
    })
}
Ext.extend(Srims.fund.FundDescendManageWindow, Ext.Window);
