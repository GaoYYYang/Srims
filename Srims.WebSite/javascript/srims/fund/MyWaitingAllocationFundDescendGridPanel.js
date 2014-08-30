
if (!Srims.fund) 
    Ext.namespace('Srims.fund');

Srims.fund.MyWaitingAllocationFundDescendGridPanel = function(){

    this._selection = new Ext.grid.CheckboxSelectionModel({
        singleSelect: true
    });
    this._columnModel = new Srims.fund.MyWaitingAllocationFundDescendGridPanel_ColumnModel(this._selection);
    this._store = new Srims.fund.FundDescendStore(Srims.service.fund.FundDescendService + '/GetMyWaitingAllocationFundDescend', undefined);
    
    var params = {};
    params.sm = this._selection;
    params.store = this._store;
    params.colModel = this._columnModel;
    params.defaultBBar = false;
    params.autoHeight = true;
    params.stateful = false;
    
    Srims.fund.MyWaitingAllocationFundDescendGridPanel.superclass.constructor.call(this, params);
    
    this._store.load();
    this.next = function(){
        var records = this._selection.getSelections();
        if (records.length == 0) {
            Ext.Msg.show({
                title: '请选择经费下拨',
                msg: '请选择要分配的经费下拨',
                buttons: Ext.Msg.OK,
                icon: Ext.MessageBox.INFO
            });
            
            return;
        }
        this.button.setText('正在执行下一步...');
        this.button.disable();
        
        Ext.Ajax.request({
            url: Srims.service.fund.FundAllocationService + '/GetByFundDescend',
            scope: this,
            params: {
                fundDescendId: records[0].get('id')
            },
            success: function(response){
                var store = new Ext.data.Store({
                    data: response.responseXML,
                    reader: new Srims.fund.FundAllocationXmlReader()
                });
                
                var fundAllocation = store.getAt(0);
                var vocherPanel = new Srims.fund.FundAllocationShowPanel_VoucherForm(fundAllocation, true)._gridPanelVoucher;
                Ext.getDom('divExpertGuidAllocationPanel').innerHTML = ' ';
                vocherPanel.render(Ext.get('divExpertGuidAllocationPanel'));
                //下一步操作给fundAllocation 赋值
                this.panel.fundAllocation = fundAllocation;
                this.panel.fundAllocation.panel = vocherPanel;
                this.panel.fundAllocation.panel.button = this.button;
                this.panel.fundAllocation.panel.button.panel = this.panel.panel._allocationPanel;
                
                Srims.expertGuide.next(this);
                if (fundAllocation.get('canSubmit')) 
                    this.button.setText('提交');
                
                if (fundAllocation.get('canUndoSubmit')) 
                    this.button.setText('撤销提交');
            }
        })
    }
}
Ext.extend(Srims.fund.MyWaitingAllocationFundDescendGridPanel, Srims.component.GridPanel, {});
