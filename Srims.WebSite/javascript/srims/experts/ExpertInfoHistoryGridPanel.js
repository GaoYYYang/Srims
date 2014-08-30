
if (!Srims.experts) 
    Ext.namespace('Srims.experts');

Srims.experts.ExpertInfoHistoryGridPanel = function(id, expertInfoHistoryStore, title, iconCls, queryParams){
    //fields
    this._store = expertInfoHistoryStore;
    this._store.gird = this;
    
    this._selections = new Ext.grid.CheckboxSelectionModel();
    
    //controls    
    this._columnModel = new Srims.experts.ExpertInfoGridGridPanel_ColumnModel(this._selections);
    this._toolbar = new Srims.experts.ExpertInfoHistoryGridPanel_ToolBar(this._store, this._selections, queryParams);
    
    var params = {};
    params.sm = this._selections;
    params.store = this._store;
    params.id = id;
    params.title = title;
    params.iconCls = iconCls;
    params.colModel = this._columnModel;
    params.tbar = this._toolbar;
    params.defaultBBar = true;
    
    //constructor
    Srims.experts.ExpertInfoHistoryGridPanel.superclass.constructor.call(this, params);
    
    this._store.load();
    
    //private methods
    function onCellDblClick(grid, rowIndex, columnIndex, e){
        var expertInfoHistory = grid.getStore().getAt(rowIndex);
        Srims.experts.ExpertAction.showExpertInfoHistory(expertInfoHistory, grid.getStore());
    }
    //event
    this.on('celldblclick', onCellDblClick);
    
}
Ext.extend(Srims.experts.ExpertInfoHistoryGridPanel, Srims.component.GridPanel);
