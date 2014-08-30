
if (!Srims.fund) 
    Ext.namespace('Srims.fund');

Srims.fund.ExpertGuidFundAllocationPanel = function(id, iconCls){

    this._waitingAllocationFundDescendSelectPanel = new Srims.fund.MyWaitingAllocationFundDescendGridPanel();
    this._allocationPanel = new Ext.Panel({
        html: '<div id=divExpertGuidAllocationPanel></div>'
    });
    this._processPanels = [this._waitingAllocationFundDescendSelectPanel, this._allocationPanel];
    
    this._processDescriptionStore = Srims.expertGuide.fundAllocation_ProcessDescriptionStore;
    
    this._processesShowPanel = new Srims.expertGuide.ProcessesShowForm(this._processDescriptionStore, '经费分配流程');
    this._allocationSingleProcessOperatePanel = new Srims.expertGuide.SingleProcessOperatePanel('fundAllocation', this._processDescriptionStore, this._processPanels);
    
    this._allocationSingleProcessOperatePanel.panel = this;
    Srims.fund.ExpertGuidFundAllocationPanel.superclass.constructor.call(this, {
        id: id,
        frame: true,
        style: 'padding:5px; width:1200px',
        title: '经费分配',
        closable: true,
        deferredRender: false,
        deferHeight: false,
        layout: 'form',
        buttonAlign: 'center',
        iconCls: iconCls,
        items: [this._processesShowPanel, this._allocationSingleProcessOperatePanel],
        buttons: []
    });
    
    this._allocationPanel.next = function(){
        Ext.Ajax.request({
            url: Srims.service.fund.FundAllocationService + '/GetById',
            params: {
                fundAllocationId: this.panel.fundAllocation.get('id')
            },
            scope: this,
            success: function(response){
                var store = new Ext.data.Store({
                    data: response.responseXML,
                    reader: new Srims.fund.FundAllocationXmlReader()
                });
                var currentFundAllocation = store.getAt(0);
                //控制列表的显示和按钮的刷新
                currentFundAllocation.panel = this.panel.fundAllocation.panel;
                currentFundAllocation.panel.fundAllocation = currentFundAllocation;
                currentFundAllocation.panel.button = this.button;
                currentFundAllocation.panel.button.panel = this;
                
                
                if (currentFundAllocation.get('canAllocation')) 
                    Srims.fund.newVoucher(currentFundAllocation, false);
                else if(currentFundAllocation.get('canSubmit'))
                    Srims.fund.submitFundAllocation(currentFundAllocation, this);
                else
                   Srims.fund.undoSubmitFundAllocation(currentFundAllocation,this);
            }
        });
    }
}
Ext.extend(Srims.fund.ExpertGuidFundAllocationPanel, Ext.Panel, {});

