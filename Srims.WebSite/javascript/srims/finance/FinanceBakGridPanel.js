
if (!Srims.finance) 
    Ext.namespace('Srims.finance');

Srims.finance.FinanceBakGridPanel = function(id, financeBakStore, title, iconCls, queryParams){

    this._store = financeBakStore;
    this._store.gird = this;
    
    this._columnModel = new Srims.finance.FinanceBakGridPanel_ColumnModel();
    
    this._toolBar = new Srims.finance.FinanceBakGridPanel_ToolBar(this._store, id, queryParams);
    
    var params = {};
    params.id = id;
    params.title = title;
    params.iconCls = iconCls;
    params.sm = this._selections;
    params.store = this._store;
    params.colModel = this._columnModel;
    params.tbar = this._toolBar;
    params.defaultBBar = true;
    
    Srims.finance.FinanceBakGridPanel.superclass.constructor.call(this, params);
    
}
Ext.extend(Srims.finance.FinanceBakGridPanel, Srims.component.GridPanel, {});
