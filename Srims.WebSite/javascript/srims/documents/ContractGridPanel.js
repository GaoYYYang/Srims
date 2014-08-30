

if (!Srims.documents) 
    Ext.namespace('Srims.documents');

Srims.documents.ContractGridPanel = function(project){

    this._project = project;
    
    var load_url = Srims.service.documents.ContractService + '/GetByProjectID';
    var params = {
        projectId: project.get('id')
    };
    this._store = new Srims.documents.ContractStore(load_url, params);
    this._columnModel = new Srims.documents.ContractGridPanel_ColumnModel(project.get('isHorizontal'));
    
    this._selections = new Ext.grid.RowSelectionModel();
    this._toolBar = new Srims.documents.ContractGridPanel_ToolBar(this._selections, this._store, this._project)
    
    var params = {};
    params.sm = this._selections;
    params.store = this._store;
    params.colModel = this._columnModel;
    params.tbar = this._toolBar;
    params.height = 220;
    
    Srims.documents.ContractGridPanel.superclass.constructor.call(this, params);
    
    function onCellDblClick(grid, rowIndex, columnIndex, e){
        var contract = grid.getStore().getAt(rowIndex);
        Srims.projects.downLoadContract(contract);
    };
    this.on('celldblclick', onCellDblClick);
};
Ext.extend(Srims.documents.ContractGridPanel, Srims.component.GridPanel, {});
