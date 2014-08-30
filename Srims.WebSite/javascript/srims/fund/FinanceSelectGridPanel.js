
if (!Srims.fund) 
    Ext.namespace('Srims.fund');

Srims.fund.FinanceSelectGridPanel = function(store){

    this._selection = new Ext.grid.CheckboxSelectionModel({
        singleSelect: true
    });
    this._columnModel = new Srims.fund.FinanceSelectGridPanel_ColumnModel(this._selection);
    this._store = store;
    
    var params = {};
    params.sm = this._selection;
    params.store = this._store;
    params.colModel = this._columnModel;
    params.height = 300;
    params.defaultBBar = true;
    params.autoExpand = true;
    params.deferredRender = true;
    params.stateful = false;
    params.autoScroll = true;
    params.autoExpandColumn = 'abstract';
    
    Srims.fund.FinanceSelectGridPanel.superclass.constructor.call(this, params);
    this._store.load({
        params: {
            amountEnd: -1
        }
    });
}
Ext.extend(Srims.fund.FinanceSelectGridPanel, Srims.component.GridPanel, {});
