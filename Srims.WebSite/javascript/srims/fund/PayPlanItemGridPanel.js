
if (!Srims.fund) 
    Ext.namespace('Srims.fund');

Srims.fund.PayPlanItemGridPanel = function(project){

    this._project = project;
    this._store = new Srims.fund.PayPlanItemStore(project);
    this._columnModel = new Srims.fund.PayPlanItemGridPanel_ColumnModel();
    
    this._selections = new Ext.grid.RowSelectionModel();
    this._toolBar = new Srims.fund.PayPlanItemGridPanel_ToolBar(this._selections, this._store, this._project)
    
    var params = {};
    params.sm = this._selections;
    params.store = this._store;
    params.colModel = this._columnModel;
    params.tbar = this._toolBar;
    params.height = 220;
    
    Srims.fund.PayPlanItemGridPanel.superclass.constructor.call(this, params);
    
    function onCellDblClick(grid, rowIndex, columnIndex, e){
        var payPlanItem = grid.getStore().getAt(rowIndex);
        Srims.projects.editProjectPayPlanItem(this._project, payPlanItem, this._store);
    }
    this.on('celldblclick', onCellDblClick);
};
Ext.extend(Srims.fund.PayPlanItemGridPanel, Srims.component.GridPanel, {});
