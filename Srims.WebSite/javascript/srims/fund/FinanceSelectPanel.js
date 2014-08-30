
if (!Srims.fund) 
    Ext.namespace("Srims.fund");

Srims.fund.FinanceSelectPanel = function(){

    this._store = new Srims.fund.FinanceSimpleStore(Srims.service.fund.FinanceService + '/Query', undefined);
    this._queryPanel = new Srims.fund.FinanceSelectPanel_QueryPanel(this._store);
    this._financeGridPanel = new Srims.fund.FinanceSelectGridPanel(this._store);
    
    Srims.fund.FinanceSelectPanel.superclass.constructor.call(this, {
        closable: true,
        deferHeight: false,
        buttonAlign: 'center',
        layout: 'form',
        style: 'padding:10px;',
        items: [this._queryPanel, this._financeGridPanel]
    });
    this.next = function(){
        var records = this._financeGridPanel._selection.getSelections();
        if (records.length == 0) {
            Ext.Msg.show({
                title: '请选择经费到帐信息',
                msg: '请选择要下拨的经费到帐信息',
                buttons: Ext.Msg.OK,
                icon: Ext.MessageBox.INFO
            });
            return;
        }
        
        this.panel._params.finance = records[0];
        
        Srims.expertGuide.next(this);
    };
    this.focus = function(){
        this._queryPanel.focus();
    }
}
Ext.extend(Srims.fund.FinanceSelectPanel, Ext.Panel, {});
