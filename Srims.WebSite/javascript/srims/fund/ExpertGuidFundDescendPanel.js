
if (!Srims.fund) 
    Ext.namespace('Srims.fund');

Srims.fund.ExpertGuidFundDescendPanel = function(id, iconCls){

    this._financeSelectPanel = new Srims.fund.FinanceSelectPanel();
    this._projectSelectPanel = new Srims.fund.ExpertGuidFundDescendPanel_MyFundDescendProjectSelectGridPanel();
    this._amountPanel = new Srims.fund.ExpertGuidFundDescendPanel_ExpertFundDescendAmountPanel();
    this._confirmPanel = new Srims.fund.ExpertGuidFundDescendPanel_ExpertFundDescendConfirmPanel();
    this._processPanels = [this._financeSelectPanel, this._projectSelectPanel, this._amountPanel, this._confirmPanel];
    
    this._processDescriptionStore = Srims.expertGuide.fundDescend_ProcessDescriptionStore;
    
    this._processesShowPanel = new Srims.expertGuide.ProcessesShowForm(this._processDescriptionStore, '经费下拨流程');
    this._descendSingleProcessOperatePanel = new Srims.expertGuide.SingleProcessOperatePanel('fundDeScend', this._processDescriptionStore, this._processPanels);
    
    this._descendSingleProcessOperatePanel.panel = this;
    this._processDescriptionStore.panel = this;
    Srims.fund.ExpertGuidFundDescendPanel.superclass.constructor.call(this, {
        id: id,
        frame: true,
        style: 'padding:5px; width:1200px',
        title: '经费下拨',
        closable: true,
        deferredRender: false,
        deferHeight: false,
        layout: 'form',
        buttonAlign: 'center',
        iconCls: iconCls,
        items: [this._processesShowPanel, this._descendSingleProcessOperatePanel]
    });
}
Ext.extend(Srims.fund.ExpertGuidFundDescendPanel, Ext.Panel, {});

