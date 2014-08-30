
if (!Srims.fund) 
    Ext.namespace('Srims.fund');

Srims.fund.ExpertGuidFundDescendPanel_MyFundDescendProjectSelectGridPanel = function(){

    this._projectStore = new Srims.projects.ProjectSimpleStore(Srims.service.projects.ProjectService + '/SearchForFundDescend', undefined);
    
    this._selection = new Ext.grid.CheckboxSelectionModel({
        singleSelect: true
    });
    this._columnModel = new Srims.fund.ExpertGuidFundDescendPanel_MyFundDescendProjectSelectGridPanel_ColumnModel(this._selection);
    
    this.params = {};
    this.params.sm = this._selection;
    this.params.store = this._projectStore;
    this.params.colModel = this._columnModel;
    this.params.defaultBBar = false;
    this.params.style = 'padding:10px;';
    this.params.deferRender = false;
    this.params.autoHeight = true;
    this.params.stateful = false;
    
    Srims.fund.ExpertGuidFundDescendPanel_MyFundDescendProjectSelectGridPanel.superclass.constructor.call(this, this.params);
    
    this._projectStore.load();
    this.next = function(){
        var records = this._selection.getSelections();
        if (records.length == 0) {
            Ext.Msg.show({
                title: '下拨的项目不能为空',
                msg: '请选择要下拨的项目',
                buttons: Ext.Msg.OK,
                icon: Ext.MessageBox.INFO
            });
            return;
        }
        this.panel._params.project = records[0];
        
        var project = this.panel._params.project;
        var finance = this.panel._params.finance;
        
        var financeCanDescendAmount = finance.get('amount') - finance.get('descendAmount');
        var projectCanDescendAmount = project.get('fundCanDescend');
        var canDescendAmount = financeCanDescendAmount > projectCanDescendAmount ? projectCanDescendAmount : financeCanDescendAmount;
        
        this.panel.panel._amountPanel._labelAmountHint.setText('(最高下拨金额：' + Money.render(canDescendAmount) + '元)');
        
        Srims.expertGuide.next(this);
    }
}
Ext.extend(Srims.fund.ExpertGuidFundDescendPanel_MyFundDescendProjectSelectGridPanel, Srims.component.GridPanel, {});


