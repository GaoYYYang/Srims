
if (!Srims.fund) 
    Ext.namespace('Srims.fund');

Srims.fund.FundDescendManageWindow_FinanceInfoPanel_ToolBar = function(finance, window){
    //fields
    this._finance = finance;
    this._window = window;
    
    //controls
    this._buttonHeader = new Ext.Toolbar.Button({
        text: '<b style="color:#15428B">经费到帐基本信息</b>',
        minWidth: 60
    });
    this._buttonRefresh = new Ext.Toolbar.Button({
        iconCls: 'icon-refresh',
        text: '刷新',
        minWidth: 60,
        window: this._window,
        finance: this._finance,
        handler: function(){
            var store = new Srims.fund.FinanceSimpleStore(Srims.service.fund.FinanceService + '/GetByID', {
                financeId: this.finance.get('id')
            });
            store.window = this.window;
            store.on('load', function(){
                var currentfinance = this.getAt(0);
                this.window.resetComponentValues(currentfinance);
            })
            store.load();
        },
        tooltip: '<b>刷新经费到帐</b><br/>更新经费到帐信息'
    })
    
    
    var items = [this._buttonHeader, new Ext.Toolbar.Fill(), this._buttonRefresh];
    
    Srims.fund.FundDescendManageWindow_FinanceInfoPanel_ToolBar.superclass.constructor.call(this, {
        items: items
    });
}
Ext.extend(Srims.fund.FundDescendManageWindow_FinanceInfoPanel_ToolBar, Ext.Toolbar);
